import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Button from "./index.js";

describe('Button', () => {
    const customButton = <Button
        onClick={(event) => console.log(event)}
        onDismiss={(event) => console.log(event)}>
        Give Me More
    </Button>

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(customButton, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('has a valid snapshot', () => {
        const component = renderer.create(customButton);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});