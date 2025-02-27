import React from "react";
import TaskList from "../components/Tasklist/TaskList";

function Today() {
  return (
    <TaskList
      apiUrl="http://localhost:5000/api/tasks/today"
      text="Today Tasks"
      showCreateButton={false}
    />
  );
}

export default Today;
