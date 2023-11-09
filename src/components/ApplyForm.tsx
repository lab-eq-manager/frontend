import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
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
} from '@nextui-org/react';
import dayjs from 'dayjs';

import { availableTime } from '@/types';

export function ApplyForm({ eqId }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  register('uid', { required: true });
  console.log(errors);
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="p-3 w-full">
      <CardHeader className=" flex items-center justify-center font-semibold text-lg">
        设备申请
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
            <Select
              label="使用时间段"
              value={field.value}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            >
              {availableTime.map((time, index) => (
                <SelectItem key={index} value={index}>
                  {time}
                </SelectItem>
              ))}
            </Select>
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
