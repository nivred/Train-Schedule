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

var database = firebase.database();

$("#submit-btn").on("click", function(event){
	event.preventDefault();

    var train = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var start = $("#train-start").val().trim();
    var frequency = $("#train-frequency").val().trim();
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
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    // Store everything into a variable.
    var train = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var start = childSnapshot.val().start;
    var frequency = childSnapshot.val().frequency;

    // Predictions
    var tFrequency = frequency;

    // Initial departure time
    var firstTime = start;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    $("#time").html(moment(currentTime).format("hh:mm a"));
    $("#information-table > tbody").append("<tr><td>" + train + "</td><td>" + destination +
        "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

