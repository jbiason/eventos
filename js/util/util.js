var util = {
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
    var parts = util.split(str, '/');
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

export default util;
