import React, { useEffect, useState } from "react";

export default function Homepage() {
  // handle add new item
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // filter tab
  const [filter, setFilter] = useState("All");
  const [filteredItems, setFilteredItems] = useState([]);
  //handle tab select
  const [activeTab, setActiveTab] = useState("All");

  const addItemToList = (newItem) => {
    const lowercaseItem = newItem.toLowerCase();

    if (items.some((item) => item.name.toLowerCase() === lowercaseItem)) {
      alert("Task đã tồn tại");
      return;
    }
    if (newItem.trim() !== "") {
      const newItemObject = {
        // object for handle active and completed task
        name: newItem,
        completed: false,
      };
      setItems([...items, newItemObject]);
      setInputValue("");
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddButtonClick = () => {
    if (inputValue.trim() == "") {
      alert("Không được để trống");
      return;
    }
    addItemToList(inputValue);
    setInputValue("");
  };
  // handle delete
  const handleDeleteButtonClick = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // load items from localStorage
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("todoItems"));
    if (savedItems) {
      setItems(savedItems);
    }
  }, []);

  // save item to localStorage
  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(items));
  }, [items]);
  // handle filter item
  useEffect(() => {
    let filteredItems = [];
    if (filter === "All") {
      filteredItems = items;
    } else if (filter === "Active") {
      filteredItems = items.filter((item) => !item.completed);
    } else if (filter === "Completed") {
      filteredItems = items.filter((item) => item.completed);
    }
    setFilteredItems(filteredItems);
  }, [filter, items]);

  const handleCheckboxChange = (index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = !updatedItems[index].completed;
    setItems(updatedItems);
  };

  // delete all btn
  const handleDeleteAllButton = () => {
    localStorage.removeItem("todoItems");
    setItems([]);
    setFilteredItems([]);
  };

  // check active tab
  const setActiveTabHandler = (tab) => {
    setActiveTab(tab);
    setFilter(tab); //
  };
  return (
    <div className="container">
      <h1>#todo</h1>
      <ul>
        <li onClick={() => setActiveTabHandler("All")}>
          <h3 className={activeTab === "All" ? "active" : ""}>All</h3>
        </li>
        <li onClick={() => setActiveTabHandler("Active")}>
          <h3 className={activeTab === "Active" ? "active" : ""}>Active</h3>
        </li>
        <li onClick={() => setActiveTabHandler("Completed")}>
          <h3 className={activeTab === "Completed" ? "active" : ""}>
            Completed
          </h3>
        </li>
      </ul>
      <hr />
      <div className="input-and-btn-container">
        <input
          type="text"
          placeholder="add details"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddButtonClick}>Add</button>
      </div>
      <div className="list-item">
        {/* Render item */}
        {filteredItems.map((item, index) => (
          <div className="list-body">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleCheckboxChange(index)}
            />
            <h4 className="list-title">{item.name}</h4>
            <button
              className="btn"
              onClick={() => handleDeleteButtonClick(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <button className="delete-all" onClick={handleDeleteAllButton}>
          Delete all
        </button>
      </div>
    </div>
  );
}
