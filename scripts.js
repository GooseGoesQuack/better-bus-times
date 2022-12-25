function getTimes() {
    
    $.ajax({
        type: 'GET',
        url:'https://api.tfl.gov.uk/Line/154/Arrivals/490012554E?modesFilter=tube&oysterOnly=false',
        dataType: 'json',
        success: function(data) {
            var sorted = data.sort(function(a, b) {
                if (a.timeToStation > b.timeToStation) {
                    return 1;
                }
                if (a.timeToStation < b.timeToStation) {
                    return -1;
                }
                return 0;
            });
            $.each(data, function(key, value) {
                var line = value.lineName;
                var destination = value.destinationName;
                var time = value.timeToStation;
                var vehicle = value.vehicleId;
                time = parseInt(time/60);
                addTime(vehicle, line, destination, time);
            });
        }
    });
}

function addTime(vehicle, line, destination, time){
    var container = document.getElementById('depart-container')

    var newDiv = document.createElement("div");
    newDiv.classList.add("arrival");
    newDiv.classList.add("flex");
    container.appendChild(newDiv);

    var newLine = document.createElement("span");
    newLine.classList.add("line");
    var lineContent = document.createTextNode(line);
    newLine.appendChild(lineContent);
    newDiv.appendChild(newLine);

    var newDest = document.createElement("span");
    newDest.classList.add("destination");
    var destContent = document.createTextNode(destination);
    newDest.appendChild(destContent);
    newDiv.appendChild(newDest);

    var newETA = document.createElement("span");
    newETA.classList.add("eta");
    var ETAContent = document.createTextNode(time);
    newETA.appendChild(ETAContent);
    newDiv.appendChild(newETA);

    var newMin = document.createElement("span");
    newMin.classList.add("min");
    var minContent = document.createTextNode("min");
    newMin.appendChild(minContent);
    newDiv.appendChild(newMin);
}

function test(){
    var newDiv = document.createElement("div");
    newDiv.innerText = "This is a div";

    var container = document.getElementById('depart-container')
    container.appendChild(newDiv);
}