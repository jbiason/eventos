import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Event from '../../../src/js/components/Event/Event';
import clone from 'clone';

describe('Event', () => {
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

  it('should not render description, if not defined', () => {
    const wrapper = shallow(<Event event={eventData}/>);
    expect(wrapper.find('.ev-event__description')).to.have.length(0);
  });

  it('should render description, if defined', () => {
    const event = clone(eventData);
    event.description = 'some description';
    const wrapper = shallow(<Event event={event}/>);
    expect(wrapper.find('.ev-event__description')).to.have.length(1);
  });

  it('should not render image, if not defined', () => {
    const wrapper = shallow(<Event event={eventData}/>);
    expect(wrapper.find('img')).to.have.length(0);
  });

  it('should render image, if defined', () => {
    const event = clone(eventData);
    event.img = 'some description';
    const wrapper = shallow(<Event event={event}/>);
    expect(wrapper.find('img')).to.have.length(1);
  });

  it('should not render tags, if not defined', () => {
    const wrapper = shallow(<Event event={eventData}/>);
    expect(wrapper.find('.tags')).to.have.length(0);
    expect(wrapper.find('.tag')).to.have.length(0);
  });

  it('should render image, if defined', () => {
    const event = clone(eventData);
    event.formattedTagArray = ['one', 'two', 'three'];
    const wrapper = shallow(<Event event={event}/>);
    expect(wrapper.find('.tags')).to.have.length(1);
    expect(wrapper.find('.tag')).to.have.length(3);
  });
});
