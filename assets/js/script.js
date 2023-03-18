var search = $(".search");

// append buttons with last 8 city searches under search button
var aside = $(".aside");
var cityArray = JSON.parse(localStorage.getItem("City")) || [];
for (i = 0; i < cityArray.length; i++) {
    var cityBtn = $("<button class='my-2'>");
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

    var apiCall = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityString + "&appid=c0c7982eea1a651cf4a03ef899b1c02f"

    fetch(apiCall)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
        })
    
    $("input").val("");
})