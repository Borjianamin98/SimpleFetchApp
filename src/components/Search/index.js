import React, {Component} from "react";
import PropTypes from "prop-types";

export default class Search extends Component {
    componentDidMount() {
        if (this.input) {
            this.input.focus();
        }
    }

    render() {
        const {value, onChange, onSubmit, children} = this.props;
        return (
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    ref={instance => this.input = instance}
                />
                <button type="submit">
                    {children}
                </button>
            </form>
        );
    }
}

Search.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}