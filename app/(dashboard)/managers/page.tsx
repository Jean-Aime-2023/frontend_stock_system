'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Blank from '@/components/common/Blank';
import { BiPlus } from 'react-icons/bi';
import { ManagersTable } from '@/components/common/Tables/ManagersTable';
import { detailedManagers } from '@/data/Managers';

const Managers = () => {
  const [isExistManager, setIsExistManager] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const managersList = detailedManagers;
    setIsExistManager(managersList.length > 0);
  }, []);

  const handleCreateManager = () => {
    router.push('/managers/new');
  };

  return (
    <div className="w-full">
      {isExistManager ? (
        <ManagersTable />
      ) : (
        <Blank
          onPress={handleCreateManager}
          text="There are no Entered Managers yet."
          buttonText="Create Manager"
          icon={<BiPlus color="#fff" />}
        />
      )}
    </div>
  );
};

export default Managers;
