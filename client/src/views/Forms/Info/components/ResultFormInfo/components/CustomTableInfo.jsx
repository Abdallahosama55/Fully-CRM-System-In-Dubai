import { Table } from 'antd'
import React from 'react'

function CustomTableInfo({dataSource,columns}) {
  return (
    <div className='custom-table'>
 <Table dataSource={dataSource} columns={columns} pagination={false} bordered />

    </div>
  )
}

export default CustomTableInfo