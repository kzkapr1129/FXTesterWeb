import { Box } from '@chakra-ui/react';
import * as d3 from 'd3';
import React, { useLayoutEffect, useRef } from 'react';

import {
  CandleColorStyle,
  makeScales,
  renderCandles,
  renderSMAs,
  SMAConfig
} from '../../common/d3utils';
import { Candle } from '../../types/Candle';

/**
 * Description placeholder
 * @date 2023/7/24 - 20:48:21
 *
 * @typedef {Props}
 */
type Props = {
  w?: string;
  h?: string;
  data: Array<Candle>;
  colorStyle?: CandleColorStyle;
  smaConfigs?: Array<SMAConfig>;
};

/**
 * Description placeholder
 * @date 2023/7/24 - 20:48:25
 *
 * @param {*} props
 * @returns {*}
 */
export const CandleChart: React.FC<Props> = (props) => {
  const {
    w = '100%',
    h = '100%',
    data,
    colorStyle = {},
    smaConfigs = []
  } = props;
  const d3ContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // チャートコンポーネントのサイズ変更を検知するEffect
  useLayoutEffect(() => {
    // サイズ変更時に呼び出されるオブザーバ
    const resizeObserver = new ResizeObserver(() => {
      // コンテナのサイズを取得
      const viewWidth = d3ContainerRef.current?.offsetWidth ?? 0;
      const viewHeight = d3ContainerRef.current?.offsetHeight ?? 0;

      // X軸、Y軸のスケールを作成
      const { xScale, yScale } = makeScales(data, viewWidth, viewHeight);

      // ローソク足チャートの描画
      renderCandles(svgRef, xScale, yScale, colorStyle, '#candles', data);

      const frontSmaConfigs = smaConfigs.filter((config) => config.isFront);
      const backSmaConfigs = smaConfigs.filter((config) => !config.isFront);

      // SMAの描画
      renderSMAs(
        svgRef,
        xScale,
        yScale,
        '#front-indicator',
        frontSmaConfigs,
        data
      );

      // SMAの描画
      renderSMAs(
        svgRef,
        xScale,
        yScale,
        '#back-indicator',
        backSmaConfigs,
        data
      );

      const xAxis = d3
        .axisBottom()
        .scale(xScale)
        .tickValues(xScale.domain().filter((_, i) => !(i % 50)))
        .tickFormat((d) => `2023/01/01 00:00 ${d}`); // TODO

      d3.selectAll('path').attr('hoge', 'red');

      d3.select('#axis_bottom')
        .attr('transform', `translate(0, ${viewHeight - 40})`)
        .call(xAxis);
    });

    const refCurrent = d3ContainerRef.current;
    resizeObserver.observe(refCurrent as Element);

    return () => {
      // その後で、監視を停止することができる
      resizeObserver.unobserve(refCurrent as Element);
    };
  }, [data, smaConfigs, colorStyle]);

  return (
    <Box w={w} h={h} ref={d3ContainerRef}>
      <svg width="100%" height="100%" ref={svgRef}>
        <rect width="100%" height="100%" fill="gray"></rect>
        <g id="back-indicator" />
        <g id="candles" />
        <g id="front-indicator" />
        <g id="axis_bottom" />
      </svg>
    </Box>
  );
};
