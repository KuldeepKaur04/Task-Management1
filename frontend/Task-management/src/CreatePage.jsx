import React from "react";

function CreatePage({ inp, setTasks, setInp }) {
  const handleChange = (e) => {
    let { name, value } = e.target;
    setInp((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/tasks/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inp),
      });

      if (response.ok) {
        const result = await response.json();
        setTasks(result.tasks);
        setInp({ name: "", description: "" });
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form
      className="col-sm-4 m-auto d-flex flex-column border border-dark p-5 justify-content-around "
      onSubmit={handleCreate}
    >
      <input
        className="p-2 my-3"
        type="text"
        name="name"
        placeholder="Enter Task..."
        value={inp.name}
        onChange={handleChange}
      ></input>
      <textarea
        className="my-3 mb-4"
        placeholder="Task description.."
        name="description"
        value={inp.description}
        onChange={handleChange}
        cols="50"
      ></textarea>

      <button
        className="btn btn-primary btn-lg text-light"
        onClick={handleCreate}
      >
        Add Task
      </button>
    </form>
  );
}

export default CreatePage;
