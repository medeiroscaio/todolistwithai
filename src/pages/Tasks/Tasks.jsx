import "../Tasks/Tasks.css";
import TaskList from "../../components/Tasklist/TaskList";

function Tasks() {
  return (
    <TaskList apiUrl="http://localhost:5000/api/tasks" title="All Tasks" />
  );
}

export default Tasks;
