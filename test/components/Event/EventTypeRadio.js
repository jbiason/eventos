import React from 'react';
import { shallow } from 'enzyme';
import EventTypeRadio from '../../../src/js/components/Event/EventTypeRadio';

it('should work', () => {
  const wrapper = shallow(<EventTypeRadio />);
  console.log(wrapper);
});
