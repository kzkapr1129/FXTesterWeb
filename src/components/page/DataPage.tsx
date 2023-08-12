import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useReducer } from 'react';

import * as Api from '../../api/api';
import { TimeTypeTable } from '../../common/defines';
import { DataPageReducer } from '../../reducer/DataPageReducer';
import { TimeType } from '../../types/TimeType';
import { SecondaryButton } from '../atoms/SecondaryButton';
import { TimeTypeMultiSelection } from '../organisms/TimeTypeMultiSelection';
import { WaitDialog } from '../organisms/WaitDialog';

const initState = {
  isDownloading: false,
  isShownErrorMessage: false,
  data: [],
  isShownDeleteDialog: false,
  selectedPairName: null,
  isDeleting: false
};

export const DataPage: React.FC = () => {
  const [state, dispatch] = useReducer(DataPageReducer, initState);

  const getNewData = useCallback(() => {
    dispatch({ type: 'DOWNLOADING' });
    try {
      Api.getAllPairDetails().then((res) => {
        const payload = {
          data: res.map((r) => r.data),
          errorCode: 0
        };
        dispatch({ type: 'DONE_DOWNLOAD', payload });
      });
    } catch (e) {
      const payload = {
        data: [],
        errorCode: -1,
        errorMessage: 'サーバーとの通信に失敗しました'
      };
      dispatch({ type: 'DONE_DOWNLOAD', payload });
    }
  }, []);

  const onClickDelete = useCallback((pairName: string, timeTypes: Array<TimeType>) => {
    dispatch({ type: 'DELETING' });

    Api.deleteData({pairName, timeTypes}).then(() => {
      dispatch({type: 'DONE_DELETE'});
      getNewData();
    })
  }, [getNewData]);

  useEffect(() => {
    getNewData();
  }, [getNewData]);

  const viewData = state.data.map((r) => ({
    pairName: r.pairName,
    countPerTimeType: r.details.reduce(
      (sum, v) => ({ ...sum, [v.timeType]: v.countData }),
      {}
    )
  }));
  viewData.sort((a, b) => (a.pairName < b.pairName ? -1 : 1));

  return (
    <>
      <Card h="100%">
        <CardHeader>
          <Heading size="md">データ件数</Heading>
        </CardHeader>
        <CardBody>
          <Box overflow="auto">
            <TableContainer overflowX="unset" overflowY="unset">
              <Table>
                <Thead
                  position="sticky"
                  top={0}
                  zIndex="docked"
                  sx={{ background: 'white' }}
                >
                  <Tr>
                    <Th whiteSpace="nowrap">通貨ペア名</Th>
                    {Object.keys(TimeTypeTable).map((key) => (
                      <Th key={key} whiteSpace="nowrap">
                        {key}
                      </Th>
                    ))}
                    <Th whiteSpace="nowrap">操作</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {viewData.map((vd) => (
                    <Tr key={vd.pairName}>
                      <Td>{vd.pairName}</Td>
                      <Td>{vd.countPerTimeType[TimeTypeTable.M1]}</Td>
                      <Td>{vd.countPerTimeType[TimeTypeTable.M5]}</Td>
                      <Td>{vd.countPerTimeType[TimeTypeTable.M15]}</Td>
                      <Td>{vd.countPerTimeType[TimeTypeTable.M30]}</Td>
                      <Td>{vd.countPerTimeType[TimeTypeTable.H1]}</Td>
                      <Td>{vd.countPerTimeType[TimeTypeTable.H4]}</Td>
                      <Td>{vd.countPerTimeType[TimeTypeTable.Daily]}</Td>
                      <Td>{vd.countPerTimeType[TimeTypeTable.Weekly]}</Td>
                      <Td>
                        <SecondaryButton
                          onClick={() =>
                            dispatch({
                              type: 'SHOW_DELETE_DIALOG',
                              payload: { selectedPairName: vd.pairName }
                            })
                          }
                        >
                          削除
                        </SecondaryButton>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </CardBody>
      </Card>

      <WaitDialog
        isOpen={state.isDownloading}
        onClose={null}
        title="データ取得中"
        message="しばらくお待ちください"
      />

      <WaitDialog
          isOpen={state.isDeleting}
          onClose={null}
          title="データ削除中"
          message="しばらくお待ちください"
        />

      <TimeTypeMultiSelection
        isOpen={state.isShownDeleteDialog}
        onClose={() => dispatch({ type: 'CLOSE_DELETE_DIALOG' })}
        title="削除"
        positiveButtonText="削除"
        negativeButtonText="戻る"
        onPositive={(timeTypes: Array<TimeType>) =>
          onClickDelete(state.selectedPairName, timeTypes)
        }
        onNegative={() => dispatch({ type: 'CLOSE_DELETE_DIALOG' })}
      />
    </>
  );
};
