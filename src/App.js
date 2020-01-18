import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import ItemsTableComponent from "./Components/ItemsTableComponent/ItemsTableComponent";
import ItemService from "./Services/ItemService";
import ImportanceTag from "./Components/ImportanceTag/index";
import Button from "./Components/Button";
import { Divider } from "antd";

class App extends Component {
  columns = [
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
      editable: true,
      render: importance => (
        <ImportanceTag importance={importance}>{importance}</ImportanceTag>
      )
    },
    {
      title: "Action",
      key: "action",
      render: () => {
        return (
          <>
            <Button>Edit</Button>
            <Divider type="vertical"></Divider>
            <Button type="delete">Delete</Button>
          </>
        );
      }
    }
  ];

  state = {
    items: []
  };
  async componentDidMount() {
    const items = await ItemService.getItems();
    // A biblioteca recomenda que cada elemento tenha uma key unica
    this.setState({
      items: items.map((item, key) => ({ ...item, key }))
    });
    // ItemService.createItem({
    //   item_name: "creme de leite",
    //   importance: "1",
    //   quantity: "2"
    // });
    // ItemService.updateItem(39, {
    //   item_name: "creme de abacate",
    //   importance: "25",
    //   quantity: "5"
    // });
    // ItemService.deleteItem(39);
  }

  render() {
    return (
      <div>
        <ItemsTableComponent
          columns={this.columns}
          dataSource={this.state.items}
        ></ItemsTableComponent>
      </div>
    );
  }
}

export default App;
