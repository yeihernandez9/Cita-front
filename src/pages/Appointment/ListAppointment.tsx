import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Cookies from 'universal-cookie';
import { GetAppointmentst, DeleteAppointment } from "../../fetch/Appointment";
import { useNavigate } from 'react-router-dom';

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

interface Appointment {
  id: number;
  date: string;
  time: string;
  appointmentType: string;
  doctor: Doctor;
  user: User;
}

interface ListAppointmentProps {
  appointments: Appointment[];
}

const ListAppointment = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);

  const fetchAppointment = async () => {
    const token = cookies.get('token');
    console.log(token);
    try {
      const response = await GetAppointmentst('http://localhost:3000/api/appointment', token);
      console.log("Appoint list:::::::", response);
      if (response) {
        setAppointments(response);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  const handleEdit = (appointmentId: number) => {
    navigate(`crateAppointment/edit/${appointmentId}`);
  };

  const handleCancel = (appointmentId: number) => {
    setSelectedAppointmentId(appointmentId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAppointmentId(null);
  };

  const handleConfirmCancel = async () => {
    console.log(selectedAppointmentId)
    const token = cookies.get('token');
    try {
      const response = await DeleteAppointment(`http://localhost:3000/api/appointment/${selectedAppointmentId}`, token);
      console.log("Appoint list:::::::", response);
      fetchAppointment();
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
    handleClose();
  };

  return (
    <>
      <Grid container spacing={2}>
        {appointments.map((appointment) => (
          <Grid item xs={12} sm={6} key={appointment.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Fecha: {appointment.date} {appointment.time}
                </Typography>
                <Typography color="textSecondary">
                  Doctor Asignado: {appointment.doctor.name}
                </Typography>
                <Typography color="textSecondary">
                  Tipo de cita: {appointment.appointmentType}
                </Typography>
                <Typography color="textSecondary">
                  Paciente: {appointment.user.username}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleCancel(appointment.id)}>
                  Cancelar
                </Button>
                <Button size="small" color="secondary" onClick={() => handleEdit(appointment.id)}>
                  Actualizar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar Cancelación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas cancelar esta cita?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCELAR
          </Button>
          <Button onClick={handleConfirmCancel} color="primary" autoFocus>
            CONFIRMAR
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListAppointment;
