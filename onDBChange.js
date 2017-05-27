(function() {
    // Initialize Firebase
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
    const dbObject = firebase.database().ref().child('text');

    dbObject.on('value', snap => {
	console.log(snap.val());
	// preObject.innerText = JSON.stringify(snap.val(), null, 3);
    });
}());
