function get_times() {
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
                time = parseInt(time/60);
                time < 1 ? time = "Due" : time = time +" min";
                addTime(line, destination, time)
            });
        }
    });
}

function addTime(line, destination, time) {
    // create a new div element
    const newDiv = document.createElement("div");
  
    // and give it some content
    const newContent = document.createTextNode(line +" to "+ destination +" - "+ time);
  
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
  
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("search");
    document.body.insertBefore(newDiv, currentDiv);
  }