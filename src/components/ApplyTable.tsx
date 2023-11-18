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
} from '@nextui-org/react';
import { ApplyEquipmentRequest, availableTime } from '@/types';
import { useCallback, useState, useMemo } from 'react';
import { ChevronDownIcon, MoreVerticalIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const columns = [
  { name: '申请人', uid: 'uid' },
  { name: '设备编号', uid: 'eqId' },
  { name: '申请时间', uid: 'applyTime' },
  { name: '使用日期', uid: 'applyDate' },
  { name: '使用时段', uid: 'timeIndex' },
  { name: '申请状态', uid: 'status' },
  { name: '操作', uid: 'actions' },
];

export enum ApplyTableColumn {
  UID = 'uid',
  EQ_ID = 'eqId',
  APPLY_TIME = 'applyTime',
  APPLY_DATE = 'applyDate',
  TIME_INDEX = 'timeIndex',
  STATUS = 'status',
  ACTIONS = 'actions',
}

export const ApplyTable = ({
  eqData,
  showColumn,
  canCustomColumn,
}: {
  eqData: ApplyEquipmentRequest[];
  showColumn?: ApplyTableColumn[];
  canCustomColumn?: boolean;
}) => {
  const INITIAL_VISIBLE_COLUMNS = showColumn || [
    'uid',
    'eqId',
    'applyDate',
    'timeIndex',
    'actions',
  ];

  const navigate = useNavigate();

  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const renderCell = useCallback((applyData: ApplyEquipmentRequest, columnKey: React.Key) => {
    const cellValue = applyData[columnKey as keyof ApplyEquipmentRequest];

    switch (columnKey) {
      case 'uid':
      case 'eqId':
      case 'applyTime':
      case 'applyDate':
        return <div>{cellValue}</div>;
      case 'timeIndex':
        return <div>{availableTime[cellValue]}</div>;
      case 'status':
        return <div>{cellValue}</div>;
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
                <DropdownItem>批准</DropdownItem>
                <DropdownItem>拒绝</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="wrapper flex gap-2 flex-col">
      {canCustomColumn && (
        <div className="toolbar">
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
        </div>
      )}

      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        topContentPlacement="outside"
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
        <TableBody emptyContent={'No users found'} items={eqData}>
          {(item) => (
            <TableRow key={`${item.uid}-${item.eqId}-${item.applyDate}-${item.timeIndex}`}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
