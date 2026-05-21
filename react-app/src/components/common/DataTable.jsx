import { Empty, Table } from 'antd'

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
        emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="표시할 데이터가 없습니다." />,
      }}
      scroll={{ x: 'max-content', ...tableProps.scroll }}
      {...tableProps}
    />
  )
}

export default DataTable
