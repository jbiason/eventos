import axios from 'axios';

export function getEvents() {
  return axios.get('./events.json');
}
