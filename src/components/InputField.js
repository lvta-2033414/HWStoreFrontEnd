import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export default function InputField(props) {
  const { form, name, label } = props;
  const { errors, formState } = form;
  //   const hasError = formState.touchedFields[name] && errors[name];
  //   console.log(errors[name], formState[name]);
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          //   helperText="Vui lòng điền đầy đủ họ tên"
          fullWidth
          margin="normal"
        />
      )}
    />
  );
}
