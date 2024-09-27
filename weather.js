let weather = {
  apikeys: "db9cfb1b20c612c26e7667d22c00e806",
  fetchWeather: async function (city) {
    await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apikeys
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayweather(data));
  },

  displayweather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerHTML = "Weather in " + name;
    document.querySelector(".icon").src =
      'https://openweathermap.org/img/wn/'+icon+'@2x.png';
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".temp").innerHTML = temp + "°C";
    document.querySelector(".humidity").innerHTML =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind-speed").innerHTML =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
     
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
const search = document.querySelector(".search button");
search.addEventListener("click", () => weather.search());

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
