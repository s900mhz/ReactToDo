import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";

const SortableItem = SortableElement(({ value }) => <li>{value}</li>);

class ToDoItem extends Component {
  deleteTasks(key) {
    this.props.delete(key);
  }

  render() {
    return (
    <ul className="list-group">
      {this.props.items.map((item, i) => (
        <SortableItem key={i} index={i}>
          {item}
          <button className="close" onClick={() => this.deleteTasks(i)}>
            X
          </button>
        </SortableItem>
      ))}
    </ul>
    )
  }
}

export default ToDoItem;
