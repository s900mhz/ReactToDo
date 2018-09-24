import React from "react";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";

const alertStyles = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "light",
  "dark"
];

//I'm working on trying to assign every item a different color. That's the reason for the weirdness in the classname
const SortableItem = SortableElement(({ value, deleteItem, number }) => {
  return (
    <li className={`alert alert-${alertStyles[number]}`}>
      {value}{" "}
      <button className="close" onClick={() => deleteItem(number)}>
        X
      </button>
    </li>
  );
});

const SortableList = SortableContainer(({ items, deleteFunc }) => {
  return (
    <div className="list-container">
      <h1>Remembrall</h1>
      <ul className="list-group">
        {items.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            number={index}
            value={value}
            deleteItem={deleteFunc}
          />
        ))}
      </ul>
    </div>
  );
});

class ToDoList extends React.Component {
  state = {
    inputValue: "",
    listItems: []
  };

  componentDidMount() {
    this.setState({ listItems: localStorage.getItem("listItems").split(",") });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      listItems: arrayMove(this.state.listItems, oldIndex, newIndex)
    });
    localStorage.setItem("listItems", this.state.listItems);
  };

  addItem = e => {
    this.state.listItems.push(this.state.inputValue);
    this.setState({ inputValue: "" });
    e.preventDefault();
    localStorage.setItem("listItems", this.state.listItems);
  };

  deleteItem = e => {
    let itemArray = this.state.listItems;
    console.log(e);
    itemArray.splice(e, 1);
    this.setState({ listItems: itemArray });
    localStorage.setItem("listItems", this.state.listItems);
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row align-items-start">
          <div className="col">
            <SortableList
              deleteFunc={this.deleteItem}
              items={this.state.listItems}
              onSortEnd={this.onSortEnd}
            />

            <form>
              <input
                type="text"
                name="todoitem"
                value={this.state.inputValue}
                onChange={this.handleChange}
              />
              <button className="btn btn-success" onClick={this.addItem}>
                Add Item
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoList;
