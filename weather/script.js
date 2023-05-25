function getWeather() {
  var city = document.getElementById("cityInput").value;
  var geocodingApiKey = "c90ce70536f14b3b8772c58955323912";
  var geocodingUrl = "https://api.opencagedata.com/geocode/v1/json?q=" + encodeURIComponent(city) + "&key=" + geocodingApiKey;

  fetch(geocodingUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      if (data.results && data.results.length > 0) {
        var location = data.results[0].geometry;
        var lat = location.lat;
        var lng = location.lng;
        var weatherApiKey = "c021d06713fe8d7fb5921635b9ba9975";
        var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=" + weatherApiKey;

        fetch(weatherUrl)
          .then(function(response) {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then(function(weatherData) {
            var weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.innerHTML = "城市：" + city + "<br>";
            weatherInfo.innerHTML += "溫度：" + (weatherData.main.temp - 273.15).toFixed(2) + "°C<br>";
            weatherInfo.innerHTML += "天氣狀況：" + weatherData.weather[0].description;
          })
          .catch(function(error) {
            console.log(error);
            var weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.innerHTML = "無法取得天氣資料。請稍後再試。";
          });
      } else {
        throw new Error("無法解析該城市的地理位置。");
      }
    })
    .catch(function(error) {
      console.log(error);
      var weatherInfo = document.getElementById("weatherInfo");
      weatherInfo.innerHTML = "無法取得天氣資料。請檢查輸入的城市名稱或稍後再試。";
    });
}
