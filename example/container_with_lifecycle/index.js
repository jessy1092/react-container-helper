import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { ClockContainer } from './component/Clock';

ReactDOM.render(
  <AppContainer>
    <ClockContainer />
  </AppContainer>,
  document.getElementById('content'),
);
