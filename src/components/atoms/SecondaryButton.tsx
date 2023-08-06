import { Button } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { MainColor } from '../../theme/color';

type Props = {
  onClick: () => void;
  isDisabled?: boolean;
  children: ReactNode;
};

export const SecondaryButton: React.FC<Props> = (props) => {
  const { onClick, isDisabled = false, children } = props;
  return (
    <Button
      colorScheme={MainColor}
      variant="outline"
      isDisabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
