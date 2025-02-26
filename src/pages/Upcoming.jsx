import React from "react";
import TaskList from "../components/Tasklist/TaskList";

function Upcoming() {
  return (
    <TaskList
      apiUrl="http://localhost:5000/api/tasks/upcoming"
      text="Upcoming Tasks"
    />
  );
}

export default Upcoming;
