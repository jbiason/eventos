import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import EventList from '../../../src/js/components/Event/EventList';

it('should work', () => {
  const wrapper = shallow(<EventList />);
  expect(wrapper.find('.not_implemented')).to.have.length(0);
});
