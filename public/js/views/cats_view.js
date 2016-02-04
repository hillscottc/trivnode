var app = app || {};

app.CatsView = Backbone.View.extend({

    el: '#cats-view',

    initialize: function(initialCats) {
        this.collection = new app.Cats(initialCats);
        this.collection.fetch({reset: true});
        this.vent = _.extend({}, Backbone.Events);   // Event aggregator
        this.render();
        this.listenTo(this.collection, 'add', this.renderItem);
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.vent, 'guessRight', this.guessRight);
        console.log("CatsView initialized.");
    },

    events: {
        'input #searchText' : 'search',
        'propertychange #searchText' : 'search' // for IE
    },

    search: function() {
        var letters = $("#searchText").val();
        var items = this.collection.search(letters);

        // Clear
        $("#cats-list").html("");

        // Render the result items
        items.each(function(item){
            this.renderItem( item );
        }, this );

    },

    // Render each item in collection.
    render: function() {
        this.collection.each(function(item) {
            this.renderItem( item );
        }, this );
    },

    // Render an individual item
    renderItem: function( item ) {
        var catView = new app.CatView({model: item, vent: this.vent});
        $("#cats-list").append( catView.render().el );
    }
});

