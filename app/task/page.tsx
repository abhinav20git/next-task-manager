import Link from "next/link";
import { getTaskslist } from "@/lib/action";
import { formatDate } from "@/lib/utils";
import { DeleteButton } from "@/components/delete";

const Task = async ({ query }: { query: string }) => {
  const tasks = await getTaskslist(query);
  return (
    <div className="w-screen h-screen py-20 flex justify-center flex-col items-center">
      <div className="flex items-center justify-between gap-1 mb-5">
        <h1 className="text-4xl font-bold">
          Task Manager <p className=" text-xl">by Abhinav</p>
        </h1>
      </div>
      <div className="overflow-x-auto">
        <div className="mb-2 w-full text-right">
          <Link href="/task/create" className="btn btn-primary">
            Create
          </Link>
        </div>
        <table className="table ">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Task</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Priority</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Created At</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((rs, index) => (
              <tr key={rs.id} className="border-b text-black">
                <td className="py-3 px-6 ">{index + 1}</td>
                <td className="py-3 px-6">{rs.task}</td>
                <td className="py-3 px-6">{rs.description}</td>
                <td className="py-3 px-6">{rs.priority}</td>
                <td className="py-3 px-6">{rs.status}</td>
                <td className="py-3 px-6">
                  {formatDate(rs.createdAt.toString())}
                </td>
                <td className="flex justify-center gap-1 py-3">
                  <Link href={`/task/edit/${rs.id}`} className="btn btn-info">
                    Edit
                  </Link>
                  <DeleteButton id={rs.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
