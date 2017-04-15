
import React from 'react';

import { contain } from '../../src';

const Button = ({ toggle, handleClick }) => (
  <button onClick={handleClick}>
    {toggle ? 'true' : 'false'}
  </button>
);

const initState = () => ({
  toggle: false,
});

const mapSetStateToProps = ({ toggle }, _, setState) => ({
  toggle,
  handleClick: () => setState({ toggle: !toggle }),
});

export const ToggleButton = contain(initState, mapSetStateToProps)(Button);

export default Button;
