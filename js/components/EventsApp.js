import React from 'react';
import ReactDOM from 'react-dom';
import EventList from './EventList';
import { getEvents } from '../services/EventService';

export default class EventsApp extends React.Component {
  constructor() {
    super();
    this.state = {
      events: []
    }
  }
  componentDidMount() {
    getEvents()
      .then(({data}) => {
        this.setState({
          events: data
        });
      })
    ;
  }
  render () {
    return (
      <EventList events={this.state.events} />
    )
  }
}
