import axios from 'axios';

const PATIENT_API_BASE_URL = "http://localhost:8080/api/v1/patients";

class PatientService {

    createPatient(patient) {
        return axios.post(PATIENT_API_BASE_URL, patient);
    }

    getPatients() {
        return axios.get(PATIENT_API_BASE_URL);
    }

    getPatientsOfDoctor(idDoctor) {
       return axios.get(PATIENT_API_BASE_URL + '/' + idDoctor);
    }

    getIdPatientsOfDoctor(idDoctor) {
        return axios.get(PATIENT_API_BASE_URL + '/' + idDoctor + '/list');
    }

    getIdPatients() {
        return axios.get(PATIENT_API_BASE_URL + '/idList');
    }

    getEmailPatients() {
        return axios.get(PATIENT_API_BASE_URL + '/emailList');
    }

    getPatientById(idDoctor,idPatient) {
        return axios.get(PATIENT_API_BASE_URL + '/' + idDoctor + '/' + idPatient);
    }

    updatePatient(idPatient, patient) {
        return axios.put(PATIENT_API_BASE_URL + '/' + idPatient, patient);
    }

    deletePatient(idPatient) {
        return axios.delete(PATIENT_API_BASE_URL + '/' + idPatient);
    }

    deleteDiseaseOfPatient(idPatient, idDP) {
        return axios.delete(`http://localhost:8080/api/v1/diseasepatients/${idPatient}/${idDP}`);
    }

}

export default new PatientService()