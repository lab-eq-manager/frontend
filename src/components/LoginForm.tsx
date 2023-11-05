import { useForm, Controller } from 'react-hook-form';
import { Input, Card, Button, CardBody, CardHeader } from '@nextui-org/react';

export const LoginForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  // 必填校验
  register('uid', { required: true });
  register('password', { required: true });

  return (
    <Card className="p-3" style={{ width: '30rem' }}>
      <CardHeader className=" flex items-center justify-center font-semibold text-lg">
        用户登录
      </CardHeader>
      <CardBody className="flex w-1/2 ">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
          <Controller
            name="uid"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} label="用户名" />}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} label="密码" type="password" />}
          />
          <Button type="submit" color="primary">
            登录
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
