
import React     from 'react';
import { mount } from 'enzyme';

import { contain } from '../src';

import Button from './fakeComponent/Button';

test('Container willMount, didMount function should be called on mount', () => {
  const willMount = jest.fn();
  const didMount = jest.fn();

  const setLifecycle = () => ({
    componentWillMount: willMount,
    componentDidMount: didMount,
  });

  const MountButton = contain(undefined, undefined, setLifecycle)(Button);
  mount(<MountButton />);

  expect(willMount.mock.calls.length).toEqual(1);
  expect(didMount.mock.calls.length).toEqual(1);
});

test('Container willUnmount function should be called on unMount', () => {
  const willUnmount = jest.fn();

  const setLifecycle = () => ({
    componentWillUnmount: willUnmount,
  });

  const MountButton = contain(undefined, undefined, setLifecycle)(Button);
  const wrapper = mount(<MountButton />);

  expect(willUnmount.mock.calls.length).toEqual(0);
  wrapper.unmount();
  expect(willUnmount.mock.calls.length).toEqual(1);
});

test('Container willMount function should be called and should be get the correct state, properties', () => {
  const initState = () => ({
    toggle: false,
  });

  const mapSetStateToProps = ({ toggle }) => ({
    toggle,
  });

  const setLifecycle = () => ({
    componentWillMount: ({ getState, getProps }) => {
      expect(getState()).toEqual({ toggle: false });
      expect(getProps()).toEqual({ check: false });
    },
  });

  const MountButton = contain(initState, mapSetStateToProps, setLifecycle)(Button);
  mount(<MountButton check={false} />);
});

test('Container didMount function should be called with setState, state and props', () => {
  const initState = () => ({
    toggle: false,
  });

  const mapSetStateToProps = ({ toggle }) => ({
    toggle,
  });

  const setLifecycle = () => ({
    componentDidMount: ({ setState, getState, getProps }) => {
      expect(typeof setState).toBe('function');
      expect(getState()).toEqual({ toggle: false });
      expect(getProps()).toEqual({ check: false });
    },
  });

  const MountButton = contain(initState, mapSetStateToProps, setLifecycle)(Button);
  mount(<MountButton check={false} />);
});
