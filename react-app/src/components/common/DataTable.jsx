import { Empty, Table } from 'antd'
import { EMPTY_MESSAGES } from '../../constants'

function DataTable({
  rowKey = 'id',
  columns,
  dataSource,
  loading = false,
  pagination = { pageSize: 10, showSizeChanger: false },
  ...tableProps
}) {
  return (
    <Table
      className="gitddn-data-table"
      rowKey={rowKey}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      locale={{
        emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={EMPTY_MESSAGES.table} />,
      }}
      scroll={{ x: 'max-content', ...tableProps.scroll }}
      {...tableProps}
    />
  )
}

export default DataTable
