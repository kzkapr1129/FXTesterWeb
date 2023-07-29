import { Box, Flex, Heading, Link, useDisclosure } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { MenuIconButton } from '../atoms/MenuIconButton';
import { DashboardHeader } from '../organisms/DashboardHeader';
import { DashboardDrawer } from '../organisms/DashboardDrawer';

export const DashboardLayout: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <DashboardHeader onOpen={onOpen} onClose={onClose} />
      <DashboardDrawer onClose={onClose} isOpen={isOpen}  />
      <Outlet />
    </>

  );
};
