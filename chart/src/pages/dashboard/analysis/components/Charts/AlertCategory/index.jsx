import React, { useState, useEffect } from 'react';
import autoHeight from '../autoHeight';
import Debounce from 'lodash.debounce';
import { Card } from 'antd'
import {
  Chart,
  Geom,
  Tooltip,
  Axis,
  Coord,
  Legend,
  Label
} from 'bizcharts';
import styles from '../index.less';

let node = undefined
const data = [
  { item: '事例一', percent: 0.4 },
  { item: '事例二', percent: 0.21 },
  { item: '事例三', percent: 0.17 },
  { item: '事例四', percent: 0.13 },
  { item: '事例五', percent: 0.09 },
];
const cols = {
  percent: {
    formatter: val => {
      val = val * 100 + '%';
      return val;
    },
  },
};

const AlertCategory = ({
  loading
}) => {
  const [autoHideXLabels, handleAutoHideXLabels] = useState(false)
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


  return (
    <Card
      loading={loading}
      bordered={false}
      className={styles.AlertCard}
    >
      <div>
        <h4>告警类型（月）</h4>
      </div>
      <Chart
        padding="auto"
        height={200}
        width={260}
        data={data}
        forceFit
        scale={cols}
      >
        <Coord type="theta" radius={0.8} />
        <Axis name="item" />

        <Geom
          type="intervalStack"
          position="percent"
          color="item"
          tooltip={[
            "item*percent",
            (item, percent) => {
              percent = percent * 100 + "%";
              return {
                name: item,
                value: percent
              };
            }
          ]}
          style={{
            lineWidth: 1,
            stroke: "#fff"
          }}
        >
          <Label
            content="percent"
            formatter={(val, item) => {
              return item.point.item + ": " + val;
            }}
          />
        </Geom>
        <Legend
          position="right-center"
        />
      </Chart>

    </Card>
  );

}

export default autoHeight()(React.memo(AlertCategory));
