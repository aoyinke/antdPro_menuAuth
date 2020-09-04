import React, { useEffect, useCallback } from 'react'
import { ReloadOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import styles from './styles.less'

const pageNum = 1;
const pageSize = 20;
let tools = []
const ToolBarRender = (props) => {

    const { request } = props
    useEffect(() => {
        if (props.tools) {
            tools = props.tools()
        }

    }, [])

    const reload = useCallback(() => {
        request({ pageNum, pageSize })
    }, [])
    return (
        <div className={styles.toolBar}>
            <div className={styles.toolBarRight}>
                {
                    tools.map(item => {
                        return (
                            item
                        )
                    })
                }
                <span onClick={reload} style={{ cursor: "pointer" }}>
                    <Tooltip placement="topLeft" title="刷新" arrowPointAtCenter>
                        <ReloadOutlined style={{ fontSize: "1.3em" }} />
                    </Tooltip>
                </span>
            </div>
        </div>
    )
}

export default React.memo(ToolBarRender)