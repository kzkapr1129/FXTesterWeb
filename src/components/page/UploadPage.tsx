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
import axios, { AxiosError } from 'axios';
import React, { useCallback, useReducer, useRef } from 'react';

import * as Api from '../../api/api';
import { loadCsv } from '../../common/parser/loader';
import { useToast } from '../../hooks/useToast';
import { UploadPageReducer } from '../../reducer/UploadPageReducer';
import { ApiResult } from '../../types/ApiResult';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { SecondaryButton } from '../atoms/SecondaryButton';
import { WaitDialog } from '../organisms/WaitDialog';
import { OKDialog } from '../organisms/OKDialog';

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

type ReadableRowProps = {
  title: string;
  text: string;
};

const ReadableRow: React.FC<ReadableRowProps> = ({ title, text }) => {
  return (
    <Box>
      <Heading size="xs">{title}</Heading>
      <Text pt={2} fontSize="sm">
        {text}
      </Text>
    </Box>
  );
};

type WritableRowProps = {
  title: string;
  text: string;
  onClick: () => void;
  disabled: boolean;
};

const WritableRow: React.FC<WritableRowProps> = (props) => {
  const { title, text, onClick, disabled } = props;
  return (
    <Box>
      <Flex
        w="100%"
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box>
          <Heading size="xs">{title}</Heading>
          <Text pt={2} fontSize="sm">
            {text}
          </Text>
        </Box>
        <SecondaryButton onClick={onClick} isDisabled={disabled}>
          変更
        </SecondaryButton>
      </Flex>
    </Box>
  );
};

export const UploadPage: React.FC = () => {
  const cancelRef = React.useRef();
  const { success, error } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const onClickOpenFile = () => {
    inputRef.current?.click();
  };

  const [state, dispatch] = useReducer(UploadPageReducer, initialState);

  const onClickUpload = useCallback(() => {
    dispatch({ type: 'UPLOADING' });
    Api.upload(state)
      .then((res) => {
        const { code = -1, message = '不明なエラーです' } =
          res?.data?.status ?? {};
        dispatch({
          type: 'DONE_UPLOAD',
          payload: { errorCode: code, errorMessage: message }
        });

        if (code === 0) {
          success({
            title: 'アップロード完了',
            description: 'データのアップロードに成功しました'
          });
        }
      })
      .catch((res: Error | AxiosError<ApiResult>) => {
        if (axios.isAxiosError(res)) {
          const {
            status: { code = -1, message = res.message }
          } = (res as AxiosError<ApiResult>).response?.data ?? { status: {} };
          dispatch({
            type: 'DONE_UPLOAD',
            payload: { errorCode: code, errorMessage: message }
          });
        } else {
          const errorMessage = res.message;
          dispatch({
            type: 'DONE_UPLOAD',
            payload: { errorCode: -1, errorMessage }
          });
        }

        error({
          title: 'アップロード失敗',
          description: 'データのアップロードに失敗しました'
        });
      });
  }, [state, success, error]);

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
            <WritableRow
              title="ファイル名"
              text={state.filename}
              onClick={onClickOpenFile}
              disabled={false}
            />
            <WritableRow
              title="通貨ペア"
              text={state.pairName}
              onClick={() => console.error('未実装')}
              disabled={!state.isFileOpened}
            />
            <WritableRow
              title="期間"
              text={
                state.startTime != '' && state.endTime != ''
                  ? `${state.startTime}~${state.endTime}`
                  : null
              }
              onClick={() => console.error('未実装')}
              disabled={!state.isFileOpened}
            />
            <WritableRow
              title="時間足"
              text={state.timeType}
              onClick={() => console.error('未実装')}
              disabled={!state.isFileOpened}
            />
            <ReadableRow
              title="データ件数"
              text={state.data.length.toString()}
            />
          </Stack>
        </CardBody>
        <CardFooter>
          <Flex w="100%" flexDirection={'row'} justifyContent={'end'}>
            <PrimaryButton
              onClick={onClickUpload}
              isDisabled={!state.isFileOpened || state.data.length <= 0}
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

      <WaitDialog
        isOpen={state.isUploading}
        onClose={null}
        title="アップロード中"
        message="しばらくお待ちください。"
      />

      <OKDialog
        isOpen={state.isShownErrorMessage}
        leastDestructiveRef={cancelRef}
        onClose={() => dispatch({ type: 'CLOSE_ERROR_MESSAGE' })}
        title="エラー"
        message={state.errorMessage}
      />
    </>
  );
};
