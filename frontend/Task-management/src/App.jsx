import React, { useEffect, useState } from "react";
import CreatePage from "./CreatePage";

function App() {
  const [inp, setInp] = useState({
    name: "",
    description: "",
  });

  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  //fetchTasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInp((prev) => ({ ...prev, [name]: value }));
  };

  //edit
  const handleEdit = (id) => {
    setInp(tasks[id]);
    setIsEditing(true);
    setEditId(id);
    console.log(isEditing);
  };

  //update
  const handleUpdate = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inp),
    });

    if (response.ok) {
      const updatedTasks = [...tasks];
      updatedTasks[editId] = inp;
      setTasks(updatedTasks);
      setInp({ name: "", description: "" });
      setIsEditing(false);
      setEditId(null);
    }
  };

  //delete
  const handleDel = async (id) => {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "Delete",
    });
    if (response.ok) {
      setTasks((prev) => prev.filter((__dirname, index) => index !== id));
    } else {
      console.log("failed to delete task");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Task Management</h1>
      <br></br>
      {isEditing ? (
        <div className="col-sm-4 m-auto border border-dark p-4">
          <h3>Edit Task</h3>
          <input
            className="form-control my-2"
            type="text"
            name="name"
            placeholder="Task name"
            value={inp.name}
            onChange={handleChange}
          />
          <textarea
            className="form-control my-2"
            name="description"
            placeholder="Task description"
            value={inp.description}
            onChange={handleChange}
          ></textarea>
          <button className="btn btn-primary mt-2" onClick={handleUpdate}>
            Update Task
          </button>
        </div>
      ) : (
        <>
          <CreatePage inp={inp} setInp={setInp} setTasks={setTasks} />
          <div className="row m-3 my-5 gap-5">
            <hr></hr>
            <h1 className="text-start ">Tasks</h1>
            {tasks.map((task, id) => {
              return (
                <div className="card col-sm-3 p-3 text-center" key={id}>
                  <p className="fs-5 fw-bold">{task.name}</p>
                  <p>{task.description}</p>
                  <button
                    className="btn btn-outline-danger m-2"
                    onClick={() => handleDel(id)}
                  >
                    delete
                  </button>

                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      handleEdit(id);
                    }}
                  >
                    edit
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
