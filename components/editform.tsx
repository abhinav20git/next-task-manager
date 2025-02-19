"use client";
 
import { updateTask } from "@/lib/action";
import { useActionState } from "react";
import type { Task } from "@prisma/client";
 
const UpdateForm = ({ task }: { task: Task }) => {
    const UpdateTaskWithId = updateTask.bind(null, task.id);
    const [state, formAction] = useActionState(UpdateTaskWithId, null);
 
    return (
    <div>
      <form action={formAction}>
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">
            Task
          </label>
          <input
            type="text"
            name="task"
            id="task"
            className="input input-bordered input-primary w-full max-w-xs"
            placeholder="Task..."
            defaultValue={task.task}
          />
          <div id="task-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.task}</p>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="text" className="block text-sm font-medium text-gray-900">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="input input-bordered input-primary w-full max-w-xs"
            placeholder="Description..."
            defaultValue={task.description}
          />
          <div id="description-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.description}</p>
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-900">
            Priority Level
          </label>
          <select
            name="priority"
            id="priority"
            className="select select-bordered select-primary w-full max-w-xs"
            defaultValue={task.priority} // Default selected value
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.priority}</p>
          </div>
        </div>

        {/* Task Status Dropdown */}
        <div className="mb-5">
          <label htmlFor="status" className="block text-sm font-medium text-gray-900">
            Task Status
          </label>
          <select
            name="status"
            id="status"
            className="select select-bordered select-primary w-full max-w-xs"
            defaultValue={task.status} // Default selected value
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.status}</p>
          </div>
        </div>
        
        {/* <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.message}</p>
        </div> */}
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};
 
export default UpdateForm;