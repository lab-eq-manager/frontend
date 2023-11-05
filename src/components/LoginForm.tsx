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

  return (
    <Card className="max-w-[400px]">
      <CardHeader className=" flex items-center justify-center font-semibold text-2xl">
        用户登录
      </CardHeader>
      <CardBody className="min-w-unit-3 flex w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            render={({ field }) => <Input {...field} label="密码" />}
          />
          <Button type="submit">Login</Button>
        </form>
      </CardBody>
    </Card>
  );
};
