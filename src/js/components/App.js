import React from 'react'
import { getEvents } from '../services/EventService'
import EventFilter from './Event/EventFilter'
import EventList from './Event/EventList'
import doesMatch from 'does-match'
import Loader from 'react-loader'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      filteredEvents: [],
      loaded: false,
      query: '',
      selectedType: undefined,
    }
  }
  componentDidMount() {
    const year = this.props.params.year || (new Date()).getFullYear()
    this.props.history.pushState(null, `/${year}`)

    getEvents()
    .then(events => {
      this.setState({
        loaded: true,
        events,
      }, this.filterEvents)
    })
    .catch(() => {
      this.setState({
        loaded: true,
      })
    })
  }
  componentWillReceiveProps(nextProps) {
    this.filterEvents(parseInt(nextProps.params.year))
  }
  selectType(type) {
    this.setState({
      selectedType: type,
    }, this.filterEvents)
  }
  changeSearch(e) {
    const query = e.target.value
    this.setState({
      query,
    }, this.filterEvents)
  }
  filterEvents(selectedYear) {
    const relevanceKey = '_relevance'
    const matchedTextKey = '_matchedText'
    const year = selectedYear || parseInt(this.props.params.year)
    const type = this.state.selectedType
    const query = this.state.query

    let filteredEvents = this.state.events
    .filter(event => event.formattedYear === year)
    .filter(event => type === undefined ? true : event.formattedType === type)

    filteredEvents.forEach(event => {
      delete event[relevanceKey]
      delete event[matchedTextKey]
    })

    if (query) {
      filteredEvents = filteredEvents
      .filter(event => {
        let bestResult = doesMatch(event.name, query, { highlightMatches: true })
        event.formattedTagArray.forEach(tag => {
          const tagResult = doesMatch(tag, query, { highlightMatches: true })
          if (tagResult.relevance > bestResult.relevance) {
            bestResult = tagResult
          }
        })
        event[relevanceKey] = bestResult.relevance
        return !!bestResult.relevance
      })
      .sort((e1, e2) => e2[relevanceKey] - e1[relevanceKey])
    }

    this.setState({
      filteredEvents,
    })
  }
  render() {
    return (
      <div>
        <Loader loaded={this.state.loaded}>
          <EventFilter
            events={this.state.events}
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

App.propTypes = {
  params: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired,
}
