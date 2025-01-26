'use client';

import { useRouter, useParams } from 'next/navigation';
import { detailedManagers } from '@/data/Managers';
import Image from 'next/image';
import { MdEdit } from 'react-icons/md';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ManagerDetailsTable } from '@/components/common/Tables/ManagerDetailsTable';

const ManagerDetails = () => {
  const params = useParams();
  const router = useRouter();
  const managerId = params.id;

  const manager = detailedManagers.find(
    (manager) => manager.id.toString() === managerId
  );

  if (!manager) {
    return (
      <div className="p-4">
        <h2>Manager not found</h2>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => router.push('/managers')}
        >
          Back to Managers
        </button>
      </div>
    );
  }

  return (
    <div className="w-full p-10 px-20 rounded-xl bg-white border shadow-md">
      <div className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-3 border-b border-b-[#C7C7C7] flex-1 pb-5">
          <div className="flex items-center gap-5">
            <h1 className="font-semibold text-[24px]">{manager.fullName}</h1>
            <div className="p-2 px-4 rounded-full bg-blue cursor-pointer flex items-center gap-3">
              <MdEdit size={24} color="white" />
              <span className="text-white">Edit Manager</span>
            </div>
          </div>
          <p className="text-[#5D6679]">{manager.stockName}</p>
          <p className="text-[#5D6679]">{manager.startingDate}</p>
          <p className="text-[#5D6679]">{manager.email}</p>
          <div className="flex items-center gap-3">
            <p>Status</p>
            <div className="px-3 py-1 rounded-full bg-[#D2FFD4] text-[#14BA6D]">
              {manager.status}
            </div>
            <div className="p-2 px-4 rounded-full bg-blue cursor-pointer flex items-center gap-3">
              <MdEdit size={24} color="white" />
              <span className="text-white">Edit Status</span>
            </div>
          </div>
        </div>
        <Image
          src={manager.image}
          alt="image"
          width={300}
          height={200}
          className="w-[300px] h-[200px] rounded-lg"
        />
      </div>
      <Tabs defaultValue="addedstock" className="w-full mt-6">
        <TabsList className="grid grid-cols-3 w-[400px] mb-6">
          <TabsTrigger value="addedstock">Added Stock</TabsTrigger>
          <TabsTrigger value="removestock">Removed Stock</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        <TabsContent value="addedstock">
          <ManagerDetailsTable/>
        </TabsContent>
        <TabsContent value="removestock">
        <p>Remove Stock</p>
        </TabsContent>
        <TabsContent value="permissions">
          <p>Permissions</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManagerDetails;
