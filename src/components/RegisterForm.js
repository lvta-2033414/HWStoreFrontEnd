import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider, makeStyles } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputField, PasswordField } from './index.js';
import '../cssfile/loginform.css';

const theme = createTheme();
// console.log(theme);
// const useStyles = makeStyles((theme) => ({
//   root: {},
//   avatar: {},
//   title: {},
// }));

const schema = yup
  .object({
    fullName: yup.string().required('Vui lòng điền đầy đủ họ tên'),
  })
  .required();

export const RegisterForm = () => {
  //   const classes = useStyles();

  const form = useForm({
    defaultValues: {
      'Họ tên': '',
      Email: '',
      Username: '',
      Password: '',
      Retypepassword: '',
    },
    resolver: yupResolver(schema),
  });
  //   console.log(form);
  const handleSubmit = (values) => {
    // const { onSubmit } = props;
    // if (onSubmit) onSubmit(values);
    // form.reset();
    console.log('values: ', values);
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
          color="primary">
          Tạo tài khoản
        </Button>
      </form>
    </div>
  );
};
