(function (factory) {

  // Check for AMD.
  if (typeof define === 'function' && define.amd)
    define(['underscore', 'backbone', 'moment'], factory);

  // Next for Node.js or CommonJS.
  else if (typeof exports === 'object')
    factory(require('underscore'), require('backbone'), require('moment'));

  // Finally, as a browser global.
  else
    factory(_, Backbone, Moment);

}(function (_, Backbone, Moment) {


  // Backbone.Model Mixins
  // --------------------

  _.extend(Backbone.Model.prototype, {
    getAsDate: function(attribute) {
        return Moment(this.get(attribute));
    },

    dateAsString: function(attribute) {
        return this.formatDate(this.get(attribute));
    },

    formatDate: function(value) {
      if (_.isNull(value) || _.isUndefined(value) || (_.isString(value) && value.length < 8))
        return '';
      if (this.dateFormat)
        return Moment(value).format(this.dateFormat);
      else
        return Moment(value).format('MM/DD/YYYY');
    },

    setAsDate: function(attribute, value) {
        return this.set(attribute, this.stringToDate(value));
    },

    stringToDate: function(value) {
        return Moment(value);
    },

    now: function() {
        return Moment();
    }
  });
}));
