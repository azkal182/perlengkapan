"use server";

import { Perlengkapan } from "@/app/kebutuhan/form-perlengkapan";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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
  revalidatePath("/");

  console.log("Data berhasil disimpan!");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updatePerlengkapan = async (item: any) => {
  const result = await db.kebutuhan.update({
    where: {
      id: item.id,
    },
    data: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      done: true,
    },
  });
  revalidatePath("/");

  return result;
};
