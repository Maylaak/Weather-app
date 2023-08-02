let weather = { //object to store functions and variables needed to access api
  apiKey: "f77f589f238c9dd94c3f65e630946199",//api key
  fetchWeather: function (city) {



    fetch(//starts the process of fetching resoure from a server
      "https://api.openweathermap.org/data/2.5/weather?q="  
      +city //in the link there was a {} where the name of the city was inserted, instead of that we put + city so it isnt jus the weather of one fixed city
      +"&units=metric&appid=" //this was also part of the link, it makes the unit metric
      +this.apiKey// after appid we must add the api key, we defined it earlier so we just said this. the key
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {//all of this is taken from the link
    const { name } = data;//the data here is all in the link, and it looks like one big object, so here wqhat we did was get the name from this data
    const { icon, description } = data.weather[0];//we got the icon and its description from the weather object in the data [0] is the id in the weather obj 
    const { temp, humidity } = data.main;// we did the same here
    const { speed } = data.wind;//and here
    document.querySelector(".city").innerText = "Weather in " + name;//were adding the text that is displayed
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";// we got an icon which is the clouds or whatever according to the weather
    document.querySelector(".description").innerText = description;// so it will say weather in "searched city"
    document.querySelector(".temp").innerText = temp + "°C"; //displaying the temprature
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";//displaying the humidity
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";//displaying the wind speed
    document.querySelector(".weather").classList.remove("loading");//removes loading when all of that was displayed
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";//this will get an image from the inputted city and use it as the background
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);//it will get the value of what was inserted in the search bar, so the city name, and get its weather
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search(); //so it will search for the weather when the search button is clicked
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {//here we used the keyup keyboard event so this will happen when the key is released
    if (event.key == "Enter") {//event.key is a keyboard event, there are 3, keyup keydown and keypress; here were saying if enter is pressed down, search for the weather
      weather.search();
    }
  });

weather.fetchWeather("Beirut");//first city with weather being showed that you see on the page
