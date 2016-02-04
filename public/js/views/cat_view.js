var app = app || {};

app.CatView = Backbone.View.extend({
  tagName: 'div',
  className: 'catContainer',

  template: _.template($('#catTemplate').html()),

  events: {
    //'click .clue': 'clueClick',
    //'click .tellme-btn': 'tellmeClick',
  },

  initialize: function (options) {
    this.model = options.model;
    this.vent = options.vent;
  },


  tellmeClick: function (e) {
    //var guess_el = this.$('.guess-text');
    //var answer = this.model.attributes['answer'];
    //guess_el.val(answer);
    e.preventDefault();
  },

  clueClick: function (e) {
    //var targ_el = $(e.currentTarget);
    //var controls_el = $(e.currentTarget).siblings('.clue-controls');
    //
    //if (targ_el.hasClass("active")) {
    //  targ_el.removeClass("active");
    //  controls_el.toggle(false);
    //} else {
    //  targ_el.addClass("active");
    //  controls_el.toggle(true);
    //  controls_el.find(".guess-text").focus();
    //}
    e.preventDefault();
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});

