import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      location: {
        lat: ``,
        lng: ``,
      },
      lighting: 1,
      popularity: 1,
      type: ``,
    };
  },
});
