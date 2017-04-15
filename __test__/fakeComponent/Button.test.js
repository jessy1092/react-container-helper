
import React    from 'react';
import { mount, render } from 'enzyme';

import { contain } from '../../src';
import Button, { ToggleButton } from './Button';

test('Button container\'s state should be map to Button ', () => {
  const initState = () => ({
    check: true,
  });
  const mapStateToProps = ({ check }) => ({
    toggle: check,
  });

  const ToggleConstButton = contain(initState, mapStateToProps)(Button);

  const component = render(
    <ToggleConstButton />,
  );

  expect(component).toMatchSnapshot();
});

test('Button container\'s properties should be map to Button ', () => {
  const mapStateToProps = (_, { check }) => ({
    toggle: check,
  });

  const ToggleConstButton = contain(undefined, mapStateToProps)(Button);

  const component = render(
    <ToggleConstButton check={false} />,
  );

  expect(component).toMatchSnapshot();
});

test('Button changes state when clicked', () => {
  const component = mount(
    <ToggleButton />,
  );
  expect(component).toMatchSnapshot();

  component.find('button').simulate('click');
  expect(component).toMatchSnapshot();
});
