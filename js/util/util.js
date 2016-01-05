var util = {
  /*
    strings
  */
  splitStr: function(str, c) {
    str = '' + str;
    return str.replace(/ /g, '').split(c || ',');
  },

  /*
    currency
  */
  formatCurrency: function(value) {
    if (typeof value === 'string') {
      value = this.parseCurrency(value);
    }
    var groupSize = 3,
      groupSep = '.',
      re = '\\d(?=(\\d{' + (groupSize || 3) + '})+' + ')',
      num = value.toFixed();
    return 'R$' + num.replace(new RegExp(re, 'g'), '$&' + groupSep);
  },

  parseCurrency: function(value) {
    return parseFloat(value.replace(/[^0-9]/g, ''));
  },

  /*
    date
  */
  dateFromStr: function(str) {
    // console.log('dateFromStr', str)
    var parts = util.splitStr(str, '/');
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
