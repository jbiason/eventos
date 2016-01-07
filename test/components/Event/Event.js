import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Event from '../../../js/components/Event/Event';

const eventData = {
  name: 'Evento teste',
  formattedTagArray: [],
};

it('should render event basic info', () => {
  const wrapper = shallow(<Event event={eventData}/>);
  expect(wrapper.find('.ev-event__title')).to.have.length(1);
  expect(wrapper.find('.ev-event__price')).to.have.length(1);
  expect(wrapper.find('.ev-event__date')).to.have.length(1);
  expect(wrapper.find('.ev-event__time')).to.have.length(1);
  expect(wrapper.find('.ev-event__location')).to.have.length(1);
});
