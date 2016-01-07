import React from 'react';
import { shallow } from 'enzyme';
import EventSearch from '../../../src/js/components/Event/EventSearch';

it('should work', () => {
  const wrapper = shallow(<EventSearch />);
  console.log(wrapper);
});
