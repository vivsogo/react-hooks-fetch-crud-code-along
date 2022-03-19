import React, { useEffect,useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
   //here we are updating state.. our goal is to replace the empty items state with the new array from the server 
   // we do that by using setitems inside the .then response 
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, []);
  function handleUpdateItem(updatedItem){
    const updatedItems= items.map((item)=>{
      if (item.id === updatedItem.id){
        return updatedItem;
      } else{
        return item;
      }
    });
    setItems(updatedItems);
  }
  function handleAddItem(newItem){
     setItems([...items,newItem]);
    console.log("In ShoppingList:", newItem)
  }
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
