import { Button } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type Props = {
  onClick: () => void;
  isDisabled?: boolean;
  children: ReactNode;
};

export const PrimaryButton: React.FC<Props> = (props) => {
  const { onClick, isDisabled = false, children } = props;
  return (
    <Button colorScheme="teal" onClick={onClick} isDisabled={isDisabled}>
      {children}
    </Button>
  );
};
