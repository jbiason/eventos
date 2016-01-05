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
      filteredEvents: [],
      selectedYear: util.currentYear()
    }
  }
  componentDidMount() {
    getEvents()
      .then((events) => {
        this.setState({
          events: events
        }, this.filterEvents);
      })
    ;
  }
  filterEvents() {
    let events = this.state.events;
    let filteredEvents = events
      .filter(event => event.formattedYear === this.state.selectedYear)
    ;

    this.setState({
      filteredEvents: filteredEvents
    });
  }
  selectYear(selectedYear) {
    this.setState({
      selectedYear: selectedYear
    }, this.filterEvents);
  }
  render () {
    return (
      <div className="ev-container">
        <EventYears events={this.state.events} selectYear={(e) => this.selectYear(e)}/>
        <EventList events={this.state.filteredEvents} />
      </div>
    )
  }
}
