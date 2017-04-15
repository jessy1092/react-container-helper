
import React from 'react';

import { contain } from '../../../src';

import style from './Button.css';

const Button = ({ toggle, handleClick }) => (
  <button className={style.button} onClick={handleClick}>
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
