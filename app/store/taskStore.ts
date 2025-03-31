import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  isComplete: boolean;
  isImportant: boolean;
}


interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  selectedTask: Task | null;
  isModalOpen: boolean;
  allTasks: () => Promise<void>;
  createTask: (task: Omit<Task, "id">) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (task: Partial<Task> & { id: string }) => Promise<void>;
  setSelectedTask: (task: Task | null) => void;
  openModal: () => void;
  closeModal: () => void;
}


export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  selectedTask: null,
  isModalOpen: false,

  allTasks: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/api/tasks");
      set({ tasks: res.data });
    } catch (error) {
      console.error(error);
    }
    set({ isLoading: false });
  },

  createTask: async (task) => {
    try {
      await axios.post("/api/tasks", task);
      toast.success("Task created successfully!");
      await get().allTasks();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted!");
      await get().allTasks();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  },

  updateTask: async (task) => {
    try {
      await axios.put(`/api/tasks`, task);
      toast.success("Task updated!");
      await get().allTasks();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  },

  setSelectedTask: (task) => set({ selectedTask: task }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedTask: null }),
}));
