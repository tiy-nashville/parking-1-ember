import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  location: attr(),
  lighting: attr(),
  popularity: attr(),
  type: attr(),
});
