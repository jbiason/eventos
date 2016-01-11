import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import clone from 'clone'
import EventList from '../../../src/js/components/Event/EventList'
import EventEmptyResult from '../../../src/js/components/Event/EventEmptyResult'
import Event from '../../../src/js/components/Event/Event'
import eventsData from '../../data/EventsData'

describe('<EventList />', () => {
  let events

  beforeEach(() => {
    events = clone(eventsData)
    events.forEach((event, i) => event.id = i)
  })

  it('should render container with no events, when there is no event', () => {
    const wrapper = shallow(<EventList events={[]} />)
    expect(wrapper.find('.ev-container')).to.have.length(1)
    expect(wrapper.find('.ev-events')).to.have.length(1)
    expect(wrapper.contains(<EventEmptyResult />)).to.equal(true)
  })

  it('should render container with events, when there are events', () => {
    const wrapper = shallow(<EventList events={events} />)
    expect(wrapper.find('.ev-container')).to.have.length(1)
    expect(wrapper.find('.ev-events')).to.have.length(1)
    expect(wrapper.contains(<EventEmptyResult />)).to.equal(false)

    events.forEach((event) => {
      expect(wrapper.contains(<Event event={event} key={event.id}/>)).to.equal(true)
    })
  })
})
