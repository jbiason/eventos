import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import EventApp from '../../../src/js/components/Event/EventApp'

describe('EventApp', () => {
  it('should work', () => {
    const wrapper = shallow(<EventApp />)
    expect(wrapper.find('.not_implemented')).to.have.length(0)
  })
})
