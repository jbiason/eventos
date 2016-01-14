import React from 'react'
import { shallow } from 'enzyme'
import EventEmptyResult from '../../../src/js/components/Event/EventEmptyResult'

describe('EventEmptyResult', () => {
  it('should render', () => {
    shallow(<EventEmptyResult />)
  })
})
