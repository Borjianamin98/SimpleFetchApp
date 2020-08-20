import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16.1";
import Table from "./index.js";

Enzyme.configure({adapter: new Adapter()});

describe('Table', () => {
    const props = {
        list: [
            {title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y'},
            {title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z'},
        ]
    };
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Table {...props} />, div);
    });
    it('has a valid snapshot', () => {
        const component = renderer.create(<Table {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('shows two items in list', () => {
        const element = shallow(<Table {...props} />);
        expect(element.find('.table-row').length).toBe(2);
    });
});