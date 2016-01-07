import React from 'react';
import { shallow } from 'enzyme';
import EventYears from '../../../js/components/Event/EventYears';

it('should work', () => {
  const wrapper = shallow(<EventYears />);
  console.log(wrapper);
});
