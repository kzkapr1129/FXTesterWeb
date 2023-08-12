import axios from 'axios';

import { Candle } from '../types/Candle';

const REQUEST_INTERVAL = 50; // 単位ms

type UploadParam = {
  data: Array<Candle>;
  pairName: string;
  timeType: string;
};

type Pairs = {
  pairs: Array<string>;
};

type PairDetail = {
  details: Array<{ timeType: number; countData: number }>;
};

/**
 * チャートデータをサーバーへアップロードする
 * @param param
 */
export const upload = (param: UploadParam) => {
  const { data, pairName, timeType } = param;
  const config = {
    headers: {
      'x-pair-name': pairName,
      'x-time-type': timeType
    }
  };
  return axios.post('http://localhost:8080/api/upload', { data }, config);
};

export const getAllPairDetails = () => {
  return axios
    .get<Pairs>('http://localhost:8080/api/uploaded_pairs')
    .then((res) => {
      const pairNames = res.data.pairs;
      const sleepTimes = [...Array(pairNames.length).keys()].map(
        (_, i) => i * REQUEST_INTERVAL + REQUEST_INTERVAL
      );
      return Promise.all(
        sleepTimes.map((sleepTime, i) =>
          new Promise((s) => setTimeout(s, sleepTime))
            .then(() =>
              axios.get<PairDetail>(
                'http://localhost:8080/api/uploaded_pair_detail',
                {
                  headers: { 'x-pair-name': pairNames[i] }
                }
              )
            )
            .then((res) => {
              return { ...res, data: { ...res.data, pairName: pairNames[i] } };
            })
        )
      );
    });
};
