var enableAutoZoomJoin = false;
var joinedClass = false;
var currClass = "";
var evensZoomLinks = {};
var oddsZoomLinks = {};

function toggle() {
    for (var i = 1; i < 8; i++){
        var className = document.getElementById([i, ".", 2].join("")).value;
        var classTime = document.getElementById([i, ".", 1].join("")).value.split(":");
        var classLink = document.getElementById([i, ".", 3].join("")).value;
        var time;
        if (i%2 == 0){
            time = parseInt(classTime[0], 10) * 60 + parseInt(classTime[1], 10) - 1;
            evensZoomLinks[time] = [className, classLink];
        } else {
            time = parseInt(classTime[0], 10) * 60 + parseInt(classTime[1], 10) - 1;
            oddsZoomLinks[time] = [className, classLink];
        }
    }
    enableAutoZoomJoin = !enableAutoZoomJoin;
    document.getElementById("isOn").innerHTML = "Script is running";
}

var functionID = setInterval(function() {
    var date = new Date();
    if (enableAutoZoomJoin){
        console.log("Checking");
        if (date.getDay() == 2 || date.getDay() == 5){
            for (let key in oddsZoomLinks){
                if ((date.getMinutes()+ date.getHours()*60) == key && !joinedClass){
                    // open zoom link in new tab
                    console.log("Open");
                    document.getElementById("classname").innerHTML = oddsZoomLinks[key][0];
                    joinedClass = true;
                    currClass = oddsZoomLinks[key][0]
                    window.open(oddsZoomLinks[key][1], "_blank");
                }
                if (currClass != oddsZoomLinks[key][0] && (date.getMinutes() + date.getHours() * 60) == key){
                    joinedClass = false;
                }
                if ((date.getMinutes() + date.getHours() * 60) == key + 75) {
                    joinedClass = false;
                    document.getElementById("classname").innerHTML = "no class";
                }
            }
        } else if (date.getDay() == 1 || date.getDay() == 4){
            for (let key in evensZoomLinks) {
                if ((date.getMinutes() + date.getHours() * 60) == key && !joinedClass) {
                    // open zoom link in new tab
                    console.log("Open");
                    document.getElementById("classname").innerHTML = evensZoomLinks[key][0];
                    joinedClass = true;
                    currClass = evensZoomLinks[key][0]
                    window.open(evensZoomLinks[key][1], "_blank");
                }
                if (currClass != evensZoomLinks[key][0] && (date.getMinutes() + date.getHours() * 60) == key) {
                    joinedClass = false;
                }
                if ((date.getMinutes() + date.getHours() * 60) == key + 75) {
                    joinedClass = false;
                    document.getElementById("classname").innerHTML = "no class";
                }
            }
        }
  }
}, 10*1000)