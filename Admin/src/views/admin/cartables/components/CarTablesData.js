import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { CPCard, CPTab, CPTable } from "components/CP";
import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import TableInit from './initial/TableInit';
import AdvanceTable from "components/AdvanceTable";
import { cartableRecordService } from "services/cartables/cartableRecordService";

const CarTablesData = ({ data , countNewItem }) => {
    const history = useHistory();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (selectedKeys, confirm, dataIndex, clearFilters) => {
        clearFilters();
        setSearchText('');
        handleSearch(selectedKeys, confirm, dataIndex)

    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(selectedKeys, confirm, dataIndex, clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>

                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? 'red' : 'red',
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString()?.toLowerCase()?.includes(value?.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <spn>{text}</spn>
            ) : (
                text
            ),
    });

    const showMore = async (row) => {
        debugger
        await cartableRecordService.update(row.id)
        history.push({
            pathname: row.url,
            state: {
                recordId: row.recordId,
            }

        });
    }
    return (
        <div style={{marginTop:"-40px"}}>
            
            <AdvanceTable columnsTable={TableInit({ show: showMore, getColumnSearchProps })} islocalData={true} gridData={data} />
        </div>
    )
}

export default CarTablesData
