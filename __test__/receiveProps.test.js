
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

test('Container willReceiveProps function should be called with setState, state and nextProps on properties change', () => {
  const willReceiveProps = jest.fn();

  const initState = () => ({
    toggle: false,
  });

  const mapStateToProps = ({ toggle }) => ({
    toggle,
  });

  const setLifecycle = () => ({
    componentWillReceiveProps: willReceiveProps,
  });

  const PropsButton = contain(initState, mapStateToProps, undefined, setLifecycle)(Button);
  const wrapper = mount(<PropsButton check={false} />);

  wrapper.setProps({ check: true });
  expect(willReceiveProps.mock.calls[0][0]).toEqual({ check: true });
  expect(willReceiveProps.mock.calls[0][2]).toEqual({ toggle: false });
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
  const didUpdate = jest.fn();

  const initState = () => ({
    toggle: false,
  });

  const mapStateToProps = ({ toggle }) => ({
    toggle,
  });

  const setLifecycle = () => ({
    componentDidUpdate: didUpdate,
  });

  const PropsButton = contain(initState, mapStateToProps, undefined, setLifecycle)(Button);
  const wrapper = mount(<PropsButton check={false} />);

  wrapper.setProps({ check: true });
  expect(didUpdate.mock.calls[0].slice(0, 2)).toEqual(
    [{ check: false }, { toggle: false }],
  );
  expect(didUpdate.mock.calls[0].slice(3)).toEqual(
    [{ toggle: false }, { check: true }],
  );
});
