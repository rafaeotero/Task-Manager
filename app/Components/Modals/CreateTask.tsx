"use client";

import { useState } from "react";
import axios from "axios";
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

export default function CreateTaskModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false); // Para desabilitar o botão enquanto salva

  const handleSave = async (e: any) => {
    e.preventDefault();
    console.log("Form submitted");

    const task = {
      title,
      description,
      date: deadline,
      completed: isComplete,
      important: isImportant,
    };

    try {
      setLoading(true);
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        toast.error(res.data.error);
      }
      toast.success("Task created successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create New Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black">Create a New Task</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Toaster /> {/* Exibe os toasts */}
          {/* Título */}
          <div className="flex flex-col">
            <Label className="text-black">Title</Label>
            <Input
              className="text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
            />
          </div>
          {/* Descrição */}
          <div className="flex flex-col">
            <Label className="text-black">Description</Label>
            <Textarea
              className="text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description..."
            />
          </div>
          {/* Prazo */}
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
                onCheckedChange={setIsImportant}
              />
              <Label className="text-black" htmlFor="important">
                Important
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="complete"
                checked={isComplete}
                onCheckedChange={setIsComplete}
              />
              <Label className="text-black" htmlFor="complete">
                Complete
              </Label>
            </div>
          </div>
          {/* Botão de Salvar */}
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
