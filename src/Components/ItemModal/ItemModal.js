import React from "react";
import { Modal } from "antd";

const ItemModal = props => {
  return (
    <Modal
      title="Preencha os campos"
      visible={props.isModalVisible}
      onCancel={() => {
        props.setModalVisibility(false);
        props.setisEditingMode(false);
      }}
      onOk={() => {
        if (props.isEditingMode) {
          props.handleEditItem();
        } else {
          props.handleCreateItem();
        }
        props.setModalVisibility(false);
        props.setisEditingMode(false);
      }}
    >
      <form>
        <div className="input-block">
          <label>Quantidade</label>
          <input
            type="number"
            name="quantity"
            min="0"
            required
            value={props.newItem.quantity}
            onChange={e => {
              props.setQuantity(e.target.value);
            }}
          />
        </div>

        <div className="input-block">
          <label>Nome do item</label>
          <input
            type="text"
            name="item_name"
            required
            value={props.newItem.item_name}
            onChange={e => {
              props.setItemName(e.target.value);
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
              checked={props.newItem.importance === 3}
              required
              onChange={e => {
                props.setImportance(e.target.value);
              }}
            />
            <label>Baixa</label>
          </div>

          <div className="radio-group">
            <input
              type="radio"
              name="importance"
              value="2"
              checked={props.newItem.importance === 2}
              onChange={e => {
                props.setImportance(e.target.value);
              }}
            />
            <label>Média</label>
          </div>

          <div className="radio-group">
            <input
              type="radio"
              name="importance"
              value="1"
              checked={props.newItem.importance === 1}
              onChange={e => {
                props.setImportance(e.target.value);
              }}
            />
            <label>Alta</label>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ItemModal;
