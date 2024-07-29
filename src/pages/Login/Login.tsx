import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, CssBaseline, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'universal-cookie';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { SignIn } from "../../fetch/Auth";
import { useAuthContext } from '../../context/AuthContext';

const theme = createTheme();

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const cookies = new Cookies();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setErrors }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const data = {
        username: values.username,
        password: values.password,
      };

      const authenticate = await SignIn('http://localhost:3000/api/auth/login', data);
      console.log("Authenticacion: ", authenticate?.data);

      if (authenticate?.data) {
        if (authenticate.data.statusCode === 200) {
          cookies.set('datos', authenticate?.data.user, { path: '/' });
          cookies.set('token', authenticate?.data.token, { path: '/' });
          login();
          navigate("/dashboard");
        } else if (authenticate.data.statusCode === 401) {
          setErrors({ username: 'Usuario o contraseña incorrecta' });
        }
        else if (authenticate.data.statusCode === 404) {
          setErrors({ username: 'Credenciales incorrectas' });
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
            Iniciar Sesión
          </Typography>
          <Formik
            initialValues={{ username: '', password: '' }}
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  Iniciar Sesión
                </Button>
                <Link component={RouterLink} to="/register" variant="body2" sx={{ mt: 2 }}>
                  ¿No tienes una cuenta? Regístrate
                </Link>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
