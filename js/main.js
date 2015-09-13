var util = {
  replaceDiacritics: function(c) {
    'àáãâ'.indexOf(c)>-1 && (c = 'a');
    'èéê'.indexOf(c)>-1 && (c = 'e');
    'ìíî'.indexOf(c)>-1 && (c = 'i');
    'òóô'.indexOf(c)>-1 && (c = 'o');
    'ùúû'.indexOf(c)>-1 && (c = 'u');
    'ç'.indexOf(c)>-1 && (c = 'c');
    'ñ'.indexOf(c)>-1 && (c = 'n');
    return c;
  },

  matchChars: function(charQ, charWord) {
    return this.replaceDiacritics(charQ) === this.replaceDiacritics(charWord);
  },

  matchSearch: function(q, word) {

    q = q.toLowerCase();
    word = word.toLowerCase();
    for (var i in q) {
      var charQ = q[i];
      var didFindChar = false;
      for (var j in word) {
        var charWord = word[j];
        if (this.matchChars(charQ, charWord)) {
          didFindChar = true;
          break;
        }
      }
      if (!didFindChar) {
        return false;
      }
      word = word.substring(parseInt(j) + 1); // on next iteration, will look in the word hereinafter
    }
    return true;
  }
};

var app = function(_, $) {
  var eventTemplate = _.template($('[data-js="event-template"]').html());
  var emptyResultsTemplate = _.template($('[data-js="empty-search-template"]').html());

  var eventList = $('[data-js="event-list"]');
  var eventSearch = $('[data-js="event-search"]');

  var allEvents = [], filteredEvents = [];

  var getEvents = function(success, error) {
    $.getJSON('./events.json', success, error);
  };

  var initEvents = function(events) {
    allEvents = filteredEvents = events;
  };

  var renderEvents = function(events) {
    eventList.html(_.reduce(events, function(memo, item) {
      return memo += eventTemplate(item);
    }, ''));
  };

  var renderEmptyResults = function() {
    eventList.html(emptyResultsTemplate());
  };

  var initAndRenderEvents = function(events) {
    initEvents(events);
    renderEvents(events);
  };

  var filterEvents = function() {
    var q = eventSearch.val();
    filteredEvents = _.filter(allEvents, function(item) {
      return util.matchSearch(q, item.name);
    });

    if (filteredEvents.length) {
      renderEvents(filteredEvents);
    } else {
      renderEmptyResults();
    }
  };

  eventSearch.on('keyup', _.debounce(filterEvents, 200));

  getEvents(initAndRenderEvents);
};

$(function() { app(_, Zepto); });
