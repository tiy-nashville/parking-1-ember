import Ember from 'ember';

export default Ember.Controller.extend({
  registerUser(attr) {
    const parker = this.store.createRecord(`parker`, attr);

    parker.save().then( () => {
      this.transitionToRoute(`login`);
    })
    .catch((error) => {
      window.alert('User already exists!')
      this.transitionToRoute(`home`);
    });
  },
});
