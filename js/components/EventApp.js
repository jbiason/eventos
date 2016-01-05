import React from 'react';
import ReactDOM from 'react-dom';
import { getEvents } from '../services/EventService';
import EventYears from './EventYears';
import EventList from './EventList';

export default class EventsApp extends React.Component {
  constructor() {
    super();
    this.state = {
      events: []
    }
  }
  componentDidMount() {
    getEvents()
      .then((events) => {
        this.setState({
          events: events
        });
      })
    ;
  }
  render () {
    return (
      <div className="ev-container">
        <EventList events={this.state.events} />
      </div>
    )
  }
}
