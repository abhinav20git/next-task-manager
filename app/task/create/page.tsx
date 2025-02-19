"use client";

import { saveTask } from "@/lib/action";
import Link from "next/link";
import { useActionState } from "react";

const CreateTaskPage = () => {
  const [state, formAction] = useActionState(saveTask, null);
  return (
    <div className="max-w-md mx-auto mt-5 h-screen ">
      <h1 className="text-2xl text-center mb-2">Add New Task</h1>
      <div>
        <form action={formAction}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900"
            >
              Task
            </label>
            <input
              type="text"
              name="task"
              id="task"
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Task..."
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              <p className="mt-2 text-sm text-red-500">{state?.Error?.task}</p>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Description..."
            />
            <div id="description-error" aria-live="polite" aria-atomic="true">
              <p className="mt-2 text-sm text-red-500">
                {state?.Error?.description}
              </p>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-900"
            >
              Priority Level
            </label>
            <select
              name="priority"
              id="priority"
              className="select select-bordered select-primary w-full max-w-xs"
              defaultValue="Medium" // Default selected value
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Task Status Dropdown */}
          <div className="mb-5">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-900"
            >
              Task Status
            </label>
            <select
              name="status"
              id="status"
              className="select select-bordered select-primary w-full max-w-xs"
              defaultValue="Pending" // Default selected value
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button className="btn btn-primary">
            {/* <Link href="/"> */}
            Save
            {/* </Link> */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;
