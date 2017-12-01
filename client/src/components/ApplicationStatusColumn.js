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
  display: "flex",
  flexDirection: "column",
  width: "300px",
  height: "100vh"
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
  background-color: #fff;
  border-top: 6px solid #550c18;
  border-radius: 5px;
`;

export default DropTarget(
  props => props.accepts,
  columnTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  })
)(ApplicationStatusColumn);
