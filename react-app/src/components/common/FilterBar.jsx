import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, DatePicker, Flex, Input, Select, Space } from 'antd'

const { RangePicker } = DatePicker

function FilterBar({
  search,
  filters = [],
  actions,
  onSearch,
  onReset,
  children,
}) {
  return (
    <Card className="filter-bar" size="small">
      <Flex align="center" justify="space-between" gap={12} wrap="wrap">
        <Space size={8} wrap>
          {search ? (
            <Input
              allowClear
              className="filter-search"
              prefix={<SearchOutlined />}
              placeholder={search.placeholder ?? '검색'}
              value={search.value}
              onChange={(event) => search.onChange?.(event.target.value)}
              onPressEnter={(event) => onSearch?.(event.currentTarget.value)}
            />
          ) : null}

          {filters.map((filter) => {
            if (filter.type === 'dateRange') {
              return (
                <RangePicker
                  key={filter.key}
                  value={filter.value}
                  onChange={filter.onChange}
                  placeholder={filter.placeholder}
                />
              )
            }

            return (
              <Select
                key={filter.key}
                allowClear={filter.allowClear ?? true}
                mode={filter.mode}
                options={filter.options}
                placeholder={filter.placeholder}
                value={filter.value}
                onChange={filter.onChange}
                style={{ minWidth: filter.width ?? 160 }}
              />
            )
          })}

          {children}
        </Space>

        <Space size={8} wrap>
          {onReset ? <Button icon={<ReloadOutlined />} onClick={onReset}>Reset</Button> : null}
          {actions}
        </Space>
      </Flex>
    </Card>
  )
}

export default FilterBar
