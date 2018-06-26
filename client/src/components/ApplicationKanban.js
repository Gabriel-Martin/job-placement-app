import React, { Component } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import ApplicationStatusColumn from "./ApplicationStatusColumn";
import Application from "./Application";

const statuses = [
  {
    value: "applied",
    label: "Applied",
    accepts: ["application"]
  },
  {
    value: "pending",
    label: "Pending",
    accepts: ["application"]
  },
  {
    value: "hired",
    label: "Hired",
    accepts: ["application"]
  },
  {
    value: "declined",
    label: "Declined",
    accepts: ["application"]
  }
];

class ApplicationKanban extends Component {
  handleDrop = (index, application) => {
    application.applicationStatus = statuses[index].value;

    this.props.onStatusChange(application);
  };

  render() {
    let { applications = [] } = this.props;

    return (
      <Center>
        {statuses.map(({ accepts, value, label }, index) => (
          <ApplicationStatusColumn
            key={index}
            label={label}
            accepts={accepts}
            onDrop={item => this.handleDrop(index, item)}
            options={applications
              .filter(a => a.applicationStatus === value)
              .map((app, index) => (
                <Application key={index} data={app} type={"application"} />
              ))}
          />
        ))}
      </Center>
    );
  }
}

const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0 1.5rem;

  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

export default DragDropContext(HTML5Backend)(ApplicationKanban);
