import { Button } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export const PrimaryButton: React.FC<Props> = (props) => {
  const { onClick, children } = props;
  return (
    <Button colorScheme="teal" onClick={onClick}>
      {children}
    </Button>
  );
};
