import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Path } from '../../common/defines';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export const DashboardDrawer: React.FC<Props> = (props) => {
  const { onClose, isOpen } = props;
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody padding="0" bg="gray.100">
            <Button w="100%" onClick={() => navigateTo(Path.HOME)}>
              TOP
            </Button>
            <Button w="100%" onClick={() => navigateTo(Path.UPLOAD)}>
              CSVアップロード
            </Button>
            <Button w="100%" onClick={() => navigateTo(Path.DATA)}>
              データ件数
            </Button>
            <Button w="100%" onClick={() => navigateTo(Path.VERIFICATION)}>
              検証
            </Button>
            <Button w="100%" onClick={() => navigateTo(Path.SETTINGS)}>
              設定
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
