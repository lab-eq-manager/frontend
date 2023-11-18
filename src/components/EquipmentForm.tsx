import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Select,
  SelectItem,
  CardFooter,
  Button,
} from '@nextui-org/react';
import { EquipmentStatus, equipmentStatusMap } from '@/types';
import {
  UpdateEquipmentRequest,
  addEquipment,
  getEquipmentDetail,
  updateEquipment,
} from '@/utils/requests';
interface FormData {
  eqId: string;
  labId: string;
  name: string;
  info: string;
  priceInfo: string;
  imgUrl: string;
  status: string;
}
import { useToast } from './ui/use-toast';
import { useNavigate } from 'react-router-dom';

export const EquipmentForm: React.FC<{ eqId?: string }> = (props) => {
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  // register('eqId', { required: true });
  register('name', { required: true });
  register('labId', { required: true });
  const { toast } = useToast();
  const { eqId } = props;
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    const req: UpdateEquipmentRequest = {
      ...data,
      eqId: eqId || data.eqId,
      status: parseInt(data.status),
    };
    console.log(req);
    if (eqId) {
      updateEquipment(req)
        .then((res) => {
          toast({
            title: '修改成功',
          });
          navigate('/equipments');
        })
        .catch((err) => {
          toast({
            title: '修改失败',
            description: err.message,
            variant: 'destructive',
          });
        });
    } else {
      addEquipment(req)
        .then((res) => {
          toast({
            title: '添加成功',
          });
          navigate('/equipments');
        })
        .catch((err) => {
          toast({
            title: '添加失败',
            description: err.message,
            variant: 'destructive',
          });
        });
    }
  };

  useEffect(() => {
    if (eqId) {
      getEquipmentDetail({ eqId })
        .then((res) => {
          setValue('eqId', res.eqId);
          setValue('name', res.name);
          setValue('labId', res.labId);
          setValue('info', res.info);
          setValue('priceInfo', res.priceInfo);
          setValue('imgUrl', res.imgUrl);
          setValue('status', `${res.status}`);
        })
        .catch((err) => {
          toast({
            title: '获取设备信息失败',
            description: err.message,
            variant: 'destructive',
          });
        });
    }
  }, [eqId]);

  console.log(errors);
  return (
    <Card className="p-3 w-full">
      <CardHeader className=" flex items-center justify-center font-semibold text-lg">
        {eqId ? '编辑设备信息' : '添加设备'}
      </CardHeader>
      <CardBody className="flex gap-4">
        <Controller
          name="eqId"
          control={control}
          render={({ field }) => (
            <Input
              isDisabled={eqId !== undefined}
              isRequired
              {...field}
              label="设备编号"
              defaultValue={eqId}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input isRequired {...field} label="设备名称" />}
        />
        <Controller
          name="labId"
          control={control}
          render={({ field }) => <Input isRequired {...field} label="所属实验室" />}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              label="设备状态"
              selectedKeys={[`${field.value}`]}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              isRequired
            >
              {Object.keys(equipmentStatusMap).map((status) => {
                const curStatusNum = parseInt(status);
                return (
                  <SelectItem key={`${status}`} value={`${status}`}>
                    {equipmentStatusMap[curStatusNum as EquipmentStatus]}
                  </SelectItem>
                );
              })}
            </Select>
          )}
        />
        <Controller
          name="info"
          control={control}
          render={({ field }) => <Textarea {...field} label="设备信息" />}
        />
        <Controller
          name="priceInfo"
          control={control}
          render={({ field }) => <Textarea {...field} label="价格信息" />}
        />
        <Controller
          name="imgUrl"
          control={control}
          render={({ field }) => <Input {...field} label="图片链接" />}
        />
      </CardBody>
      <CardFooter className="flex justify-center gap-5">
        <Button color="primary" onClick={handleSubmit(onSubmit)} fullWidth>
          提交
        </Button>
      </CardFooter>
    </Card>
  );
};
