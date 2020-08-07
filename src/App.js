import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

class App extends Component {
    constructor(params) {
        super(params);
        this.state = {
            list,
        };
        this.onDismiss = this.onDismiss.bind(this);
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.list.map(value => (
                        <div key={value.objectID}>
                            <span><a href={value.url}>{value.title}</a></span>
                            <span>{value.author}</span>
                            <span>{value.num_comments}</span>
                            <span>{value.points}</span>
                            <span>
                                <button onClick={() => this.onDismiss(value.objectID)}
                                        type="button">Dismiss</button>
                            </span>
                        </div>
                    ))
                }
            </div>
        );
    }

    onDismiss(id) {
        console.log(this.state.list);
        const isNotId = item => item.objectID !== id;
        const updatedList = this.state.list.filter(isNotId);
        this.setState({list: updatedList});
    }
}

export default App;
