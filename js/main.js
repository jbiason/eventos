var util = {
  _replaceDiacritics: function(c) {
    'àáãâ'.indexOf(c)>-1 && (c = 'a');
     'èéê'.indexOf(c)>-1 && (c = 'e');
     'ìíî'.indexOf(c)>-1 && (c = 'i');
     'òóô'.indexOf(c)>-1 && (c = 'o');
     'ùúû'.indexOf(c)>-1 && (c = 'u');
       'ç'.indexOf(c)>-1 && (c = 'c');
       'ñ'.indexOf(c)>-1 && (c = 'n');
    return c;
  },

  _matchChars: function(charQuery, charWord) {
    return this._replaceDiacritics(charQuery) === this._replaceDiacritics(charWord);
  },

  matchSearch: function(query, word) {
    query = query.toLowerCase();
    word = word.toLowerCase();
    for (var i in query) {
      var charQuery = query[i];
      var didFindChar = false;
      for (var j in word) {
        var charWord = word[j];
        if (this._matchChars(charQuery, charWord)) {
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
  var model = {
    evts: [],
    filteredEvts: [],

    init: function() {
      return $.getJSON('./events.json')
        .done(_.bind(function(data) {
          this.evts = this.filteredEvts = data;
        }, this))
      ;
    },

    getEvts: function() {
      return this.evts;
    },

    getFilteredEvts: function() {
      return this.filteredEvts;
    },

    filterEvts: function(query) {
      this.filteredEvts = _.filter(this.evts, function(evt) {
        return util.matchSearch(query, evt.name);
      });
    }
  };

  var controller = {
    init: function() {
      model.init()
        .done(function(data) {
          view.init();
        })
      ;
    },

    getEvts: function() {
      return model.getEvts();
    },

    getFilteredEvts: function() {
      return model.getFilteredEvts();
    },

    filterEvts: function(query) {
      model.filterEvts(query);
      view.render();
    }
  };

  var view = {
    templates: {
      evt: _.template($('[data-js="event-template"]').html()),
      empty: _.template($('[data-js="empty-search-template"]').html())
    },

    $els: {
      list: $('[data-js="event-list"]'),
      search: $('[data-js="event-search"]')
    },

    init: function(evts) {
      this.render();
      this.bindEvents();
    },

    bindEvents: function() {
      this.$els.search.on('keyup', _.debounce(_.bind(this.filterEvts, this), 100));
    },

    filterEvts: function() {
      var query = this.$els.search.val();
      controller.filterEvts(query);
    },

    render: function() {
      var evts = controller.getFilteredEvts();
      if (evts.length) {
        this.$els.list.html(_.reduce(evts, _.bind(function(acc, evt) {
          return acc += this.templates.evt(evt);
        }, this), ''));
      } else {
        this.$els.list.html(this.templates.empty());
      }
    }
  };

  controller.init();
};

$(function() { app(_, Zepto); });
