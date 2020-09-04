import React from 'react'
import EnumComponent from './components/handleEnumColumns'

export const handleEnumColumns = (columns) => {
    const MyComlumns = Array.prototype.concat.apply([], columns)

    const TableColumns = []

    MyComlumns.forEach(column => {
        const item = column
        if (column.hasOwnProperty("valueEnum")) {
            item.render = (text, record, index) => {
                return <EnumComponent valueEnum={column.valueEnum} text={text} record={record} index={index} />
            }
        }
        TableColumns.push(item)
    })

    return TableColumns
}