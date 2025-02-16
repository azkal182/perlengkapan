"use client";
import { updatePerlengkapan } from "@/actions/perlengkapan";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import React, { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Content = ({ data }: { data: any }) => {
  // State untuk menangani dialog dan input pin
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [pin, setPin] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [checkboxStatus, setCheckboxStatus] = useState<any>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkIfAllDone = (kebutuhan: any[]) => {
    return kebutuhan.every((item) => item.done === true); // Memastikan semua item done = true
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheckboxChange = (name: string, item: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setCheckboxStatus((prevState) => ({
      ...prevState,
      [item.id]: !prevState[item.id], // Toggle status checkbox
    }));

    setSelectedItem({
      perlengkapan: name,
      ...item,
    });
    setIsDialogOpen(true); // Buka dialog saat checkbox diklik
  };

  const closeModal = () => {
    setIsDialogOpen(false);
    // Kembalikan checkbox ke keadaan semula (unchecked) jika modal dibatalkan
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setCheckboxStatus((prevState) => ({
      ...prevState,
      [selectedItem?.id]: false,
    }));
  };

  const handleSubmit = async () => {
    // Memeriksa apakah PIN yang dimasukkan adalah 121212
    if (pin === "121212") {
      setIsDialogOpen(false); // Menutup dialog jika PIN cocok
      await updatePerlengkapan(selectedItem);

      //   console.log(selectedItem);
    } else {
      alert("PIN yang dimasukkan salah!");
    }

    console.log("PIN submitted: ", pin); // Log untuk debugging
  };

  return (
    <div>
      <Card className="p-4 max-w-xl mx-auto mt-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {data?.map((item: any) => {
          const allDone = checkIfAllDone(item.kebutuhan);
          return (
            <div key={item.id} className="mb-4">
              <div>
                <span className="font-bold uppercase">
                  {item.name} {allDone ? "✅" : ""}
                </span>
              </div>
              <ol className="list-decimal pl-5">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {item.kebutuhan.map((item2: any) => (
                  <li key={item2.id} className="mb-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`terms-${item2.id}`}
                        disabled={item2.done}
                        checked={item2.done} // Menggunakan 'done' untuk menentukan status checkbox
                        onCheckedChange={() =>
                          handleCheckboxChange(item.name, item2)
                        } // Event saat checkbox diklik
                      />
                      <label
                        htmlFor={`terms-${item2.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {`${item2.name} : ${item2.jumlah.toString()}`}
                      </label>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </Card>

      {/* Dialog Popup */}
      <Dialog open={isDialogOpen} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Masukkan PIN</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Masukkan PIN Anda"
            />
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={closeModal} variant={"secondary"}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Content;
