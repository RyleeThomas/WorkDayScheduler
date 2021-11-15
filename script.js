//get the current day
var date = moment().format('ll');
// display current day under id currentDay
$('#currentDay').append(date);


// check current day time
var daylight = moment().format('a');
var currentTime = moment().format('h');
var intTime = 0;
//convert to military time for easier time comparison
if(daylight == 'pm' && currentTime != 12){
    intTime = parseInt(currentTime) + 12;
}
if(daylight == 'am' || currentTime == 12) {
    intTime = parseInt(currentTime);
}


// create an array with 9 empty slots key:[value,"taskText"]
var allTask = [];
var block = document.getElementsByClassName('time-block');
// iterate through time blocks
function colorCode(){ 
    //check the values vs time and add color class
    var i;
    for (i=0; i<block.length; i++){
        var blockValue = block[i].getAttribute('value');
        if(parseInt(blockValue) < intTime){
            block[i].classList.add('past');
        }
        if(parseInt(blockValue) == intTime){
            block[i].classList.add('present');
        }
        if(parseInt(blockValue) > intTime) {
            block[i].classList.add('future');
        } 
    }
}

//load task from local storage onto page
var loadTask = function(){
    //retrieve key task
    task = JSON.parse(localStorage.getItem("task"));
    //if task key is empty then create a new one for each time slot
    if (task == null) {
        var j;
        for(j=0; j< block.length; j++){
            var task = {
                taskText: $('.textarea')[j].value
            };
        allTask.push(task);
        localStorage.setItem("task", JSON.stringify(allTask));
        }
    }
    //if key already exist update the array and update the textarea value
    else {
        allTask = task;
        var k;
        for(k=0; k<block.length; k++){
            $('.textarea')[k].value = allTask[k].taskText;
        }
    }
}

colorCode();
loadTask();

//if update even button is clicked, save textarea value to local storage
$('.saveBtn').click(function(){
    var val = this.getAttribute('value');
    allTask[parseInt(val)].taskText = $('.textarea')[parseInt(val)].value;
    localStorage.setItem("task", JSON.stringify(allTask));
});