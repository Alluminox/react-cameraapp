import React from 'react';

const Message = props => (
    <h1>{props.text || 'Welcome to todo list' }</h1>
)

export default Message;