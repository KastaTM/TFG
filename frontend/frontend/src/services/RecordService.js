import axios from 'axios';

const RECORD_API_BASE_URL = "http://localhost:8080/api/v1/records";

class RecordService {

    createRecord(record) {
        return axios.post(RECORD_API_BASE_URL, record);
    }

    getRecords() {
        return axios.get(RECORD_API_BASE_URL);
    }

    getRecordsOfPatient(idPatient) {
       return axios.get(RECORD_API_BASE_URL + '/' + idPatient);
    }

    getRecordById(idPatient,idRecord) {
        return axios.get(RECORD_API_BASE_URL + '/' + idPatient + '/' + idRecord);
    }

    updateRecord(idRecord, record) {
        return axios.put(RECORD_API_BASE_URL + '/' + idRecord, record);
    }

    deleteRecord(idRecord) {
        return axios.delete(RECORD_API_BASE_URL + '/' + idRecord);
    }

    getSymptomsOfRecord(idRecord) {
        return axios.get(`http://localhost:8080/api/v1/recordsymptoms/${idRecord}`);
    }

    deleteSymptomOfRecord(idRecord, idDS) {
        return axios.delete(`http://localhost:8080/api/v1/recordsymptoms/${idRecord}/${idDS}`);
    }

}

export default new RecordService()