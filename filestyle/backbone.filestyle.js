(function (factory) {

  // Check for AMD.
  if (typeof define === 'function' && define.amd)
    define(['underscore', 'backbone', 'bootstrap-filestyle'], factory);

  // Next for Node.js or CommonJS.
  else if (typeof exports === 'object')
    factory(require('underscore'), require('backbone'), require('bootstrap-filestyle'));

  // Finally, as a browser global.
  else
    factory(_, Backbone, BootstrapFilestyle);

}(function (_, Backbone, BootstrapFilestyle) {


  // Backbone.View Mixins
  // --------------------

  _.extend(Backbone.View.prototype, {

    filestyle: function(options) {
        if (!options || !options.selector)
            throw new Error('Required selector option missing');
        this.filestyleOptions = options;

        this.$(options.selector).filestyle(options);
        this.$('.group-span-filestyle').append('<a id="filestyleclear" class="btn btn-default hidden">Clear</a>');

        if (this.model && options.binding) {
            this.$('.bootstrap-filestyle input').val(this.model.get(options.binding));
            if (this.model.get(options.binding) && this.model.get(options.binding).length > 0)
                this.$('#filestyleclear').removeClass('hidden');
        }

        this.$(options.selector).on('change', _.bind(this.filestylePrerpareUpload,this));
        this.$('#filestyleclear').on('click', _.bind(this.filestyleClearFile,this));
    },

    filestylePrerpareUpload: function(event) {
        this.filestyleFiles = event.target.files;
        if (this.model && this.filestyleOptions.binding)
            this.model.set(this.filestyleOptions.binding, this.filestyleFiles[0].name);
        this.$('#filestyleclear').removeClass('hidden');
    },

    filestyleHasFiles: function() {
        return this.filestyleFiles;
    },

    filestyleClearFile: function(event) {
        if (this.model && this.filestyleOptions.binding)
            this.model.set(this.filestyleOptions.binding,'');

        this.$(this.filestyleOptions.selector).filestyle('clear');
        this.$('#filestyleclear').addClass('hidden');
    },

    filestyleUpload: function(options) {
        var data = new FormData();
        $.each(this.filestyleFiles, function(key, value) {
            data.append(key, value);
        });

        $.ajax({
            url: options.url,
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: options.success, // returns data, textStatus, jqXHR
            error: options.error // returns jqXHR, textStatus, errorThrown
        });
    },

  });

}));
