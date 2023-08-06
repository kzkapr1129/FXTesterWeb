import { useToast as useChakraToast } from '@chakra-ui/react';
import { useCallback } from 'react';

type param = {
  title: string;
  description: string;
};

export const useToast = () => {
  const toast = useChakraToast();

  const success = useCallback(
    (param: param) => {
      toast({
        title: param.title,
        description: param.description,
        status: 'success',
        duration: 9000,
        isClosable: true
      });
    },
    [toast]
  );

  const error = useCallback(
    (param: param) => {
      toast({
        title: param.title,
        description: param.description,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    },
    [toast]
  );

  return { success, error };
};
