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
  getLabList,
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

export function EditUserForm({ uid }: { uid: string }) {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  // 可用实验室id
  const [labIdList, setLabIdList] = useState<string[]>([]);
  const [labIdSelected, setLabIdSelected] = useState(new Set<string>());

  useEffect(() => {
    getLabList().then((res) => {
      setLabIdList(res.map((lab) => lab.labId));
    });
  }, []);

  const editUserRole = watch('role');

  const getUserInfoByUid = () => {
    getUserInfo({ uid })
      .then((res) => {
        console.log(res);
        const { data } = res;
        setValue('uid', uid);
        setValue('name', data.name);
        setValue('leader', data.leader);
        setValue('phoneNumber', data.phoneNumber);
        setValue('role', data.role);
      })
      .catch((err) => {
        toast({
          title: '获取用户信息失败',
          description: err.message,
          variant: 'destructive',
        });
      });
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    if (!labIdSelected.size) {
      toast({
        title: '请至少选择一个实验室',
        variant: 'destructive',
      });
      return;
    }

    userInfoChangeByAdmin({ ...data, lab: Array.from(labIdSelected) } as UserInfoChangeByAdminReq)
      .then((res) => {
        toast({
          title: '修改成功',
        });
        getUserInfoByUid();
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

  useEffect(() => {
    if (uid) {
      getUserInfoByUid();
    }
  }, [uid, getValues, setValue]);

  return (
    <Card className="p-3 w-full">
      <CardHeader className=" flex items-center justify-center font-semibold text-lg">
        修改用户信息
      </CardHeader>
      <CardBody className="flex gap-4">
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
          name="labId"
          control={control}
          render={({ field }) => {
            return (
              <Select
                selectionMode="multiple"
                label="所属实验室"
                selectedKeys={labIdSelected}
                onSelectionChange={setLabIdSelected}
                isRequired
              >
                {labIdList?.length ? (
                  labIdList.map((labId) => {
                    return (
                      <SelectItem key={labId} value={labId}>
                        {labId}
                      </SelectItem>
                    );
                  })
                ) : (
                  <SelectItem key={''} value={''} isDisabled className=" text-danger">
                    暂无实验室，请前往实验室管理添加后再操作
                  </SelectItem>
                )}
              </Select>
            );
          }}
        />
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
          保存修改
        </Button>
        <Button
          color="danger"
          onClick={async () => {
            await resetUserPassword({ uid })
              .then((res) => {
                toast({
                  title: '重置密码成功',
                });
              })
              .catch((err) => {
                toast({
                  title: '重置密码失败',
                  description: err.message,
                  variant: 'destructive',
                });
              });
          }}
          fullWidth
        >
          重置密码
        </Button>
      </CardFooter>
    </Card>
  );
}
