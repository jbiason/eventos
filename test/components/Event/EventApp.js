import React from 'react';
import { shallow } from 'enzyme';
import EventApp from '../../../src/js/components/Event/EventApp';

it('should work', () => {
  const wrapper = shallow(<EventApp />);
  console.log(wrapper);
});
