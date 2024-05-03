/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useEffect, useRef, useState } from 'react';
import './index.scss';
import * as echarts from 'echarts/core';
import c_geo from '@/utils/data/c_geo.json';
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  VisualMapComponent,
  VisualMapComponentOption,
  GeoComponent,
  GeoComponentOption,
  LegendComponent,
  GridComponentOption,
  LegendComponentOption,
  GridComponent,
} from 'echarts/components';
import {
  BarChart,
  BarSeriesOption,
  MapChart,
  MapSeriesOption,
} from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { GeoJSONSourceInput } from 'echarts/types/src/coord/geo/geoTypes.js';
import { hotCityAllGet, provincesGet } from '@/api/city';
import { tailErr } from '@/utils';

type EChartsOption = echarts.ComposeOption<
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | BarSeriesOption
>;

let option: EChartsOption;

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer,
  GridComponent,
  LegendComponent,
  BarChart,
]);

export const Analysis: React.FC = () => {
  type StackData = {
    name: string;
    type: string;
    stack: string;
    label: {
      show: boolean;
    };
    emphasis: {
      focus: string;
    };
    data: any[];
  };

  // 地图组件
  const mapRef = useRef(null);
  // bar-y-category-stack 组件
  const barYCategoryStack = useRef(null);

  const [series_data, setSeries_data] = useState<
    Array<{ value: number; name: string }>
  >([]);
  const [x_data, setX_data] = useState<Array<StackData>>([]);

  useEffect(() => {
    // 获取景点热门数据
    provincesGet()
      .then(data => {
        let serise = [];
        for (let i = 0; i < data['sheng'].length; i++) {
          serise.push({
            value: parseInt(data['count'][i]),
            name: data['sheng'][i] + '省',
          });
        }
        setSeries_data(serise);
      })
      .catch(tailErr);
  }, [setSeries_data]);

  //setOptions Map组件
  useEffect(() => {
    const map = echarts.init(mapRef.current);
    echarts.registerMap('旅游景点', c_geo as GeoJSONSourceInput);
    map.setOption({
      tooltip: {
        trigger: 'item',
        formatter: params => {
          return `${params.name}<br/>${params.value || 0} (景点)`;
        },
        valueFormatter: (value: number) => '$' + value.toFixed(2),
      },
      toolbox: {
        show: false,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      visualMap: {
        min: 10,
        max: 800,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered'],
        },
      },
      series: [
        {
          name: '香港18区人口密度',
          type: 'map',
          map: '旅游景点',
          label: {
            show: true,
          },
          data: series_data,
        },
      ],
    });

    return () => {
      map.dispose();
    };
  }, [series_data]);

  useEffect(() => {
    hotCityAllGet()
      .then(data => {
        let series_data: StackData[] = [];
        const { top_city, comments, jds } = data;
        for (let index = 0; index < top_city.length; index++) {
          series_data.push({
            name: top_city[index],
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [comments[index], jds[index]],
          });
        }
        setX_data(series_data);
      })
      .catch(tailErr);
  }, [setX_data]);
  //setOptions stackBar组件
  useEffect(() => {
    // 请求所有数据热门城市的景点&评论
    let stackBar: echarts.ECharts;

    stackBar = echarts.init(barYCategoryStack.current);

    const option = {
      title: {
        text: '各个城市情况',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      legend: {
        show: true,
        top: '4%',
      },
      grid: {
        top:'100',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: ['热评人数', '热门景点'],
      },
      series: x_data,
    };

    option && stackBar.setOption(option);

    return () => {
      stackBar.dispose();
    };
  }, [x_data]);

  return (
    <main className="analysis-view">
      <h2>旅游景点数据可视化</h2>
      {/* 地图组件 */}
      <div
        ref={mapRef}
        className="map-container"
        style={{ width: '100%', height: '800px' }}
      ></div>

      {/* 层叠组件图表 */}
      <div
        ref={barYCategoryStack}
        className="chart-item"
        style={{ width: '500px', height: '800px' }}
      >
        {/* 渲染柱状图组件 */}
      </div>

      <div className="chart-container">
        {/* 这里可以渲染多个图表组件，例如使用recharts, chart.js, victory等库 */}

        <div className="chart-item">
          <h2>饼图</h2>
          {/* 渲染饼图组件 */}
        </div>
        <div className="chart-item">
          <h2>折线图</h2>
          {/* 渲染折线图组件 */}
        </div>
      </div>
      <div className="counter-container">
        <p>计数器: {/* 这里显示你的计数器值，比如 2048 */}</p>
      </div>
    </main>
  );
};
export default Analysis;
