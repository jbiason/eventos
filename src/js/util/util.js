const util = {
  /*
    array
  */
  arraySimplify(array) {
    if (array.length < 3) {
      return array;
    }
    return [array[0], array[array.length - 1]];
  },

  arrayUniq(array) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      if (result.indexOf(array[i]) === -1) {
        result.push(array[i]);
      }
    }
    return result;
  },

  /*
    strings
  */
  strSplit(val, c) {
    const str = '' + val;
    return str.replace(/ /g, '').split(c || ',');
  },

  /*
    currency
  */
  currencyFormat(value) {
    let numVal = value;
    if (typeof value === 'string') {
      numVal = this.currencyParse(numVal);
    }
    const groupSize = 3;
    const groupSep = '.';
    const re = '\\d(?=(\\d{' + (groupSize || 3) + '})+' + ')';
    const num = value.toFixed();
    return 'R$' + num.replace(new RegExp(re, 'g'), '$&' + groupSep);
  },

  currencyParse(value) {
    return parseFloat(value.replace(/[^0-9]/g, ''));
  },

  /*
    date
  */
  dateFromStr(str) {
    const parts = util.strSplit(str, '/');
    return new Date(parts[2], parseInt(parts[1]) - 1, parts[0]);
  },

  dateToStr(date) {
    let d = date.getDate() + '';
    let m = (date.getMonth() + 1) + '';
    d = d.length > 1 ? d : '0' + d;
    m = m.length > 1 ? m : '0' + m;
    return d + '/' + m;
  },

  isPast(date) {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return date.valueOf() < today.valueOf();
  },
};

export default util;
