import React from "react";
import PropTypes from "prop-types";

const Search = ({value, onChange, onSubmit, children}) => {
    const inputInstance = React.useRef(null);
    React.useEffect(() => {
        if (inputInstance && inputInstance.current) {
            inputInstance.current.focus();
        }
    }, [])

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                ref={inputInstance}
            />
            <button type="submit">
                {children}
            </button>
        </form>
    );
}

Search.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default Search;