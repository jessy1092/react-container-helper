react-container-helper
=============
[![npm][npm-image]][npm-url] [![Build Status][travis-ci-image]][travis-ci-url] [![Dependency Status][david-dm-image]][david-dm-url]

Help to generate react container component easily and functionally. Powered by Higher-Order Components.

Inspire by

- [react-redux](https://github.com/reactjs/react-redux)
- [Presentational and Container Components -- Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.39eod2kgj).
- [Mixins Are Dead. Long Live Composition -- Dan Abramov](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.xj7geuov2).


## Feature

- [x] Use `initState` to set container's initial state
- [x] Use `mapStateToProps` to map container's state to component's properties
- [x] Use `mapSetStateToProps` to map container's setState to component's method properties
- [ ] Support container's life cycle method


## Full Example

```js
import {contain} from 'react-container-helper';

const Button = ({toggle, handleClick}) => (
  <button onClick={handleClick}>
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
```

Origin
```js
import React from 'react';

const Button = ({toggle, handleClick}) => (
  <button onClick={handleClick}>
    {toggle ? "true" : "false"}
  </button>
);

class ToggleButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {toggle: false};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({toggle: !this.state.toggle});
  }

  render() {
    return (
      <Button handleClick={this.handleClick} toggle={this.state.toggle}/>
    );
  }
}

ReactDOM.render(
  <ToggleButton />,
  document.getElementById('content')
);
```


## API

### contain(initState, mapStateToProps, mapSetStateToProps)

#### Arguments

- [`initState()`](*Function*): Use to set container initial state
- [`mapStateToProps(state, props)`](*Function*): Help to map container's state to component's properties
- [`mapSetStateToProps(setState, state, props)`](*Function*): Help to map container's setState to component's method properties


## Contribute
[![devDependency Status][david-dm-dev-image]][david-dm-dev-url]

1. Fork it.
2. Create your feature-branch `git checkout -b your-new-feature-branch`
3. Commit your change `git commit -am 'Add new feature'`
4. Push to the branch `git push origin your-new-feature-branch`
5. Create new Pull Request with `develop` branch

## License

The MIT License (MIT)

Copyright (c) 2016 Lee  < jessy1092@gmail.com >

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[npm-image]: https://img.shields.io/npm/v/react-container-helper.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-container-helper

[travis-ci-image]: https://img.shields.io/travis/jessy1092/react-container-helper.svg?style=flat-square
[travis-ci-url]: https://travis-ci.org/jessy1092/react-container-helper

[david-dm-image]: https://img.shields.io/david/jessy1092/react-container-helper.svg?style=flat-square
[david-dm-url]: https://david-dm.org/jessy1092/react-container-helper
[david-dm-dev-image]: https://img.shields.io/david/dev/jessy1092/react-container-helper.svg?style=flat-square
[david-dm-dev-url]: https://david-dm.org/jessy1092/react-container-helper#info=devDependencies
