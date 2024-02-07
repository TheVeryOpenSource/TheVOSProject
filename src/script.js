document.addEventListener('DOMContentLoaded', function() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            fetchWeather(position.coords.latitude, position.coords.longitude);
        }, function(error) {
            document.getElementById('weather').innerText = 'Failed to retrieve your location';
        });
    } else {
        document.getElementById('weather').innerText = 'Geolocation is not supported by your browser';
    }
});

function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { temperature_2m, wind_speed_10m } = data.current;
            document.getElementById('weather').innerText = `At your location the current temperature is ${temperature_2m}°C with a wind speed of ${wind_speed_10m} km/h.`;
        })
        .catch(error => {
            document.getElementById('weather').innerText = 'Failed to fetch weather data';
        });
}