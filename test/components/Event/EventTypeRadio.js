import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import EventTypeRadio from '../../../src/js/components/Event/EventTypeRadio';

it('should work', () => {
  const wrapper = shallow(<EventTypeRadio />);
  expect(wrapper.find('.not_implemented')).to.have.length(0);
});
