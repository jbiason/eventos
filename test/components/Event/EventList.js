import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../../../js/components/Event/EventList';

it('should work', () => {
  const event = shallow(<EventList />)
});
