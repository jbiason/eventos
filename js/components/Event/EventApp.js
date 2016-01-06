import React from 'react';
import ReactDOM from 'react-dom';
import { getEvents } from '../../services/EventService';
import EventFilter from './EventFilter';
import EventList from './EventList';
import util from '../../util/util';
import doesMatch from 'does-match';
import Loader from 'react-loader';

export default class EventsApp extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      filteredEvents: [],
      loaded: false,
      selectedYear: util.currentYear(),
      query: '',
      selectedType: undefined
    }
  }
  componentDidMount() {
    getEvents()
      .then(events => {
        this.setState({
          loaded: true,
          events: events
        }, this.filterEvents);
      })
      .catch(() => {
        this.setState({
          loaded: true
        });
      })
    ;
  }
  filterEvents() {
    let year = this.state.selectedYear;
    let type = this.state.selectedType;
    let events = this.state.events;
    let query = this.state.query;
    let filteredEvents = events
      .filter(event => event.formattedYear === year)
      .filter(event => type === undefined ? true : event.formattedType === type)
    ;

    if (query) {
      filteredEvents = filteredEvents
        .filter(event => {
          return !!doesMatch(event.name, query) || event.formattedTagArray.some(tag => !!doesMatch(tag, query));
        })
      ;
    }

    this.setState({
      filteredEvents: filteredEvents
    });
  }
  selectYear(year) {
    this.setState({
      selectedYear: year
    }, this.filterEvents);
  }
  selectType(type) {
    this.setState({
      selectedType: type
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
      <div>
        <Loader loaded={this.state.loaded}>
          <EventFilter
            events={this.state.events}
            selectedYear={this.state.selectedYear}
            selectYear={(e) => this.selectYear(e)}
            query={this.state.query}
            changeSearch={(e) => this.changeSearch(e)}
            selectedType={this.state.selectedType}
            selectType={(e) => this.selectType(e)}
          />
          <EventList events={this.state.filteredEvents} />
        </Loader>
      </div>
    )
  }
}
