import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import EventEmptyResult from '../../../src/js/components/Event/EventEmptyResult';

it('should work', () => {
  const wrapper = shallow(<EventEmptyResult />);
  expect(wrapper.find('.not_implemented')).to.have.length(0);
});
