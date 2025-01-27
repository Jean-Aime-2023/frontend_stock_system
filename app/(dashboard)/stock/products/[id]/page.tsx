'use client'

import { Button } from '@/components/ui/button';
import React from 'react';
import { IoMdLock } from 'react-icons/io';
import { IoMdTrash } from 'react-icons/io';
import { BiSolidPencil } from 'react-icons/bi';
import img1 from '@/public/assets/shoe1.jpg';
import img2 from '@/public/assets/shoe2.jpeg';
import img3 from '@/public/assets/shoe2.jpg';
import img4 from '@/public/assets/shoe3.jpg';
import Image from 'next/image';
import { ManagerDetailsTable } from '@/components/common/Tables/ManagerDetailsTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

const subImage = [
  {
    id: 1,
    img: img2,
  },
  {
    id: 2,
    img: img3,
  },
  {
    id: 3,
    img: img4,
  },
];

const ProuctDetails = () => {
  const router = useRouter();
  return (
    <div className="bg-white h-screen rounded-xl px-20 py-6 flex-col gap-5">
      <div className="flex items-center gap-6">
        <div className="flex flex-col flex-1 pb-16 border-b border-b-[#C7C7C7]">
          <div className="flex flex-col gap-1 flex-1 pb-5">
            <h1 className="text-3xl font-medium">Product Name</h1>
            <p className="text-[#5D6679]">Eri Rwanda</p>
            <p className="text-[#5D6679]">Mon 14th, July, 204</p>
            <p className="text-[#5D6679]">
              Threshold value: <span className="text-black">50</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 w-fit">
            <div className="border bg-[#F4F4F4] w-fit px-5 flex flex-col items-center justify-center py-6 rounded-xl">
              <p className="text-2xl">500</p>
              <p className="text-[#5D6679]">Entry Stock</p>
            </div>
            <div className="border bg-[#F4F4F4] w-fit px-5 flex flex-col items-center justify-center py-6 rounded-xl">
              <p className="text-2xl">500</p>
              <p className="text-[#5D6679]">Entry Stock</p>
            </div>
            <div className="border bg-[#F4F4F4] w-fit px-5 flex flex-col items-center justify-center py-6 rounded-xl">
              <p className="text-2xl">500</p>
              <p className="text-[#5D6679]">Entry Stock</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Button className="flex items-center gap-2 bg-[#F4F4F4] text-[#5D6679] hover:bg-slate-200">
              Publish Product
              <IoMdLock />
            </Button>
            <Button
              onClick={() => router.push('/stock/products/edit')}
              className="flex items-center gap-2 bg-[#F4F4F4] text-[#5D6679] hover:bg-slate-200"
            >
              Edit Product
              <BiSolidPencil />
            </Button>
            <Button className="flex items-center gap-2 bg-[#FFDDDD] text-[#E91A1A] hover:bg-red-200">
              Delete
              <IoMdTrash color="#E91A1A" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-[30%]">
          <Image
            src={img1}
            alt="img"
            width={350}
            height={200}
            className="rounded-lg cursor-pointer border w-full"
          />
          <div className="flex items-center gap-2">
            {subImage.map((img) => (
              <Image
                src={img.img}
                alt="img"
                width={100}
                height={80}
                className="rounded-lg cursor-pointer border flex-1"
                key={img.id}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 pt-8">
        <h1 className="text-3xl font-medium">Product History</h1>
        <Tabs defaultValue="consumption" className="w-full mt-6">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="consumption">Consumption</TabsTrigger>
            <TabsTrigger value="entry">Entry</TabsTrigger>
          </TabsList>
          <TabsContent value="consumption">
            <ManagerDetailsTable />
          </TabsContent>
          <TabsContent value="entry">
            <ManagerDetailsTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProuctDetails;
