var app = function(_, $) {

  var lazyLoader;
  var textConstants = {
    UNDEFINED: 'Não definido',
    FREE: 'Grátis'
  };

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
      query = query.toLowerCase().replace(/ /g, '');
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
      str = '' + str;
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
      return new Date(parts[2], parseInt(parts[1]) - 1, parts[0]);
    },

    formatDate: function(date) {
      var d = date.getDate() + '';
      var m = (date.getMonth() + 1) + '';
      d = d.length > 1 ? d : '0' + d;
      m = m.length > 1 ? m : '0' + m;
      return d + '/' + m;
    },

    currentYear: function() {
      return (new Date()).getFullYear();
    }
  };

  /*
    event class
  */
  var Evt = function(data) {
    this.init(data);
  };

  Evt.prototype.getYear = function() {
    return this.dates[0].getFullYear();
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
    if (!str) {
      this.formattedPrices = textConstants.FREE;
      return;
    }
    this.formattedPrices = _.map(util.split(str), function(item) {
      if (isNaN(parseInt(item))) {
        return textConstants.UNDEFINED;
      }
      return item === '0' ? textConstants.FREE : util.formatCurrency(item);
    }).join(' - ');
  };

  Evt.prototype.parseTags = function(str) {
    this.tagArray = str && str.length ? util.split(str) : [];
  };

  Evt.prototype.init = function(data) {
    _.extend(this, data);
    this.parseDates(data.date);
    this.parsePrices(data.price);
    this.parseTags(data.tags);
  };

  /*
    model
  */
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

    getYears: function() {
      var currentYear = util.currentYear();
      return _.sortBy(_.uniq(_.map(this.evts, function(item) {
        return item.getYear();
      })), function(item) {
        return -item; // descending sort
      });
    },

    getFilteredEvts: function() {
      return this.filteredEvts;
    },

    filterEvts: function(filter) {
      var query = filter.query;
      var year = filter.year;
      this.filteredEvts = _.filter(this.evts, function(evt) {
        return evt.getYear() === year && (util.matchSearch(query, evt.name) || _.any(evt.tagArray, function(tag) {
          return util.matchSearch(query, tag);
        }));
      });
    }
  };

  /*
    views
  */
  var evtsView = {
    templates: {
      evt:   _.template($('[data-js="template-evt"]').html()),
      empty: _.template($('[data-js="template-no-results"]').html()),
      error: _.template($('[data-js="template-data-error"]').html())
    },

    $els: {
      list:   $('[data-js="evt-list"]'),
      search: $('[data-js="evt-search"]')
    },

    init: function(evts) {
      this.bindEvents();
    },

    bindEvents: function() {
      this.$els.search.on('keyup paste', _.debounce(_.bind(this.search, this), 100));
    },

    getQuery: function() {
      return this.$els.search.val();
    },

    search: function() {
      controller.filterEvts();
    },

    render: function() {
      var evts = controller.getEvts();
      this.$els.list.hide();
      if (evts.length) {
        this.$els.list.html(_.reduce(evts, _.bind(function(acc, evt) {
          return acc += this.templates.evt({evt: evt});
        }, this), ''));
        lazyLoader && lazyLoader._destroy();
        lazyLoader = new Layzr();
      } else {
        this.$els.list.html(this.templates.empty());
      }
      this.$els.list.fadeIn(100);
    },

    renderError: function() {
      this.$els.list.html(this.templates.error());
    }
  };

  var yearsView = {
    templates: {
      year: _.template($('[data-js="template-year"]').html())
    },

    $els: {
      list: $('[data-js="year-list"]')
    },

    init: function(evts) {
      this.year = util.currentYear()
      this.render();
    },

    selectYear: function(e) {
      this.year = $(e.currentTarget).data('year');
      this.render();
      controller.filterEvts();
    },

    getYear: function() {
      return this.year;
    },

    render: function() {
      var selectedYear = this.getYear();
      var years = _.map(controller.getYears(), _.bind(function(item) {
        return {
          year: item,
          selected: item === selectedYear
        };
      }, this));
      this.$els.list.hide();
      this.$els.list.html(_.reduce(years, _.bind(function(acc, item) {
        return acc += this.templates.year(item);
      }, this), ''));
      this.$els.list.fadeIn();
      this.$els.list.find('[data-js="year-button"]').on('click', _.bind(this.selectYear, this));
    }
  };

  /*
    controller
  */
  var controller = {
    init: function() {
      model.init()
        .done(_.bind(function() {
          yearsView.init();
          evtsView.init();
          this.filterEvts(true); // apply initial filter by year
        }, this))
        .fail(function() {
          evtsView.renderError();
        })
      ;
    },

    getEvts: function() {
      return model.getFilteredEvts();
    },

    getYears: function() {
      return model.getYears();
    },

    filterEvts: function(forceRender) {
      var filter = {
        query: evtsView.getQuery(),
        year: yearsView.getYear()
      };

      var before = model.getFilteredEvts();
      model.filterEvts(filter);
      var after = model.getFilteredEvts();

      var didChange = !util.compareArrays(before, after);
      if (forceRender || didChange) {
        evtsView.render();
      }
    }
  };

  controller.init();
};

$(function() {
  app(_, Zepto);
});
