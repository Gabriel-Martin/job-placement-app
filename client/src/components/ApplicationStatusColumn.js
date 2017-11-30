import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
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
  height: "100vh",
  border: "5px solid #bdc3c7",
  borderRadius: "10px",
  backgroundColor: "#bdc3c7"
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
        <h1 style={{ color: "black", fontFamily: "avenir fw1 f4 " }}>
          {label}
        </h1>
        {options}
      </div>
    );
  }
}

export default DropTarget(
  props => props.accepts,
  columnTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  })
)(ApplicationStatusColumn);
