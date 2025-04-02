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

  // Preenche os campos se estiver editando
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setDeadline(selectedTask.date);
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
        console.log(taskPayload);
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
        {/* Este botão abre o modal para criação; se preferir, pode ser exibido em outro lugar */}
        <Button variant="default" onClick={openModal}>
          Create New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black">
            {selectedTask ? "Edit Task" : "Create a New Task"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Toaster />
          {/* Campo Title */}
          <div className="flex flex-col">
            <Label className="text-black">Title</Label>
            <Input
              className="text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
            />
          </div>
          {/* Campo Description */}
          <div className="flex flex-col">
            <Label className="text-black">Description</Label>
            <Textarea
              className="text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description..."
            />
          </div>
          {/* Campo Deadline */}
          <div className="flex flex-col">
            <Label className="text-black">Deadline</Label>
            <Input
              className="text-black"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          {/* Checkboxes */}
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="important"
                checked={isImportant}
                onCheckedChange={(checked) => setIsImportant(checked === true)}
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
              />
              <Label className="text-black" htmlFor="complete">
                Complete
              </Label>
            </div>
          </div>
          {/* Botão de salvar */}
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : selectedTask ? "Update Task" : "Save Task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
