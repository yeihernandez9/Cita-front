interface SignInData {
  patient: number;
  doctor: number;
  date: string;
  time: string;
  appointmentType: string;
}

interface AppointmentResponse {
  statusCode: number;
  data?: Record<string, unknown>;
}

interface DetailedAppointmentResponse {
  statusCode: number;
  data?: {
    id: string;
    date: string;
    time: string;
    patientName: string;
    doctorName: string;
    [key: string]: unknown;
  };
}

export const CreateAppointments = async (url: string, data: SignInData, token: string): Promise<AppointmentResponse | null> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData: AppointmentResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error posting data:", error);
    return null;
  }
};

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

interface AppointmentData {
  id: number;
  date: string;
  time: string;
  appointmentType: string;
  doctor: Doctor;
  user: User;
}

interface AppointmentResponses {
  statusCode: number;
  message: string;
  data: AppointmentData;
}

export const GetAppointmentById = async (url: string, token: string): Promise<AppointmentResponses | null> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const result: AppointmentResponses = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return null;
  }
};

export const GetAppointmentst = async (url: string, token: string): Promise<AppointmentResponse | null> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const result: AppointmentResponse = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return null;
  }
};


export const UpdateAppointment = async (url: string, data: SignInData, token: string): Promise<Appointment[] | null> => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const appointments: Appointment[] = await response.json();
    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return null;
  }
};

export const DeleteAppointment = async (url: string, token: string): Promise<Appointment[] | null> => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const appointments: Appointment[] = await response.json();
    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return null;
  }
};