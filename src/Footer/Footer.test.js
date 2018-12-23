import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

it('renders without crashing', () => {
  shallow(<Footer />);
});

it('renders props text', () => {
  const text = 'sample text';
  const wrapper = shallow(<Footer text={text}/>);
  expect(wrapper.text()).toEqual(text);
});