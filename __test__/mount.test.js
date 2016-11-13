
import React     from 'react';
import sinon     from 'sinon';
import { mount } from 'enzyme';

import { contain } from '../src';

import Button from './fakeComponent/Button';

test('Container willMount, didMount function should be called on mount', () => {
  const willMount = sinon.spy();
  const didMount = sinon.spy();

  const setLifecycle = () => ({
    componentWillMount: willMount,
    componentDidMount: didMount,
  });

  const MountButton = contain(undefined, undefined, undefined, setLifecycle)(Button);
  mount(<MountButton />);

  expect(willMount.callCount).toEqual(1);
  expect(didMount.callCount).toEqual(1);
});

test('Container willUnmount function should be called on unMount', () => {
  const willUnmount = sinon.spy();

  const setLifecycle = () => ({
    componentWillUnmount: willUnmount,
  });

  const MountButton = contain(undefined, undefined, undefined, setLifecycle)(Button);
  const wrapper = mount(<MountButton />);

  expect(willUnmount.callCount).toEqual(0);
  wrapper.unmount();
  expect(willUnmount.callCount).toEqual(1);
});
