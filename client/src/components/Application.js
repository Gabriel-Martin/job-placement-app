import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import { Link } from "react-router-dom";
// little box in kanban
const style = {
  padding: "1.5rem 2.5rem",

  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
  backgroundColor: "#f8f8ff",
  borderRadius: "5px"
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
      <div style={{ ...style, color: "black", fontSize: "18px" }}>
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
