import Ember from 'ember';

export default Ember.Controller.extend({
  registerUser(attr) {
    const parker = this.store.createRecord(`parker`, attr);

    parker.save();
  },
});
