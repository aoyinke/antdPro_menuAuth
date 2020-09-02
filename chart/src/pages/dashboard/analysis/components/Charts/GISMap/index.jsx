import React, { useState, useEffect } from 'react';
import {
    Chart,
    Coord,
    Tooltip,
    Geom,
    Legend
} from 'bizcharts';
import DataSet from '@antv/data-set';
import * as turf from '@turf/turf'
import Debounce from 'lodash.debounce';
import PageLoading from '../../PageLoading';
import { Card } from 'antd'
import autoHeight from '../autoHeight';
import styles from '../index.less';


let node = undefined
const colors = '#075A84,#3978A4,#6497C0,#91B6D7,#C0D6EA,#F2F7F8'
    .split(',')
    .reverse();

let bgView;
let interval;
let min = 0;
function keepMapRatio(mapData, c, type) {
    if (mapData) {
        // 获取数据外接矩形，计算宽高比
        const bbox = turf.bbox(mapData);
        
        const width = bbox[2] - bbox[0];
        const height = bbox[3] - bbox[1];
        const ratio = height / width;

        const cWidth = c.width;
        const cHeight = c.height;
        const cRatio = cHeight / cWidth;
        const mapRatio = c.mapRatio;
        if (!cRatio || cRatio === mapRatio) return;

        if (cRatio >= ratio) {
            const halfDisRatio = (cRatio - ratio) / 2 / cRatio;
            c.scale('x', {
                range: [0, 1],
            });
            c.scale('y', {
                range: [halfDisRatio, 1 - halfDisRatio],
            });
        } else {
            const halfDisRatio = ((1 / cRatio - 1 / ratio) / 2) * cRatio;
            c.scale('y', {
                range: [0, 1],
            });
            c.scale('x', {
                range: [halfDisRatio, 1 - halfDisRatio],
            });
        }
        console.log(bbox,width,height,ratio,cWidth,cRatio,mapRatio)
        c.mapRatio = cRatio;
        c.render(true);
    }
}


const GISMap = props => {

    const [mapData, handleMapData] = useState({})
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
        const dataUrl =
            'https://gw.alipayobjects.com/os/bmw-prod/d4652bc5-e971-4bca-a48c-5d8ad10b3d91.json';
        fetch(dataUrl).then(function (response) {
            return response.json();
        }).then((d) => {

            const feas = d.features.filter(feat => feat.properties.name).map(v => {
                return {
                    ...v,
                    properties: {
                        ...v.properties,
                        size: Math.floor(Math.random() * 300),
                    },
                };
            });
            const res = { ...d, features: feas };
            handleMapData(() => res)
        })
        return () => {
            window.removeEventListener('resize', resize);
        }
    }, [])

    if (mapData) {
        // data set
        const ds = new DataSet();

        // draw the map
        const dv = ds
            .createView('back')
            .source(mapData, {
                type: 'GeoJSON',
            })
            .transform({
                type: 'geo.projection',
                projection: 'geoMercator',
                as: ['x', 'y', 'centroidX', 'centroidY'],
            });

        bgView = new DataSet.View().source(dv.rows);
        const sizes = bgView.rows.map(r => Number(r.properties.size));

        const min = Math.min(...sizes);
        const max = Math.max(...sizes);

        interval = (max - min) / colors.length;
    }
    const scale = {
        x: { sync: true },
        y: { sync: true },
    };

    return (
        <Card
            loadin={loading}
            className={styles.GISCard}
        >
            {
                <Chart
                    // 清空默认的坐标轴legend组件
                    pure
                    height={524}
                    width={600}
                    scale={scale}
                    animate
                    // 不支持dataSet数据格式了
                    data={bgView ? bgView.rows : bgView}
                    forceFit
                    placeholder={<PageLoading />}
                    padding="auto"
                    onGetG2Instance={c => {
                        keepMapRatio(mapData, c, 'render');
                        c.on('afterrender', () => {
                            keepMapRatio(mapData, c, 'rerender');
                        });
                    }}
                >
                    <Coord reflect="y" />
                    <Tooltip title="name" />
                    <Legend />
                    <Geom
                        type="polygon"
                        position="x*y"

                        color={['centroidY', '#777090-#493398']}
                        tooltip={[
                            'name*properties',
                            (t, p) => {
                                return {
                                    //自定义 tooltip 上显示的 title 显示内容等。
                                    name: 'Size',
                                    title: t,
                                    value: p.size,
                                };
                            },
                        ]}
                    >
                    </Geom>
                </Chart>
            }
        </Card>
    )
}



export default autoHeight()(GISMap)