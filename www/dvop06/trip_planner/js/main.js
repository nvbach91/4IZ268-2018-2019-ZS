// GLOBALS
var map = null;
var placesMarkers = [];
var tripPlaces = {};
var tripMarkers = {};
var currentlyOpenInfoWindow = null;
var currentlyOpenPlace = null;

// Functions
function initMap() {

	var prague = { lat: 50.0755, lng: 14.4378 };

	map = new google.maps.Map(document.getElementById('map'), {
		center: prague,
		zoom: 15
	});

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			map.setCenter(pos);
		}, function () {
			handleLocationError(true, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, map.getCenter());
	}

	map.addListener("click", function (e, d) {
		var latLng = e.latLng;
		var lat = latLng.lat(),
			lng = latLng.lng();

		// Remove markers
		removePlacesMarkers()

		// Add marker to selected coordinates
		// Todo: Check if e contains placeId and eventually fetch place info
		createPlacesMarker(map, {
			name: "Lat: " + lat + "; Lng: " + lng,
			geometry: { location: latLng }
		})

		// Add markers to places of interest
		var service = new google.maps.places.PlacesService(map);
		service.nearbySearch({
			location: {
				lat: lat,
				lng: lng
			},
			radius: 200,
		}, function (results, status) {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				var i = 0;
				for (i; i < results.length; i++) {
					createPlacesMarker(map, results[i]);
				}
			}
		});
	})
}


function removePlacesMarkers() {
	var i;
	var origListLen = placesMarkers.length;
	for (i = origListLen - 1; i >= 0; i--) {
		// Remove from map
		placesMarkers[i].setMap(null);
		// Remove from list
		placesMarkers.splice(i, 1);
	}
}


function createPlacesMarker(map, place) {
	var placeLoc = place.geometry.location;

	// Create marker and put on map
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});
	var infowindow = new google.maps.InfoWindow();

	google.maps.event.addListener(marker, 'click', function () {
		if (currentlyOpenInfoWindow !== null)
			currentlyOpenInfoWindow.close();
		infowindow.setContent(renderInfoWindowContent(place));
		infowindow.open(map, this);
		currentlyOpenInfoWindow = infowindow;
	});

	// Append marker to places markers list
	placesMarkers.push(marker);
}

function renderInfoWindowContent(place) {
	var el = document.createElement("div");

	// Content
	var content = document.createElement("div");

	try {
		content.innerHTML = "" +
			"<h3>" + place.name + "</h3>"
			+ "<div class=" + "photos" + ">" + "\n" + "<div class=" + "photo" + ">" + "<img src=" + place.photos[0].getUrl() + "></img>"
			// + "\n" + "<div class=" + "photo" + ">" + "<img src=" + place.photos[1].getUrl() + "></img>"
			// + "\n" + "<div class=" + "photo" + ">" + "<img src=" + place.photos[2].getUrl() + "></img>"
			// + "\n" + "<div class=" + "photo" + ">" + "<img src=" + place.photos[3].getUrl() + "></img>"
			+ "</div>"
			;
	} catch (error) {
		//place has no photos available
		content.innerHTML = "" +
			"<h3>" + place.name + "</h3>";
	}


	// Button
	var btn = document.createElement("button");
	btn.classList.add("Btn");
	btn.classList.add("green");
	btn.textContent = "Add to trip.";
	btn.onclick = function () { addPlaceToTrip(place); };

	// Build and return
	el.appendChild(content);
	el.appendChild(btn);
	return el;
}

function generateID() {
	return Math.random().toString(36).substring(7);
}


function addPlaceToTrip(place) {
	// Generate ID
	var id = generateID();
	// copy place to work with
	var placeCopy = Object.assign({}, place);
	// Set place ID attribute
	placeCopy.id = id;
	// Add to tripPlaces and display
	tripPlaces[id] = placeCopy;
	refreshTripPlacesList();

	// Also create a marker to map
	createTripMarker(map, placeCopy);
}


