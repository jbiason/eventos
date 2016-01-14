import React from 'react'
import { shallow } from 'enzyme'
import EventTypeRadio from '../../../src/js/components/Event/EventTypeRadio'

describe('EventTypeRadio', () => {
  it('should work', () => {
    shallow(
      <EventTypeRadio
        selectedType={1}
        selectType={() => {}}
      />
    )
  })
})
