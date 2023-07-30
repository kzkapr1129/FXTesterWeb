import { Button } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export const SecondaryButton: React.FC<Props> = (props) => {
  const { onClick, children } = props;
  return (
    <Button colorScheme="teal" variant="outline" onClick={onClick}>
      {children}
    </Button>
  );
};
