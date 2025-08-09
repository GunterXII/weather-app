const input = document.getElementById('cityInput');
const btn = document.getElementById('searchBtn');
const weatherDiv = document.getElementById('weather');

btn.addEventListener('click', async () => {
  const city = input.value;
  if (!city) return alert('Inserisci una città');

  try {
    // 1. Ottieni latitudine e longitudine con Nominatim (OpenStreetMap)
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
    const geoData = await geoRes.json();
    if (geoData.length === 0) {
      weatherDiv.textContent = 'Città non trovata';
      return;
    }

    const lat = geoData[0].lat;
    const lon = geoData[0].lon;

    // 2. Ottieni meteo da Open-Meteo con lat e lon
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`);
    const weatherData = await weatherRes.json();

    // 3. Mostra la temperatura oraria (per esempio la prima ora)
    const temp = weatherData.hourly.temperature_2m[0];
    weatherDiv.textContent = `Temperatura attuale a ${city}: ${temp} °C`;
  } catch (error) {
    weatherDiv.textContent = 'Errore nel caricamento del meteo';
    console.error(error);
  }
});
