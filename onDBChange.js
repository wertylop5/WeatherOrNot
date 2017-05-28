const config = {
    apiKey: "AIzaSyACgEdPWnk8lOheaJIdTnH2JQ-4W7p9lZY",
    authDomain: "weatherornot-7c7eb.firebaseapp.com",
    databaseURL: "https://weatherornot-7c7eb.firebaseio.com",
    projectId: "weatherornot-7c7eb",
    storageBucket: "weatherornot-7c7eb.appspot.com",
    messagingSenderId: "834723964229"
};
firebase.initializeApp(config);

const dbObject = firebase.database().ref();

var getDangerZones = function(lat, lng) {
    var avg = 0.0;
    var counter = 0;
    dbObject.on('value', function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
	    // var childKey = childSnapshot.key;
	    var childData = childSnapshot.val();
	    var latitude = childData['latit'];
	    var longitude = childData['longit'];
	    var comment = childData['comment'];
	    var dangerlevel = childData['dangerlevel'];

	    console.log(Math.round(parseFloat(lat) * 100));
	    console.log(Math.round(parseFloat(latitude) * 100));
	    if (Math.abs(Math.round(parseFloat(lat) * 100) - Math.round(parseFloat(latitude) * 100)) < 2 && Math.abs(Math.round(parseFloat(lng) * 100) - Math.round(parseFloat(longitude) * 100)) < 2) {
		avg = avg + parseInt(dangerlevel);
		counter++;
	    }
	    // console.log(comment);
	});
    });
    if (counter === 0) {
	return -1;
    } else {
	return avg / counter;
    }
}

function writeNewPost(latitude, longitude, dangerlevel, comment) {
    console.log(latitude);
    console.log(longitude);
    console.log(comment);
    // A post entry.
    var postData = {
	latit: latitude,
	longit: longitude,
	dangerlevel: dangerlevel,
	comment: comment
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[newPostKey] = postData;

    return firebase.database().ref().update(updates);
}
