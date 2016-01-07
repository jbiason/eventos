import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Radio from '../../../js/components/Common/Radio';

it('should render radio', () => {
  const wrapper = shallow(<Radio />);
  expect(wrapper.find('.ev-select__icon')).to.have.length.of(1);
  expect(wrapper.find('.ev-select__text')).to.have.length.of(1);
});
