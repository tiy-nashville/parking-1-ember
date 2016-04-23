import Ember from 'ember';

export default Ember.Component.extend({
  tagName: ``,
  number: ``,
  street: ``,
  city: ``,
  state: ``,
  zip: ``,

  didReceiveAttrs() {
    const geocoder = new google.maps.Geocoder();
    const latlng = this.location;

    geocoder.geocode({'location': latlng}, (results) => {
      this.set(`number`, results[0].address_components[0].long_name);
      this.set(`street`, results[0].address_components[1].short_name);
      this.set(`city`, results[0].address_components[3].long_name);
      this.set(`state`, results[0].address_components[5].short_name);
      this.set(`zip`, results[0].address_components[7].long_name);
    });
  },
});
