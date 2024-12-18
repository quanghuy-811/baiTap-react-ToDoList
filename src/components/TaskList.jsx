import { Button } from "flowbite-react";
import React from "react";

const TaskList = (props) => {
  const { data, deleteTask, conpleteTask, rejectTask } = props;
  return (
    <div>
      {data?.map((item) => {
        return (
          <div
            key={item.taskName}
            className="flex items-center justify-between bg-white p-2 rounded-md my-2"
          >
            <p>{item.taskName}</p>
            <div className="flex space-x-2">
              {item.status ? (
                <>
                  <Button
                    color="warning"
                    size="xs"
                    onClick={() => {
                      rejectTask(item.taskName);
                    }}
                  >
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
                  <Button
                    gradientMonochrome="success"
                    size="xs"
                    onClick={() => {
                      conpleteTask(item.taskName);
                    }}
                  >
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
  );
};

export default TaskList;
