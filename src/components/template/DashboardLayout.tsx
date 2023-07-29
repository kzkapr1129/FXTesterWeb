import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from '../organisms/DashboardHeader';
import { DashboardDrawer } from '../organisms/DashboardDrawer';

export const DashboardLayout: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <DashboardHeader onOpen={onOpen} onClose={onClose} />
      <DashboardDrawer onClose={onClose} isOpen={isOpen} />
      <Outlet />
    </>
  );
};
