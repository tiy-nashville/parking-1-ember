import Ember from 'ember';

export default Ember.Controller.extend({
  lat: 36.174465,
  lng: -86.767960,
  zoom: 12,
  emberparkspot1: [36.174455, -86.767890],

  geolocate() {
    const street = `2704+linmar+avenue`;
    const city = `Nashville`;
    const state = `TN`;

    console.log(street, city, state);
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${street},${city}+${state}&key=AIzaSyCZc2PblaL6nbaQ9ds9hKu-bS7wb3HflTc`)
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
    });
  }
});
