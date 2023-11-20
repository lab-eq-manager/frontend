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
  Divider,
  Chip,
} from '@nextui-org/react';
import { EquipmentStatus, equipmentStatusMap } from '@/types';
import {
  UpdateEquipmentRequest,
  addEquipment,
  getEquipmentDetail,
  updateEquipment,
  uploadFile,
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

export const FileUpload: React.FC<{
  onUploaded: (res: string) => void;
}> = ({ onUploaded }) => {
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    file: FileList;
  }>();
  const { toast } = useToast();
  register('file', { required: true });

  const onSubmit = (data: { file: FileList }) => {
    uploadFile({ file: data.file[0] })
      .then((res) => {
        toast({
          title: '上传成功',
        });
        onUploaded(res.imgUrl);
      })
      .catch((err) => {
        toast({
          title: '上传失败',
          description: err.message,
          variant: 'destructive',
        });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 flex-col">
        <Chip color="primary" className="w-1/2">
          上传设备图片
        </Chip>
        <div className="wrapper flex justify-between gap-2 p-2 items-center">
          <input
            {...control.register('file', { required: true })}
            type="file"
            accept="image/jpg,image/png"
          ></input>
          <Button color="primary" type="submit">
            上传
          </Button>
        </div>
      </form>
    </>
  );
};

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
        <Divider />
        <Controller
          name="imgUrl"
          control={control}
          render={({ field }) => {
            return (
              <FileUpload
                onUploaded={(res) => {
                  console.log('img', res);
                  field.onChange(res);
                }}
              />
            );
          }}
        />
        <Divider />
      </CardBody>
      <CardFooter className="flex justify-center gap-5">
        <Button color="primary" onClick={handleSubmit(onSubmit)} fullWidth>
          提交
        </Button>
      </CardFooter>
    </Card>
  );
};
