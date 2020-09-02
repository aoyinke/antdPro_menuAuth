import React, { useState, useEffect } from 'react';
import { Axis, Chart, Geom, Tooltip, Coord, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import Debounce from 'lodash.debounce';
import autoHeight from '../autoHeight';
import { Card } from 'antd'
import styles from '../index.less';

let root = undefined
let node = undefined
const data = [
  {
    State: "WY",
    "小于5岁": 25635,
    "5至13岁": 1890,
    "14至17岁": 9314
  },
  {
    State: "DC",
    "小于5岁": 30352,
    "5至13岁": 20439,
    "14至17岁": 10225
  },
  {
    State: "VT",
    小于5岁: 38253,
    "5至13岁": 42538,
    "14至17岁": 15757
  },
  {
    State: "ND",
    "小于5岁": 51896,
    "5至13岁": 67358,
    "14至17岁": 18794
  },
  {
    State: "AK",
    "小于5岁": 72083,
    "5至13岁": 85640,
    "14至17岁": 22153
  }
];

const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: "fold",
  fields: ["小于5岁", "5至13岁", "14至17岁"],
  // 展开字段集
  key: "年龄段",
  // key字段
  value: "人口数量",
  // value字段
  retains: ["State"] // 保留字段集，默认为除fields以外的所有字段
});

const StackedChart = (props) => {

  const [autoHideXLabels, handleAutoHideXLabels] = useState(false)
  const { loading } = props
  const resize = Debounce(() => {
    if (!node || !node.parentNode) {
      return;
    }

    const canvasWidth = node.parentNode.clientWidth;


    const minWidth = data.length * 30;

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        handleAutoHideXLabels(() => true)
      }
    } else if (autoHideXLabels) {
      handleAutoHideXLabels(() => false)
    }
  }, 500);

  useEffect(() => {
    window.addEventListener('resize', resize, {
      passive: true,
    });

    return () => {
      window.removeEventListener('resize', resize);
    }
  }, [])



  // const dv = new DataSet().createView().source(data);



  return (
    <Card
      loadin={loading}
      className={styles.companyCard}
    >
      <Chart
        forceFit={true}
        data={dv.rows}
        height={218}
        width={100}
        padding="auto"
        animate
      >
        <div>
          <h4>企业告警排名（月）</h4>
        </div>
        <Coord transpose />

        <Axis
          name="State"
          title={false}
          label={autoHideXLabels ? undefined : {}}
          tickLine={autoHideXLabels ? undefined : {}}
        />
        <Tooltip />
        <Legend />
        <Geom
          type="interval"
          adjust={[{ type: 'stack' }]}
          position="State*人口数量"
          color={"年龄段"}
          label={['人口数量', { position: 'middle', offset: 0, style: { fill: '#fff' }, layout: { type: 'limit-in-shape' } }]} />
      </Chart>
    </Card>

  );

}


export default autoHeight()(StackedChart)