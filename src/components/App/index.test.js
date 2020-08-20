import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
import App from './index.js';

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