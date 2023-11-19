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
import { useNavigate } from 'react-router-dom';

import { UpdateLabInfoRequest, addLab } from '@/utils/requests';
import { toast } from './ui/use-toast';

interface FormData {
  labId: string;
  name: string;
}

export function AddLabForm() {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log(data);
    addLab(data as UpdateLabInfoRequest)
      .then((res) => {
        toast({
          title: '添加成功',
        });
        navigate('/manage/lab');
      })
      .catch((err) => {
        toast({
          title: '添加失败',
          description: err.message,
          variant: 'destructive',
        });
      });
  };
  register('labId', { required: true });
  register('name', { required: true });
  console.log(errors);

  return (
    <Card className="p-3 w-full">
      <CardHeader className=" flex items-center justify-center font-semibold text-lg">
        创建实验室
      </CardHeader>
      <CardBody className="flex gap-4">
        <Controller
          name="labId"
          control={control}
          render={({ field }) => <Input {...field} isRequired label="实验室编号" />}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} isRequired label="实验室名称" />}
        />
      </CardBody>
      <CardFooter className="flex justify-center gap-5">
        <Button color="primary" onClick={handleSubmit(onSubmit)} fullWidth>
          提交
        </Button>
      </CardFooter>
    </Card>
  );
}
