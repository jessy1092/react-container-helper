react-container-helper
=============
[![npm][npm-image]][npm-url] [![Build Status][travis-ci-image]][travis-ci-url] [![Dependency Status][david-dm-image]][david-dm-url] [![Coverage Status][coverage-status-image]][coverage-status-url]

Help to generate react container component easily and functionally. Powered by Higher-Order Components.

Inspire by

- [react-redux](https://github.com/reactjs/react-redux)
- [Presentational and Container Components -- Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.39eod2kgj).
- [Mixins Are Dead. Long Live Composition -- Dan Abramov](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.xj7geuov2).


## Feature

- [x] Use `initState` to set container's initial state
- [x] Use `mapStateToProps` to map container's state to component's properties
- [x] Use `mapSetStateToProps` to map container's setState to component's method properties
- [x] Support container's life cycle method
- [ ] Support purecomponent.


## Full Example

You can see the simple example on [example](./example)

```js
import {contain} from 'react-container-helper';

const Button = ({ toggle, handleClick }) => (
  <button onClick={handleClick}>
    {toggle ? 'true' : 'false'}
  </button>
);

const initState = () => ({
  toggle: false,
});

const mapStateToProps = ({ toggle }) => ({
  toggle,
});

const mapSetStateToProps = (setState, { toggle }) => ({
  handleClick: () => setState({ toggle: !toggle }),
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

### contain(initState, mapStateToProps, mapSetStateToProps, setLifecycle)

#### Arguments

- [`initState()`]\(*Function*): Use to set container initial state
- [`mapStateToProps(state, props)`]\(*Function*): Help to map container's state to component's properties
- [`mapSetStateToProps(setState, state, props)`]\(*Function*): Help to map container's setState to component's method properties
- [`setLifecycle()`]\(*Function*): Help to set container's lifecycle. Return the lifecycle object

#### Container's Lifecycle

Please use the `setLifecycle` to set and return the lifecycle object which define the lifecycle function.

- [`componentWillMount({ getState, getProps })`]\(*Function*): Will be called on [container will mount](https://facebook.github.io/react/docs/react-component.html#componentwillmount). `getState` and `getProps` can get the current container's value
- [`componentDidMount({ setState, getState, getProps })`]\(*Function*): Will be called on [container did mount](https://facebook.github.io/react/docs/react-component.html#componentdidmount). `getState` and `getProps` can get the current container's value. You can use `setState` to change the container's state
- [`componentWillReceiveProps(nextProps, { setState, getState, getProps })`]\(*Function*): Will be called on [container will receive properties](https://facebook.github.io/react/docs/react-component.html#componentwillreceiveprops). `nextProps` is the next properties. `getState` and `getProps` can get the current container's value. You can use `setState` to change the container's state
- [`shouldComponentUpdate(nextProps, nextState)`]\(*Function*): Use to check [container should update](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate) or not. `nextProps` and `nextState` is the next container's value
- [`componentWillUpdate(nextProps, nextState)`]\(*Function*): Will be called on [container will update](https://facebook.github.io/react/docs/react-component.html#componentwillupdate). `nextProps` and `nextState` is the next container's value
- [`componentDidUpdate(prevProps, prevState, { setState, getState, getProps })`]\(*Function*): Will be called on [container did update](https://facebook.github.io/react/docs/react-component.html#componentdidupdate). `prevProps` and `prevState` is the preview container's value. `getState` and `getProps` can get the current container's value. You can use `setState` to change the container's state
- [`componentWillUnmount({ getState, getProps })`]\(*Function*): Will be called on [container will unmount](https://facebook.github.io/react/docs/react-component.html#componentwillunmount). `getState` and `getProps` can get the current container's value. Help you to clearup container.

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

[coverage-status-image]: https://img.shields.io/coveralls/jessy1092/react-container-helper.svg?style=flat-square
[coverage-status-url]: https://coveralls.io/r/jessy1092/react-container-helper
