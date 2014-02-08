(function (factory) {

  // Check for AMD.
  if (typeof define === 'function' && define.amd)
    define(['underscore', 'backbone'], factory);

  // Next for Node.js or CommonJS.
  else if (typeof exports === 'object')
    factory(require('underscore'), require('backbone'));

  // Finally, as a browser global.
  else
    factory(_, Backbone);

}(function (_, Backbone) {


  // Backbone.View Mixins
  // --------------------

  _.extend(Backbone.View.prototype, {

    setView: function(view) {
        this.removeSubViews();
        this.insertView(view, this.$el);
    },

    insertView: function(view, location) {
        if (!this._subViews)
            this._subViews = [view];
        else
            this._subViews.push(view);

        if (_.isObject(location))
            location.append(view.el);
        else if (_.isString(location))
            this.$(location).append(view.el);
        else
            this.$el.append(view.el);
    },

    removeSubViews: function() {
        _.each(this._subViews, function(subView, i){
            subView.remove();
            delete this._subViews[i];
        }, this);
    },

    serializeForm: function(selector) {
        var result = {};
        var fields = this.$(selector).serializeArray();
        _.each(fields, function(field) {
            if (result[field.name]) {
                if (!result[field.name].push) {
                    result[field.name] = [result[field.name]];
                }
                result[field.name].push(field.value || '');
            } else {
                result[field.name] = field.value || '';
            }
        });
        return result;
    },

  });

    Backbone.View.prototype.remove = _.wrap(Backbone.View.prototype.remove, function(oldRemove) {
        this.removeSubViews();
        if (oldRemove) oldRemove.call(this);
    });

}));
