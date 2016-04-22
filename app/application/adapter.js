import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
  host: `https://nashville-free-park.herokuapp.com`,
  namespace: `api`,
});
