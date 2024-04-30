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
import {
  ApplyEquipmentRequest,
  ApplyStatus,
  applyStatusMap,
  availableTime,
  equipmentStatusMap,
} from '@/types';
import { useCallback, useState, useMemo } from 'react';
import { ChevronDownIcon, MoreVerticalIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cancelApply } from '@/utils/requests';
import { toast, useToast } from './ui/use-toast';
import { mergeTimeIndex } from '@/utils/mergeTimeIndex';

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
  refresh,
}: {
  eqData: ApplyEquipmentRequest[];
  showColumn?: ApplyTableColumn[];
  canCustomColumn?: boolean;
  refresh?: () => void;
}) => {
  const INITIAL_VISIBLE_COLUMNS = showColumn || [
    'uid',
    'eqId',
    'applyDate',
    'timeIndex',
    'status',
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

    const getTimeIndexShow = (timeIndex: string) => {
      const timeIndexArr = timeIndex.substring(1, timeIndex.length - 1).split(',');
      return mergeTimeIndex(timeIndexArr.map((index) => parseInt(index)).sort((a, b) => a - b));
      // return timeIndexArr.map((index) => availableTime[index as number]).join(' / ');
    };

    switch (columnKey) {
      case 'uid':
      case 'eqId':
      case 'applyDate':
      case 'applyTime':
        return <div>{cellValue}</div>;
      case 'timeIndex':
        // return <div>{availableTime[cellValue]}</div>;
        return <div>{getTimeIndexShow(cellValue)}</div>;
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
                  className="text-danger"
                  isDisabled={applyData['status'] !== ApplyStatus.APPLYING}
                  onClick={() => {
                    console.log('Withdraw', applyData['uid'], applyData['applyId']);
                    cancelApply({
                      uid: applyData['uid'],
                      applyId: applyData['applyId'],
                    })
                      .then(() => {
                        toast({
                          title: '撤回成功',
                        });
                        refresh();
                      })
                      .catch((err) => {
                        toast({
                          title: '撤回失败',
                          description: err.message,
                          variant: 'destructive',
                        });
                      });
                  }}
                >
                  撤回申请
                </DropdownItem>
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
        <TableBody emptyContent={'No data'} items={eqData}>
          {(item) => (
            <TableRow
              key={`${item.uid}-${item.eqId}-${item.applyDate}-${item.timeIndex}-${item.applyTime}`}
            >
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
