// "use server";

// import { z } from "zod"; //npm i zod https://www.npmjs.com/package/zod
// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// const TaskSchema = z.object({
//   task: z.string().min(6),
//   description: z.string().min(6),
//   // priority: z.string().min(11),
//   // duedate:z.date(),
// });

// export const saveTask = async (prevSate: any, formData: FormData) => {
//   const validatedFields = TaskSchema.safeParse(
//     Object.fromEntries(formData.entries())
//   );

//   if (!validatedFields.success) {
//     return {
//       Error: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   try {
//     await prisma.task.create({
//       data: {
//         task: validatedFields.data.task,
//         description: validatedFields.data.description,
//         // duedate: validatedFields.data.duedate,
//         // priority: validatedFields.data.priority,
//       },
//     });

//   } catch (error) {
//     return { message: "Failed to create new employee" };
//   }

//   revalidatePath("/task");
//   redirect("/task");
// };

// export const getTasklist = async (query: string) => {
//   try {
//     const tasks = await prisma.task.findMany({
//       select: {
//         id: true,
//         task: true,
//         description: true,
//         // phone: true,
//         createdAt: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//     return tasks;
//   } catch (error) {
//     throw new Error("Failed to fetch task data");
//   }
// };

// export const getTaskById = async (id: string) => {
//   try {
//     const task = await prisma.task.findUnique({
//       where: { id },
//     });
//     return task;
//   } catch (error) {
//     throw new Error("Failed to fetch contact data");
//   }
// };

// export const updateTask = async (
//   id: string,
//   prevSate: any,
//   formData: FormData
// ) => {
//   const validatedFields = TaskSchema.safeParse(
//     Object.fromEntries(formData.entries())
//   );

//   if (!validatedFields.success) {
//     return {
//       Error: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   try {
//     await prisma.task.update({
//       data: {
//         task: validatedFields.data.task,
//         description: validatedFields.data.description,
//         // phone: validatedFields.data.phone,
//       },
//       where: { id },
//     });
//   } catch (error) {
//     return { message: "Failed to update task" };
//   }

//   revalidatePath("/task");
//   redirect("/task");
// };

// export const deleteTask = async (id: string) => {
//   try {
//     await prisma.task.delete({
//       where: { id },
//     });
//   } catch (error) {
//     return { message: "Failed to delete task" };
//   }

//   revalidatePath("/task");
// };

"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// const TaskSchema = z.object({
//   task: z.string().min(6),
//   description: z.string().min(6),
// });

// const TaskSchema = z.object({
//   task: z.string().min(6),
//   description: z.string().min(6),
//   priority: z.enum(["Low", "Medium", "High"]),
//   status: z.enum(["Pending", "Completed"]),
// });

// export const saveTask = async (prevSate: any, formData: FormData) => {
//   const validatedFields = TaskSchema.safeParse(
//     Object.fromEntries(formData.entries())
//   );

//   if (!validatedFields.success) {
//     return {
//       Error: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   try {
//     await prisma.task.create({
//       data: {
//         task: validatedFields.data.task,
//         description: validatedFields.data.description,
//         priority: validatedFields.data.priority,
//         status: validatedFields.data.status,
//       },
//     });
//   } catch (error) {
//     return { message: "Failed to create task" };
//   }

//   revalidatePath("/task");
//   redirect("/task");
// };

export const saveTask = async (prevState: any, formData: FormData) => {
  const task = formData.get("task") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;
  const status = formData.get("status") as string;

  if (!task || !description) {
      return { Error: { task: "Task is required", description: "Description is required" } };
  }

  try {
      await prisma.task.create({
          data: { task, description, priority, status },
      });

      console.log("Task Saved:", { task, description, priority, status });

      revalidatePath("/task"); // ✅ Refresh task list
      redirect("/task"); // ✅ Redirect to task list

  } catch (error) {
      console.error("Failed to save task:", error);
      return { message: "Error saving task" };
  }
};
export const getTaskslist = async (query: string = "") => {
  try {
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        task: true,
        description: true,
        priority: true,
        status: true,
        createdAt: true,
      },
      where: {
        task: {
          contains: query,
          // mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch task data");
  }
};

export const getTaskById = async (id: string) => {
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return { message: "Task not found" };
    return task;
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    throw new Error("Failed to fetch task data");
  }
};

// export const updateTask = async (
//   id: string,
//   prevState: any,
//   formData: FormData
// ) => {
//   const validatedFields = TaskSchema.safeParse(
//     Object.fromEntries(formData.entries())
//   );

//   if (!validatedFields.success) {
//     return { Error: validatedFields.error.flatten().fieldErrors };
//   }

//   try {
//     await prisma.task.update({
//       data: {
//         task: validatedFields.data.task,
//         description: validatedFields.data.description,
//       },
//       where: { id },
//     });
//   } catch (error) {
//     console.error("Error updating task:", error);
//     return { message: "Failed to update task" };
//   }

//   revalidatePath("/task");
//   redirect("/task");
// };

export const updateTask = async (id: string, prevState: any, formData: FormData) => {
  const task = formData.get("task") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;
  const status = formData.get("status") as string;
  if (!task || !description || !priority || !status) {
      return { Error: { task: "Task is required", description: "Description is required",priority: "Priority is required",status: "Stauts is required" } };
  }

  try {
      await prisma.task.update({
          where: { id },
          data: { task, description,priority,status },
      });

      console.log("Task Updated:", { id, task, description,priority,status });

      revalidatePath("/task"); // ✅ Refresh task list
      redirect("/task"); // ✅ Redirect to task list after update

  } catch (error) {
      console.error("Failed to update task:", error);
      return { message: "Error updating task" };
  }
};
export const deleteTask = async (id: string) => {
  try {
    await prisma.task.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting task:", error);
    return { message: "Failed to delete task" };
  }

  revalidatePath("/task");
  redirect("/task");
};
