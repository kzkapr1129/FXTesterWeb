import axios from "axios"
import { Candle } from "../types/Candle"

type UploadParam = {
  data: Array<Candle>;
  pairName: string;
  timeType: string;
}


/**
 * チャートデータをサーバーへアップロードする
 * @param param 
 */
export const upload = (param: UploadParam) => {
  const { data, pairName, timeType } = param;
  const config = {
      headers: {
      "x-pair-name": pairName,
      "x-time-type": timeType
    }
  }
  return axios.post("http://localhost:8080/api/upload", { data }, config)
}