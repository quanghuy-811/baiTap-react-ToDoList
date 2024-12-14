import axios from "axios";
import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

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

  //   Delete
  const deleteTask = (name) => {
    axios({
      url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${name}`,
      method: "DELETE",
    })
      .then((res) => getAllTask())
      .catch((err) => console.log(err));
  };

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
          <form onSubmit={handleSubmit}>
            <div className="flex items-center space-x-1">
              <TextInput
                id="text"
                name="taskName"
                className="w-full"
                type="text"
                placeholder="text"
                onChange={onChangeInput}
              />
              <Button type="submit">Add</Button>
            </div>
          </form>

          <div>
            {data?.map((item) => {
              return (
                <div className="flex items-center justify-between bg-white p-2 rounded-md my-2">
                  <p>{item.taskName}</p>
                  <div className="flex space-x-2">
                    {item.status ? (
                      <>
                        <Button color="warning" size="xs">
                          Reject
                        </Button>
                        <Button
                          gradientMonochrome="failure"
                          size="xs"
                          onClick={() => {
                            deleteTask(item.taskName);
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button gradientMonochrome="success" size="xs">
                          Complete
                        </Button>
                        <Button
                          gradientMonochrome="failure"
                          size="xs"
                          onClick={() => {
                            deleteTask(item.taskName);
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
