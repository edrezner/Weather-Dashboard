var search = $(".search");

// append buttons with last 8 city searches under search button
var aside = $(".aside");
var cityArray = JSON.parse(localStorage.getItem("City")) || [];
for (i = 0; i < cityArray.length; i++) {
    var cityBtn = $("<button class='m-2'>");
    cityBtn.text(cityArray[i]);
    aside.append(cityBtn);
}


search.click(function () {
    // Set input string into api call
    var cityString = $("input").val().trim();

    // save last 8 searches in local storage
    var recentSearches = JSON.parse(localStorage.getItem("City")) || [];
    if (recentSearches.length > 7) {
        recentSearches.pop();
    }

    if (!recentSearches.includes(cityString)) {
        recentSearches.unshift(cityString);
    }

    localStorage.setItem("City", JSON.stringify(recentSearches));

    // var zeroIndexBtn = $("<button class='m-2'>");
    // zeroIndexBtn.text(cityArray[0]);
    // aside.append(zeroIndexBtn);

    var apiCall = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityString + "&exclude=hourly&appid=c0c7982eea1a651cf4a03ef899b1c02f&units=imperial"

    fetch(apiCall)
        .then(response => response.json())
        .then(data => {
            console.log(data);


            // $("input").val("");

            // create top portion of dashboard with city name, date, weather icon, temp, wind, and humidity
            var content = $(".content");
            content.innerHTML = "";

            var topDiv = $("<div>").addClass("border border-dark m-3");
            content.append(topDiv);

            var h2 = $("<h2>").addClass("m-2");
            var cityH2 = data.city.name + " " + dayjs(data.list[0].dt_txt).format("M/D/YYYY");
            var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png")
                     .attr("alt", "Weather Icon");
            h2.text(cityH2);
            h2.append(weatherIcon);
            topDiv.append(h2);

            var pTemp = $("<p>").addClass("m-2");
            var currentTemp = data.list[0].main.temp;
            pTemp.text("Temp: " + currentTemp + "\u00B0F");
            topDiv.append(pTemp);

            var pWind = $("<p>").addClass("m-2");
            var currentWind = data.list[0].wind.speed;
            pWind.text("Wind: " + currentWind + " MPH");
            topDiv.append(pWind);

            var pHumid = $("<p>").addClass("m-2");
            var currentHumid = data.list[0].main.humidity;
            pHumid.text("Humidity: " + currentHumid + "%");
            topDiv.append(pHumid)

            // create bottom portion of dashboard with weather forecast info for next 5 days

            var bottomDiv = $("<div>").addClass("d-flex flex-wrap justify-content-between");
            content.append(bottomDiv);

            var fcH3Div = $("<div>").addClass("col-12 mb-3");
            bottomDiv.append(fcH3Div);
            
            var fcH3 = $("<h3>").addClass("m-3").text("5-Day Forecast:")
            fcH3Div.append(fcH3);


            for (i=0; i < data.list.length; i += 8) {
                var fcCard = $("<div>").addClass("col-2 m-3 border border-dark fc");
                bottomDiv.append(fcCard);

                var fcDate = $("<h5>").addClass("mx-2 my-3").text(dayjs(data.list[i].dt_txt).format("M/D/YYYY"));
                fcCard.append(fcDate);
                
                var fcIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png")
                .attr("alt", "Weather Icon");
                fcCard.append(fcIcon);

                var fcTemp = $("<p>").addClass("mx-2 my-3").text("Temp: " + data.list[i].main.temp + "\u00B0F");
                fcCard.append(fcTemp);

                var fcWind = $("<p>").addClass("mx-2 my-3").text("Wind: " + data.list[i].wind.speed + " MPH");
                fcCard.append(fcWind);

                var fcHumid = $("<p>").addClass("mx-2 my-3").text("Humidity: " + data.list[i].main.humidity + "%");
                fcCard.append(fcHumid);
            }
        })
})

