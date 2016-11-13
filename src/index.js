
import React from 'react';

const defaultLifecycle = {
  componentWillMount: () => {},
  componentDidMount: () => {},
  componentWillReceiveProps: () => {},
  shouldComponentUpdate: () => true,
  componentWillUpdate: () => {},
  componentDidUpdate: () => {},
  componentWillUnmount: () => {},
};

export const contain = (
  initState, mapStateToProps, mapSetStateToProps, setLifecycle,
) => (
  Component,
) => {
  const displayName = Component.displayName || Component.name || 'Component';
  const newLifecycle = typeof setLifecycle !== 'undefined' ? setLifecycle() : {};
  const componentLifecycle = Object.assign({}, defaultLifecycle, newLifecycle);

  class ContainerComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = initState();

      this.setState = this.setState.bind(this);
    }

    componentWillMount() {
      componentLifecycle.componentWillMount(this.state, this.props);
    }

    componentDidMount() {
      componentLifecycle.componentDidMount(this.setState, this.state, this.props);
    }

    componentWillReceiveProps(nextProps) {
      componentLifecycle.componentWillReceiveProps(
        nextProps, this.setState, this.state,
      );
    }

    shouldComponentUpdate(nextProps, nextState) {
      return componentLifecycle.shouldComponentUpdate(nextProps, nextState);
    }

    componentWillUpdate(nextProps, nextState) {
      componentLifecycle.componentWillUpdate(nextProps, nextState);
    }

    componentDidUpdate(prevProps, prevState) {
      componentLifecycle.componentDidUpdate(
        prevProps, prevState, this.setState, this.state, this.props,
      );
    }

    componentWillUnmount() {
      componentLifecycle.componentWillUnmount(this.state, this.props);
    }

    render() {
      const newProps = mapStateToProps !== 'undefined' ? mapStateToProps(this.state, this.props) : {};
      const setStateProps = mapSetStateToProps !== 'undefined' ? mapSetStateToProps(this.setState, this.state, this.props) : {};

      return (
        <Component {...this.props} {...newProps} {...setStateProps} />
      );
    }
  }

  ContainerComponent.displayName = `Contain(${displayName})`;

  return ContainerComponent;
};
