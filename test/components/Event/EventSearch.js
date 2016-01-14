import React from 'react'
import { shallow } from 'enzyme'
import EventSearch from '../../../src/js/components/Event/EventSearch'

describe('EventSearch', () => {
  it('should render', () => {
    shallow(
      <EventSearch
        query={''}
        changeSearch={() => {}}
      />
    )
  })
})
