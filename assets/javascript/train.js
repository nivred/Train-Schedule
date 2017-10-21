// Initialize Firebase
var config = {
    apiKey: "AIzaSyBuqjikw34UfQDxiTe4PHNV-s3cUwzcd8w",
    authDomain: "trainschedule-92174.firebaseapp.com",
    databaseURL: "https://trainschedule-92174.firebaseio.com",
    projectId: "trainschedule-92174",
    storageBucket: "trainschedule-92174.appspot.com",
    messagingSenderId: "1044131917086"
  };

firebase.initializeApp(config);

var database =firebase.database();

$("#submit-btn").on("click", function(){
	event.preventDefault();
    console.log("I clicked Submit!");

    var train = $("#train-name").val().trim();
    console.log(train);

    var destination = $("#train-destination").val().trim();
    console.log(destination);

    var start = $("#train-start").val().trim();
    console.log(start);

    var frequency = $("#train-frequency").val().trim();
    console.log(frequency);

    var newTrain = {
    	train: train,
    	destination: destination,
    	start: start,
    	frequency: frequency
    };

    database.ref().push(newTrain);

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-start").val("");
    $("#train-frequency").val("");


})