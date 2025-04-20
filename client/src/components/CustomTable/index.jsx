import { Button, ConfigProvider, Divider, Input, Space, Table } from 'antd'
import { ArrowBackSVG, ArrowSVG } from 'assets/jsx-svg'
import React, { useEffect, useRef, useState } from 'react'
// style
import './styles.css'
// for development purposes
/**
 * CustomTable component for displaying data in a table format.
 *
 * @param {Object} props - Component props.
 * @param {number} props.page - Current page number.
 * @param {number} props.pageSize - Number of items per page.
 * @param {function} props.setPage - Function to set the current page.
 * @param {number} props.total - Total number of items.
 * @param {React.ReactNode} props.bottomContent - Content to display below the table.
 * @param {boolean} [props.bordered] - Whether to show all table borders.
 * @param {Array<Object>} props.columns - Columns of table.
 * @param {Object} [props.components] - Override default table elements.
 * @param {Array<Object>} props.dataSource - Data record array to be displayed.
 * @param {Object} [props.expandable] - Config expandable content.
 * @param {function} [props.footer] - Table footer renderer.
 * @param {function} [props.getPopupContainer] - The render container of dropdowns in table.
 * @param {boolean|Object} [props.loading] - Loading status of table.
 * @param {Object} [props.locale] - The i18n text including filter, sort, empty text, etc.
 * @param {Object|boolean} [props.pagination] - Config of pagination.
 * @param {function} [props.rowClassName] - Row's className.
 * @param {string|function} [props.rowKey] - Row's unique key.
 * @param {Object} [props.rowSelection] - Row selection config.
 * @param {boolean} [props.rowHoverable] - Row hover.
 * @param {Object} [props.scroll] - Whether the table can be scrollable.
 * @param {boolean} [props.showHeader] - Whether to show table header.
 * @param {boolean|Object} [props.showSorterTooltip] - The header show next sorter direction tooltip.
 * @param {'large'|'middle'|'small'} [props.size] - Size of table.
 * @param {Array<string>} [props.sortDirections] - Supported sort way.
 * @param {boolean|Object} [props.sticky] - Set sticky header and scroll bar.
 * @param {function} [props.summary] - Summary content.
 * @param {'auto'|'fixed'} [props.tableLayout] - The table-layout attribute of table element.
 * @param {function} [props.title] - Table title renderer.
 * @param {boolean} [props.virtual] - Support virtual list.
 * @param {function} [props.onChange] - Callback executed when pagination, filters or sorter is changed.
 * @param {function} [props.onHeaderRow] - Set props on per header row.
 * @param {function} [props.onRow] - Set props on per row.
 * @param {function} [props.onScroll] - Triggered when the table body is scrolled.
 *
 * See Ant Design Table documentation for all available props.
 */
const CustomTable = ({ className = "", style = {}, tableStyle = {}, page = 1, pageSize = 10, setPage = () => { }, total = 0, bottomContent, ...tableProps }) => {
    const [tableHeight, setTableHeight] = useState('auto');
    const [localPage, setLoaclPage] = useState(page);
    useEffect(() => {
        if (!isNaN(localPage) && localPage > 0 && localPage <= Math.ceil(total / pageSize)) {
            setPage(localPage);
        }
    }, [localPage]);

    const tableRef = useRef();
    useEffect(() => {
        const handleResize = () => {
            if (tableRef.current) {
                const topOffset = tableRef.current.getBoundingClientRect().top + window.scrollY; // Get total offset from top of the table
                const availableHeight = window.innerHeight - topOffset - 16; // Adjust for any margins/paddings

                setTableHeight(availableHeight > window.innerHeight * 0.5 ? availableHeight : window.innerHeight * 0.5);
            }
        };

        handleResize(); // Initial calculation
        window.addEventListener('resize', handleResize); // Update on resize

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup
        };
    }, []);

    return (
        <ConfigProvider theme={{
            "components": {
                "Table": {
                    "headerBg": "#fff",
                }
            }
        }}>
            <div className={`custom_table ${className}`} ref={tableRef} style={{ maxHeight: tableHeight && tableHeight === "auto" && !isNaN(tableHeight) ? `${tableHeight}px` : tableHeight || 'auto', ...style }}>
                <div className='custom_table_container' style={{background:"#fff"}}>
                    <Table
                        style={{ ...tableStyle }}
                        sticky={true}
                        bordered={true}
                        pagination={false}
                        {...tableProps}
                        columns={tableProps?.columns?.map((column) => {
                            // Ensure `onCell` is always a function to avoid runtime errors
                            const originalOnCell = typeof column.onCell === 'function' ? column.onCell : () => ({});
                            const title = typeof column.title === "string" ? <p className='xs_text_medium' style={{color: "var(--gray-500)"}}>{column?.title}</p> : column.title;
                            return {
                                ...column,
                                title,
                                onCell: (record, rowIndex) => {
                                    // Get the original styles from `onCell` if defined
                                    const originalCellProps = originalOnCell(record, rowIndex);

                                    return {
                                        ...originalCellProps,
                                        style: {
                                            verticalAlign: 'top',
                                            minWidth: column.minWidth ? `${column.minWidth}px !important` : undefined,
                                            maxWidth: column.maxWidth ? `${column.maxWidth}px !important` : undefined,
                                            ...originalCellProps.style,
                                        },
                                    };
                                },
                            };
                        })}

                        scroll={undefined}
                        dataSource={
                            tableProps?.dataSource && tableProps.dataSource.length > pageSize
                                ? tableProps.dataSource.slice((page - 1) * pageSize, page * pageSize)
                                : tableProps?.dataSource || []
                        }
                    />
                </div>
                <div className='custom_table_pagination'>
                    <Space split={<Divider type='horizontal' />} size={8}>
                        <span className='sm_text_medium'>{(pageSize * page) - pageSize + 1} - {(pageSize * page)} of {total}</span>
                        <div>
                            <Space size={8}>
                                <Button
                                    style={{ width: "36px", height: "36px" }}
                                    icon={<ArrowBackSVG fill={"#1D1B20"} />}
                                    disabled={page === 1}
                                    onClick={() => {
                                        setLoaclPage(page - 1 > 0 ? page - 1 : 1)
                                    }}
                                />
                                <span>Page</span>
                                <Input
                                    value={localPage}
                                    onChange={(e) => setLoaclPage(e.target.value)}
                                    onBlur={(e) => {
                                        const value = e.target.value;
                                        const numericValue = parseInt(value, 10);

                                        if (!(!isNaN(numericValue) && numericValue > 0 && numericValue <= Math.ceil(total / pageSize))) {
                                            setLoaclPage(page)
                                        }
                                    }}
                                    style={{ width: "36px", height: "36px", textAlign: "center" }}
                                />
                                <Button
                                    style={{ width: "36px", height: "36px" }}
                                    icon={<ArrowSVG fill={"#1D1B20"} />}
                                    disabled={page === Math.ceil(total / pageSize)}
                                    onClick={() => {
                                        setLoaclPage(page + 1 <= Math.ceil(total / pageSize) ? page + 1 : page)
                                    }}
                                />
                            </Space>
                        </div>
                    </Space>
                    <div>
                        {bottomContent}
                    </div>
                </div>
            </div>
        </ConfigProvider>
    )
}

export default CustomTable