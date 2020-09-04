import React, { useEffect } from 'react'

import { Button } from 'antd';


const SearchOperation = props => {

    const { searchConfig, handleTypeId, actionRef } = props
    console.log("searchConfig", searchConfig)
    useEffect(() => {
        const { form } = searchConfig
        const values = form.getFieldValue()
        if (JSON.stringify(values) !== '{}') {
            handleTypeId(() => values.typeId)
        }
    }, [])


    const search = () => {
        actionRef.current.reload()
        console.log("actionRef", actionRef)
    }
    return (
        <>
            <Button style={{ marginRight: '8px' }}>重置</Button>
            <Button type="primary" onClick={search}>查询</Button>
        </>

    )
}

export default React.memo(SearchOperation)