
import React    from 'react';
import renderer from 'react-test-renderer';
import { ToggleButton } from './Button';

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
