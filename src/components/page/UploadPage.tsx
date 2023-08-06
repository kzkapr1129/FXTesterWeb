import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import React, { useCallback, useReducer, useRef } from 'react';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { SecondaryButton } from '../atoms/SecondaryButton';
import { loadCsv } from '../../common/parser/loader';
import { UploadPageReducer } from '../../reducer/UploadPageReducer';

import * as Api from '../../api/api';
import axios, { AxiosError } from 'axios';

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
  data: []
};

export const UploadPage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClickButton = () => {
    inputRef.current?.click();
  };

  const [state, dispatch] = useReducer(UploadPageReducer, initialState);

  const onClickUpload = useCallback(() => {
    dispatch({type: 'UPLOADING'});
    Api.upload(state)
      .then((res) => {
        console.log("status code: ", res.status);
        dispatch({type: 'DONE_UPLOAD', payload : {errorCode: 0}});
      })
      .catch((res: Error | AxiosError) => {
        if (axios.isAxiosError(res))  {
          const status = (res as AxiosError).response?.status ?? -1;
          const errorMessage = `サーバーリクエスト中にエラーが発生しました: ${status}`;
          dispatch({type: 'DONE_UPLOAD', payload : {errorCode: -1, errorMessage}});
        } else {
          const errorMessage = (res as Error).message;
          dispatch({type: 'DONE_UPLOAD', payload : {errorCode: -1, errorMessage}});
        }
      });
  }, [state.data, state.pairName, state.timeType]);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        const filename = e.target.files?.[0]?.name ?? '';
        const matcher = filename.match(
          /^([a-zA-Z]{6})(M1|M5|M15|M30|H1|H4|Daily|Weekly)\.csv$/
        );
        const pairName =
          (matcher && 1 <= matcher.length && matcher[1]) || '不明';
        const timeType =
          (matcher && 2 <= matcher.length && matcher[2]) || '不明';

        const data = loadCsv(reader.result);
        const startTime = data[0].time;
        const endTime = data.slice(-1)[0].time;

        const payload = {
          filename,
          startTime,
          endTime,
          pairName,
          timeType,
          data
        };

        dispatch({ type: 'FILE_OPENED', payload });
      }
    });
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      reader.readAsText(selectedFile, 'UTF-8');
    }
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
                {state.data.length}
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <Flex w="100%" flexDirection={'row'} justifyContent={'end'}>
            <PrimaryButton
              onClick={onClickUpload}
              isDisabled={
                !state.isFileOpened ||
                state.data.length <= 0
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
      { state.isUploading &&
        <Modal isOpen={true} onClose={null}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>アップロード中</ModalHeader>
            <ModalBody>
              <Text>しばらくお待ちください。</Text>
            </ModalBody>
            <ModalFooter>

            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    </>
  );
};
