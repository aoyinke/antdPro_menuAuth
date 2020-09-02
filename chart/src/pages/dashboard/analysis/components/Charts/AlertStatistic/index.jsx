import React, { useState, useEffect } from 'react';
import {
    Chart,
    Tooltip,
    Legend,
    Axis,
    Geom
} from "bizcharts";
import Debounce from 'lodash.debounce';
import { Card } from 'antd'
import styles from '../index.less';
import autoHeight from '../autoHeight';


let node = undefined
const data = [
    {
        time: "10:10",
        call: 4,
        waiting: 2,
        people: 2
    },
    {
        time: "10:15",
        call: 2,
        waiting: 6,
        people: 3
    },
    {
        time: "10:20",
        call: 13,
        waiting: 2,
        people: 5
    },
    {
        time: "10:25",
        call: 9,
        waiting: 9,
        people: 1
    },
    {
        time: "10:30",
        call: 5,
        waiting: 2,
        people: 3
    },
    {
        time: "10:35",
        call: 8,
        waiting: 2,
        people: 1
    },
    {
        time: "10:40",
        call: 13,
        waiting: 1,
        people: 2
    }
];

let chartIns = null;
const scale = {
    people: {
        min: 0,
        max: 10,
    },
    waiting: {
        min: 0,
        max: 10
    }
};
const colors = ['#6394f9', '#62daaa']


const AlertStatic = props => {

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

    return (
        <Card
            loadin={loading}
            className={styles.AlertStatistic}
        >
            <Chart
                scale={scale}
                forceFit
                height={200}
                width={100}
                data={data}
                padding="auto"
                animate

            >
                <div>
                    <h4>告警统计（年）</h4>
                </div>
                {/* 如需使用单轴  */}
                <Axis name="waiting" visible={true} />
                <Axis name="people" visible={false} />

                < Legend />
                < Tooltip shared />
                <Geom
                    type="interval"

                    position="time*waiting"
                    color={colors[0]}
                />
                <Geom
                    position="time*people"
                    color={colors[1]}
                    size={3}
                    shape="smooth"
                    type="line"
                />
                <Geom
                    position="time*people"
                    color={colors[1]}
                    size={3}
                    shape="circle"
                    type="point"
                />
            </Chart>
        </Card>
    )
}

export default autoHeight()(AlertStatic)