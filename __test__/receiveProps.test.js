
import React     from 'react';
import { mount } from 'enzyme';

import { contain } from '../src';

import Button from './fakeComponent/Button';

test('Container willReceiveProps, willUpdate, didUpdate function should be called on properties change', () => {
  const willReceiveProps = jest.fn();
  const willUpdate = jest.fn();
  const didUpdate = jest.fn();

  const setLifecycle = () => ({
    componentWillReceiveProps: willReceiveProps,
    componentWillUpdate: willUpdate,
    componentDidUpdate: didUpdate,
  });

  const PropsButton = contain(undefined, undefined, undefined, setLifecycle)(Button);
  const wrapper = mount(<PropsButton check={false} />);

  wrapper.setProps({ check: true });
  expect(willReceiveProps.mock.calls.length).toEqual(1);
  expect(willUpdate.mock.calls.length).toEqual(1);
  expect(didUpdate.mock.calls.length).toEqual(1);
});

test('Container willUpdate, didUpdate function should not be called if shouldComponentUpdate false', () => {
  const willReceiveProps = jest.fn();
  const willUpdate = jest.fn();
  const didUpdate = jest.fn();

  const setLifecycle = () => ({
    componentWillReceiveProps: willReceiveProps,
    shouldComponentUpdate: () => false,
    componentWillUpdate: willUpdate,
    componentDidUpdate: didUpdate,
  });

  const PropsButton = contain(undefined, undefined, undefined, setLifecycle)(Button);
  const wrapper = mount(<PropsButton check={false} />);

  wrapper.setProps({ check: true });
  expect(willReceiveProps.mock.calls.length).toEqual(1);
  expect(willUpdate.mock.calls.length).toEqual(0);
  expect(didUpdate.mock.calls.length).toEqual(0);
});

test('Container willReceiveProps function should be called with nextProps and get the state, old properties on properties change ', () => {
  const initState = () => ({
    toggle: false,
  });

  const mapStateToProps = ({ toggle }) => ({
    toggle,
  });

  const setLifecycle = () => ({
    componentWillReceiveProps: (nextProps, { setState, getState, getProps }) => {
      expect(nextProps).toEqual({ check: true });
      expect(typeof setState).toBe('function');
      expect(getState()).toEqual({ toggle: false });
      expect(getProps()).toEqual({ check: false });
    },
  });

  const PropsButton = contain(initState, mapStateToProps, undefined, setLifecycle)(Button);
  const wrapper = mount(<PropsButton check={false} />);

  wrapper.setProps({ check: true });
});

test('Container willUpdate function should be called with setState, state and nextProps on properties change', () => {
  const willUpdate = jest.fn();

  const initState = () => ({
    toggle: false,
  });

  const mapStateToProps = ({ toggle }) => ({
    toggle,
  });

  const setLifecycle = () => ({
    componentWillUpdate: willUpdate,
  });

  const PropsButton = contain(initState, mapStateToProps, undefined, setLifecycle)(Button);
  const wrapper = mount(<PropsButton check={false} />);

  wrapper.setProps({ check: true });
  expect(willUpdate.mock.calls).toEqual(
    [[{ check: true }, { toggle: false }]],
  );
});

test('Container didUpdate function should be called with nextProps, nextState, setState, curState and curProp on properties change', () => {
  const initState = () => ({
    toggle: false,
  });

  const mapStateToProps = ({ toggle }) => ({
    toggle,
  });

  const setLifecycle = () => ({
    componentDidUpdate: (prevProps, prevState, { setState, getState, getProps }) => {
      expect(prevProps).toEqual({ check: false });
      expect(prevState).toEqual({ toggle: false });
      expect(typeof setState).toBe('function');
      expect(getProps()).toEqual({ check: true });
      expect(getState()).toEqual({ toggle: false });
    },
  });

  const PropsButton = contain(initState, mapStateToProps, undefined, setLifecycle)(Button);
  const wrapper = mount(<PropsButton check={false} />);

  wrapper.setProps({ check: true });
});
