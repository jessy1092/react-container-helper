
import React from 'react';

export const contain = (initState, mapStateToProps, mapSetStateToProps) => (Component) => {
	const displayName = Component.displayName || Component.name || 'Component';

	class ContainerComponent extends React.Component {
		constructor(props) {
			super(props);
			this.state = initState();

			this.setState = this.setState.bind(this);
		}

		render() {
			const newProps = mapStateToProps(this.state, this.props);
			const setStateProps = mapSetStateToProps(this.setState, this.state, this.props);

			return (
        <Component {...this.props} {...newProps} {...setStateProps} />
      );
		}
	}

	ContainerComponent.displayName = `Contain(${displayName})`;

	return ContainerComponent;
};
