import Loopback from 'ember-simple-auth-loopback/authenticators/loopback';

export default Loopback.extend({
  loginEndpoint: `https://nashville-free-park.herokuapp.com/api/parkers/login?include=user`,
});
