import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from '../organisms/DashboardHeader';
import { DashboardDrawer } from '../organisms/DashboardDrawer';

export const DashboardLayout: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex flexDirection="column" h="100%" w="100%">
      <DashboardHeader onOpen={onOpen} onClose={onClose} />
      <DashboardDrawer onClose={onClose} isOpen={isOpen} />
      <Box p={4} flex={1}>
        <Outlet />
      </Box>
    </Flex>
  );
};
