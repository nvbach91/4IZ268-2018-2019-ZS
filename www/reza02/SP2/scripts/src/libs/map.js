;(function ($) {

  'use strict';

  var map = {

    defaults: {

      mapStyleJson: "./datas/map-style.json",
      markerOptions: {
        url: './images/marker.png',
        popupTopOffset: -25,
      },

      mapSel: '#map',
      showMapBtn: '#showMapBtn',
      mapZoom: 11,
      mobileMapZoom: 7,

    },
    settings: null,

    // map
    map: null,
    mapStyles: null,
    marker: null,
    infoWindow: null, //custom popup if marker

    // store the start and final destinations
    coords: null,
    actualCoords: null,
    // geolocation
    geolocationAllowed: false,
    distance: null,
    duration: null,
    routeCalculated: false,
    popupTitle: '',

    // services for navigation
    directionsService: null,
    directionsDisplay: null,

    // search places service
    placesService: null,
    searchedCoords: null,

    // searched places
    // optimalized
    activePlaceObj: null,
    places: new Map(),
    favoritePlaces: new Map(),

    // caching variablesd
    gMapsLink: $('#showInGoogleMaps'),
    resultsContainer: $('#resultsContainer'),

    init: function(options) {

      var self = map;

      // set settings
      self.settings = $.extend(self.defaults, options);

      self.regOnNavigate();
      self.regOninput();

      // get favorites places from localStorage
      self.setFavoritesPlaces();

      // reg add place into favorite
      self.regToggleSetPlaceAsAFavorite();

      // reg set active place
      self.regPlaceOnClick();

      $.getJSON( self.settings.mapStyleJson, function(mapStyles) {
        if ( mapStyles ) {
          //get JSON array
          self.mapStyles = mapStyles;
          self.initMap();
        }
      });

    },

    // https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    mobileCheck: function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    },

    initMap: function() {

      var self = map;

      // Direction Services for Navigation
      self.directionsService = new google.maps.DirectionsService();
      self.directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#6990E8",
          strokeOpacity: 0.75,
          strokeWeight: 5,
        },
      });

      self.map = new google.maps.Map($(self.settings.mapSel)[0], {
        center: {lat: 50.0835494 -0.1, lng: 14.4341414 + 0.03},
        zoom: (self.mobileCheck()) ? self.settings.mobileMapZoom : self.settings.mapZoom,
        styles: self.mapStyles,
        // controls
        disableDefaultUI: true,
        zoomControl: true,
      });

      // for search
      self.placesService = new google.maps.places.PlacesService(self.map);

      // Create destination marker
      self.showDefaultMarker();
      $('#showDefaultMarker').on('click', function(e) {
        self.activePlaceObj = null;
        self.showDefaultMarker();
      });

      // show my position
      self.showMyPosition();

    },

    showDefaultMarker: function() {
      var self = map;

      // show marker
      var dataCoords = JSON.parse($(self.settings.showMapBtn).attr('data-coords'));
      self.coords = new google.maps.LatLng(dataCoords.lat, dataCoords.lng);
      self.searchedCoords = self.coords;

      // popup title
      self.popupTitle = $(self.settings.showMapBtn).attr('data-title');

      self.marker = self.createMarker(self.coords);

      self.updateGoogleMapsLink();
    },

    updateGoogleMapsLink: function() {

      var self = map;

      if (!isNaN(self.searchedCoords.lat)) {
        self.searchedCoords = new google.maps.LatLng(self.searchedCoords.lat, self.searchedCoords.lng);
      }

      // update Google Maps link
      self.gMapsLink.attr('href', 'https://www.google.com/maps/dir/?api=1&destination=' + self.searchedCoords.lat() + ',' + self.searchedCoords.lng());

    },

    createMarker: function(coordinates) {

      var self = map;

      if (self.infoWindow) {
        self.infoWindow.close();
      }

      // remove actual marker and route;
      if (self.marker !== null) {
        self.marker.setMap(null);
        self.directionsDisplay.setMap(null);
      }

      var marker = new google.maps.Marker({
        position: coordinates,
        map: self.map,
        optimized: false,
        icon: self.settings.markerOptions.url,
      });

      // marker on click show popup
      google.maps.event.addListener(marker, 'click', function(event) {

        if (self.geolocationAllowed) {

          // close all popups
          if (self.infoWindow ) {
            self.infoWindow.close();
          }

          // init popup with offset
          self.infoWindow = new google.maps.InfoWindow({
            pixelOffset: new google.maps.Size(0, self.settings.markerOptions.popupTopOffset)
          });

          // create popup html
          var content = self.setContent();

          self.infoWindow.setPosition(coordinates);
          self.infoWindow.setContent(content);
          self.infoWindow.setZIndex(100);
          self.infoWindow.open(self.map);
        }

      });

      return marker;
    },

    // popup html
    setContent: function(index) {

      var self = map;

      var html = '';
      html +=  '<div class="popup">';
      html += '<h3 class="popup__title">' + self.popupTitle + '</h3>';

      // photos
      if (self.activePlaceObj && self.activePlaceObj.mainPhoto) {
        html += '<img class="popup__photo" height="100" src="' + self.activePlaceObj.mainPhoto + '" alt="' + self.popupTitle + '">'
      }

        if (self.routeCalculated) {
          html += '<ul class="popup__list list list--no-style space-m-t-10">';
            html += '<li class="list__item"><span class="text--medium">Vzdálenost:</span> ' + self.distance + '</li>';
            html += '<li class="list__item"><span class="text--medium">Doba trvání:</span> ' + self.duration + '</li>';
          html += '</ul>';
        }

      html += '</div>';

      return html;
    },

    showMyPosition: function() {
      var self = map;

      // Try HTML5 geolocation.
      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {

          self.geolocationAllowed = true;

          var infoWindow = new google.maps.InfoWindow;

          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          self.actualCoords = new google.maps.LatLng(pos.lat, pos.lng);

          infoWindow.setPosition(pos);
          infoWindow.setContent('Tvá pozice');
          infoWindow.open(self.map);

        }, function() {
          self.handleLocationError(true);
        });
      }
      else {
        // Browser doesn't support Geolocation
        self.handleLocationError(false);
      }
    },

    handleLocationError: function(browserHasGeolocation) {
      var self = map;

      // hide button for navigation
      $('.btn--navigate').addClass('disable');
      self.geolocationAllowed = false;
      alert('Geolokace není povolena, nelze navigovat z vaší pozice.');
    },

    regOnNavigate: function() {

      var self = map;

      $('.btn--navigate').on('click', function(e) {
        if (self.geolocationAllowed) {
          self.directionsDisplay.setMap(self.map);
          self.calculateAndDisplayRoute(self.directionsService, self.directionsDisplay, $(this).attr('data-mode'));
        }
      });
    },

    calculateAndDisplayRoute: function(directionsService, directionsDisplay, mode) {

      var self = map;

      // deafult searched coords
      self.coords = (self.searchedCoords) ? self.searchedCoords : self.coords;

      directionsService.route({
        origin: self.actualCoords,
        destination: self.coords,
        waypoints: null,
        optimizeWaypoints: true,
        travelMode: mode,
      },
      function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          // console.log(response);

          self.distance = response.routes[0].legs[0].distance.text;
          self.duration = response.routes[0].legs[0].duration.text

          // console.log(self.distance);
          // console.log(self.duration);

          self.routeCalculated = true;
        } else {
          window.alert('Navigování selhalo: ' + status);
        }
      });
    },

    regOninput: function() {

      var self = map;
      var $input = $('#searchInput');

      $('#searchForm').on('submit', function(e) {

        e.preventDefault();

        var val = $input.val();

        if (val !== '') {
          self.search(val);
        }
        else {
          alert('Zadejte hledané místo');
        }

      });
    },

    // search
    search: function(query) {
      var self = map;

      var request = {
        query: query,
        fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry', 'types', 'id'],
      };

      self.placesService.findPlaceFromQuery(request, self.showQueryResult);
    },

    // show query result
    showQueryResult: function(results, status) {
      var self = map;
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {

          var place = results[i];
          // console.log(place);

          // only point_of_interest, establishment and premise ==> culture places
          if (jQuery.inArray('point_of_interest', place.types) !== -1 || jQuery.inArray('establishment', place.types) !== -1 || jQuery.inArray('premise', place.types) !== -1) {

            self.setActivePlace(place);

            // save only unique the place into map
            if (!self.places.has(place.id)) {

              // save the photo url
              if (place.photos) {
                place.mainPhoto = place.photos[0].getUrl();
              }

              self.places.set(place.id, place);

              // append place into results container
              self.appendPlaceElementIntoResutlsContainer(place.id, place.name, false);
            }

          }
          else {
            alert('Nejedná se o bod zájmu, zkus to znovu.')
          }
        }
      }
      else {
        alert('Hledané místo nenalezeno');
      }
    },

    appendPlaceElementIntoResutlsContainer: function(id, placeName, isActive) {

      var html = '';
      html += (isActive) ? '<div class="place active">' : '<div class="place">';
        html += '<button class="place__favorite" data-key="' + id + '"></button>';
        html += '<button class="place__title text--semi-small">' + placeName +'</button>';
      html += '</div>';

      $(self.resultsContainer).append(html);
    },

    regToggleSetPlaceAsAFavorite: function() {

      var self = map;

      $(self.resultsContainer).on('click', '.place__favorite', function(e) {

        var $place = $(this).closest('.place');
        var key = $(this).attr('data-key');

        if ($place.hasClass('active')) {

          // remove
          $place.removeClass('active');

          // remove from localStorage
          self.favoritePlaces.delete(key);
          localStorage.setItem('places', JSON.stringify(Array.from(self.favoritePlaces)));
        }
        else {

          // add
          $place.addClass('active');

          // save into localStorage
          self.favoritePlaces.set(key, self.places.get(key));
          localStorage.setItem('places', JSON.stringify(Array.from(self.favoritePlaces)));
        }

      });
    },

    setFavoritesPlaces: function() {

      var self = map;
      var favorites = new Map(JSON.parse(localStorage.getItem('places')));

      if (favorites !== null) {
        self.favoritePlaces = favorites; // tady byl bug
        self.places = new Map(favorites); // tady byl bug
      }

      for (var [key, place] of self.favoritePlaces) {
        self.appendPlaceElementIntoResutlsContainer(place.id, place.name, true);
      }

    },

    setActivePlace: function(place) {

      var self = map;

      // addActive place
      self.activePlaceObj = place;
      self.popupTitle = place.name;
      self.searchedCoords = place.geometry.location;
      self.marker = self.createMarker(self.searchedCoords);
      self.updateGoogleMapsLink();
    },

    regPlaceOnClick: function() {

      var self = map;

      $(self.resultsContainer).on('click', '.place__title', function(e) {
        var $place = $(this).closest('.place');
        var key = $place.find('.place__favorite').attr('data-key');
        var place = self.places.get(key);
        self.setActivePlace(place);
      });
    },

  };

  if ($('#map').length) {
    map.init();
  }

  // Show map on button click
  var $mapComponent = $('#mapComponent');
  $('#showMapBtn, #closeMapBtn').on('click', function(e) {
    $mapComponent.toggleClass('active');
  });

})(jQuery);