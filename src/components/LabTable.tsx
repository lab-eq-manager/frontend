import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableColumn,
  Popover,
  Button,
  PopoverTrigger,
  PopoverContent,
  Selection,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  Input,
} from '@nextui-org/react';
import { useCallback, useState, useMemo } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GetLabListInfo, GetLabListResponse, deleteLab, updateLabInfo } from '@/utils/requests';
import { useForm } from 'react-hook-form';
import { useToast } from './ui/use-toast';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const columns = [
  { name: '实验室id', uid: 'labId' },
  { name: '实验室名称', uid: 'name' },
  { name: '操作', uid: 'actions' },
];

export enum LabTableColumn {
  LAB_ID = 'labId',
  NAME = 'name',
  ACTIONS = 'actions',
}

export const LabTable = ({
  tableData,
  showColumn,
  canCustomColumn,
  getData,
}: {
  tableData: GetLabListResponse;
  showColumn?: LabTableColumn[];
  canCustomColumn?: boolean;
  getData: () => void;
}) => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    labId: string;
    name: string;
  }>();

  const { toast } = useToast();

  const onSubmit = async (data: { labId: string; name: string }) => {
    console.log(data);
    updateLabInfo(data)
      .then((res) => {
        toast({
          title: '修改成功',
        });
        getData();
      })
      .catch((err) => {
        toast({
          title: '修改失败',
          description: err.message,
          variant: 'destructive',
        });
      });
  };

  const INITIAL_VISIBLE_COLUMNS = showColumn || ['labId', 'name', 'actions'];

  const navigate = useNavigate();

  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const renderCell = useCallback((applyData: GetLabListInfo, columnKey: React.Key) => {
    const cellValue = applyData[columnKey as keyof GetLabListInfo];

    switch (columnKey) {
      case 'labId':
      case 'name':
        return <div>{cellValue}</div>;
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Popover>
              <PopoverTrigger>
                <Button
                  color="default"
                  size="sm"
                  onClick={() => {
                    setValue('labId', applyData.labId);
                    setValue('name', applyData.name);
                  }}
                >
                  编辑
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <>
                  <form
                    className="p-3 pl-1 pr-1 flex flex-col gap-4 justify-start items-start"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Input
                      {...register('name')}
                      size="sm"
                      label="实验室名称"
                      placeholder="请输入实验室名称"
                      required
                    />
                    <Button color="primary" size="sm" type="submit">
                      提交
                    </Button>
                  </form>
                </>
              </PopoverContent>
            </Popover>
            <Button
              color="danger"
              size="sm"
              onClick={() => {
                deleteLab({ labId: applyData.labId })
                  .then((res) => {
                    toast({
                      title: '删除成功',
                    });
                    getData();
                  })
                  .catch((err) => {
                    toast({
                      title: '删除失败',
                      description: err.message,
                      variant: 'destructive',
                    });
                  });
              }}
            >
              删除
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="wrapper flex gap-2 flex-col w-full">
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
              navigate(`/manage/lab/add`);
            }}
          >
            添加实验室
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
            <TableRow key={`${item.labId}`}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
