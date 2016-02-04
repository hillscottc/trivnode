var app = app || {};

app.Cats = Backbone.Collection.extend({

    model: app.Cat,

    url: '/api/cats',

    search: function(letters) {
        if(letters == "") return this;

        var pattern = new RegExp(letters,"gi");
        return _(this.filter(function(data) {
            return pattern.test(data.get("category_name"));
        }));
    }

});

