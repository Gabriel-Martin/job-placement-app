import React, { Component } from "react";

import styled from "styled-components";
import { DropTarget } from "react-dnd";

// column that holds the applications
// outside box

// Styles for class 'canban-column' can be found in root style.css file.

const columnTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  }
};

class ApplicationStatusColumn extends Component {
  render() {
    const { label, options, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className="canban-column">
        <Head3>{label}</Head3>
        {options}
      </div>
    );
  }
}

const Head3 = styled.h3.attrs({ className: "avenir fw1 f4 " })`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 30px;
  color: black;

  @media screen and (max-width: 850px) {
    margin: 0 auto 1rem auto;
  }
`;

export default DropTarget(
  props => props.accepts,
  columnTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  })
)(ApplicationStatusColumn);
