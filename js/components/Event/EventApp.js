import React from 'react';
import ReactDOM from 'react-dom';
import { getEvents } from '../../services/EventService';
import EventFilter from './EventFilter';
import EventList from './EventList';
import util from '../../util/util';
import doesMatch from 'does-match';

export default class EventsApp extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      query: '',
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
    let query = this.state.query;
    let filteredEvents = events
      .filter(event => event.formattedYear === this.state.selectedYear)
    ;

    if (query) {
      filteredEvents = filteredEvents
        .filter(event => {
          return !!doesMatch(event.name, query);
        })
      ;
    } else {
      events
        .forEach(event => {
          delete event.relevance;
          delete event.highlightedName;
        })
      ;
    }

    this.setState({
      filteredEvents: filteredEvents
    });
  }
  selectYear(selectedYear) {
    this.setState({
      selectedYear: selectedYear
    }, this.filterEvents);
  }
  changeSearch(e) {
    let query = e.target.value;
    this.setState({
      query: query
    }, this.filterEvents);
  }
  render () {
    return (
      <div className="ev-container">
        <EventFilter
          events={this.state.events}
          query={this.state.query}
          selectedYear={this.state.selectedYear}
          selectYear={(e) => this.selectYear(e)}
          changeSearch={(e) => this.changeSearch(e)}
        />
        <EventList events={this.state.filteredEvents} />
      </div>
    )
  }
}
