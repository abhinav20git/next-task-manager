import { deleteTask } from "@/lib/action";
 
export const DeleteButton = ({ id }: { id: string }) => {
  const DeleteTaskWithId = deleteTask.bind(null, id);
  return (
    <form action={DeleteTaskWithId}>
      <button className="btn btn-error">
        Delete
      </button>
    </form>
  );
};