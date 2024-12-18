import { Button, TextInput } from "flowbite-react";
import React from "react";

const AddTaskForm = (props) => {
  const { handleSubmit, onChangeInput, formData } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center space-x-1">
        <TextInput
          id="text"
          name="taskName"
          className="w-full"
          type="text"
          placeholder="text"
          value={formData.taskName || ""}
          onChange={onChangeInput}
        />
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
};

export default AddTaskForm;
