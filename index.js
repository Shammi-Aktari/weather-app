function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  
  function showPosition(response) {
    console.log(response.data);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
  
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
  }
  
  function search(city) {
    console.log(city);
    let apiKey = "4ef1e54a9a52c90543ac2a54b2d5a60b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showPosition);
  }
  
  function searchCity(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    search(city);
  }
  
  function currentPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "4ef1e54a9a52c90543ac2a54b2d5a60b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(showPosition);
  }
  
  function getCurrentHome(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(currentPosition);
  }
  
  // Feature #1
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  // Feature #2
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", searchCity);
  
  let currentLocation = document.querySelector("#current-location");
  currentLocation.addEventListener("click", getCurrentHome);
  
  search("Lisbon");
  