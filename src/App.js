import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import TableComponent from "./Components/ItemsTableComponent/ItemsTableComponent";
import ItemService from "./Services/ItemService";
import { Button } from "antd";

class App extends Component {
  constructor() {
    super();
    this.dataSource = [
      {
        key: 14,
        item_name: "arroz",
        importance: "3",
        quantity: 1,
        user_id: 6,
        created_at: "2020-01-10 13:37:07",
        updated_at: "2020-01-10 13:37:07"
      },
      {
        key: 15,
        item_name: "feijão",
        importance: "2",
        quantity: 1,
        user_id: 6,
        created_at: "2020-01-10 13:37:16",
        updated_at: "2020-01-10 13:37:16"
      },
      {
        key: 16,
        item_name: "batata",
        importance: "1",
        quantity: 3,
        user_id: 6,
        created_at: "2020-01-10 13:37:26",
        updated_at: "2020-01-10 13:37:26"
      },
      {
        key: 17,
        item_name: "creme de leite",
        importance: "1",
        quantity: 2,
        user_id: 6,
        created_at: "2020-01-10 13:37:36",
        updated_at: "2020-01-10 13:37:36"
      }
    ];
    this.columns = [
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        editable: true
      },
      {
        title: "Name",
        dataIndex: "item_name",
        key: "item_name",
        editable: true
      },
      {
        title: "Importance",
        dataIndex: "importance",
        key: "importance",
        editable: true
      }
    ];
  }
  async componentDidMount() {
    let response = await ItemService.getItems();
    // ItemService.createItem({
    //   item_name: "creme de leite",
    //   importance: "1",
    //   quantity: "2"
    // });
    // ItemService.updateItem(38, {
    //   item_name: "creme de abacate",
    //   importance: "2",
    //   quantity: "5"
    // });
    // ItemService.deleteItem(38);
    console.log(response);
    this.dataSource = response.data;
  }

  render() {
    return (
      <div>
        <Button type="primary" shape="circle" icon="plus" />
        <TableComponent
          columns={this.columns}
          dataSource={this.dataSource}
        ></TableComponent>
      </div>
    );
  }
}

export default App;
