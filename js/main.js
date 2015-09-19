var app = function(_, $) {
  /*
    util
  */
  var util = {
    /*
      search
    */
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
    },

    /*
      arrays
    */
    compareArrays: function(a1, a2) {
      if (a1.length !== a2.length) {
        return false;
      }
      for (var i in a1) {
        if (a1[i] !== a2[i]) {
          return false;
        }
      }
      return true;
    },

    /*
      strings
    */
    split: function(str, c) {
      return str.replace(/ /g, '').split(c || ',');
    },

    /*
      currency
    */
    formatCurrency: function(value) {
      if (typeof value === 'string') {
        value = this._parseCurrency(value);
      }
      var groupSize = 3,
        groupSep = '.',
        re = '\\d(?=(\\d{' + (groupSize || 3) + '})+' + ')',
        num = value.toFixed();
      return 'R$' + num.replace(new RegExp(re, 'g'), '$&' + groupSep);
    },

    _parseCurrency: function(value) {
      return parseFloat(value.replace(/[^0-9]/g, ''));
    },

    /*
      date
    */
    dateFromStr: function(str) {
      var parts = this.split(str, '/');
      return new Date(parts[2], parseInt(parts[1]) + 1, parts[0]);
    },

    formatDate: function(date) {
      var d = date.getDate() + '';
      var m = (date.getMonth() - 1) + '';
      d = d.length > 1 ? d : '0' + d;
      m = m.length > 1 ? m : '0' + m;
      return d + '/' + m;
    }
  };

  /*
    model
  */
  var Evt = function(data) {
    this.init(data);
  };
  Evt.prototype.parseDates = function(str) {
    this.dates = _.map(util.split(str), function(each) {
      return util.dateFromStr(each);
    });
    this.formattedDates = _.map(this.dates, function(item) {
      return util.formatDate(item);
    }).join(' - ');
  };
  Evt.prototype.parsePrices = function(str) {
    this.formattedPrices = _.map(util.split(str), function(item) {
      return util.formatCurrency(item);
    }).join(' - ');
  };
  Evt.prototype.parseTags = function(str) {
    this.tagArray = util.split(str);
  };
  Evt.prototype.init = function(data) {
    _.extend(this, data);
    this.parseDates(data.date);
    this.parsePrices(data.price);
    this.parseTags(data.tags);
  };

  var model = {
    evts: [],
    filteredEvts: [],

    init: function() {
      return $.getJSON('./events.json')
        .done(_.bind(function(data) {
          var evts = _.map(data, function(evt) {
            return new Evt(evt);
          });
          this.evts = this.filteredEvts = _.sortBy(evts, function(item) {
            return -item.dates[0].valueOf();
          });
        }, this))
      ;
    },

    getFilteredEvts: function() {
      return this.filteredEvts;
    },

    filterEvts: function(query) {
      if (!query) {
        this.filteredEvts = this.evts;
        return;
      }
      this.filteredEvts = _.filter(this.evts, function(evt) {
        return util.matchSearch(query, evt.name) || _.any(evt.tagArray, function(tag) {
          return util.matchSearch(query, tag);
        });
      });
    }
  };

  /*
    views
  */
  var evtsView = {
    templates: {
      evt:   _.template($('[data-js="evt-template"]').html()),
      empty: _.template($('[data-js="no-results-template"]').html()),
      error: _.template($('[data-js="data-error-template"]').html())
    },

    $els: {
      list:   $('[data-js="evt-list"]'),
      search: $('[data-js="evt-search"]')
    },

    init: function(evts) {
      this.render();
      this.bindEvents();
    },

    bindEvents: function() {
      this.$els.search.on('keyup paste', _.debounce(_.bind(this.filterEvts, this), 100));
    },

    getQuery: function() {
      return this.$els.search.val();
    },

    filterEvts: function() {
      controller.filterEvts();
    },

    render: function() {
      var evts = controller.getEvts();
      if (evts.length) {
        this.$els.list.html(_.reduce(evts, _.bind(function(acc, evt) {
          return acc += this.templates.evt(evt);
        }, this), ''));
        new Layzr();
      } else {
        this.$els.list.html(this.templates.empty());
      }
    },

    renderError: function() {
      this.$els.list.html(this.templates.error());
    }
  };

  /*
    controller
  */
  var controller = {
    init: function() {
      model.init()
        .done(function() {
          evtsView.init();
        })
        .fail(function() {
          evtsView.renderError();
        })
      ;
    },

    getEvts: function() {
      return model.getFilteredEvts();
    },

    filterEvts: function() {
      var query = evtsView.getQuery();

      var before = model.getFilteredEvts();
      model.filterEvts(query);
      var after = model.getFilteredEvts();
      var didChange = !util.compareArrays(before, after);
      if (didChange) {
        evtsView.render();
      }
    }
  };

  controller.init();
};

$(function() {
  app(_, Zepto);
});
