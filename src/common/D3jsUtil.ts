import * as d3 from 'd3';
import { Data, getPriceMinMax, getUtcTimeFrom } from './Common';

/**
 * Description placeholder
 * @date 2023/7/18 - 22:05:42
 *
 * @typedef {CandleColorStyle}
 */
export type CandleColorStyle = {
  upBar?: string;
  downBar?: string;
  evenBar?: string;
  upCandle?: string;
  downCandle?: string;
  evenCandle?: string;
};

/**
 * Description placeholder
 * @date 2023/7/24 - 20:46:11
 *
 * @export
 * @typedef {SMAConfig}
 */
export type SMAConfig = {
  average: number;
  color: string;
  width: number;
  isFront: boolean;
}

/**
 * Description placeholder
 * @date 2023/7/23 - 19:59:51
 *
 * @param {Array<Data>} data
 * @param {number} viewWidth
 * @param {number} viewHeight
 * @returns {{ xScale: any; yScale: any; }}
 */
export const makeScales = (
  data: Array<Data>,
  viewWidth: number,
  viewHeight: number
) => {
  const xScale = d3
    .scaleBand()
    .rangeRound([0, viewWidth])
    .paddingOuter(0)
    .align(1)
    .domain(data.map((d) => getUtcTimeFrom(d.time)));

  const { min, max } = getPriceMinMax(data);
  const yScale = d3.scaleLinear().domain([min, max]).range([viewHeight, 0]);
  return { xScale, yScale };
};

/**
 * Description placeholder
 * @date 2023/7/22 - 16:45:45
 *
 * @param {React.MutableRefObject<any>} ref
 * @param {*} xScale
 * @param {*} yScale
 * @param {Array<Data>} data
 * @param {string} tagId
 */
export const renderCandles = (
  ref: React.MutableRefObject<any>,
  xScale: any,
  yScale: any,
  colorStyle: CandleColorStyle,
  tagId: string,
  data: Array<Data>
) => {
  const {
    upBar = 'red',
    downBar = 'blue',
    evenBar = 'gray',
    upCandle = 'red',
    downCandle = 'blue',
    evenCandle = 'gray'
  } = colorStyle ?? {};

  const svg = d3.select(ref.current);

  // 髭の描画
  const candles = svg.select(tagId).selectAll('g').data(data);

  // 対応するデータが存在しないエレメントは削除
  candles.exit().remove();

  // ローソク足毎にgroupを作成
  const candleGropus = candles
    .enter()
    .append('g')
    .attr('id', (d) => d.time);

  // line(髭)要素の追加
  candleGropus.append('line');

  // rect(ローソク足実体)要素の追加
  candleGropus.append('rect');

  // データ更新
  const updateGroups = svg.select(tagId).selectAll('g').data(data);

  // 髭のデータ更新
  updateGroups
    .select('line')
    .attr('y1', (d) => yScale(d.high))
    .attr('y2', (d) => yScale(d.low))
    .attr('x1', (d) => xScale(getUtcTimeFrom(d.time)))
    .attr('x2', (d) => xScale(getUtcTimeFrom(d.time)))
    .attr('stroke', (d) =>
      d.open < d.close ? upBar : d.close < d.open ? downBar : evenBar
    );

  // 実体のデータ更新
  updateGroups
    .select('rect')
    .attr('x', (d) => xScale(getUtcTimeFrom(d.time)) - xScale.bandwidth() / 2)
    .attr('y', (d) => yScale(Math.max(d.open, d.close)))
    .attr('width', xScale.bandwidth())
    .attr(
      'height',
      (d) =>
        yScale(Math.min(d.open, d.close)) - yScale(Math.max(d.open, d.close))
    )
    .attr('fill', (d) => {
      return d.open < d.close
        ? upCandle
        : d.open === d.close
        ? evenCandle
        : downCandle;
    });
};

/**
 * Description placeholder
 * @date 2023/7/24 - 20:40:20
 *
 * @param {React.MutableRefObject<any>} ref
 * @param {*} xScale
 * @param {*} yScale
 * @param {string} tagId
 * @param {Array<SMAConfig>} smaConfigs
 * @param {Array<Data>} data
 */
export const renderSMAs = (
  ref: React.MutableRefObject<any>,
  xScale: any,
  yScale: any,
  tagId: string,
  smaConfigs: Array<SMAConfig>,
  data: Array<Data>
) => {
  const smaValues = smaConfigs.map((sma) =>
    data
      .map((d, index, array) => ({
        timeStart: d.time,
        color: sma.color,
        values: array.slice(index - sma.average, index).map((d) => d.close)
      }))
      .filter((v) => v.values.length === sma.average)
      .map((d) => ({
        ...d,
        smaStart: d.values.reduce((a, b) => a + b) / d.values.length
      }))
      .map((d, i, array) => ({
        ...d,
        timeEnd: array[i + 1]?.timeStart,
        smaEnd: array[i + 1]?.smaStart
      }))
      .slice(0, -1)
  );

  const svg = d3.select(ref.current);

  // 移動平均線
  const gData = svg.select(tagId).selectAll('g').data(smaConfigs);
  gData.exit().remove();
  gData.enter().append('g');
  svg.select(tagId).selectAll('g')
    .attr('id', (v) => `sma-${v.average}`);

  smaValues.forEach((smaValue, i) => {
    const smaConfig = smaConfigs[i];
    const smaLines = svg
      .select(tagId)
      .select(`#sma-${smaConfig.average}`)
      .selectAll('line')
      .data(smaValue);

    smaLines.exit().remove();
    smaLines.enter().append('line');

    const updateLines = svg
      .select(tagId)
      .select(`#sma-${smaConfig.average}`)
      .selectAll('line')
      .data(smaValue);
    updateLines
      .attr('id', (d) => d.time)
      .attr('x1', (d) => xScale(getUtcTimeFrom(d.timeStart)))
      .attr('x2', (d) => xScale(getUtcTimeFrom(d.timeEnd)))
      .attr('y1', (d) => yScale(d.smaStart))
      .attr('y2', (d) => yScale(d.smaEnd))
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', `${smaConfig.width}`);
  });
};
