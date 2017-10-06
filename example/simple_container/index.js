import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { ToggleButton } from './component/Button';

ReactDOM.render(
  <AppContainer>
    <ToggleButton />
  </AppContainer>,
  document.getElementById('content'),
);