function refreshTripPlacesList() {
	// Remove everything first
	var wrapper = document.getElementById("tripPlacesList");
	wrapper.innerHTML = "";

	// Create list
	var ol = document.createElement("ol");
	ol.setAttribute('class', "placesList");

	// Display each trip place
	for (id in tripPlaces) {
		var place = tripPlaces[id];

		// Create list item
		var li = document.createElement("li");
		li.setAttribute('class', "place")
		li.innerHTML = place.name;

		// Create remove button
		var btn = document.createElement("button");
		btn.setAttribute('class', "Btn remove right clearfix");
		btn.setAttribute('type', "button");
		btn.textContent = "remove";
		// Remove button click listener
		btn.onclick = function () {
			// Get ID
			var placeId = this.id;
			// Remove marker on map
			removeTripMarker(placeId);
			// Remove place from trip places
			delete tripPlaces[placeId];
			// Refresh UI
			refreshTripPlacesList();
		}.bind(place);

		// Render
		ol.appendChild(li);
		li.appendChild(btn)
	}
	wrapper.appendChild(ol);
};


function createTripMarker(map, place) {
	var placeLoc = place.geometry.location;

	// Create marker and put on map
	var image = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location,
		icon: image
	});
	var infowindow = new google.maps.InfoWindow();

	google.maps.event.addListener(marker, 'click', function () {
		if (currentlyOpenInfoWindow !== null)
			currentlyOpenInfoWindow.close();
		infowindow.setContent(renderInfoWindowContent(place));
		infowindow.open(map, this);
		currentlyOpenInfoWindow = infowindow;
	});

	// Append marker to places markers list
	tripMarkers[place.id] = marker;
}


function removeTripMarker(id) {
	tripMarkers[id].setMap(null);
	delete tripMarkers[id];
}


function removeTripMarkers() {
	for (id in tripMarkers) {
		tripMarkers[id].setMap(null);
		delete tripMarkers[id];
	}
}


function save() {
	var saveButton = document.getElementById("btnSave");

	// Do nothing if save button is disabled;
	if (saveButton.disabled === true)
		return;

	// Save!
	var data = JSON.stringify(tripPlaces);
	var ls = LocalStore.getInstance();
	ls.save("places.data", data).then(function () {
		console.log("SAVED to local storage");
	})
}

function load() {
	var loadButton = document.getElementById("btnLoad");
	// Load JSON
	var ls = LocalStore.getInstance();
	ls.load("places.data").then(function (data) {
		// Remove current markers
		removeTripMarkers();
		// Store data
		tripPlaces = JSON.parse(data);
		if (tripPlaces == null) {
			tripPlaces = {};
		}
		// For each tripPlace create a marker on map
		for (id in tripPlaces)
			createTripMarker(map, tripPlaces[id]);
		// Refresh trip places
		refreshTripPlacesList();
	})
}


function main() {
	setElementDisabled("btnSave", true);
	setElementDisabled("btnLoad", true);
	var ls = LocalStore.getInstance();
	ls.init().then(function () {
		load();
		setElementDisabled("btnSave", false);
		setElementDisabled("btnLoad", false);
	})
	initMap();
}

function googleSignIn() {
	var googleDriveStore = GoogleDriveStore.getInstance();
	googleDriveStore.signIn();
}

function googleSignOut() {
	var googleDriveStore = GoogleDriveStore.getInstance();
	googleDriveStore.signOut();
}

function saveDrive() {
	var saveButton = document.getElementById("driveSave");

	// Do nothing if save button is disabled;
	if (saveButton.disabled === true)
		return;

	// Save!
	var data = JSON.stringify(tripPlaces);
	var store = GoogleDriveStore.getInstance();
	store.save("places.data", data).then(function () {
		console.log("SAVED to google drive storage");
	})
}

function loadDrive() {
	var loadButton = document.getElementById("driveLoad");
	// Load JSON
	var store = GoogleDriveStore.getInstance();
	store.load("places.data").then(function (data) {
		// Remove current markers
		removeTripMarkers();
		// Store data
		tripPlaces = JSON.parse(data);
		if (tripPlaces == null) {
			tripPlaces = {};
		}
		// For each tripPlace create a marker on map
		for (id in tripPlaces)
			createTripMarker(map, tripPlaces[id]);
		// Refresh trip places
		refreshTripPlacesList();
	})
}


function setElementDisabled(id, isDisabled) {
	var el = document.getElementById(id);
	el.disabled = isDisabled;
}

function onGoogleApiLoad() {
	googleDriveStore = GoogleDriveStore.getInstance();
	googleDriveStore.init();
	googleDriveStore.onSigninStatusUpdate(function (isSignedIn) {
		if (isSignedIn) {
			setElementDisabled("signOut", false);
			setElementDisabled("driveSave", false);
			setElementDisabled("driveLoad", false);
			setElementDisabled("signIn", true);
		} else {
			setElementDisabled("signOut", true);
			setElementDisabled("driveSave", true);
			setElementDisabled("driveLoad", true);
			setElementDisabled("signIn", false);
		}
	});
}

