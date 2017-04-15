
import React from 'react';

import { contain } from '../../../src';

import style from './Clock.css';

const Clock = ({ date }) => (
  <div>
    <h1>Hello, world!</h1>
    <h2 className={style.clock}>It is {date.toLocaleTimeString()}.</h2>
  </div>
);

const initState = () => ({
  date: new Date(),
  timerID: '',
});

const mapStateToProps = ({ date }) => ({
  date,
});

const mapSetStateToProps = () => {};

const setLifecycle = () => ({
  componentDidMount({ setState }) {
    const timerID = setInterval(
      () => setState(() => ({ date: new Date() })),
      1000,
    );
    setState(() => ({ timerID }));
  },
  componentWillUnmount({ getState }) {
    const { timerID } = getState();
    clearInterval(timerID);
  },
});

export const ClockContainer = contain(
  initState, mapStateToProps, mapSetStateToProps, setLifecycle,
)(Clock);

export default Clock;
