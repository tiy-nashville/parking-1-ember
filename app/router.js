import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function() {
  this.route('home', {path:`/`});
  this.route('login');
  this.route('sign-up');
  this.route('submit');
});

export default Router;
