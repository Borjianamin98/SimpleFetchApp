import React from 'react';
import axios from 'axios';
import Table from "../Table";
import Search from "../Search";
import {ButtonWithLoading} from "../Button";
import './index.css';
import {
    DEFAULT_QUERY,
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP
} from '../../constants'

const useMountEffect = (func) => React.useEffect(func, [])
const updateSearchTopStoriesState = (hits, page) => (prevTopResult) => {
    const {results, searchKey} = prevTopResult;
    const oldHits = results && results[searchKey]
        ? results[searchKey].hits
        : [];
    const updatedHits = [
        ...oldHits,
        ...hits
    ];
    return {
        results: {
            ...results,
            [searchKey]: {hits: updatedHits, page}
        },
        searchKey
    };
};

const App = () => {
    const isMounted = React.useRef(false);
    const [topResult, setTopResult] = React.useState({
        results: null,
        searchKey: DEFAULT_QUERY,
    });
    const [searchTerm, setSearchTerm] = React.useState(DEFAULT_QUERY);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    function needsToSearchTopStories(searchTerm) {
        return !topResult.results[searchTerm];
    }

    function setSearchTopStories(result) {
        const {hits, page} = result;
        setTopResult(updateSearchTopStoriesState(hits, page));
        setIsLoading(false);
    }

    function fetchSearchTopStories(searchTerm, page = 0) {
        setIsLoading(true);
        axios.get(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${
            page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(result => isMounted.current && setSearchTopStories(result.data))
            .catch(error => isMounted.current && setError(error));
    }

    function onSearchChange(event) {
        setSearchTerm(event.target.value)
    }

    function onSearchSubmit(event) {
        setTopResult({
            ...topResult,
            searchKey: searchTerm
        })

        if (needsToSearchTopStories(searchTerm)) {
            fetchSearchTopStories(searchTerm);
        }

        event.preventDefault();
    }

    function onDismiss(id) {
        const {hits, page} = topResult.results[topResult.searchKey];
        const updatedHits = hits.filter(item => item.objectID !== id);
        const newTopResult = {...topResult};
        newTopResult.results[[topResult.searchKey]] = {hits: updatedHits, page};
        setTopResult(newTopResult)
    }

    useMountEffect(() => {
        isMounted.current = true;
        fetchSearchTopStories(DEFAULT_QUERY);

        return () => {
            isMounted.current = false;
        };
    })

    const {results, searchKey} = topResult;
    const page = (
        results &&
        results[searchKey] &&
        results[searchKey].page
    ) || 0;

    const list = (
        results &&
        results[searchKey] &&
        results[searchKey].hits
    ) || [];

    return (
        <div className="page">
            <div className="interactions">
                <Search
                    value={searchTerm}
                    onChange={onSearchChange}
                    onSubmit={onSearchSubmit}
                >
                    Search
                </Search>
            </div>
            {error
                ? <div className="interactions">
                    <p>Something went wrong.</p>
                </div>
                : <Table
                    list={list}
                    onDismiss={onDismiss}
                />
            }
            <div className="interactions">
                <ButtonWithLoading
                    isLoading={isLoading}
                    onClick={() => fetchSearchTopStories(searchKey, page + 1)}
                >
                    More
                </ButtonWithLoading>
            </div>
        </div>
    );
}

export default App;