"use client";
import { createPerlengkapan } from "@/actions/perlengkapan";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

// Tipe untuk setiap kebutuhan
interface Kebutuhan {
  name: string;
  jumlah: string;
}

// Tipe untuk setiap perlengkapan
export interface Perlengkapan {
  name: string;
  kebutuhan: Kebutuhan[];
}

const FormPerlengkapan = () => {
  // Inisialisasi state dengan tipe Perlengkapan[]
  const [perlengkapan, setPerlengkapan] = useState<Perlengkapan[]>([
    {
      name: "",
      kebutuhan: [{ name: "", jumlah: "" }],
    },
  ]);

  // Menghandle perubahan pada nama perlengkapan
  const handlePerlengkapanChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedPerlengkapan = [...perlengkapan];
    updatedPerlengkapan[index].name = event.target.value;
    setPerlengkapan(updatedPerlengkapan);
  };

  // Menghandle perubahan pada kebutuhan
  const handleKebutuhanChange = (
    index: number,
    subIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedPerlengkapan = [...perlengkapan];
    const name = event.target.name as keyof Kebutuhan;
    updatedPerlengkapan[index].kebutuhan[subIndex][name] = event.target.value;
    setPerlengkapan(updatedPerlengkapan);
  };

  // Menambahkan kebutuhan baru pada perlengkapan
  const addKebutuhan = (index: number) => {
    const updatedPerlengkapan = [...perlengkapan];
    updatedPerlengkapan[index].kebutuhan.push({ name: "", jumlah: "" });
    setPerlengkapan(updatedPerlengkapan);
  };

  // Menambahkan perlengkapan baru
  //   const addPerlengkapan = () => {
  //     setPerlengkapan([
  //       ...perlengkapan,
  //       {
  //         name: "",
  //         kebutuhan: [{ name: "", jumlah: "" }],
  //       },
  //     ]);
  //   };

  // Menghapus kebutuhan dari perlengkapan
  const removeKebutuhan = (
    perlengkapanIndex: number,
    kebutuhanIndex: number
  ) => {
    const updatedPerlengkapan = [...perlengkapan];
    updatedPerlengkapan[perlengkapanIndex].kebutuhan.splice(kebutuhanIndex, 1);
    setPerlengkapan(updatedPerlengkapan);
  };

  // Menghapus perlengkapan
  //   const removePerlengkapan = (index: number) => {
  //     const updatedPerlengkapan = [...perlengkapan];
  //     updatedPerlengkapan.splice(index, 1);
  //     setPerlengkapan(updatedPerlengkapan);
  //   };

  // Menangani submit form
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createPerlengkapan(perlengkapan);
    // Reset form state
    setPerlengkapan([
      {
        name: "",
        kebutuhan: [{ name: "", jumlah: "" }],
      },
    ]);
  };

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        {perlengkapan.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <div className="mb-4">
              <Label
                htmlFor={`perlengkapan-${index}`}
                className="block font-medium"
              >
                Perlengkapan
              </Label>
              <Input
                type="text"
                id={`perlengkapan-${index}`}
                name={`perlengkapan-${index}`}
                value={item.name}
                onChange={(e) => handlePerlengkapanChange(index, e)}
                placeholder="Nama perlengkapan semisal Pj. Parkir"
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>

            {item.kebutuhan.map((kebutuhanItem, subIndex) => (
              <div key={subIndex} className="mb-4 flex items-center space-x-2">
                <div className="flex-1">
                  <Label
                    htmlFor={`kebutuhan-${index}-${subIndex}`}
                    className="block font-medium"
                  >
                    Kebutuhan
                  </Label>
                  <Input
                    type="text"
                    id={`kebutuhan-${index}-${subIndex}`}
                    name="name"
                    value={kebutuhanItem.name}
                    onChange={(e) => handleKebutuhanChange(index, subIndex, e)}
                    placeholder="Nama kebutuhan semisal meja"
                    className="mt-1 p-2 border rounded w-full"
                    required
                  />
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor={`jumlah-${index}-${subIndex}`}
                    className="block font-medium"
                  >
                    Jumlah
                  </Label>
                  <Input
                    type="number"
                    id={`jumlah-${index}-${subIndex}`}
                    name="jumlah"
                    value={kebutuhanItem.jumlah}
                    onChange={(e) => handleKebutuhanChange(index, subIndex, e)}
                    placeholder="Jumlah"
                    className="mt-1 p-2 border rounded w-full"
                    required
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => removeKebutuhan(index, subIndex)}
                >
                  Hapus
                </Button>
              </div>
            ))}

            <Button type="button" onClick={() => addKebutuhan(index)}>
              Tambah Kebutuhan
            </Button>

            {/* <Button
              className="ml-4"
              type="button"
              onClick={() => removePerlengkapan(index)}
            >
              Hapus Perlengkapan
            </Button> */}
          </div>
        ))}

        {/* <button
          type="button"
          onClick={addPerlengkapan}
          className="text-green-500"
        >
          Tambah Perlengkapan
        </button> */}

        <Button type="submit">Simpan</Button>
      </form>
    </Card>
  );
};

export default FormPerlengkapan;
