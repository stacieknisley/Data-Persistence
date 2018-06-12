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

var name = "";
var destination = "";
var time = "";
var frequency = "";

$("#submit").on("click", function (){
  name = $("#name").val().trim();
  destination = $("#destination").val().trim();
  time = $("#time").val().trim();
  frequency = $("#frequency").val().trim();

  firebase.database().ref().push({
    trainName: name,
    destination: destination,
    time: time,
    frequency: frequency,
    dateAdded:firebase.database.ServerValue.TIMESTAMP
  })

})

firebase.database().ref().on("child_added",function(snapshot){
$("#newTrain").append("<p>"+snapshot.val().train+"</p>");
("#newDestination").append("<p>"+snapshot.val().destination+"</p>");
("#newTime").append("<p>"+snapshot.val().time+"</p>");
("#newFrequency").append("<p>"+snapshot.val().frequency+"</p>");
("#newMinutesAway").append("<p>"+snapshot.val().minutes_away+"</p>");
("#newhr").append("<hr>)");

})

firebase.database().ref().orderByChild("dateAdded").limitToLast(1).on("child_added",function(snapshot){
  $("#newTrain").html(snapshot.val().name);
  $("#newDestination").html(snapshot.val().destination);
  $("#newTime").html(snapshot.val().time);
  $("#newFrequency").html(snapshot.val().frequency);
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



