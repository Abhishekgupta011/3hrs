import React from "react";
import Button from "./Button";

const TableList = ({ bills, deleteBill }) => {
  const handleDeleteBill = (table, id) => {
    deleteBill(table, id);
  };

  const renderBillsByTable = (table) => {
    const tableBills = bills.filter((bill) => bill.table === table);

    const handleDeleteButton = (id) => {
      handleDeleteBill(table, id);
    };

    return tableBills.map((bill) => (
      <div key={bill.id}>
        <ul>
          <li>Unique Id: {bill.id}</li>
          <li>Price: {bill.price}</li>
          <li>Dish Name: {bill.dishName}</li>
        </ul>
        <Button onClick={() => handleDeleteButton(bill.id)}>Delete</Button>
      </div>
    ));
  };

  return (
    <>
      <div>
        <h1>Table 1</h1>
        {renderBillsByTable("Table 1")}
      </div>
      <div>
        <h1>Table 2</h1>
        {renderBillsByTable("Table 2")}
      </div>
      <div>
        <h1>Table 3</h1>
        {renderBillsByTable("Table 3")}
      </div>
    </>
  );
};

export default TableList;
