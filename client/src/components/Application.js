import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import { Link } from "react-router-dom";

const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left"
};

const boxSource = {
  beginDrag(props) {
    return {
      ...props.data
    };
  }
};

class Application extends Component {
  render() {
    const { data, isDragging, connectDragSource } = this.props;
    console.log(data);
    return connectDragSource(
      <div style={{ ...style, color: "black" }}>
        <Link to={`/company/application/${data.id}`}>
          {data.firstName} {data.lastName}
        </Link>
      </div>
    );
  }
}

export default DragSource(
  props => props.type,
  boxSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Application);
