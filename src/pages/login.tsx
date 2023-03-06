import {
  Layout,
  Container,
  Title,
  Form,
  Text,
} from '@/src/styles/layouts/account.style';
import { loginFn } from '@/src/api/accountApi';
import useInputRef from '@/src/hooks/useInputRef';
import { StButton } from '@/src/styles/common/common.style';
import { IsAccount } from '@/src/types/data.interface';
import { emailOptions, passwordOptions } from '@/src/utils/inputOptions';
import { Input, VisibilityIcon } from '@/src/components/common';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { X } from 'react-feather';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const { mutate } = useMutation(loginFn, {
    onSuccess: data => {
      alert(data.message);
      router.push('/diary');
    },
    onError: (error: AxiosError) => {
      alert(error.message);
      // message 결과에 따라 input 필드 초기화 구현해야함
    },
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    resetField,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { currentRef: passwordCurrentRef, ...password } = useInputRef(
    register('password', passwordOptions)
  );
  const onValid = async (data: IsAccount) => {
    // console.log(data);
    mutate(data);
  };

  return (
    <Layout>
      <Container>
        <Form onSubmit={handleSubmit(onValid)}>
          <Title>Login</Title>
          <Input
            id='email'
            label='Email'
            placeholder='Email'
            icon={<X onClick={() => resetField('email')} />}
            {...register('email', emailOptions)}
            error={errors?.email}
          />
          <Input
            id='password'
            type='password'
            label='Password'
            placeholder='Password'
            icon={<VisibilityIcon _ref={passwordCurrentRef} />}
            {...password}
            error={errors?.password}
          />
          <Link href='/forgot'>Forgot password?</Link>
          <StButton disabled={isSubmitting}>Register</StButton>
        </Form>
        <Text>
          Don’t have an account?&nbsp;&nbsp;<Link href='/signup'>Register</Link>
        </Text>
      </Container>
    </Layout>
  );
}
