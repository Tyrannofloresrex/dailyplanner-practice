var currentDate = dayjs().format("dddd, MMMM D, YYYY");
var currentTime = dayjs().format("h:m A");
//Displays date and time at the top of the planner
var topClock = $("<p>");
$("#currentDay").text(currentDate);
topClock.text(currentTime);
$("#currentDay").append(topClock);

var contentSlots = $(".input-row");
// iterating over input fields to change color correlated to specific times
for (let i = 0; i < contentSlots.length; i++) {
  const slotArray = contentSlots[i];
  var simpleTime = dayjs().format("H");
//   explains what colors should be at certain times of day. Time is based on simple greater/less than method based on military time *different from display
// manipulated through CSS
  var hour = parseInt($(slotArray).attr("data-hour"));
  if (hour < simpleTime) {
    $(slotArray).css("background-color", "gray");
  } else if (hour > simpleTime) {
    $(slotArray).css("background-color", "green");
  } else {
    $(slotArray).css("background-color", "yellow");
  }
}

var saveButtons = $(".btn");
var planObject = JSON.parse(localStorage.getItem("plansData")) || {};
// takes objects (key =data hour, value = plans text) and returns them to the write row based on the data identifer
for (var dataHour in planObject) {
  var rtrnVal = planObject[dataHour];

  $(".input-row").filter(`[data-hour="${dataHour}"]`).html(rtrnVal);

  console.log(planObject[dataHour]);
}
// On click any save saveButtons, the plans text from that row will be saved as a string in an object
saveButtons.click(function () {
    var dataHour = $(this).attr("data-hour");
    var plans = $(".input-row").filter(`[data-hour="${dataHour}"]`);
    var plansVal = plans.html();
  
    planObject[dataHour] = plansVal;
    localStorage.setItem("plansData", JSON.stringify(planObject));
  });