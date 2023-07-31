export const loadCsv = (csvString: string) => {
  return csvString
    .trim()
    .split('\n')
    .map((line) => line.replace(/,$/, '')) // 末尾が,で終了している場合は削除
    .map((line) => line.replaceAll(/(\t|\s)/g, ',')) // タブ区切り、スペース区切りをセミコロン区切りに統一する
    .map((line) => line.split(',')) // 列を分割する
    .filter(
      (line) => !(1 == line.length && line[0] === '') && !(line.length <= 0)
    ); // 空行を除外
};
