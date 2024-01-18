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
import { useSelector } from 'react-redux';
import { availableTime } from '@/types';
import { TimeIndexDetail, applyEquipment, queryAvailableTime } from '@/utils/requests';
import { useToast } from './ui/use-toast';
import { mockTimeIndex } from '@/utils/mockData';

const TimeIndexCheckbox = (props: { timeIndexDetail: TimeIndexDetail }) => {
  return (
    <Checkbox
      className="pt-8 pb-2 w-full"
      value={`${props.timeIndexDetail.timeIndex}`}
      isDisabled={props.timeIndexDetail.uid !== ''}
    >
      <div className="chechbox-wrapper flex flex-row w-full gap-10">
        <div className="time w-36 flex flex-col gap-1 pl-6">
          <p className=" text-sm text-gray-400">时段</p>
          {availableTime[props.timeIndexDetail.timeIndex]}
        </div>
        <div className="status flex flex-col gap-1">
          <p className=" text-sm text-gray-400">时段状态</p>
          <p>{props.timeIndexDetail.uid === '' ? '空闲' : '占用'}</p>
        </div>
        <div className="user-info pl-6 flex flex-col gap-1">
          <p className=" text-sm text-gray-400">使用人</p>
          <p>
            {props.timeIndexDetail.uid}-{props.timeIndexDetail.name}
          </p>
        </div>
      </div>
    </Checkbox>
  );
};

export function ApplyForm({ eqId }) {
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();

  const onSubmit = (data) => {
    console.log(data);
    const req = {
      ...data,
      timeIndex: groupSelected.map((index) => parseInt(index)),
    };
    applyEquipment(req)
      .then((res) => {
        toast({
          title: '申请成功',
        });
      })
      .catch((err) => {
        toast({
          title: '申请失败',
          description: err.message,
          variant: 'destructive',
        });
      });
  };
  register('uid', { required: true });
  console.log(errors);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availableTimeIndex, setAvailableTimeIndex] = useState<TimeIndexDetail[]>([]);
  const [groupSelected, setGroupSelected] = useState([]);

  const uid = useSelector((state) => state.uid);
  useEffect(() => {
    setValue('uid', uid);
    setValue('eqId', eqId);
  }, [uid]);

  // 新改动，以前只返回可用时段的 timeIndex[]
  // 现在返回所有时段的 TimeIndexDetail[]
  const judgeAvailableTime = (timeIndexDetail: TimeIndexDetail) => {
    return timeIndexDetail.uid === '' && timeIndexDetail.name === '';
  };

  useEffect(() => {
    queryAvailableTime({
      eqId: eqId,
      applyDate: dayjs(date?.toDateString()).format('YYYY-MM-DD'),
    })
      .then((res) => {
        setAvailableTimeIndex(res.timeIndexes);
        setGroupSelected([]);
      })
      .catch((err) => {
        toast({
          title: '获取可用时段失败',
          description: err.message,
          variant: 'destructive',
        });
        setAvailableTimeIndex(mockTimeIndex);
      });
  }, [date]);

  return (
    <Card className="p-3 w-full">
      <CardHeader className=" flex items-center justify-center font-semibold text-lg">
        填写申请表
      </CardHeader>
      <CardBody className="flex gap-4">
        <Controller
          name="uid"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} label="用户名" disabled />}
        />
        <Controller
          name="eqId"
          control={control}
          defaultValue={eqId}
          render={({ field }) => <Input {...field} label="设备编号" disabled />}
        />
        <Divider />
        <Controller
          name="applyDate"
          control={control}
          defaultValue={dayjs(date?.toDateString() || new Date()).format('YYYY-MM-DD')}
          render={({ field }) => {
            return (
              <div className="flex gap-2 flex-row items-center">
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
        <Controller
          name="timeIndex"
          control={control}
          defaultValue="0"
          render={({ field }) => (
            // <Select
            //   label="使用时间段"
            //   value={field.value}
            //   onChange={(e) => {
            //     field.onChange(e.target.value);
            //   }}
            // >
            //   {availableTime.map((time, index) => {
            //     if (availableTimeIndex.includes(index))
            //       return (
            //         <SelectItem key={`${index}`} value={`${index}`}>
            //           {time}
            //         </SelectItem>
            //       );
            //   })}
            // </Select>
            <CheckboxGroup
              value={groupSelected}
              onChange={setGroupSelected}
              className="pl-5 overflow-scroll w-full"
              style={{
                height: '50vh',
              }}
            >
              {availableTimeIndex.map((time, index) => {
                return <TimeIndexCheckbox key={`${index}`} timeIndexDetail={time} {...field} />;
              })}
            </CheckboxGroup>
          )}
        />
        <Divider />
        <Controller
          name="applyReason"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Textarea {...field} label="申请理由" placeholder="请输入申请理由" className="w-full" />
          )}
        />
      </CardBody>
      <CardFooter className="flex justify-center">
        <Button
          color="primary"
          onClick={handleSubmit(onSubmit)}
          className="w-full"
          disabled={!date}
        >
          提交申请
        </Button>
      </CardFooter>
    </Card>
  );
}
