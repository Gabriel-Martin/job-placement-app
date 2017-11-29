import React, { Component } from "react";

import { DragDropContext } from "react-dnd";
import HTML5Backend, { NativeTypes } from "react-dnd-html5-backend";

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
      <div>
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
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(ApplicationKanban);
