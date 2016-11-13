
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

  const MountButton = contain(undefined, undefined, undefined, setLifecycle)(Button);
  mount(<MountButton />);

  expect(willMount.mock.calls.length).toEqual(1);
  expect(didMount.mock.calls.length).toEqual(1);
});

test('Container willUnmount function should be called on unMount', () => {
  const willUnmount = jest.fn();

  const setLifecycle = () => ({
    componentWillUnmount: willUnmount,
  });

  const MountButton = contain(undefined, undefined, undefined, setLifecycle)(Button);
  const wrapper = mount(<MountButton />);

  expect(willUnmount.mock.calls.length).toEqual(0);
  wrapper.unmount();
  expect(willUnmount.mock.calls.length).toEqual(1);
});

test('Container willMount function should be called with state and props', () => {
  const willMount = jest.fn();

  const initState = () => ({
    toggle: false,
  });

  const mapStateToProps = ({ toggle }) => ({
    toggle,
  });

  const setLifecycle = () => ({
    componentWillMount: willMount,
  });

  const MountButton = contain(initState, mapStateToProps, undefined, setLifecycle)(Button);
  mount(<MountButton check={false} />);

  expect(willMount.mock.calls).toEqual(
    [[{ toggle: false }, { check: false }]],
  );
});

test('Container didMount function should be called with setState, state and props', () => {
  const didMount = jest.fn();

  const initState = () => ({
    toggle: false,
  });

  const mapStateToProps = ({ toggle }) => ({
    toggle,
  });

  const setLifecycle = () => ({
    componentDidMount: didMount,
  });

  const MountButton = contain(initState, mapStateToProps, undefined, setLifecycle)(Button);
  mount(<MountButton check={false} />);

  expect(didMount.mock.calls[0].slice(1)).toEqual(
    [{ toggle: false }, { check: false }],
  );
});
