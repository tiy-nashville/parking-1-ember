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
  geofindmeran: false,

  address: {
    street: ``,
    city: ``,
    state: ``,
    zip: ``,
  },

  type: ``,
  lighting: ``,
  rating: ``,

  geolocate(address) {
    Ember.set(this, `address`, address);
    var rstreet = address.street.split(' ').join('+');
    var rcity = address.city.split(' ').join('+');
    var rstate = address.state.split(' ').join('+');

    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${rstreet},${rcity}+${rstate}&key=${config.googleLeaflet.apiKey}`)
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
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
  navigator.geolocation.getCurrentPosition((position) => {
    Ember.set(this, `lng`, position.coords.longitude);
    Ember.set(this, `lat`, position.coords.latitude);
    Ember.set(this, `emberspot`, [position.coords.latitude, position.coords.longitude]);
  });
  Ember.set(this, `geofindmeran`, true);
  },

  saveSpot() {
    const lighting = this.get(`lighting`);
    const popularity = this.get(`rating`);
    const type = this.get(`type`);
    const lat = this.get(`lat`);
    const lng = this.get(`lng`);
    const location = { lat, lng };
    const spot = this.store.createRecord(`spot`, { lighting, popularity, type, location });

    spot.save();
  },

  saveAddress() {
    const lat = this.get(`lat`);
    const lng = this.get(`lng`);
    console.log(lat, lng);
  },

  deleteRecord(spot) {
    spot.destroyRecord();
  }
});
