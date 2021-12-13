import React from "react";

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, onItemSelect, selectedItem } =
    props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          style={{ cursor: "pointer" }}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};

export default ListGroup;
