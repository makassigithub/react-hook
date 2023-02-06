import React, { useEffect, useState } from "react"
  
function List({ getItems }){
  
    /* Initial state of the items */
    const [items, setItems] = useState([]);
  
    /* This hook sets the value of items if 
       getItems object changes */
    useEffect(() => {
        console.log("Fetching items....");
        setItems(getItems());
    }, [getItems]);
  
    /* Maps the items to a list */
    return <div>
        {
        items.map(item => <div key={item}>{item}</div>)
        }
    </div>
}
export default List;