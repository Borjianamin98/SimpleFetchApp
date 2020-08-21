import React from "react";
import {SORTS} from "../../constants";
import Button from "../Button";
import PropTypes from "prop-types";
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSort, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";

const largeColumn = {
    width: '40%',
};
const midColumn = {
    width: '30%',
};
const smallColumn = {
    width: '10%',
};

const Table = ({list, onDismiss}) => {
    const [sortKey, setSortKey] = React.useState('NONE');
    const [isSortReverse, setIsSortReverse] = React.useState(false);

    function onSort(newSortKey) {
        setIsSortReverse(sortKey === newSortKey && !isSortReverse)
        setSortKey(newSortKey);
    }

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse
        ? sortedList.reverse()
        : sortedList;

    return <div className="table">
        <div className="table-header">
        <span style={{width: '40%'}}>
            <Sort
                sortKey={'TITLE'}
                onSort={onSort}
                activeSortKey={sortKey}
                isSortReverse={isSortReverse}
            >
            Title
            </Sort>
        </span>
            <span style={{width: '30%'}}>
            <Sort
                sortKey={'AUTHOR'}
                onSort={onSort}
                activeSortKey={sortKey}
                isSortReverse={isSortReverse}
            >
            Author
            </Sort>
        </span>
            <span style={{width: '10%'}}>
            <Sort
                sortKey={'COMMENTS'}
                onSort={onSort}
                activeSortKey={sortKey}
                isSortReverse={isSortReverse}
            >
            Comments
            </Sort>
        </span>
            <span style={{width: '10%'}}>
            <Sort
                sortKey={'POINTS'}
                onSort={onSort}
                activeSortKey={sortKey}
                isSortReverse={isSortReverse}
            >
            Points
            </Sort>
        </span>
            <span style={{width: '10%'}}>
            Archive
        </span>
        </div>
        {reverseSortedList.map(item =>
            <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
                <a href={item.url}>{item.title}</a>
            </span>
                <span style={midColumn}>{item.author}</span>
                <span style={smallColumn}>{item.num_comments}</span>
                <span style={smallColumn}>{item.points}</span>
                <span style={smallColumn}>
                <Button
                    onClick={() => onDismiss(item.objectID)}
                    className="button-inline">
                    Dismiss
                </Button>
            </span>
            </div>
        )}
    </div>;
}

Table.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        objectID: PropTypes.string.isRequired,
        title: PropTypes.string,
        url: PropTypes.string,
        author: PropTypes.string,
        num_comments: PropTypes.number,
        points: PropTypes.number,
    })).isRequired,
    onDismiss: PropTypes.func
}

const Sort = ({
                  sortKey,
                  activeSortKey,
                  onSort,
                  isSortReverse,
                  children
              }) => {
    const sortClass = classNames(
        'button-inline',
        {'button-active': sortKey === activeSortKey}
    );
    return (
        <div>
            <Button
                onClick={() => onSort(sortKey)}
                className={sortClass}
            >
                {children}
            </Button>
            {
                sortKey === activeSortKey ? (isSortReverse ?
                    <FontAwesomeIcon style={{marginLeft: '10px'}} icon={faSortUp}/> :
                    <FontAwesomeIcon style={{marginLeft: '10px'}} icon={faSortDown}/>) :
                    <FontAwesomeIcon style={{marginLeft: '10px'}} icon={faSort}/>
            }
        </div>
    );
}

export default Table;