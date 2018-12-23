import React from 'react';
import { shallow } from 'enzyme';
import Post from './Post';

it('renders without crashing', () => {
  const props = { match: { params: { id: 1 }}};
  let wrapper = shallow(<Post {...props } />)
  wrapper.instance().getPostFromApi = jest.fn();
});

it('renders post body and title', () => {
  const props = { match: { params: { id: 1 }}};
  let wrapper = shallow(<Post {...props } />)
  wrapper.setState({ 
    id: 1,
    title: 'title',
    body: 'body',
    isLoading: false });
  expect(wrapper.find('.post-title').text()).toEqual('title');
  expect(wrapper.find('.post-body').text()).toEqual('body');
});