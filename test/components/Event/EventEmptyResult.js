import React from 'react';
import { shallow } from 'enzyme';
import EventEmptyResult from '../../../src/js/components/Event/EventEmptyResult';

it('should work', () => {
  const wrapper = shallow(<EventEmptyResult />);
  console.log(wrapper);
});
