import React from "react";
import TaskList from "../components/Tasklist/TaskList";
import { localURL } from "../assets/httpService/httpService";

function Upcoming() {
  return (
    <TaskList
      apiUrl={`${localURL}/api/tasks/upcoming`}
      text="Upcoming Tasks"
      showCreateButton={false}
    />
  );
}

export default Upcoming;
