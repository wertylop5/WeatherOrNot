const config = {
    apiKey: "AIzaSyACgEdPWnk8lOheaJIdTnH2JQ-4W7p9lZY",
    authDomain: "weatherornot-7c7eb.firebaseapp.com",
    databaseURL: "https://weatherornot-7c7eb.firebaseio.com",
    projectId: "weatherornot-7c7eb",
    storageBucket: "weatherornot-7c7eb.appspot.com",
    messagingSenderId: "834723964229"
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
