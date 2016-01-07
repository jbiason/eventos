import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import EventFilter from '../../../src/js/components/Event/EventFilter';

it('should work', () => {
  const wrapper = shallow(<EventFilter />);
  expect(wrapper.find('.not_implemented')).to.have.length(0);
});
