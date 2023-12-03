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
import { ApplyEquipmentRequest, userRoleMap } from '@/types';
import { useCallback, useState, useMemo } from 'react';
import { ChevronDownIcon, MoreVerticalIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GetManageUserListResponse, ManageUserList } from '@/utils/requests';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const columns = [
  { name: '用户名', uid: 'uid' },
  { name: '姓名', uid: 'name' },
  { name: '导师', uid: 'leader' },
  { name: '电话号码', uid: 'phoneNumber' },
  { name: '角色', uid: 'role' },
  { name: '管理实验室', uid: 'lab' },
  { name: '操作', uid: 'actions' },
];

export enum UserTableColumn {
  UID = 'uid',
  NAME = 'name',
  LEADER = 'leader',
  PHONE_NUMBER = 'phoneNumber',
  ROLE = 'role',
  LAB = 'lab',
  ACTIONS = 'actions',
}

export const UserTable = ({
  tableData,
  showColumn,
  canCustomColumn,
}: {
  tableData: GetManageUserListResponse;
  showColumn?: UserTableColumn[];
  canCustomColumn?: boolean;
}) => {
  const INITIAL_VISIBLE_COLUMNS = showColumn || ['uid', 'name', 'role', 'actions'];

  const navigate = useNavigate();

  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const renderCell = useCallback((applyData: ManageUserList, columnKey: React.Key) => {
    const cellValue = applyData[columnKey as keyof ManageUserList];

    switch (columnKey) {
      case 'uid':
      case 'name':
      case 'leader':
      case 'phoneNumber':
        return <div>{cellValue}</div>;
      case 'role':
        return <Chip>{userRoleMap[cellValue]}</Chip>;
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
                    navigate(`/manage/user/edit/${encodeURIComponent(applyData.uid)}`);
                  }}
                >
                  编辑用户
                </DropdownItem>
                <DropdownItem isDisabled>删除用户</DropdownItem>
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
        <div className="toolbar flex justify-between">
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
          <Button
            color="primary"
            onClick={() => {
              navigate(`/manage/user/add`);
            }}
          >
            添加用户
          </Button>
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
        <TableBody emptyContent={'No data'} items={tableData}>
          {(item) => (
            <TableRow key={`${item.uid}`}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
