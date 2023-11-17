import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Divider,
  Select,
  SelectItem,
  CardFooter,
} from '@nextui-org/react';

import { UserRole, availableTime, userRoleMap } from '@/types';
import { getUserInfo } from '@/utils/requests';

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

export function PersonCard({ uid }: { uid: string }) {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<{
    uid: string;
    name: string;
    leader: string;
    phoneNumber: string;
    role: number;
  }>();
  const onSubmit = (data) => console.log(data);
  register('uid', { required: true });
  console.log(errors);

  useEffect(() => {
    if (uid) {
      getUserInfo({ uid }).then((res) => {
        console.log(res);
        const { data } = res;
        setValue('uid', uid);
        setValue('name', data.name);
        setValue('leader', data.leader);
        setValue('phoneNumber', data.phoneNumber);
        setValue('role', data.role);
        console.log('val', getValues());
      });
    }
  }, [uid, getValues, setValue]);

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
            <Select
              label="身份"
              selectedKeys={[`${field.value}`]}
              onChange={(e) => {
                field.onChange(parseInt(e.target.value));
              }}
              isDisabled
            >
              {Object.keys(userRoleMap).map((role) => {
                console.log('==it', role, field.value);
                const curRoleNum = parseInt(role);
                return (
                  <SelectItem key={`${role}`} value={`${role}`}>
                    {userRoleMap[curRoleNum as UserRole]}
                  </SelectItem>
                );
              })}
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
