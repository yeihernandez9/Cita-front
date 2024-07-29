import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, CssBaseline, Link, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { SignUp } from "../../fetch/Auth";

const theme = createTheme();

interface RegisterFormValues {
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit = async (
    values: RegisterFormValues,
    { setSubmitting, setErrors }: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      const data = {
        username: values.username,
        password: values.password,
        role: values.role,
      };


      const register = await SignUp('http://localhost:3000/api/auth/register', data);
      console.log("Registro: ", register);

      if (register) {
        if (register.statusCode === 201) {
          navigate("/");
        } else if (register.statusCode === 400) {
          setErrors({ username: 'Error en el registro' });
        }else if (register.statusCode === 409) {
            setErrors({ username: 'El nombre de usuario ya existe' });
          }
      }
    } catch (error) {
      console.log('ERROR: ', error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username requerido'),
    password: Yup.string().trim().min(6, 'Mínimo 6 caracteres').required('Password requerido'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ""], 'Las contraseñas deben coincidir')
      .required('Confirmar contraseña es requerido'),
    role: Yup.string().required('Role requerido'),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          <Formik
            initialValues={{ username: '', password: '', confirmPassword: '', role: '' }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ values, handleSubmit, handleChange, errors, touched, handleBlur, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar Contraseña"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.role && Boolean(errors.role)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </Select>
                  {touched.role && errors.role && (
                    <Typography color="error" variant="caption">
                      {errors.role}
                    </Typography>
                  )}
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  Registrarse
                </Button>
                <Link component={RouterLink} to="/login" variant="body2" sx={{ mt: 2 }}>
                  ¿Ya tienes una cuenta? Inicia sesión
                </Link>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;