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
        this.removeCurrentView();
        this._currentView = view;
        this.$el.append(this._currentView.el);
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

    removeCurrentView: function() {
        if (this._currentView) {
            this._currentView.remove();
            delete this._currentView;
        }
    },

    removeSubViews: function() {
        _.each(this._subViews, function(subView, i){
            subView.remove();
            delete this._subViews[i];
        }, this);
    },
  });

    Backbone.View.prototype.remove = _.wrap(Backbone.View.prototype.remove, function(oldRemove) {
        this.removeSubViews();
        this.removeCurrentView();
        if (oldRemove) oldRemove.call(this);
    });

}));
