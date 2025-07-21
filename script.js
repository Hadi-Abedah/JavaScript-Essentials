document.getElementById("btnSearch").addEventListener("click", () => {
  const query = document.getElementById("destinationInput").value.toLowerCase().trim();
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = ""; // clear previous results

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      let matches = [];

      // Search cities
      data.countries.forEach(country => {
        country.cities.forEach(city => {
          if (city.name.toLowerCase().includes(query) || city.description.toLowerCase().includes(query)) {
            matches.push({ type: "City", ...city });
          }
        });
      });

      // Search temples
      data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(query) || temple.description.toLowerCase().includes(query) || query.includes("temple")) {
          matches.push({ type: "Temple", ...temple });
        }
      });

      // Search beaches
      data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(query) || beach.description.toLowerCase().includes(query) || query.includes("beach")) {
          matches.push({ type: "Beach", ...beach });
        }
      });

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<p>No results found for "<strong>${query}</strong>".</p>`;
      } else {
        matches.forEach(match => {
          const card = document.createElement("div");
          card.style.border = "1px solid white";
          card.style.padding = "10px";
          card.style.margin = "10px";
          card.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          card.innerHTML = `
            <h3>${match.name} (${match.type})</h3>
            <img src="${match.imageUrl}" alt="${match.name}" style="max-width: 100%; height: auto;">
            <p>${match.description}</p>
          `;
          resultsContainer.appendChild(card);
        });
      }
    })
    .catch(err => {
      console.error("Error loading data:", err);
      resultsContainer.innerHTML = `<p style="color: red;">Failed to load data.</p>`;
    });
});


function clearResults() {
  document.getElementById("destinationInput").value = "";      // Clear input
  document.getElementById("results").innerHTML = "";           // Clear results container
}
document.getElementById("clearResult").addEventListener("click", clearResults);
