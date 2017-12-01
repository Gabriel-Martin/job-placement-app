import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import styled from "styled-components";
// column that holds the applications
// outside box
const style = {
  // height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
  borderTop: "6px solid #1ba39c",
  display: "flex",
  flexDirection: "column",
  width: "300px",
  borderRadius: "10px",
  height: "100vh",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)"
};

const columnTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  }
};

class ApplicationStatusColumn extends Component {
  render() {
    const { label, options, connectDropTarget } = this.props;

    return connectDropTarget(
      <div style={style}>
        <Head3>{label}</Head3>
        {options}
      </div>
    );
  }
}

const Head3 = styled.h3.attrs({ className: "avenir fw1 f4 " })`
  text-align: center;
  font-size: 30px;
  color: black;
`;

export default DropTarget(
  props => props.accepts,
  columnTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  })
)(ApplicationStatusColumn);
