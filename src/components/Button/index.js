import PropTypes from "prop-types";
import React from "react";
import {withLoading} from "../helper/withLoading";

export default class Button extends React.Component {
    render() {
        let {onClick, className, children} = this.props;
        return <button
            onClick={onClick}
            className={className}
            type="button"
        >
            {children}
        </button>;
    }
}

Button.defaultProps = {
    className: '',
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export const ButtonWithLoading = withLoading(Button);