import React from 'react';
import TodoListItem from '../todolistitem/todolistitem.component';

export default class TodoList extends React.Component {

    render() {
        return (     
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Content</th>
                    </tr>
                </thead>

                <tbody>
                    {this.props.items.map((item, index) => {

                        return (<TodoListItem key={index} value={Object.assign({}, item, { index })}  {...this.props} />)
                    })}
                 
                </tbody>
            </table>
        )
    }
}