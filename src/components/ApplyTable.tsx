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
} from '@nextui-org/react';
import { mockApplyEquipmentRequests } from '@/utils/mockData';
import { ApplyEquipmentRequest, availableTime } from '@/types';
import { VerticalDotsIcon } from '@/assets/VerticalDotsIcon';
import { useCallback, useState, useMemo } from 'react';

const columns = [
  { name: '申请人', uid: 'uid' },
  { name: '设备编号', uid: 'eqId' },
  { name: '申请时间', uid: 'applyTime' },
  { name: '使用日期', uid: 'applyDate' },
  { name: '使用时段', uid: 'timeIndex' },
  { name: '申请状态', uid: 'status' },
  { name: '操作', uid: 'actions' },
];

const INITIAL_VISIBLE_COLUMNS = ['uid', 'eqId', 'applyDate', 'timeIndex', 'actions'];

export const ApplyTable = () => {
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
          <Popover
            placement="bottom"
            trigger="click"
            content={
              <PopoverContent>
                <CheckboxGroup value={visibleColumns} onChange={setVisibleColumns}>
                  {columns.map(({ name, uid }) => (
                    <Checkbox key={uid} value={uid}>
                      {name}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </PopoverContent>
            }
          >
            <PopoverTrigger>
              <Button isIconOnly variant="flat">
                <VerticalDotsIcon size={15} />
              </Button>
            </PopoverTrigger>
          </Popover>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
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
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No users found'} items={mockApplyEquipmentRequests}>
        {(item) => (
          <TableRow key={`${item.uid}-${item.eqId}-${item.applyDate}-${item.timeIndex}`}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
