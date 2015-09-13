var App = function() {
  $.getJSON('./events.json', function(events) {
    var template = _.template($('#template-event').html());

    $('[data-js="event-list"]').html(_.reduce(events, function(memo, item) {
      return memo += template(item);
    }, ''));
  });
};

new App();
