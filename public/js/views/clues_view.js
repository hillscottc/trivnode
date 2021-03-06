var app = app || {};

app.CluesView = Backbone.View.extend({

  el: '#clues-view',

  initialize: function (initialClues) {
    this.collection = new app.Clues(initialClues);
    this.collection.fetch({reset: true});
    this.vent = _.extend({}, Backbone.Events);   // Event aggregator
    this.rights_count = 0;
    this.render();
    this.listenTo(this.collection, 'add', this.renderItem);
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.vent, 'guessRight', this.guessRight);
    console.log("CluesView initialized.");
  },

  events: {
    'input #searchText': 'search',
    'propertychange #searchText': 'search' // for IE
  },

  guessRight: function (targ) {
    var answer_tracking = $("#answer_tracking").val();
    console.log("answer tracking " + answer_tracking);

    if (answer_tracking == 'True') {
      var questionid = targ.model['attributes']['id'];
      console.log("u:" + $("#userid").val());
      // this.postUserLog(JSON.stringify({"userid": $("#userid").val(),
      //     "questionid": questionid}));
      // This works, but is being deprecated for the newer counts table
      //this.rights_count++;
      //$("#answer-count").text(this.rights_count);
    }
  },

  // postUserLog: function(data){
  //     var request = $.ajax({
  //         url: '/api/v1/user_log/',
  //         type: 'POST',
  //         contentType: 'application/json',
  //         data: data,
  //         dataType: 'html',
  //         processData: false});

  //     request.done(function() {
  //         console.log("Posted " + data + ", received " + request['statusText']);
  //     });
  // },

  search: function () {
    var letters = $("#searchText").val();
    var items = this.collection.search(letters);

    // Clear
    $("#clues-list").html("");

    // Render the result items
    items.each(function (item) {
      this.renderItem(item);
    }, this);

  },

  // Render each item in collection.
  render: function () {
    this.collection.each(function (item) {
      this.renderItem(item);
    }, this);
  },

  // Render an individual item
  renderItem: function (item) {
    var clueView = new app.ClueView({model: item, vent: this.vent});
    $("#clues-list").append(clueView.render().el);
  }
});

