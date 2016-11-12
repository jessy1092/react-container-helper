
import React from 'react';

import {contain} from '../../src';

import style from './Button.css';

const Button = ({toggle, handleClick}) => (
  <button className={style.button} onClick={handleClick}>
    {toggle ? "true" : "false"}
  </button>
);

const initState = () => ({
  toggle: false
});

const mapStateToProps = (state, props) => ({
  toggle: state.toggle
});

const mapSetStateToProps = (setState, state, props) => ({
  handleClick: () => setState({ toggle: !state.toggle })
});

export const ToggleButton = contain(initState, mapStateToProps, mapSetStateToProps)(Button);

export default Button;
