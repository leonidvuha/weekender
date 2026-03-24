"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createTrip } from "@/app/actions";

export function AddTripDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Trip</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Weekend Trip</DialogTitle>
        </DialogHeader>
        {/* We use a simple form with our Server Action */}
        <form
          action={async (formData) => {
            await createTrip(formData);
            setOpen(false); // Close modal after saving
          }}
          className="space-y-4 pt-4"
        >
          <Input
            name="title"
            placeholder="Trip Title (e.g. Paris Getaway)"
            required
          />
          <Input name="location" placeholder="Location" required />
          <div className="grid grid-cols-2 gap-4">
            <Input name="startDate" type="date" required />
            <Input name="endDate" type="date" required />
          </div>
          <Input name="imageUrl" placeholder="Image URL (Unsplash link)" />
          <Button type="submit" className="w-full">
            Save Trip
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
