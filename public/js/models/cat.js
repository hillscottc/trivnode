var app = app || {};

app.Cat = Backbone.Model.extend({

  defaults: {
    category_id: "1",
    category_name: "Some category."
  }
  , initialize: function() {}

});

