import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      location: ``,
      lighting: 1,
      popularity: 1,
      type: ``,
    };
  },
});
