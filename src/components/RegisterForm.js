import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import '../cssfile/loginform.css';
import { InputField, PasswordField } from './index.js';

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required('Vui lòng nhập đầy đủ họ tên')
    .test(' ', 'Vui lòng nhập ít nhất 2 từ', (value) => {
      return value.split(' ').length >= 2;
    }),
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Vui lòng nhập email hợp lệ'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Vui lòng nhập ít nhất 6 kí tự')
    .max(16, 'Độ dài tối đa của mật khẩu là  16 kí tự'),
  retypePassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không trùng khớp'),
});
// .

export const RegisterForm = () => {
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    console.log('Form submit:', values);
    form.reset();
  };
  return (
    <div className="wrapper-field">
      <Avatar className="avatar-icon-login-form">
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography
        className="create-account-title"
        component="h3"
        variant="h5">
        Tạo tài khoản
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          name="fullName"
          label="Họ tên"
          form={form}
        />
        <InputField
          name="email"
          label="Email"
          form={form}
        />
        <PasswordField
          name="password"
          label="Mật khẩu"
          form={form}
        />
        <PasswordField
          name="retypePassword"
          label="Nhập lại mật khẩu"
          form={form}
        />
        <Button
          className="create-account-btn"
          fullWidth
          variant="contained"
          color="primary"
          type="submit">
          Tạo tài khoản
        </Button>
      </form>
    </div>
  );
};
