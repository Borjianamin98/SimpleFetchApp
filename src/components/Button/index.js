import PropTypes from "prop-types";
import React from "react";
import {withLoading} from "../helper/withLoading";

const Button = ({onClick, className, children}) =>
    <button
        onClick={onClick}
        className={className}
        type="button"
    >
        {children}
    </button>

Button.defaultProps = {
    className: '',
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Button;
export const ButtonWithLoading = withLoading(Button);