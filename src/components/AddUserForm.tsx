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
  CardHeader,
  CardFooter,
} from '@nextui-org/react';

import { UserRole, availableTime, userRoleMap } from '@/types';
import {
  UpdateUerPasswordRequest,
  UpdateUserRequest,
  UserInfoChangeByAdminReq,
  addUserByAdmin,
  getUserInfo,
  logout,
  resetUserPassword,
  updateUser,
  updateUserPassword,
  userInfoChangeByAdmin,
} from '@/utils/requests';
import { toast, useToast } from './ui/use-toast';

interface FormData {
  uid: string;
  name: string;
  leader: string;
  phoneNumber: string;
  role: number;
}

export function AddUserForm() {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    addUserByAdmin(data as UserInfoChangeByAdminReq)
      .then((res) => {
        toast({
          title: '修改成功',
        });
      })
      .catch((err) => {
        toast({
          title: '修改失败',
          description: err.message,
          variant: 'destructive',
        });
      });
  };
  register('uid', { required: true });
  console.log(errors);

  return (
    <Card className="p-3 w-full">
      <CardHeader className=" flex items-center justify-center font-semibold text-lg">
        创建用户
      </CardHeader>
      <CardBody className="flex gap-4">
        <Controller
          name="uid"
          control={control}
          render={({ field }) => <Input {...field} isRequired label="用户名" />}
        />
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select
              isRequired
              label="身份"
              selectedKeys={[`${field.value}`]}
              onChange={(e) => {
                field.onChange(parseInt(e.target.value));
              }}
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
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} isRequired label="姓名" />}
        />
        <Controller
          name="leader"
          control={control}
          render={({ field }) => <Input {...field} label="导师" />}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => <Input {...field} isRequired label="电话号码" />}
        />
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-center gap-5">
        <Button color="primary" onClick={handleSubmit(onSubmit)} fullWidth>
          提交
        </Button>
      </CardFooter>
    </Card>
  );
}
