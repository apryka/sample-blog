import React from 'react';
import { shallow } from 'enzyme';
import List from './List';

it('renders without crashing', () => {
  let wrapper = shallow(<List/>);
  wrapper.instance().getPostsFromApi = jest.fn();
});