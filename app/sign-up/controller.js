import Ember from 'ember';

export default Ember.Controller.extend({
  registerUser(attr) {
    const user = this.store.createRecord(`user`, attr);

    user.save();
  },
});
