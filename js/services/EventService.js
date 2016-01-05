import axios from 'axios';
import util from '../util/util';

let textConstants = {
  UNDEFINED: 'Não definido',
  FREE: 'Grátis'
};

function formatType(event) {
  let type = parseInt(event.type);
  isNaN(type) && (type = 0);
  event.type = type;
}

function formatPrices(event) {
  let val = event.price;
  if (val === undefined) {
    event.formattedPrices = textConstants.UNDEFINED;
    return;
  }

  event.formattedPrices = util.split(val)
    .map(item => {
      let price = parseInt(item);
      if (isNaN(price)) return undefined;
      return price === 0 ? textConstants.FREE : util.formatCurrency(price);
    })
    .filter(item => item !== undefined)
    .join(' - ')
  ;
}

function formatDates(event) {
  let val = event.date;
  event.dates = util.split(val)
    .map(util.dateFromStr)
    .filter(item => !isNaN(item.valueOf()))
  ;

  if (event.dates.length === 0) {
    event.dates = event.formattedDates = undefined;
    return;
  }

  event.formattedDates = event.dates
    .map(util.formatDate)
    .join(' - ')
  ;
}

function formatTime(event) {
  let val = event.time;
  event.formattedTime = val || textConstants.UNDEFINED;
}

function formatLocation(event) {
  let val = event.location;
  event.formattedLocation = val || textConstants.UNDEFINED;
}

function formatAddress(event) {
  let val = event.address;
  event.formattedAddress = val || textConstants.UNDEFINED;
}

function formatTags(event) {
  let val = event.tags;
  event.tagArray = (val && val.length) ? util.split(val) : [];
}

function prepareEventData(event) {
  formatType(event);
  formatPrices(event);
  formatDates(event);
  formatTime(event);
  formatLocation(event);
  formatAddress(event);
  formatTags(event);
  return event;
}

export function getEvents() {
  return axios.get('./events.json')
    .then(({data}) => {
      data = data.map(prepareEventData);
      console.log('data', data);
      return data;
    })
  ;
}
