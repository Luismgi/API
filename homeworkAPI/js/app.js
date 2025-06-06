const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  resultsDiv.innerHTML = "<p>Buscando...</p>";

  try {
    const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    const data = response.data;

    resultsDiv.innerHTML = "";

    if (data.length === 0) {
      resultsDiv.innerHTML = "<p>No se encontraron resultados.</p>";
      return;
    }

    data.forEach(item => {
      const show = item.show;

      const card = document.createElement("article");
      card.className = "card";

      const imageSrc = show.image?.medium || "assets/placeholder.png";
      const summaryText = show.summary ? show.summary.replace(/<[^>]+>/g, "") : "Sin descripción.";

      card.innerHTML = `
        <img src="${imageSrc}" alt="${show.name}">
        <h3>${show.name}</h3>
        <p>${summaryText}</p>
      `;

      resultsDiv.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = "<p>Ocurrió un error al buscar.</p>";
  }
});