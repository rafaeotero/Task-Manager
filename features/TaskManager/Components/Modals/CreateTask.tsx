"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTaskStore } from "../../store/taskStore";

export default function CreateTaskModal() {
  const {
    selectedTask,
    addTask,
    editTask,
    closeModal,
    isModalOpen,
    openModal,
    fetchTasks,
  } = useTaskStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description || "");
      setDeadline(selectedTask.date || "");
      setIsComplete(selectedTask.isComplete);
      setIsImportant(selectedTask.isImportant);
    } else {
      setTitle("");
      setDescription("");
      setDeadline("");
      setIsComplete(false);
      setIsImportant(false);
    }
  }, [selectedTask]);

  const handleSave = async (e: any) => {
    e.preventDefault();

    const taskPayload = {
      title,
      description,
      date: deadline,
      isImportant,
      isComplete,
    };

    try {
      setLoading(true);
      if (selectedTask) {
        await editTask({ id: selectedTask.id, ...taskPayload });
        toast.success("Task updated successfully");
      } else {
        await addTask(taskPayload);
      }
      await fetchTasks();
      closeModal();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="default"
          onClick={openModal}
          data-testid="open-modal-button"
        >
          Create New Task
        </Button>
      </DialogTrigger>
      <DialogContent data-testid="task-modal">
        <DialogHeader>
          <DialogTitle className="text-black" data-testid="modal-title">
            {selectedTask ? "Edit Task" : "Create a New Task"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4" data-testid="form-container">
          <Toaster />

          <div className="flex flex-col">
            <Label className="text-black" htmlFor="title">
              Title
            </Label>
            <Input
              id="title"
              className="text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
              data-testid="input-title"
            />
          </div>

          <div className="flex flex-col">
            <Label className="text-black" htmlFor="description">
              Description
            </Label>
            <Textarea
              id="description"
              className="text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description..."
              data-testid="input-description"
            />
          </div>

          <div className="flex flex-col">
            <Label className="text-black" htmlFor="deadline">
              Deadline
            </Label>
            <Input
              id="deadline"
              className="text-black"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              data-testid="input-deadline"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="important"
                checked={isImportant}
                onCheckedChange={(checked) => setIsImportant(checked === true)}
                data-testid="checkbox-important"
              />
              <Label className="text-black" htmlFor="important">
                Important
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="complete"
                checked={isComplete}
                onCheckedChange={(checked) => setIsComplete(checked === true)}
                data-testid="checkbox-complete"
              />
              <Label className="text-black" htmlFor="complete">
                Complete
              </Label>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={loading}
            data-testid="save-task-button"
          >
            {loading ? "Saving..." : selectedTask ? "Update Task" : "Save Task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
