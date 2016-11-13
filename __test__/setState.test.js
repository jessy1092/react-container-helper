
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

  const StateButton = contain(undefined, undefined, undefined, setLifecycle)(Button);
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

  const StateButton = contain(undefined, undefined, undefined, setLifecycle)(Button);
  const wrapper = mount(<StateButton />);

  wrapper.setState({});
  expect(willReceiveProps.mock.calls.length).toEqual(0);
  expect(willUpdate.mock.calls.length).toEqual(0);
  expect(didUpdate.mock.calls.length).toEqual(0);
});

test('Container willUpdate function should be not called with nextProps and nextState on setState', () => {
  const willUpdate = jest.fn();

  const setLifecycle = () => ({
    componentWillUpdate: willUpdate,
  });

  const StateButton = contain(undefined, undefined, undefined, setLifecycle)(Button);
  const wrapper = mount(<StateButton check={false} />);

  wrapper.setState({ toggle: true });
  expect(willUpdate.mock.calls).toEqual(
    [[{ check: false }, { toggle: true }]],
  );
});

test('Container didUpdate function should be not called with nextProps, nextState, setState, curState and curProps on setState', () => {
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

  const StateButton = contain(initState, mapStateToProps, undefined, setLifecycle)(Button);
  const wrapper = mount(<StateButton check={false} />);

  wrapper.setState({ toggle: true });
  expect(didUpdate.mock.calls[0].slice(0, 2)).toEqual(
    [{ check: false }, { toggle: false }],
  );
  expect(didUpdate.mock.calls[0].slice(3)).toEqual(
    [{ toggle: true }, { check: false }],
  );
});
