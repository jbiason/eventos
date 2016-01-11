import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import EventFilter from '../../../src/js/components/Event/EventFilter'

describe('EventFilter', () => {
  it('should work', () => {
    const wrapper = shallow(
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
    expect(wrapper.find('.not_implemented')).to.have.length(0)
  })
})
