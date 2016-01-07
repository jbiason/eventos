import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../../../src/js/components/Event/EventList';

it('should work', () => {
  const wrapper = shallow(<EventList />);
  console.log(wrapper);
});
