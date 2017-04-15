
import React     from 'react';
import { mount } from 'enzyme';

import { contain } from '../src';

import Button from './fakeComponent/Button';

test('Container willUpdate, didUpdate function should be called on setState', () => {
  const willReceiveProps = jest.fn();
  const willUpdate = jest.fn();
  const didUpdate = jest.fn();

  const setLifecycle = () => ({
    componentWillReceiveProps: willReceiveProps,
    componentWillUpdate: willUpdate,
    componentDidUpdate: didUpdate,
  });

  const StateButton = contain(undefined, undefined, setLifecycle)(Button);
  const wrapper = mount(<StateButton />);

  wrapper.setState({});
  expect(willReceiveProps.mock.calls.length).toEqual(0);
  expect(willUpdate.mock.calls.length).toEqual(1);
  expect(didUpdate.mock.calls.length).toEqual(1);
});

test('Container willUpdate, didUpdate function should be not called if shouldComponentUpdate false', () => {
  const willReceiveProps = jest.fn();
  const willUpdate = jest.fn();
  const didUpdate = jest.fn();

  const setLifecycle = () => ({
    componentWillReceiveProps: willReceiveProps,
    shouldComponentUpdate: () => false,
    componentWillUpdate: willUpdate,
    componentDidUpdate: didUpdate,
  });

  const StateButton = contain(undefined, undefined, setLifecycle)(Button);
  const wrapper = mount(<StateButton />);

  wrapper.setState({});
  expect(willReceiveProps.mock.calls.length).toEqual(0);
  expect(willUpdate.mock.calls.length).toEqual(0);
  expect(didUpdate.mock.calls.length).toEqual(0);
});

test('Container shouldComponentUpdate function should be called with nextProps, nextState, getState and getProps on setState', () => {
  const initState = () => ({
    toggle: false,
  });

  const setLifecycle = () => ({
    shouldComponentUpdate: (nextProps, nextState, { getState, getProps }) => {
      expect(nextProps).toEqual({ check: false });
      expect(nextState).toEqual({ toggle: true });
      expect(getProps()).toEqual({ check: false });
      expect(getState()).toEqual({ toggle: false });

      return true;
    },
  });

  const StateButton = contain(initState, undefined, setLifecycle)(Button);
  const wrapper = mount(<StateButton check={false} />);

  wrapper.setState({ toggle: true });
});

test('Container willUpdate function should be called with nextProps, nextState, getState and getProps on setState', () => {
  const initState = () => ({
    toggle: false,
  });

  const setLifecycle = () => ({
    componentWillUpdate: (nextProps, nextState, { getState, getProps }) => {
      expect(nextProps).toEqual({ check: false });
      expect(nextState).toEqual({ toggle: true });
      expect(getProps()).toEqual({ check: false });
      expect(getState()).toEqual({ toggle: false });
    },
  });

  const StateButton = contain(initState, undefined, setLifecycle)(Button);
  const wrapper = mount(<StateButton check={false} />);

  wrapper.setState({ toggle: true });
});

test('Container didUpdate function should be called with nextProps, nextState, setState, getState and getProps on setState', () => {
  const initState = () => ({
    toggle: false,
  });

  const mapSetStateToProps = ({ toggle }) => ({
    toggle,
  });

  const setLifecycle = () => ({
    componentDidUpdate: (prevProps, prevState, { setState, getState, getProps }) => {
      expect(prevProps).toEqual({ check: false });
      expect(prevState).toEqual({ toggle: false });
      expect(typeof setState).toBe('function');
      expect(getProps()).toEqual({ check: false });
      expect(getState()).toEqual({ toggle: true });
    },
  });

  const StateButton = contain(initState, mapSetStateToProps, setLifecycle)(Button);
  const wrapper = mount(<StateButton check={false} />);

  wrapper.setState({ toggle: true });
});
