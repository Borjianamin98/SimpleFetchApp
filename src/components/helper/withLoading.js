import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const Loading = () =>
    <FontAwesomeIcon icon={faSpinner} spin size="3x"/>

export const withLoading = (Component) => ({isLoading, ...rest}) =>
    isLoading
        ? <Loading/>
        : <Component {...rest} />