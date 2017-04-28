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
  initState = () => ({}),
  mapSetStateToProps = () => ({}),
  setLifecycle = () => defaultLifecycle,
) => (Component) => {
  const displayName = Component.displayName || Component.name || 'Component';
  const newLifecycle = setLifecycle();
  const componentLifecycle = Object.assign({}, defaultLifecycle, newLifecycle);

  class ContainerComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = initState();

      this.setState = this.setState.bind(this);
      this.getState = this.getState.bind(this);
      this.getProps = this.getProps.bind(this);
    }

    componentWillMount() {
      componentLifecycle.componentWillMount({
        getState: this.getState,
        getProps: this.getProps,
      });
    }

    componentDidMount() {
      componentLifecycle.componentDidMount({
        setState: this.setState,
        getState: this.getState,
        getProps: this.getProps,
      });
    }

    componentWillReceiveProps(nextProps) {
      componentLifecycle.componentWillReceiveProps(nextProps, {
        setState: this.setState,
        getState: this.getState,
        getProps: this.getProps,
      });
    }

    shouldComponentUpdate(nextProps, nextState) {
      return componentLifecycle.shouldComponentUpdate(nextProps, nextState, {
        getState: this.getState,
        getProps: this.getProps,
      });
    }

    componentWillUpdate(nextProps, nextState) {
      componentLifecycle.componentWillUpdate(nextProps, nextState, {
        getState: this.getState,
        getProps: this.getProps,
      });
    }

    componentDidUpdate(prevProps, prevState) {
      componentLifecycle.componentDidUpdate(prevProps, prevState, {
        setState: this.setState,
        getState: this.getState,
        getProps: this.getProps,
      });
    }

    componentWillUnmount() {
      componentLifecycle.componentWillUnmount({
        getState: this.getState,
        getProps: this.getProps,
      });
    }

    getState() {
      return this.state;
    }

    getProps() {
      return this.props;
    }

    render() {
      const setStateProps = mapSetStateToProps(this.state, this.props, this.setState);

      return <Component {...this.props} {...setStateProps} />;
    }
  }

  ContainerComponent.displayName = `Contain(${displayName})`;

  return ContainerComponent;
};
