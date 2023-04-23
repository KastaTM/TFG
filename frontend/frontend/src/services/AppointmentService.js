import axios from 'axios';

const APPOINTMENT_API_BASE_URL = "http://localhost:8080/api/v1/appointments";

class AppointmentService {

    createAppointment(appointment) {
        return axios.post(APPOINTMENT_API_BASE_URL, appointment);
    }

    deleteAppointment(idAppointment) {
        return axios.delete(APPOINTMENT_API_BASE_URL + '/' + idAppointment);
    }

    getAppointmentsOfDoctor(idDoctor, order) {
        return axios.get(APPOINTMENT_API_BASE_URL + '/' + idDoctor + '/' + order);
    }

    getAppointmentById(idAppointment) {
        return axios.get(APPOINTMENT_API_BASE_URL + '/' + idAppointment + '/view');
    }

}

export default new AppointmentService()