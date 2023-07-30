import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { SecondaryButton } from '../atoms/SecondaryButton';

export const UploadPage: React.FC = () => {
  const inputRef = useRef(null);
  const onClickButton = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <Card h="100%">
        <CardHeader>
          <Heading size="md">CSVアップロード</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing={4}>
            <Box>
              <Flex
                w="100%"
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box>
                  <Heading size="xs">ファイル名</Heading>
                  <Text pt={2} fontSize="sm">
                    hogeoge.csv
                  </Text>
                </Box>
                <SecondaryButton onClick={onClickButton}>変更</SecondaryButton>
              </Flex>
            </Box>
            <Box>
              <Flex
                w="100%"
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box>
                  <Heading size="xs">通貨ペア</Heading>
                  <Text pt={2} fontSize="sm">
                    EURUSD
                  </Text>
                </Box>
                <SecondaryButton onClick={() => console.error('未実装')}>
                  変更
                </SecondaryButton>
              </Flex>
            </Box>
            <Box>
              <Flex
                w="100%"
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box>
                  <Heading size="xs">期間</Heading>
                  <Text pt={2} fontSize="sm">
                    2023/01/01〜2023/02/31
                  </Text>
                </Box>
                <SecondaryButton onClick={() => console.error('未実装')}>
                  変更
                </SecondaryButton>
              </Flex>
            </Box>
            <Box>
              <Flex
                w="100%"
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box>
                  <Heading size="xs">時間足</Heading>
                  <Text pt={2} fontSize="sm">
                    Daily
                  </Text>
                </Box>
                <SecondaryButton onClick={() => console.error('未実装')}>
                  変更
                </SecondaryButton>
              </Flex>
            </Box>
            <Box>
              <Heading size="xs">データ件数</Heading>
              <Text pt={2} fontSize="sm">
                30445
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <Flex w="100%" flexDirection={'row'} justifyContent={'end'}>
            <PrimaryButton onClick={() => console.error('未実装')}>
              アップロード
            </PrimaryButton>
          </Flex>
        </CardFooter>
      </Card>
      <input type="file" hidden ref={inputRef} />
    </>
  );
};