var LocalStore = function () {
}

LocalStore.filesListKey = "__filesList";
LocalStore.filenamePrefix = "_ls_";



LocalStore.prototype.init = function () {
	// Return a promise that LocalStore will be initialized
	return new Promise(
		function (resolve, reject) {
			this.storage = window.localStorage;
			this.initialized = true;
			resolve();
		}.bind(this)
	);
}


LocalStore.getInstance = function () {
	if (!LocalStore.instance)
		LocalStore.instance = new LocalStore();
	return LocalStore.instance;
}


LocalStore.prototype.assertInitialized = function () {
	console.assert(this.initialized, "LocalStore instance not initialized.")
}


LocalStore.prototype.getFilesList = function () {
	// Assert initialized
	this.assertInitialized();

	var filesListData,
		filesList;

	// Load file list
	filesListData = this.storage.getItem(LocalStore.filesListKey);
	if (!filesListData)
		return [];

	filesList = filesListData.split(",");
	return filesList;
}


LocalStore.prototype.setFilesList = function (filesList) {
	// Assert initialized
	this.assertInitialized();
	// Set value
	this.storage.setItem(LocalStore.filesListKey, filesList.join(","));
}


LocalStore.prototype.isFileInFilesList = function (filename) {
	// Assert initialized
	this.assertInitialized();

	var filesList = this.getFilesList();
	for (x in filesList)
		if (filesList[x] == filename)
			return true;
	return false;
}


LocalStore.prototype.addFileToFilesList = function (filename) {
	// Assert initialized
	this.assertInitialized();

	var filesList = this.getFilesList();

	// Do not add if already there;
	if (this.isFileInFilesList())
		return false;

	// Push to files list
	filesList.push(filename);
	this.setFilesList(filesList);
	return true;
}


LocalStore.prototype.removeFileFromFilesList = function (filename) {
	// Assert initialized
	this.assertInitialized();

	var filesList = this.getFilesList(),
		index = null;

	// Find index in array of the searched filename
	for (x in filesList) {
		if (filesList[x] == filename) {
			index = x;
			break;
		}
	}

	// File is not in files list, do nothing
	if (index === null)
		return false;

	// Splice and store the files list
	filesList.splice(index, 1);
	this.setFilesList(filesList);

	return true;
}


LocalStore.prototype.save = function (filename, data) {
	// Assert initialized
	this.assertInitialized();

	// Return a promise that data will be saved
	return new Promise(function (resolve, reject) {

		// Save to store
		var storeKey = LocalStore.filenamePrefix + filename;
		this.storage.setItem(
			LocalStore.filenamePrefix + filename,
			data);

		// Append to files list
		this.addFileToFilesList(
			filename);
		resolve();
	}.bind(this));
}


LocalStore.prototype.load = function (filename) {
	// Assert initialized
	this.assertInitialized();

	// Return a promise that data from the file will be loaded
	return new Promise(function (resolve) {
		resolve(
			this.storage.getItem(
				LocalStore.filenamePrefix + filename
			)
		);
	}.bind(this));

}


LocalStore.prototype.delete = function (filename) {
	// Assert initialized
	this.assertInitialized();

	// Return a promise that the file will be deleted
	return new Promise(function (resolve) {
		// Remove from store
		this.storage.removeItem(
			LocalStore.filenamePrefix + filename);

		// Remove from files list
		this.removeFileFromFilesList(
			filename);

		resolve();
	}.bind(this));
}


LocalStore.prototype.list = function () {
	// Assert initialized
	this.assertInitialized();

	// Return a promise that list of files will be returned
	return new Promise(function (resolve) {
		resolve(
			this.storage.getItem(
				LocalStore.filenamePrefix + filename
			)
		);
	});

}

var GoogleDriveStore = function () {
}

GoogleDriveStore.CLIENT_ID = '311660390252-sk64cfms5qnf8qecr3njfcr9vj13mma4.apps.googleusercontent.com';
GoogleDriveStore.SCOPES = 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
GoogleDriveStore.instance = null;


