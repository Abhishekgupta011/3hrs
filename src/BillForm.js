import React, { useEffect, useReducer } from "react";
import Input from "./Input";
import Button from "./Button";
import TableList from "./TableList";

const initialState = {
  id: "",
  price: "",
  dishName: "",
  table: "",
  bills: [],
};

const billReducer = (state, action) => {
    switch (action.type) {
    case "ID_INPUT":
        return { ...state, id: action.payload };
      case "PRICE_INPUT":
        return { ...state, price: action.payload };
      case "DISH_NAME_INPUT":
        return { ...state, dishName: action.payload };
      case "TABLE_INPUT":
        return { ...state, table: action.payload };
      case "ADD_BILL":
        return { ...state, bills: [...state.bills, action.payload] };
      case "DELETE_BILL":
        const updatedBills = state.bills.filter(
          (bill) => !(bill.table === action.payload.table && bill.id === action.payload.id)
        );
        return { ...state, bills: updatedBills };
      default:
        return state;
  }
};

function BillForm(props) {
  const [state, dispatch] = useReducer(billReducer, initialState);

  useEffect(() => {
    // Retrieve bills from local storage on component mount
    const storedBills = JSON.parse(localStorage.getItem("bills"));
    if (storedBills) {
      dispatch({ type: "ADD_BILL", payload: storedBills });
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever bills change
    localStorage.setItem("bills", JSON.stringify(state.bills));
  }, [state.bills]);

  const idHandler = (event) => {
    dispatch({ type: "ID_INPUT", payload: event.target.value });
  };

  const priceHandler = (event) => {
    dispatch({ type: "PRICE_INPUT", payload: event.target.value });
  };

  const dishNameHandler = (event) => {
    dispatch({ type: "DISH_NAME_INPUT", payload: event.target.value });
  };

  const tableHandler = (event) => {
    dispatch({ type: "TABLE_INPUT", payload: event.target.value });
  };

  const billPage = () => {
    if (validateForm()) {
      const newBill = {
        id: state.id,
        price: state.price,
        dishName: state.dishName,
        table: state.table,
      };
      dispatch({ type: "ADD_BILL", payload: newBill });
    }
  };

  const deleteBill = (table, id) => {
    dispatch({ type: "DELETE_BILL", payload: { table, id } });
  };

  const validateForm = () => {
    if (
      state.id.trim() === "" ||
      state.price.trim() === "" ||
      state.dishName.trim() === "" ||
      state.table.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return false;
    }

    return true;
  };

  return (
    <div className="form">
      <>
        <label htmlFor="id">Unique Id</label>
        <Input id="id" type="number" value={state.id} onChange={idHandler} />
        <label htmlFor="price">Price</label>
        <Input id="price" type="number" value={state.price} onChange={priceHandler} />
        <label htmlFor="dish">Dish Name</label>
        <Input id="dish" type="text" value={state.dishName} onChange={dishNameHandler} />
        <label htmlFor="table">Choose a Table</label>
        <select id="table" value={state.table} onChange={tableHandler}>
          <option value="">Select a table</option>
          <option value="Table 1">Table 1</option>
          <option value="Table 2">Table 2</option>
          <option value="Table 3">Table 3</option>
        </select>
        <br />
        <Button type="submit" onClick={billPage} className="button">
          Submit
        </Button>
      </>
      <TableList bills={state.bills} deleteBill={deleteBill} />
    </div>
  );
}

export default BillForm;
