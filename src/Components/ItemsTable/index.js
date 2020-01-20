import React from "react";
import { Table, Divider, Popconfirm } from "antd";

import ImportanceTag from "../ImportanceTag";
import Button from "../Button";

const ItemsTable = props => {
  const {
    setIsEditingMode,
    setModalVisibility,
    handleEditClick,
    handleDeleteItem,
    dataSource
  } = props;

  const columns = [
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity"
    },
    {
      title: "Name",
      dataIndex: "item_name",
      key: "item_name"
    },
    {
      title: "Importance",
      dataIndex: "importance",
      key: "importance",
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
            <Button
              type="edit"
              click={() => {
                handleEditClick(record);
                setIsEditingMode(true);
                setModalVisibility(true);
              }}
            >
              {" "}
              Editar
            </Button>
            <Divider type="vertical"></Divider>
            <Popconfirm
              title="Deseja realmente apagar o item?"
              onConfirm={() => handleDeleteItem(record.id)}
              okText="Sim"
              cancelText="Não"
            >
              <button className="btn btn-outline-danger">Deletar</button>
            </Popconfirm>
          </>
        );
      }
    }
  ];

  return <Table dataSource={dataSource} columns={columns}></Table>;
};

export default ItemsTable;
