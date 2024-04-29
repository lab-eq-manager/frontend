import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableColumn,
  Popover,
  Button,
  CheckboxGroup,
  Checkbox,
  PopoverTrigger,
  PopoverContent,
  Selection,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  Chip,
} from '@nextui-org/react';
import { ApplyEquipmentRequest, applyStatusMap, availableTime, equipmentStatusMap } from '@/types';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { ChevronDownIcon, MoreVerticalIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AdminApprovalInfo, adminApproval, adminReject, getExcel } from '@/utils/requests';
import { toast } from './ui/use-toast';
import axios from 'axios';
import { mergeTimeIndex } from '@/utils/mergeTimeIndex';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const columns = [
  { name: '申请编号', uid: 'applyId' },
  { name: '设备编号', uid: 'eqId' },
  { name: '设备名称', uid: 'eqName' },
  { name: '申请人学号', uid: 'uid' },
  { name: '申请人姓名', uid: 'Name' },
  { name: '申请时间', uid: 'applyTime' },
  { name: '使用日期', uid: 'applyDate' },
  { name: '使用时段', uid: 'timeIndex' },
  { name: '申请处理日期', uid: 'approvalTime' },
  { name: '申请状态', uid: 'status' },
  { name: '操作', uid: 'actions' },
];

export enum AdminApprovalTableColumn {
  APPLY_ID = 'applyId',
  EQ_ID = 'eqId',
  UID = 'uid',
  APPLY_TIME = 'applyTime',
  APPLY_DATE = 'applyDate',
  TIME_INDEX = 'timeIndex',
  APPROVAL_TIME = 'approvalTime',
  STATUS = 'status',
  ACTIONS = 'actions',
}

export const ApprovalTable = ({
  eqData,
  showColumn,
  canCustomColumn,
  getData,
  selectedData,
  setSelectedData,
  children,
}: {
  eqData: AdminApprovalInfo[];
  showColumn?: AdminApprovalTableColumn[];
  canCustomColumn?: boolean;
  getData: () => void;
  selectedData: AdminApprovalInfo[];
  setSelectedData: React.Dispatch<React.SetStateAction<AdminApprovalInfo[]>>;
  children?: React.ReactNode;
}) => {
  const INITIAL_VISIBLE_COLUMNS = showColumn || [
    'Name',
    // 'eqId',
    'eqName',
    'applyDate',
    'timeIndex',
    'actions',
  ];

  const navigate = useNavigate();

  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [selectedKeys, setSelectedKeys] = useState(new Set<string>([]));
  // const [selectedData, setSelectedData] = useState<AdminApprovalInfo[]>([]);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const renderCell = useCallback((applyData: AdminApprovalInfo, columnKey: React.Key) => {
    const cellValue = applyData[columnKey as keyof AdminApprovalInfo];

    const getTimeIndexShow = (timeIndex: string) => {
      const timeIndexArr = timeIndex.substring(1, timeIndex.length - 1).split(',');
      return mergeTimeIndex(timeIndexArr.map((index) => parseInt(index)).sort((a, b) => a - b));
      // return timeIndexArr.map((index) => availableTime[index as number]).join(' / ');
    };

    switch (columnKey) {
      case 'eqName':
        return <div>{cellValue}</div>;
      case 'uid':
      case 'Name':
      case 'eqId':
      case 'applyDate':
      case 'applyTime':
        return <div style={{ width: 'max-content' }}>{cellValue}</div>;
      case 'timeIndex':
        // return <div>{availableTime[cellValue]}</div>;
        return <div style={{ width: 'max-content' }}>{getTimeIndexShow(cellValue)}</div>;
      case 'status':
        return <Chip>{applyStatusMap[cellValue]}</Chip>;
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <MoreVerticalIcon strokeWidth={1} size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    navigate(`/detail/${encodeURIComponent(applyData.eqId)}`);
                  }}
                >
                  查看设备
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    adminApproval({ applyId: applyData.applyId })
                      .then((res) => {
                        getData();
                        toast({
                          title: '批准成功',
                        });
                      })
                      .catch((err) => {
                        toast({
                          title: '批准失败',
                          description: err.message,
                          variant: 'destructive',
                        });
                      });
                    console.log('==applyData', applyData);
                    getData();
                  }}
                >
                  批准
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    adminReject({ applyId: applyData.applyId })
                      .then((res) => {
                        getData();
                        toast({
                          title: '拒绝成功',
                        });
                      })
                      .catch((err) => {
                        toast({
                          title: '拒绝失败',
                          description: err.message,
                          variant: 'destructive',
                        });
                      });
                  }}
                >
                  拒绝
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const setSelect = (keys: Set<string>) => {
    setSelectedKeys(keys);
    const keyArr =
      keys === 'all'
        ? eqData.map((item) => item.applyId)
        : Array.from(keys).map((key) => parseInt(key));
    console.log('==keyArr', keyArr);
    keyArr.forEach((key) => {
      const selectData = eqData.find((item) => item.applyId === key);
      if (selectData && !selectedData.find((item) => item.applyId === key)) {
        setSelectedData((prev) => [...prev, selectData]);
      }
    });
    setSelectedData((prev) => prev.filter((item) => keyArr.includes(item.applyId)));
  };

  window.addEventListener('reselect', () => {
    setSelectedKeys(new Set<string>());
  });

  return (
    <div className="wrapper flex gap-2 flex-col w-content min-w-full">
      {canCustomColumn && (
        <div className="toolbar flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon strokeWidth={1} />} variant="flat">
                  展示项目
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {children}
          </div>
          <div>当前展示第 {localStorage.getItem('page') || 1} 页数据</div>
        </div>
      )}

      <Table
        id="approval-table"
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        topContentPlacement="outside"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelect(keys)}
        selectionMode="multiple"
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              // allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No data'} items={eqData}>
          {(item) => (
            <TableRow key={`${item.applyId}`}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
