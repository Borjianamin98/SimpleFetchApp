import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import App, {Search, Button, Table} from './App';

Enzyme.configure({adapter: new Adapter()});

describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('has a valid snapshot', () => {
        const component = renderer.create(<App/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

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

describe('Table', () => {
    const props = {
        list: [
            {title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y'},
            {title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z'},
        ],
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