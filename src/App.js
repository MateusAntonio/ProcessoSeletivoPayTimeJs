import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import ItemsTableComponent from "./Components/ItemsTableComponent/ItemsTableComponent";
import ItemService from "./Services/ItemService";
import ImportanceTag from "./Components/ImportanceTag/index";
import Button from "./Components/Button";
import { Divider, Modal } from "antd";

class App extends Component {
  state = {
    items: [],
    modalVisible: false,
    newItem: {
      quantity: 0,
      item_name: "",
      importance: 3
    }
  };

  setModalVisibility(visible) {
    this.setState({ modalVisible: visible });
  }

  setQuantity(quantity) {
    const { newItem } = this.state;
    this.setState({
      newItem: {
        quantity: quantity,
        item_name: newItem.item_name,
        importance: newItem.importance
      }
    });
  }
  setItemName(name) {
    const { newItem } = this.state;
    this.setState({
      newItem: {
        quantity: newItem.quantity,
        item_name: name,
        importance: newItem.importance
      }
    });
  }
  setImportance(importance) {
    const { newItem } = this.state;
    this.setState({
      newItem: {
        quantity: newItem.quantity,
        item_name: newItem.item_name,
        importance: importance
      }
    });
  }

  deleteItem = async itemId => {
    await ItemService.deleteItem(itemId);
    const { items } = this.state;
    const remainingArray = items.filter(item => item.id !== itemId);
    this.setState({
      items: remainingArray
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    ItemService.createItem(this.state.newItem);
    // Visando garantir a unicidade das keys, pegar o id do objeto no banco parece a opção mais segura
    // em troca de requisição extra ao BD
    const items = await ItemService.getItems();
    this.setState({
      items: items.map((item, key) => ({ ...item, key: item.id }))
    });
  };

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
      render: (text, record) => {
        return (
          <>
            <Button type="edit"> Editar</Button>
            <Divider type="vertical"></Divider>
            <Button type="delete" click={() => this.deleteItem(record.id)}>
              Deletar
            </Button>
          </>
        );
      }
    }
  ];
  async componentDidMount() {
    const items = await ItemService.getItems();
    // A biblioteca recomenda que cada elemento tenha uma key unicas.
    this.setState({
      items: items.map(item => ({ ...item, key: item.id }))
    });
  }

  render() {
    return (
      <div>
        <ItemsTableComponent
          columns={this.columns}
          dataSource={this.state.items}
        ></ItemsTableComponent>
        <Button type="new" click={() => this.setModalVisibility(true)}>
          Novo
        </Button>
        <Modal
          title="Preencha os campos"
          visible={this.state.modalVisible}
          onCancel={() => this.setModalVisibility(false)}
          onOk={() => this.setModalVisibility(false)}
        >
          <form>
            <div className="input-block">
              <label>Quantidade</label>
              <input
                type="number"
                name="quantity"
                onChange={e => {
                  this.setQuantity(e.target.value);
                }}
              />
            </div>

            <div className="input-block">
              <label>Nome do item</label>
              <input
                type="text"
                name="item_name"
                onChange={e => {
                  this.setItemName(e.target.value);
                }}
              />
            </div>

            <div className="input-block">
              <label id="importance">Importancia</label>

              <div className="radio-group">
                <input
                  type="radio"
                  name="importance"
                  value="3"
                  onChange={e => {
                    this.setImportance(e.target.value);
                  }}
                />
                <label>Baixa</label>
              </div>

              <div className="radio-group">
                <input
                  type="radio"
                  name="importance"
                  value="2"
                  onChange={e => {
                    this.setImportance(e.target.value);
                  }}
                />
                <label>Média</label>
              </div>

              <div className="radio-group">
                <input
                  type="radio"
                  name="importance"
                  value="1"
                  onChange={e => {
                    this.setImportance(e.target.value);
                  }}
                />
                <label>Alta</label>
              </div>
            </div>

            <input
              type="submit"
              value="Criar"
              onClick={this.handleSubmit}
            ></input>
          </form>
        </Modal>
      </div>
    );
  }
}

export default App;
