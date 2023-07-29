import { Box, Flex, Heading, Link, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { MenuIconButton } from '../atoms/MenuIconButton';

export const DashboardLayout: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justifyContent="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex align="center" as="a" mr="8" _hover={{ cursor: 'pointer' }}>
          <Heading
            as="h1"
            fontSize={{ base: 'md', md: 'lg' }}
            onClick={() => console.log("clicked home")}
          >
            FX検証アプリ
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow="2"
          display={{ base: 'none', md: 'flex' }}
        >
          <Box pr="4">
            <Link onClick={() => console.log("clicked")}>CSVアップロード</Link>
          </Box>
          <Box pr="4">
            <Link onClick={() => console.log("clicked")}>検証</Link>
          </Box>
          <Link onClick={() => console.log("clicked")}>設定</Link>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>

      <Outlet />
    </>

  );
};
