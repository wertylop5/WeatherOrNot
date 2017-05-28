const config = {
	apiKey: "AIzaSyBMitEISRAJbKP6lEjhAYyAsemK_2yhSLE",
	authDomain: "weatherornot-6545c.firebaseapp.com",
	databaseURL: "https://weatherornot-6545c.firebaseio.com",
	projectId: "weatherornot-6545c",
	storageBucket: "weatherornot-6545c.appspot.com",
	messagingSenderId: "881439506504"
  };
firebase.initializeApp(config);

const preObject = document.getElementById('test');
const dbObject = firebase.database().ref();

dbObject.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
	var childKey = childSnapshot.key;
	var childData = childSnapshot.val();
	console.log(childKey + ", " + childData);
    });
});


// Work in progress
function writeNewPost(latitude, longitude) {
    console.log(latitude);
    console.log(longitude);
    // A post entry.
    var postData = {
	latit: latitude,
	longit: longitude
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[newPostKey] = postData;

    return firebase.database().ref().update(updates);
}
