import Search from "./index.js";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16.1";

Enzyme.configure({adapter: new Adapter()});

describe('Search', () => {
    const searchButton = <Search
        value="defaultValue"
        onChange={(event) => console.log(event)}
        onSubmit={(event) => console.log(event)}
    >Search</Search>

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(searchButton, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('has a valid snapshot', () => {
        const component = renderer.create(searchButton);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});