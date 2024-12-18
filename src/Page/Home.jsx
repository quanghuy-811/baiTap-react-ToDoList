import axios from "axios";
import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const [formData, setFormData] = useState({
    taskName: "",
  });

  const [data, setData] = useState([]);

  //   changeInput
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      url: "https://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        getAllTask();
        setFormData({ taskName: "" });
      })
      .catch((err) => alert(err.response.data));
  };

  // Complete
  const conpleteTask = (name) => {
    axios({
      url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${name}`,
      method: "PUT",
    })
      .then((res) => getAllTask())
      .catch((err) => console.log(err));
  };

  // Reject
  const rejectTask = (name) => {
    axios({
      url: `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${name}`,
      method: "PUT",
    })
      .then((res) => getAllTask())
      .catch((err) => console.log(err));
  };

  //   Delete
  const deleteTask = (name) => {
    axios({
      url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${name}`,
      method: "DELETE",
    })
      .then((res) => getAllTask())
      .catch((err) => console.log(err));
  };
  // get All task
  const getAllTask = () => {
    axios({
      url: "https://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllTask();
  }, []);
  return (
    <div className="container max-w-screen-xl">
      <div className="bg-gray-200 mt-24 rounded-lg p-3">
        <h1 className="text-2xl font-bold">ToDoList</h1>
        <div className="p-4">
          {/* Form */}
          <AddTaskForm
            handleSubmit={handleSubmit}
            onChangeInput={onChangeInput}
            formData={formData}
          />

          <TaskList
            data={data}
            deleteTask={deleteTask}
            conpleteTask={conpleteTask}
            rejectTask={rejectTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
