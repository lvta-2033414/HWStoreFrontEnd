import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export default function InputField(props) {
  const { form, name, label } = props;
  const {
    formState: { errors },
    formState,
  } = form;
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={!!hasError}
          helperText={errors[name]?.message}
          fullWidth
          margin="normal"
        />
      )}
    />
  );
}
