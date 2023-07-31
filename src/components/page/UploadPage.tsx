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
import React, { useReducer, useRef } from 'react';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { SecondaryButton } from '../atoms/SecondaryButton';
import { loadCsv } from '../../common/parser/loader';
import { UploadPageReducer } from '../../reducer/UploadPageReducer';

const initialState = {
  filename: '',
  startTime: '',
  endTime: '',
  pairName: '',
  timeType: '',
  isShownErrorMessage: false,
  errorMessage: '',
  isUploading: false,
  isFileOpened: false,
  candles: []
};

export const UploadPage: React.FC = () => {
  const inputRef = useRef(null);
  const onClickButton = () => {
    inputRef.current?.click();
  };

  const [state, dispatch] = useReducer(UploadPageReducer, initialState);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    // ファイル読み込み完了時に発火するリスナー
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        const lines = loadCsv(reader.result);
        const payload = {
          filename: 'hoge',
          startTime: '2020',
          endTime: '2021',
          pairName: 'EURUSD',
          timeType: 'Daily',
          data: []
        };
        dispatch({ type: 'FILE_OPENED', payload });
      }
    });
    reader.readAsText(e.target.files[0], 'UTF-8');
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
                    {state.filename}
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
                    {state.pairName}
                  </Text>
                </Box>
                <SecondaryButton
                  onClick={() => console.error('未実装')}
                  isDisabled={!state.isFileOpened}
                >
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
                    {state.startTime != '' && state.endTime != ''
                      ? `${state.startTime}~${state.endTime}`
                      : null}
                  </Text>
                </Box>
                <SecondaryButton
                  onClick={() => console.error('未実装')}
                  isDisabled={!state.isFileOpened}
                >
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
                    {state.timeType}
                  </Text>
                </Box>
                <SecondaryButton
                  onClick={() => console.error('未実装')}
                  isDisabled={!state.isFileOpened}
                >
                  変更
                </SecondaryButton>
              </Flex>
            </Box>
            <Box>
              <Heading size="xs">データ件数</Heading>
              <Text pt={2} fontSize="sm">
                {state.candles.length}
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <Flex w="100%" flexDirection={'row'} justifyContent={'end'}>
            <PrimaryButton
              onClick={() => console.error('未実装')}
              isDisabled={
                !state.isFileOpened || state.errorMessage.length !== 0
              }
            >
              アップロード
            </PrimaryButton>
          </Flex>
        </CardFooter>
      </Card>
      <input
        type="file"
        hidden
        ref={inputRef}
        onChange={onChangeFile}
        accept=".csv"
      />
    </>
  );
};
