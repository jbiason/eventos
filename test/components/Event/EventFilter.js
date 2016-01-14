import React from 'react'
import { shallow } from 'enzyme'
import EventFilter from '../../../src/js/components/Event/EventFilter'

describe('EventFilter', () => {
  it('should render', () => {
    shallow(
      <EventFilter
        events={[]}
        selectedYear={1}
        selectYear={() => {}}
        query={''}
        changeSearch={() => {}}
        selectedType={1}
        selectType={() => {}}
      />
    )
  })
})
