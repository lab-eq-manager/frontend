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

import { availableTime, userRoleMap } from '@/types';

export function PasswordForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div className="flex gap-4 flex-col p-4">
      <Controller
        name="oldPassword"
        control={control}
        defaultValue=""
        render={({ field }) => <Input {...field} label="旧密码" />}
      />
      <Controller
        name="newPassword"
        control={control}
        defaultValue=""
        render={({ field }) => <Input {...field} label="新密码" />}
      />
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field }) => <Input {...field} label="确认密码" />}
      />
      <Button color="primary" onClick={handleSubmit(onSubmit)} fullWidth>
        提交
      </Button>
    </div>
  );
}

export function PersonCard({ uid }) {
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
      <CardBody className="flex gap-4">
        <div className="title font-semibold p-1">账号信息</div>
        <Controller
          name="uid"
          control={control}
          defaultValue={uid}
          disabled
          render={({ field }) => <Input {...field} label="用户名" />}
        />
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select label="身份">
              {Object.keys(userRoleMap).map((role) => (
                <SelectItem key={role} value={role}>
                  {userRoleMap[role]}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Divider />
        <div className="title font-semibold p-1">个人资料</div>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} label="姓名" />}
        />
        <Controller
          name="leader"
          control={control}
          render={({ field }) => <Input {...field} label="导师" />}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => <Input {...field} label="电话号码" />}
        />
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-center gap-5">
        <Button color="primary" onClick={handleSubmit(onSubmit)} fullWidth>
          保存信息
        </Button>
        <Popover backdrop="blur">
          <PopoverTrigger>
            <Button fullWidth>修改密码</Button>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <PasswordForm />
          </PopoverContent>
        </Popover>
        <Button color="danger" fullWidth>
          退出登录
        </Button>
      </CardFooter>
    </Card>
  );
}
