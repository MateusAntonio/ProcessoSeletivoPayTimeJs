import React from "react";
import { Table } from "antd";

const TableComponent = props => {
  return <Table dataSource={props.dataSource} columns={props.columns}></Table>;
};

export default TableComponent;
