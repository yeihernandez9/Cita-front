import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Container,
  Typography,
} from '@mui/material';

import { CreateAppointments, UpdateAppointment, GetAppointmentById } from "../../fetch/Appointment";
import { GetDoctor } from "../../fetch/Doctor";
import Cookies from 'universal-cookie';

interface Doctor {
  id: number;
  name: string;
  email: string;
  description: string;
}

interface User {
  id: number;
  username: string;
  password: string;
  roles: string[];
}

interface AppointmentFormValues {
  date: string;
  time: string;
  appointmentType: string;
  doctorId: number;
}

const CreateAppointment = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [initialValues, setInitialValues] = useState<AppointmentFormValues>({
    date: '',
    time: '',
    appointmentType: '',
    doctorId: 0,
  });

  useEffect(() => {
    fetchDoctor();
    if (appointmentId) {
      fetchAppointment(appointmentId);
    }
  }, [appointmentId]);

  const fetchDoctor = async () => {
    const token = cookies.get('token');
    try {
      const response = await GetDoctor('http://localhost:3000/api/doctors', token);
      if (response) {
        setDoctors(response);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAppointment = async (id: string) => {
    console.log(id);
    const token = cookies.get('token');
    try {
      const response = await GetAppointmentById(`http://localhost:3000/api/appointment/${id}`, token);
      console.log(response?.data)
      if (response?.statusCode === 200) {
        
        console.log(response.statusCode)
        setInitialValues({
          date: response.data.date,
          time: response.data.time,
          appointmentType: response.data.appointmentType,
          doctorId: response.data.doctor.id,
        });
      }
    } catch (error) {
      console.error('Error fetching appointment:', error);
    }
  };

  const onSubmit = async (
    values: AppointmentFormValues,
    { setSubmitting }: FormikHelpers<AppointmentFormValues>
  ) => {
    try {
      const data = {
        patient: 1,
        doctor: values.doctorId,
        date: values.date,
        time: values.time,
        appointmentType: values.appointmentType,
      };

      const token = cookies.get('token');
      let appointment;

      if (appointmentId) {
        appointment = await UpdateAppointment(`http://localhost:3000/api/appointment/${appointmentId}`, data, token);
      } else {
        appointment = await CreateAppointments('http://localhost:3000/api/appointment', data, token);
      }
        console.log(appointment)
          navigate("/dashboard");
        
      
    } catch (error) {
      console.log('ERROR: ', error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
    appointmentType: Yup.string().required('Appointment type is required'),
    doctorId: Yup.number().required('Doctor is required'),
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        {appointmentId ? 'Actualizar Cita' : 'Crear Cita'}
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, handleChange, handleBlur, values, errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <TextField
                fullWidth
                margin="normal"
                id="date"
                name="date"
                label="Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.date && Boolean(errors.date)}
                helperText={touched.date && errors.date}
              />
            </div>
            <div>
              <TextField
                fullWidth
                margin="normal"
                id="time"
                name="time"
                label="Time"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                value={values.time}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.time && Boolean(errors.time)}
                helperText={touched.time && errors.time}
              />
            </div>
            <div>
              <TextField
                fullWidth
                margin="normal"
                id="appointmentType"
                name="appointmentType"
                label="Appointment Type"
                value={values.appointmentType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.appointmentType && Boolean(errors.appointmentType)}
                helperText={touched.appointmentType && errors.appointmentType}
              />
            </div>
            <div>
              <FormControl
                fullWidth
                margin="normal"
                error={touched.doctorId && Boolean(errors.doctorId)}
              >
                <InputLabel id="doctorId-label">Doctor</InputLabel>
                <Select
                  labelId="doctorId-label"
                  id="doctorId"
                  name="doctorId"
                  value={values.doctorId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="">
                    <em>Select a doctor</em>
                  </MenuItem>
                  {doctors.length > 0 ? (
                    doctors.map((doctor) => (
                      <MenuItem key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </MenuItem>
                    ))
                  ) : (
                    <p>No appointments available</p>
                  )}
                </Select>
                <FormHelperText>{touched.doctorId && errors.doctorId}</FormHelperText>
              </FormControl>
            </div>
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {appointmentId ? 'Actualizar' : 'Guardar '}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateAppointment;
