import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    ModalProps,
    Text
  } from '@chakra-ui/react';
  import React from 'react';
  
  type Props = {
    isOpen: boolean;
    leastDestructiveRef: NonNullable<ModalProps['initialFocusRef']>;
    onClose: () => void;
    title: string;
    message: string;
  };
  
  export const OkDialog: React.FC<Props> = (props) => {
    const { isOpen, leastDestructiveRef, onClose, title, message } = props;
    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={leastDestructiveRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogBody>
            <Text>{message}</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>OK</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };