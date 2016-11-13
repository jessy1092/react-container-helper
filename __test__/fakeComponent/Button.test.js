
import React    from 'react';
import renderer from 'react-test-renderer';

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

  const component = renderer.create(
    <ToggleConstButton />,
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Button container\'s properties should be map to Button ', () => {
  const mapStateToProps = (_, { check }) => ({
    toggle: check,
  });

  const ToggleConstButton = contain(undefined, mapStateToProps)(Button);

  const component = renderer.create(
    <ToggleConstButton check={false} />,
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Button changes state when clicked', () => {
  const component = renderer.create(
    <ToggleButton />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onClick();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
