import React from 'react';
import ReactDOM from 'react-dom';
import { getEvents } from '../../services/EventService';
import EventYears from './EventYears';
import EventList from './EventList';
import util from '../../util/util';

export default class EventsApp extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      selectedYear: util.currentYear()
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
        <EventYears events={this.state.events} />
        <EventList events={this.state.events} />
      </div>
    )
  }
}
