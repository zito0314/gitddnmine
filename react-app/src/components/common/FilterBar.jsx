import { ReloadOutlined, SearchOutlined } from '../icons'
import { Button, DatePicker, Flex, Input, Select } from 'antd'

const { RangePicker } = DatePicker
const FILTER_WIDTH_CLASS = {
  120: 'filter-select--sm',
  130: 'filter-select--xs',
  140: 'filter-select--compact',
  150: 'filter-select--period',
  160: 'filter-select--md',
  180: 'filter-select--lg',
  200: 'filter-select--xl',
  220: 'filter-select--xxl',
}

function getFilterSelectClass(filter) {
  return ['filter-select', FILTER_WIDTH_CLASS[filter.width ?? 160], filter.className].filter(Boolean).join(' ')
}

function FilterBar({
  search,
  filters = [],
  actions,
  onSearch,
  onReset,
  children,
  className = '',
  gap = 8,
  wrap = 'wrap',
  align = 'center',
  justify = 'start',
  style,
}) {
  const classes = ['filter-bar', className].filter(Boolean).join(' ')

  return (
    <Flex className={classes} align={align} justify={justify} gap={gap} wrap={wrap} style={style}>
      {search || filters.length || onReset || actions ? (
        <>
          <Flex align="center" gap={gap} wrap={wrap} className="filter-bar-controls">
            {search ? (
              <Input
                allowClear
                className={['filter-search', search.className].filter(Boolean).join(' ')}
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
                  className={getFilterSelectClass(filter)}
                />
              )
            })}

            {children}
          </Flex>

          {onReset || actions ? (
            <Flex align="center" gap={gap} wrap={wrap} className="filter-bar-actions">
              {onReset ? <Button icon={<ReloadOutlined />} onClick={onReset}>Reset</Button> : null}
              {actions}
            </Flex>
          ) : null}
        </>
      ) : children}
    </Flex>
  )
}

export default FilterBar
