import Ember from 'ember';
import config from 'nashville-free-park/config/environment';

function findPostCode(addressParts) {
  return addressParts.reduce((carry, curr) => {
    if (curr.types[0] === `postal_code`) {
      return curr.long_name;
    }

    return carry;
  }, null);
}

export default Ember.Controller.extend({
  lat: 36.174465,
  lng: -86.767960,
  zoom: 12,
  emberspot: [36.174455, -86.767890],
  geolocateran: false,

  address: {
    street: ``,
    city: ``,
    state: ``,
    zip: ``,
  },

  geolocate(address) {
    Ember.set(this, `address`, address);
    var rstreet = address.street.split(' ').join('+');
    var rcity = address.city.split(' ').join('+');
    var rstate = address.state.split(' ').join('+');

    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${rstreet},${rcity}+${rstate}&key=${config.googleLeaflet.apiKey}`)
    .then((r) => r.json())
    .then((data) => {
      const components = data.results[0].address_components;
      const { lat, lng } = data.results[0].geometry.location;
      this.set(`address.zip`, findPostCode(components));
      this.set(`emberspot`, [lat, lng]);
      this.set(`geolocateran`, true);
      this.set(`lat`, data.results[0].geometry.location.lat);
      this.set(`lng`, data.results[0].geometry.location.lng)
    });
  },

  geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}
});
