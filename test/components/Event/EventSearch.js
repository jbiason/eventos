import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import EventSearch from '../../../src/js/components/Event/EventSearch';

it('should work', () => {
  const wrapper = shallow(<EventSearch />);
  expect(wrapper.find('.not_implemented')).to.have.length(0);
});
