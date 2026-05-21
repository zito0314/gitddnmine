import { Empty, Table } from 'antd'
import { UI_TEXT } from '../../constants'

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
        emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={UI_TEXT.messages.empty.table} />,
      }}
      scroll={{ x: 'max-content', ...tableProps.scroll }}
      {...tableProps}
    />
  )
}

export default DataTable
