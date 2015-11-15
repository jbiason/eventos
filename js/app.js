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
    },

    isPast: function(date) {
      var today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);
      return date.valueOf() < today.valueOf();
    }
  };

  /*
    event class
  */
  var Evt = function(data) {
    this.init(data);
  };

  Evt.prototype.getYear = function() {
    if (this.year !== undefined) {
      return this.year;
    }
    this.year = this.dates[0].getFullYear();
    return this.year;
  };

  Evt.prototype.getType = function() {
    return this.type;
  };

  Evt.prototype.initType = function() {
    var type = parseInt(this.type);
    isNaN(type) && (type = 0);
    this.type = type;
  };

  Evt.prototype.parsePrices = function(value) {
    if (value === undefined) {
      this.formattedPrices = textConstants.UNDEFINED;
      return;
    }
    this.formattedPrices = _.filter(_.map(util.split(value), function(item) {
      var price = parseInt(item);
      if (isNaN(price)) {
        return undefined;
      }
      return price === 0 ? textConstants.FREE : util.formatCurrency(price);
    }, function(item) {
      return item !== undefined;
    })).join(' - ');
  };

  Evt.prototype.parseDates = function(value) {
    this.dates = _.filter(_.map(util.split(value), function(each) {
      return util.dateFromStr(each);
    }), function(item) {
      return !isNaN(item.valueOf());
    });

    if (this.dates.length === 0) {
      this.dates = this.formattedDates = undefined;
      return;
    }

    this.formattedDates = _.map(this.dates, function(item) {
      return util.formatDate(item);
    }).join(' - ');
  };

  Evt.prototype.parseTime = function(value) {
    this.formattedTime = value || textConstants.UNDEFINED;
  };

  Evt.prototype.parseLocation = function(value) {
    this.formattedLocation = value || textConstants.UNDEFINED;
  };

  Evt.prototype.parseAddress = function(value) {
    this.formattedAddress = value || textConstants.UNDEFINED;
  };

  Evt.prototype.parseTags = function(value) {
    this.tagArray = (value && value.length) ? util.split(value) : [];
  };

  Evt.prototype.init = function(data) {
    _.extend(this, data);
    this.initType(data.type);
    this.parsePrices(data.price);
    this.parseDates(data.date);
    this.parseTime(data.time);
    this.parseLocation(data.location);
    this.parseAddress(data.address);
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
          this.evts = this.filteredEvts = _.sortBy(_.filter(evts, function(item) {
            return item.name !== undefined && item.dates !== undefined;
          }), function(item) {
            return -item.dates[0].valueOf();
          });
        }, this))
      ;
    },

    getYears: function() {
      if (this.years) {
        return this.years;
      }
      this.years = _.sortBy(_.uniq(_.map(this.evts, function(item) {
        return item.getYear();
      })), function(item) {
        return -item; // descending sort
      });
      return this.years;
    },

    getTypes: function() {
      return [
        {type: 0, text: 'Externo'},
        {type: 1, text: 'Interno'}
      ];
    },

    getFilteredEvts: function() {
      return this.filteredEvts;
    },

    filterEvts: function(filter) {
      var type = filter.type;
      var year = filter.year;
      var query = filter.query;
      this.filteredEvts = _.filter(this.evts, function(evt) {
        return (evt.getType() === type)
            && (evt.getYear() === year)
            && (util.matchSearch(query, evt.name) || _.any(evt.tagArray, function(tag) {
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
      list:   $('[data-js="evt-list"]')
    },

    init: _.noop,

    render: function() {
      var evts = controller.getEvts();
      this.$els.list.hide().empty();
      if (evts.length) {
        this.$els.list.html(_.reduce(evts, _.bind(function(acc, evt) {
          return acc += this.templates.evt({evt: evt, past: util.isPast(evt.dates[evt.dates.length - 1])});
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

  var filterView = {
    templates: {
      year: _.template($('[data-js="template-year"]').html()),
      type: _.template($('[data-js="template-type"]').html()),
      search: _.template($('[data-js="template-search"]').html())
    },

    $els: {
      years: $('[data-js="year-list"]'),
      types: $('[data-js="type-list"]'),
      search: $('[data-js="search"]')
    },

    init: function(evts) {
      // init values
      this.search = '';
      this.year = util.currentYear();
      this.type = controller.getTypes()[0].type;
      // render filters
      this.renderSearch();
      this.renderTypes();
      this.renderYears();
    },

    // search
    getSearch: function() {
      return this.search;
    },

    doSearch: function(e) {
      this.search = $(e.target).val();
      controller.filterEvts();
    },

    renderSearch: function() {
      this.$els.search.hide().empty();
      this.$els.search.html(this.templates.search());
      this.$els.search.fadeIn(100);
      this.$els.search.find('input').on('keyup paste', _.debounce(_.bind(this.doSearch, this), 100));
    },

    // year
    getYear: function() {
      return this.year;
    },

    selectYear: function(e) {
      this.year = $(e.currentTarget).data('year');
      this.renderYears();
      controller.filterEvts();
    },

    renderYears: function() {
      var selectedYear = this.getYear();
      var years = _.map(controller.getYears(), _.bind(function(item) {
        return {
          year: item,
          selected: item === selectedYear
        };
      }, this));
      this.$els.years.hide().empty();
      this.$els.years.html(_.reduce(years, _.bind(function(acc, item) {
        return acc += this.templates.year(item);
      }, this), ''));
      this.$els.years.fadeIn(100);
      this.$els.years.find('[data-js="year-button"]').on('click', _.bind(this.selectYear, this));
    },

    // type
    getType: function() {
      return this.type;
    },

    selectType: function(e) {
      this.type = $(e.currentTarget).data('type');
      this.renderTypes();
      controller.filterEvts();
    },

    renderTypes: function() {
      var selectedType = this.getType();
      var types = _.map(controller.getTypes(), _.bind(function(item) {
        return {
          type: item.type,
          text: item.text,
          selected: item.type === selectedType
        };
      }, this));

      this.$els.types.hide().empty();
      this.$els.types.html(_.reduce(types, _.bind(function(acc, item) {
        return acc += this.templates.type(item);
      }, this), ''));
      this.$els.types.fadeIn(100);
      this.$els.types.find('[data-js="type-select"]').on('click', _.bind(this.selectType, this));
    }

  };

  /*
    controller
  */
  var controller = {
    init: function() {
      model.init()
        .done(_.bind(function() {
          filterView.init();
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

    getTypes: function() {
      return model.getTypes();
    },

    filterEvts: function(forceRender) {
      var filter = {
        query: filterView.getSearch(),
        year: filterView.getYear(),
        type: filterView.getType()
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
