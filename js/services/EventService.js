import axios from 'axios';
import util from '../util/util';

let textConstants = {
  UNDEFINED: 'Não definido',
  FREE: 'Grátis'
};

function formatType(typeStr) {
  let type = parseInt(typeStr);
  isNaN(type) && (type = 0);
  return type;
}

function formatPrice(priceStr) {
  if (priceStr === undefined) {
    return textConstants.UNDEFINED;
  }

  var priceArray = util.splitStr(priceStr)
    .map(price => parseInt(price))
    .filter(price => !isNaN(price))
    .map(price => price === 0 ? textConstants.FREE : util.formatCurrency(price))

  return util.simplifyArray(priceArray)
    .join(' - ')
  ;
}

function formatDateArray(dateStr) {
  return util.splitStr(dateStr)
    .map(util.dateFromStr)
    .filter(item => !isNaN(item.valueOf()))
  ;
}

function formatDate(dateStr) {
  return util.simplifyArray(formatDateArray(dateStr))
    .map(util.formatDate)
    .join(' - ')
  ;
}

function formatYear(dateStr) {
  return formatDateArray(dateStr)[0].getFullYear();
}

function formatIsPast(dateStr) {
  return util.isPast(formatDateArray(dateStr)[0]);
}

function formatTime(timeStr = textConstants.UNDEFINED) {
  return timeStr;
}

function formatLocation(locationStr = textConstants.UNDEFINED) {
  return locationStr;
}

function formatAddress(addressStr = textConstants.UNDEFINED) {
  return addressStr;
}

function formatTagsArray(tagsStr = '') {
  return tagsStr.length ? util.splitStr(tagsStr) : [];
}

function prepareEventData(event) {
  event.formattedType = formatType(event.type);
  event.formattedPrice = formatPrice(event.price);
  event.formattedDate = formatDate(event.date);
  event.formattedDateArray = formatDateArray(event.date);
  event.formattedYear = formatYear(event.date);
  event.formattedIsPast= formatIsPast(event.date);
  event.formattedTime = formatTime(event.time);
  event.formattedLocation = formatLocation(event.location);
  event.formattedAddress = formatAddress(event.address);
  event.formattedTagArray = formatTagsArray(event.tags);
  return event;
}

export function getEvents() {
  return axios.get('./events.json')
    .then(({data}) => {
      return data
        .map(prepareEventData)
        .sort((e1, e2) => e2.formattedDateArray[0].valueOf() - e1.formattedDateArray[0].valueOf())
      ;
    })
  ;
}
