
import React from 'react';
import ReactDOM from 'react-dom';
import {contain} from '../src';

import style from './index.css';

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

const ToggleButton = contain(initState, mapStateToProps, mapSetStateToProps)(Button);

ReactDOM.render(
  <ToggleButton />,
  document.getElementById('content')
);
