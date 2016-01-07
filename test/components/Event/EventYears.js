import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import EventYears from '../../../src/js/components/Event/EventYears';

it('should work', () => {
  const wrapper = shallow(<EventYears />);
  expect(wrapper.find('.not_implemented')).to.have.length(0);
});
