import React from "react";
import { Table } from "antd";

const ItemsTableComponent = props => {
  return <Table dataSource={props.dataSource} columns={props.columns}></Table>;
};

export default ItemsTableComponent;
