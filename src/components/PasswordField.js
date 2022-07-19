import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PasswordField(props) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };
  const { form, name, label } = props;
  const { errors, formState } = form;
  //   const hasError = formState.touchedFields[name] && errors[name];
  //   console.log(errors[name], formState[name]);
  return (
    <div>
      <FormControl
        margin="normal"
        fullWidth
        variant="outlined">
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
          id={name}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
                edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      </FormControl>

      {/* <Controller
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
      /> */}
    </div>
  );
}
