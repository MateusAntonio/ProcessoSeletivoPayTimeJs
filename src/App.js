import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import TableComponent from "./Components/ItemsTableComponent/ItemsTableComponent";

function App() {
  let dataSource = [
    {
      id: 14,
      item_name: "arroz",
      importance: "3",
      quantity: 1,
      user_id: 6,
      created_at: "2020-01-10 13:37:07",
      updated_at: "2020-01-10 13:37:07"
    },
    {
      id: 15,
      item_name: "feijão",
      importance: "2",
      quantity: 1,
      user_id: 6,
      created_at: "2020-01-10 13:37:16",
      updated_at: "2020-01-10 13:37:16"
    },
    {
      id: 16,
      item_name: "batata",
      importance: "1",
      quantity: 3,
      user_id: 6,
      created_at: "2020-01-10 13:37:26",
      updated_at: "2020-01-10 13:37:26"
    },
    {
      id: 17,
      item_name: "creme de leite",
      importance: "1",
      quantity: 2,
      user_id: 6,
      created_at: "2020-01-10 13:37:36",
      updated_at: "2020-01-10 13:37:36"
    }
  ];

  let columns = [
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity"
    },
    {
      title: "item_name",
      dataIndex: "item_name",
      key: "item_name"
    },
    {
      title: "Importance",
      dataIndex: "importance",
      key: "importance"
    }
  ];

  return (
    <div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
      ></TableComponent>
    </div>
  );
}

export default App;
