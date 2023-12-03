import { useForm, Controller } from 'react-hook-form';
import { Input, Card, Button, CardBody, CardHeader } from '@nextui-org/react';
import { useToast } from './ui/use-toast';
import { store } from '@/utils/store';

export const LoginForm = () => {
  const { toast } = useToast();
  const { dispatch } = store;
  const {
    control,
    register,
    trigger,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = async () => {
    trigger().then(async (res) => {
      console.log(res);
      if (!res) {
        toast({
          title: '登录失败',
          description: '请检查输入是否完整',
          variant: 'destructive',
        });
        return;
      } else {
        const data = getValues();
        console.log(data, errors);
        await dispatch.uid
          .loginAsync(data)
          .then(() => {
            toast({
              title: '登录成功',
              description: '欢迎回来',
            });
          })
          .catch((err) => {
            console.log('err', err);
            toast({
              title: '登录失败',
              description: err.message,
              variant: 'destructive',
            });
          });
      }
    });
  };

  // 必填校验
  register('uid', { required: true });
  register('password', { required: true });

  return (
    <Card className="p-3" style={{ width: '30rem' }}>
      <CardHeader className=" flex items-center justify-center font-semibold text-lg">
        用户登录
      </CardHeader>
      <CardBody className="flex ">
        <form noValidate className="flex flex-col gap-4 ">
          <Controller
            name="uid"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                label="用户名"
                autoComplete="username"
                isClearable
                onClear={() => {
                  field.onChange('');
                }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                label="密码"
                type="password"
                isRequired
                isClearable
                autoComplete="current-password"
                formNoValidate
                onClear={() => {
                  field.onChange('');
                }}
              />
            )}
          />
          <Button color="primary" onClick={onSubmit}>
            登录
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
