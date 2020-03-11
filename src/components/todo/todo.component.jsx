import React from 'react';
import PropTypes from 'prop-types';

import TodoForm from '../todoform/todoform.component';
import TodoList from '../todolist/todolist.component';



import { ThemeProvider, ThemeTypes } from '../../Context';
import Message from '../message/message.component';


const API = 'https://jsonplaceholder.typicode.com';

/**
 * Todo Component
 * @version 1.0.0
 * @author JimmyCodder
 * @copyright I.F.E.X Corp
 * @description Todo -> Hight Order Components
 */
class Todo extends React.Component {

  static propTypes = {
    /** title of todo H.O.C */
    title: PropTypes.string
  }

  state = {
    items: []
  }

  addItem = (item) => {
    const items = this.state.items;
    items.unshift({
      title: item
    })

    this.setState({ items });
  }

  removeItem = index => {
    const { items } = this.state;
    items.splice(index, 1);
    this.setState({ items })
  }

  componentDidMount() {
    console.log('After component hes rendered!');
    fetch(`${API}/todos`)
    .then(res => res.ok && res.json())
    .then(data => this.setState({ items: [this.state.items, ...data]}));
  }

  render() {
    
    return (
      <ThemeProvider value={{ theme: ThemeTypes.LIGHT }}>
          <div className="container">
            <Message text="Todo List"/>
            <TodoForm pushToItems={this.addItem} />
            <hr />  

            <TodoList items={this.state.items} 
            onRemove={this.removeItem}/>
          </div>      
      </ThemeProvider>
    )
  }
}
export default Todo;
