import React, { useState, useEffect } from "react";
import { message } from "antd";

import "./App.css";
import "antd/dist/antd.css";

import ItemsTable from "./Components/ItemsTable";
import ItemModal from "./Components/ItemModal";
import ItemService from "./Services/ItemService";
import Button from "./Components/Button";

const AppWithHooks = () => {
  const cleanItem = {
    quantity: 0,
    item_name: "",
    importance: 0
  };

  const [items, setItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [newItem, setNewItem] = useState(cleanItem);
  const [newItemId, setNewItemId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedItems = await ItemService.getItems();
      setItemsWithKeys(fetchedItems);
    };
    fetchData();
  }, []);

  const setQuantity = quantity => {
    setNewItem(prevNewItem => ({
      quantity: quantity,
      item_name: prevNewItem.item_name,
      importance: +prevNewItem.importance
    }));
  };
  const setItemName = name => {
    setNewItem(prevNewItem => ({
      quantity: prevNewItem.quantity,
      item_name: name,
      importance: +prevNewItem.importance
    }));
  };

  const setImportance = importance => {
    setNewItem(prevNewItem => ({
      quantity: prevNewItem.quantity,
      item_name: prevNewItem.item_name,
      importance: +importance
    }));
  };

  const setItemsWithKeys = ReceivedItems => {
    const keyedItems = ReceivedItems.map(item => ({
      ...item,
      key: item.id,
      importance: +item.importance
    }));
    setItems(keyedItems);
  };

  const handleEditClick = item => {
    setNewItem(item);
    setNewItemId(item.id);
    setIsEditingMode(true);
    setIsModalVisible(true);
  };

  const handleCreateClick = () => {
    setNewItem(cleanItem);
    setIsModalVisible(true);
  };

  const handleDeleteItem = async itemId => {
    await ItemService.deleteItem(itemId);
    const remainingArray = items.filter(item => item.id !== itemId);
    setItems(remainingArray);
    message.success("Item deletado com sucesso!");
  };

  const handleCreateItem = async () => {
    const data = await ItemService.createItem(newItem);
    const fetchedItem = await ItemService.getItems();
    setItemsWithKeys(fetchedItem);
    if (data !== (undefined || null)) {
      message.success("Item criado!");
    }
  };

  const handleEditItem = async () => {
    const data = await ItemService.updateItem(newItemId, newItem);
    const fetchedItems = await ItemService.getItems();
    setItemsWithKeys(fetchedItems);
    if (data !== (undefined || null)) {
      message.success("Item editado!");
    }
  };

  return (
    <>
      <ItemsTable
        handleEditClick={handleEditClick}
        handleDeleteItem={handleDeleteItem}
        dataSource={items}
      ></ItemsTable>
      <Button type="new" click={handleCreateClick}>
        Novo
      </Button>
      <ItemModal
        isModalVisible={isModalVisible}
        isEditingMode={isEditingMode}
        newItem={newItem}
        setModalVisibility={setIsModalVisible}
        setIsEditingMode={setIsEditingMode}
        handleCreateItem={handleCreateItem}
        handleEditItem={handleEditItem}
        setQuantity={setQuantity}
        setItemName={setItemName}
        setImportance={setImportance}
      ></ItemModal>
    </>
  );
};

export default AppWithHooks;
