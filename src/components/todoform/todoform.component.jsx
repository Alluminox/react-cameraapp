import React from 'react';
import { Context } from '../../Context';


export default class TodoForm extends React.Component {

    state = { todo: '' }

    onAdd = (e) => {
        e.preventDefault();
        
        const { todo } = this.state;

        if (todo) {
            this.props.pushToItems(todo)
            this.setState({  todo:  '' });
        }
    };

    onChange = e => {
        this.setState({ 
            todo: e.target.value 
        });
    }

    render() {
       return (
        <Context.Consumer>
            { obj => {
                return (
                    <div className="form-group row">
                        <input className="form-control col-sm-10" 
                        type="text" 
                        name="todo" 
                        placeholder="Input item to list"  
                        onChange={this.onChange} />
                    <button className="btn btn-success col-sm-1 mx-2" onClick={this.onAdd}>Create</button>
                    </div>
                )
            }}
        </Context.Consumer>
       )
    }

}