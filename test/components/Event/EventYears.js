import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import clone from 'clone'
import EventYears from '../../../src/js/components/Event/EventYears'
import eventsData from '../../data/EventsData'

describe('EventYears', () => {
  it('should render container even with no events', () => {
    const wrapper = shallow(<EventYears events={[]} selectedYear={1} selectYear={() => {}} />)
    expect(wrapper.find('.year-list')).to.have.length(1)
    expect(wrapper.find('.pure-button')).to.have.length(0)
  })

  it('should render one button for each different year', () => {
    const events = clone(eventsData)
    events.forEach((event, i) => event.formattedYear = i + 2000)

    const wrapper = shallow(
      <EventYears
        events={events}
        selectedYear={events[0].formattedYear}
        selectYear={() => {}}
      />
    )

    expect(wrapper.find('.year-list')).to.have.length(1)
    expect(wrapper.find('.pure-button')).to.have.length(events.length)
  })

  it('should not render twice the same year', () => {
    const events = clone(eventsData)
    events.forEach((event, i) => event.formattedYear = i + 2000)
    events[0].formattedYear = events[1].formattedYear

    const wrapper = shallow(
      <EventYears
        events={events}
        selectedYear={events[0].formattedYear}
        selectYear={() => {}}
      />
    )

    expect(wrapper.find('.year-list')).to.have.length(1)
    expect(wrapper.find('.pure-button')).to.have.length(events.length - 1)
  })

  it('should add class to selected button', () => {
    const events = clone(eventsData).slice(0, 3)
    events[0].formattedYear = 2015
    events[1].formattedYear = 2016
    events[2].formattedYear = 2017

    const wrapper = shallow(
      <EventYears
        events={events}
        selectedYear={events[2].formattedYear}
        selectYear={() => {}}
      />
    )

    // will sort the years, 2017 is the biggest, will be the first, and will be selected
    wrapper.find('.pure-button').forEach((node, i) => {
      expect(node.hasClass('pure-button-disabled')).to.equal(i === 0)
    })
  })
})