GoogleDriveStore.prototype.init = function () {
	if (this.initCalled)
		throw "GoogleDriveStore instance can be initialized only once!";
	this.initCalled = true;

	// List of status update callbacks
	this.signinStatusUpdateCallbacks = [];
	this.updateSigninStatus = this.updateSigninStatus.bind(this);

	// Return a promise that GoogleDriveStore will be initialized
	return new Promise(
		function (resolve, reject) {
			gapi.load('client:auth2',
				function () {
					gapi.client.init({
						clientId: GoogleDriveStore.CLIENT_ID,
						scope: GoogleDriveStore.SCOPES
					}).then(
						function () {
							// Listen for sign-in state changes.
							gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

							// Handle the initial sign-in state.
							this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

							// Resolve the promise
							resolve();
						}.bind(this)
					);
				}.bind(this)
			);
		}.bind(this)
	);
}


GoogleDriveStore.getInstance = function () {
	if (!GoogleDriveStore.instance)
		GoogleDriveStore.instance = new GoogleDriveStore();
	return GoogleDriveStore.instance;
}


GoogleDriveStore.prototype.signIn = function () {
	gapi.auth2.getAuthInstance().signIn();
}

GoogleDriveStore.prototype.signOut = function () {
	gapi.auth2.getAuthInstance().signOut();
}


GoogleDriveStore.prototype.updateSigninStatus = function (isSignedIn) {
	for (x in this.signinStatusUpdateCallbacks)
		this.signinStatusUpdateCallbacks[x](isSignedIn);
}


GoogleDriveStore.prototype.onSigninStatusUpdate = function (callback) {
	this.signinStatusUpdateCallbacks.push(callback);
}


GoogleDriveStore.prototype.create = function (filename) {
	return gapi.client.request({
		path: "/drive/v3/files",
		method: "POST",
		body: {
			name: filename,
			fields: 'id',
			parents: ['appDataFolder'],
		}
	});
}

GoogleDriveStore.prototype.getFilesList = function () { }


GoogleDriveStore.prototype.create = function (filename) {
	return gapi.client.request({
		path: "/drive/v3/files",
		method: "POST",
		body: {
			name: filename,
			fields: 'id',
			parents: ['appDataFolder'],
		}
	});
}

function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

GoogleDriveStore.prototype.update = function (fileId, data) {
	return gapi.client.request({
		path: "/upload/drive/v3/files/" + fileId,
		method: "PATCH",
		body: data,
		params: {
			uploadType: 'media'
		}
	});
}


GoogleDriveStore.prototype.get = function (fileId) {
	return gapi.client.request({
		path: "/drive/v3/files/" + fileId + "?alt=media",
		params: {
			mimeType: "application/json"
		}
	});
}


GoogleDriveStore.prototype.search = function (filename) {
	return gapi.client.request({
		path: "/drive/v3/files",
		params: {
			q: "name = '" + filename + "'",
			spaces: "appDataFolder",
		}
	})
}


GoogleDriveStore.prototype.save = function (filename, data) {
	// Return a promise that data will be saved
	return new Promise(
		function (resolve, reject) {
			// For the sake of saving a file based on its name
			// we need to search for the filename first to get the file ID
			this.search(filename).then(
				function (resp) {
					// Create file if the list of files is empty
					if (resp.result.files.length === 0) {
						// Create file
						this.create(filename).then(
							function (resp) {
								var id = resp.result.id;
								// Update the contents of created file
								this.update(id, data).then(function () {
									resolve();
								})
							}.bind(this)
						);
					}

					// Update the first found file (stupid but simple)
					else {
						var id = resp.result.files[0].id;
						this.update(id, data).then(function (resp) {
							resolve();
						});
					}
				}.bind(this)
			);
		}.bind(this)
	);

}


GoogleDriveStore.prototype.load = function (filename) {
	// Return a promise that data will be loaded
	return new Promise(
		function (resolve, reject) {
			this.search(filename).then(
				function (resp) {
					// If such file doesn't exist, resolve with null
					if (resp.result.files.length === 0) {
						return resolve(null);
					}

					// Load contents of file
					else {
						var id = resp.result.files[0].id;
						this.get(id).then(
							function (resp) {
								resolve(resp.body);
							},
							function () {
								resolve(null);
							}
						);
					}
				}.bind(this)
			);
		}.bind(this)
	);
}



GoogleDriveStore.prototype.delete = function (filename) { }
