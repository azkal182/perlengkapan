"use server";

import { Perlengkapan } from "@/app/kebutuhan/form-perlengkapan";
import { db } from "@/lib/db";

export const getPerlengkapan = async () => {
  return await db.perlengkapan.findMany({
    include: {
      kebutuhan: true,
    },
  });
};

export const createPerlengkapan = async (data: Perlengkapan[]) => {
  // Untuk setiap item dalam data, kita akan melakukan create pada Perlengkapan dan relasinya Kebutuhan
  const mapped = data.map((item) => {
    return {
      name: item.name,
      // Menyertakan kebutuhan yang harus dibuat
      kebutuhan: {
        create: item.kebutuhan.map((kebutuhan) => ({
          name: kebutuhan.name,
          jumlah: parseInt(kebutuhan.jumlah), // Pastikan jumlah adalah integer
        })),
      },
    };
  });

  // Menyimpan data Perlengkapan dan Kebutuhan menggunakan create
  for (const item of mapped) {
    await db.perlengkapan.create({
      data: item,
    });
  }

  console.log("Data berhasil disimpan!");
};
