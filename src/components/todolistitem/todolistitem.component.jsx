import React from 'react';

const TodoListItem = props => (
    <tr>
        <td>{props.value.index}</td>
        <td>{props.value.title}</td>
        <td>
            <button className="btn btn-danger btn-sm" onClick={() => props.onRemove(props.value.index)}>Remove</button>
        </td>
    </tr>
)

export default TodoListItem;
