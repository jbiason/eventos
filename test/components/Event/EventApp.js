import React from 'react'
import { shallow } from 'enzyme'
import EventApp from '../../../src/js/components/Event/EventApp'

describe('EventApp', () => {
  it('should render', () => {
    shallow(<EventApp />)
  })
})
