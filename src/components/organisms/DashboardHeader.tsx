import React from 'react';
import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MenuIconButton } from '../atoms/MenuIconButton';
import { Path } from '../../common/defines';
import { MainColor500 } from '../../theme/color';

type Props = {
  onOpen: () => void;
  onClose: () => void;
};

export const DashboardHeader: React.FC<Props> = (props) => {
  const { onOpen, onClose } = props;
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Flex
      as="nav"
      bg={MainColor500}
      color="gray.50"
      align="center"
      justifyContent="space-between"
      padding={{ base: 3, md: 5 }}
    >
      <Flex align="center" as="a" mr="8" _hover={{ cursor: 'pointer' }}>
        <Heading
          as="h1"
          fontSize={{ base: 'md', md: 'lg' }}
          onClick={() => navigateTo(Path.HOME)}
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
          <Link onClick={() => navigateTo(Path.UPLOAD)}>CSVアップロード</Link>
        </Box>
        <Box pr="4">
          <Link onClick={() => navigateTo(Path.VERIFICATION)}>検証</Link>
        </Box>
        <Link onClick={() => navigateTo(Path.SETTINGS)}>設定</Link>
      </Flex>
      <MenuIconButton onOpen={onOpen} />
    </Flex>
  );
};
