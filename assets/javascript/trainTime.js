// set document so everything is down loaded before game begins.
$(document).ready(function() {


 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyB7sAG9uP1WZuveLLkv3hYnlkf4kW23tEo",
  authDomain: "data-persistence-62016.firebaseapp.com",
  databaseURL: "https://data-persistence-62016.firebaseio.com",
  projectId: "data-persistence-62016",
  storageBucket: "data-persistence-62016.appspot.com",
  messagingSenderId: "535306103254"
};
firebase.initializeApp(config);

var db = firebase.database();
var name = "";
var destination = "";
var train_time = "";
var frequency = "";
var next_arr = "";
var min_away = 0;

$("#submit").on("click", function (){
  name = $("#name").val().trim();
  destination = $("#destination").val().trim();
  train_time = $("#time").val().trim();
  frequency = $("#frequency").val().trim();

  $("#name").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#frequency").val("");


  db.ref().push({
    trainName: name,
    destination: destination,
    train_time: train_time,
    Frequency: frequency,
    dateAdded:firebase.database.ServerValue.TIMESTAMP
  });

});

function train_min() {
  // datbase name or object name?????
  db.ref().child('data-persistence-62016').once('value', function (snapshot) {
      snapshot.forEach(function (child_snap) {
          newTime = moment().format('X');
          db.ref('data-persistence-62016/' + child_snap.key).update({
              train_time: newTime,
          })
      })
  });
};

setInterval(train_min, 60000);

db.ref().child('data-persistence-62016').on('value', function (snapshot) {
  $('tbody').empty();

}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});



db.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var snap_val = snapshot.val(); //snapshot value
  //data from database
  var t_n = snap_val.trainName; //train name
  var t_d = snap_val.destination;//train destination
  var t_f = snap_val.Frequency;//train freq
  var t_t = snap_val.train_time;//train start time
  var diffTime = moment().diff(moment.unix(train_time), "minutes");
  console.log("diff of time " + diffTime);
  var timeRemainder = moment().diff(moment.unix(t_t), "minutes") % t_f;
  console.log(timeRemainder);
  var min = t_f - timeRemainder;
  console.log(min);
  var nextTrainArrival = moment().add(min, "m").format("hh:mm A");
  // Test for correct times and info
  console.log("min" + min);
  console.log("nxttrainarr" + nextTrainArrival);
  console.log("now" + moment().format("hh:mm A"));
  console.log("next train" + nextTrainArrival);
  console.log(moment().format("X"));

  // Append train info to table on page
  $("#train_details").append("<tr>" + "<td>" + t_n + "</td>" + "<td>" + t_d + "</td>" +
    "<td>" + t_f + "</td>" + "<td>" + nextTrainArrival + "</td>" + "<td>" + min + "</td>" + "</tr>");
  // Handle the errors

}), function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
}
});
// set variable for database to firebase
// var database = firebase.database();


// function to write added data to firebase
// function writeAddedData(trainName, destination, trainTime, frequency, ) {
  // firebase.database().ref('data-persistence-62016/' + newTrain).set({
    // trainName: trainName,
    // destination: destination,
    // trainTime : 0000,
    // frequency : 0000,
    // minutesAway : 0000,


// click button changes what is stored in firebase
// $ ("#submit").on("click", function (){

//   // Get inputs from information from form
//   trainName = $("#formGroupExampleInput_name").val(),trim();
//   destination = $("#fformGroupExampleInput2_destination").val(),trim();
//   trainTime = $("#formGroupExampleInput2_time").val(),trim();
//   frequency = $("#formGroupExampleInput2_frequency").val(),trim();

// // Change what is saved in firebase
// database.ref().set({
//   trainName: trainName,
//   destination: destination,
//   trainTime : 0000,
//   frequency : 0000,
//   minutesAway : 0000,


// })


// // This is adding a click event to the submitButton to add additional trains using the addEventListener.
// // when the submit button is clicked it changes the HTML document.

// document.getElementById("#submit").addEventListener("click", displayTrain);

// function displayTrain() {
// document.getElementById("newTrain").innerHTML = newTrain();
// }

// });





// -------------DIFFERENT IDEAS/OPTIONS  NOT SURE??????---------------


  // var formGroupExampleInput_name = $(" "). val() .trim ();
  // $("#train name").val("");

  // var formGroupExampleInput2_destination = $(" "). val() .trim ();
  // $("#destination").val("");

  // var formGroupExampleInput2_time = $(" "). val() .trim ();
  // $("#frequency").val("");

  // var formGroupExampleInput2_frequency = $(" "). val() .trim ();
  // $("#next arrival").val("");

  // for(var i=0;i<rightAns.length;i++){
  //   if(rightAns[i] === userAns[i]){
  //     correctAns++;
  //     // alert: ("You Got All Ten Questions Correct, You Win!");



