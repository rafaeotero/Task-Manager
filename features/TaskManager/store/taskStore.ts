import { create } from "zustand";
import toast from "react-hot-toast";
import { getAllTasks, createTask, updateTask, deleteTask } from "../actions/taskActions";

interface Task {
  id: string;
  title: string;
  description: string | null;
  date: string;
  isComplete: boolean;
  isImportant: boolean;
}

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  selectedTask: Task | null;
  isModalOpen: boolean;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  editTask: (task: Partial<Task> & { id: string }) => Promise<void>;
  setSelectedTask: (task: Task | null) => void;
  openModal: () => void;
  closeModal: () => void;

  completedTasks: () => Task[];
  incompleteTasks: () => Task[];
  importantTasks: () => Task[];
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  selectedTask: null,
  isModalOpen: false,

  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const tasks = await getAllTasks();
      set({ tasks });
    } catch (error) {
      console.error(error);
    }
    set({ isLoading: false });
  },

  addTask: async (task) => {
    try {
      await createTask(task);
      toast.success("Task created successfully!");
      await get().fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong addTask");
    }
  },

  removeTask: async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted!");
      await get().fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  },

  editTask: async (task) => {
    try {
      await updateTask(task);
      toast.success("Task updated!");
      await get().fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  },

  setSelectedTask: (task) => set({ selectedTask: task }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedTask: null }),

  completedTasks: () => get().tasks.filter((task) => task.isComplete),
  incompleteTasks: () => get().tasks.filter((task) => !task.isComplete),
  importantTasks: () => get().tasks.filter((task) => task.isImportant),
}));
