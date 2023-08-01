import { Candle } from "../../types/Candle";

export const loadCsv: (string) => Array<Candle> = (csvString: string) => {
  const lines = csvString
    .trim()
    .split('\n')
    .map((line) => line.replace(/,$/, '')) // 末尾が,で終了している場合は削除
    .map((line) => line.replaceAll(/\t/g, ',')) // タブ区切りをセミコロン区切りに統一する
    .map((line) => line.split(',')) // 列を分割する
    .filter(
      (line) => !(1 == line.length && line[0] === '') && !(line.length <= 0)
    ); // 空行を除外

  return lines.map(line => ({
    time: line[0],
    open: Number(line[1]),
    high: Number(line[2]),
    low: Number(line[3]),
    close: Number(line[4]),
    tickVolume: Number(line[5]),
  })).sort((a, b) => a.time < b.time ? -1 : 1);
};


