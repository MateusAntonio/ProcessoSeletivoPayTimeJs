import React from "react";
import { Modal } from "antd";

const ItemModal = props => {
  const {
    isModalVisible,
    isEditingMode,
    setModalVisibility,
    setIsEditingMode,
    handleEditItem,
    handleCreateItem,
    newItem,
    setQuantity,
    setItemName,
    setImportance
  } = props;
  return (
    <Modal
      title="Preencha os campos"
      visible={isModalVisible}
      onCancel={() => {
        setModalVisibility(false);
        setIsEditingMode(false);
      }}
      onOk={() => {
        if (isEditingMode) {
          handleEditItem();
        } else {
          handleCreateItem();
        }
        setModalVisibility(false);
        setIsEditingMode(false);
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
            value={newItem.quantity}
            onChange={e => {
              setQuantity(e.target.value);
            }}
          />
        </div>

        <div className="input-block">
          <label>Nome do item</label>
          <input
            type="text"
            name="item_name"
            required
            value={newItem.item_name}
            onChange={e => {
              setItemName(e.target.value);
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
              checked={newItem.importance === 3}
              required
              onChange={e => {
                setImportance(e.target.value);
              }}
            />
            <label>Baixa</label>
          </div>

          <div className="radio-group">
            <input
              type="radio"
              name="importance"
              value="2"
              checked={newItem.importance === 2}
              onChange={e => {
                setImportance(e.target.value);
              }}
            />
            <label>Média</label>
          </div>

          <div className="radio-group">
            <input
              type="radio"
              name="importance"
              value="1"
              checked={newItem.importance === 1}
              onChange={e => {
                setImportance(e.target.value);
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
