import { ApprovalTable } from '@/components/ApprovalTable';
import { useToast } from '@/components/ui/use-toast';
import {
  GetAdminApprovalListResponse,
  getAdminApprovalList,
  getApprovalHistory,
} from '@/utils/requests';
import { Pagination, PaginationItem, PaginationCursor } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Divider,
  CardHeader,
  Select,
  SelectItem,
  CardFooter,
  CheckboxGroup,
  Checkbox,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import { HistoryApprovalTable } from '@/components/HistoryApprovalTable';

export const HistoryView: React.FC = () => {
  const [eqData, setEqData] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageTotal, setPageTotal] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const eqId = useParams<{ eqId: string }>().eqId;

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getData = () => {
    if (!eqId) {
      toast({
        title: '获取设备编号失败',
        description: '请检查设备编号',
        variant: 'destructive',
      });
      return;
    }
    if (!date) {
      toast({
        title: '获取日期失败',
        description: '请检查日期',
        variant: 'destructive',
      });
      return;
    }
    console.log(dayjs(date?.toDateString() || new Date()).format('YYYY-MM-DD'));
    console.log('query', { pageNo: page, pageSize: pageSize });

    getApprovalHistory({
      date: dayjs(date?.toDateString() || new Date()).format('YYYY-MM-DD'),
      eqId: eqId,
      pageNo: page,
      pageSize: pageSize,
    })
      .then((res: any) => {
        setEqData(res);
        setPageTotal(res.length);
      })
      .catch((err) => {
        toast({
          title: '获取申请列表失败',
          description: err.message,
          variant: 'destructive',
        });
      });
  };

  useEffect(() => {
    getData();
  }, [page, pageSize, date]);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="title font-semibold text-2xl">查询审批记录</div>

      <div className="w-full flex flex-col items-center gap-3">
        <div className="search-wrapper w-full flex gap-5">
          <Controller
            name="eqId"
            control={control}
            defaultValue={eqId}
            render={({ field }) => {
              return (
                <Input
                  label="设备编号"
                  disabled
                  required
                  value={field.value}
                  className=" flex-grow w-10"
                ></Input>
              );
            }}
          />
          <Controller
            name="applyDate"
            control={control}
            defaultValue={dayjs(date?.toDateString() || new Date()).format('YYYY-MM-DD')}
            render={({ field }) => {
              return (
                <div className="flex gap-2 flex-row items-center w-1/3">
                  <Input label="使用时间" disabled required value={field.value}></Input>
                  <Popover>
                    <PopoverTrigger>
                      <Button style={{ height: '3.4rem' }} color="primary">
                        选择日期
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                          setDate(date);
                          field.onChange(
                            dayjs(date?.toDateString() || new Date()).format('YYYY-MM-DD'),
                          );
                        }}
                        className="bg-white mx-1 my-2"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              );
            }}
          />
        </div>
        <Divider />
        {eqData && eqData?.length !== 0 && (
          <HistoryApprovalTable eqData={eqData} canCustomColumn getData={() => getData()} />
        )}
        <Pagination
          page={page}
          total={pageTotal}
          onChange={(page: number) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
};
