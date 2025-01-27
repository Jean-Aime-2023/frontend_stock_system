'use client';

import { useRouter, useParams } from 'next/navigation';
import { detailedManagers } from '@/data/Managers';
import Image from 'next/image';
import { MdEdit } from 'react-icons/md';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ManagerDetailsTable } from '@/components/common/Tables/ManagerDetailsTable';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { IoCopy } from 'react-icons/io5';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { EditManagerDialog } from '@/components/common/EditManagerDialog';

const permissions = [
  { id: 'delete', permission: 'Deleting Products' },
  { id: 'notifications', permission: 'Receive Notification of Stock status' },
  { id: 'enterproducts', permission: 'Entering products in stock' },
  { id: 'create', permission: 'Creating a New Product' },
  { id: 'publish', permission: 'Publishing products' },
  { id: 'update', permission: 'Update Product' },
];

const ManagerDetails = () => {
  const params = useParams();
  const router = useRouter();
  const managerId = params.id;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [managerInfo, setManagerInfo] = useState({
    fullName: 'John Doe',
    email: 'john.doe@ourstock.com',
    password: '',
  });

  const handleSave = (updatedManager: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    setManagerInfo(updatedManager);
  };

  const manager = detailedManagers.find(
    (manager) => manager.id.toString() === managerId
  );

  const [status, setStatus] = useState<'Active' | 'Deactivated'>(
    manager?.status || 'Active'
  );
  const [isDialogOpen, setDialogOpen] = useState(false);

  const toggleStatus = () => {
    setStatus((prevStatus) =>
      prevStatus === 'Active' ? 'Deactivated' : 'Active'
    );
    setDialogOpen(false);
  };

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
    <div className="w-full h-screen p-10 px-20 rounded-xl bg-white border shadow-md">
      <div className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-3 border-b border-b-[#C7C7C7] flex-1 pb-5">
          <div className="flex items-center gap-5">
            <h1 className="font-semibold text-[24px]">{manager.fullName}</h1>
            <EditManagerDialog manager={manager} onSave={handleSave} />
          </div>
          <p className="text-[#5D6679]">{manager.stockName}</p>
          <p className="text-[#5D6679]">{manager.startingDate}</p>
          <div className="text-[#5D6679] flex items-center gap-2">
            {manager.email}
            <IoCopy className="cursor-pointer" size={23} />
          </div>
          <div className="flex items-center gap-3">
            <p>Status: </p>
            <div
              className={`px-3 py-1 rounded-full ${
                status === 'Active'
                  ? 'bg-[#D2FFD4] text-[#14BA6D]'
                  : 'bg-[#FFD2D2] text-[#BA1414]'
              }`}
            >
              {status}
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <div className="p-1 px-3 rounded-full bg-blue cursor-pointer flex items-center gap-3">
                  <MdEdit size={24} color="white" />
                  <span className="text-white text-sm">Change Status</span>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {status === 'Active'
                      ? 'Deactivate Stock Manager'
                      : 'Activate Stock Manager'}
                  </DialogTitle>
                  <DialogDescription>
                    {status === 'Active'
                      ? 'The Stock manager will be deactivated and not allowed to perform any action again. Type correctly their name to confirm.'
                      : 'The Stock manager will be reactivated and allowed to perform actions. Type correctly their name to confirm.'}
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toggleStatus();
                  }}
                  className="flex flex-col gap-5"
                >
                  <input
                    type="text"
                    placeholder={`eg: ${manager.fullName}`}
                    required
                    className="px-4 py-3 rounded-[12px] placeholder-[#6B6B6B] bg-[#F5F5F5] outline-none"
                  />
                  <div className="flex flex-row gap-4 items-center">
                    <Button
                      type="submit"
                      className={`${
                        status === 'Active'
                          ? 'bg-[#E91A1A] hover:bg-[#c73535]'
                          : 'bg-[#14BA6D] hover:bg-[#0f8a4f]'
                      } p-2 px-3 text-white`}
                    >
                      {status === 'Active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setDialogOpen(false)}
                      className="text-black border border-[#D0D5DD] bg-transparent hover:bg-transparent p-2 px-3"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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
        <TabsList className="grid grid-cols-3 w-[400px] mb-8">
          <TabsTrigger value="addedstock">Added Stock</TabsTrigger>
          <TabsTrigger value="removestock">Removed Stock</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        <TabsContent value="addedstock">
          <ManagerDetailsTable />
        </TabsContent>
        <TabsContent value="removestock">
          <ManagerDetailsTable />
        </TabsContent>
        <TabsContent className="flex flex-col gap-6" value="permissions">
          {permissions.map((permission) => (
            <div
              key={permission.id}
              className="flex items-center gap-3 space-x-2"
            >
              <Checkbox id={permission.id} className="w-5 h-5" />
              <label htmlFor={permission.id} className="text-[#667085]">
                {permission.permission}
              </label>
            </div>
          ))}
          <div className="flex flex-row gap-5 mt-6 items-center">
            <Button className="bg-[#F4F4F4] text-[#5D6679] hover:bg-slate-200">
              Discard
            </Button>
            <Button className="bg-blue text-[#fff] hover:bg-blue/50">
              Save Permissions
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManagerDetails;
