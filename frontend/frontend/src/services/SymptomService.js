import axios from 'axios';

const SYMPTOM_API_BASE_URL = "http://localhost:8080/api/v1/symptoms";

class SymptomService {
    
    createSymptom(symptom) {
        return axios.post(SYMPTOM_API_BASE_URL, symptom);
    }

    getSymptoms() {
        return axios.get(SYMPTOM_API_BASE_URL);
    }

    getSymptomsNames() {
        return axios.get(SYMPTOM_API_BASE_URL  + '/nameList');
    }

    getRestSymptomsMedicine(idMedicine) {
        return axios.get(SYMPTOM_API_BASE_URL + '/' + idMedicine + '/restMedicine');
    }

    getRestSymptomsDisease(idDisease) {
        return axios.get(SYMPTOM_API_BASE_URL + '/' + idDisease + '/restDisease');
    }

    getRestSymptomsRecord(idRecord) {
        return axios.get(SYMPTOM_API_BASE_URL + '/' + idRecord + '/restRecord');
    }

    getSymptomById(idSymptom) {
        return axios.get(SYMPTOM_API_BASE_URL + '/' + idSymptom);
    }

    deleteSymptom(idSymptom) {
        return axios.delete(SYMPTOM_API_BASE_URL + '/' + idSymptom);
    }

    addSymptomToDisease(diseaseSymptom) {
        return axios.post("http://localhost:8080/api/v1/diseasesymptoms", diseaseSymptom);
    }

    addSymptomToMedicine(medicineSymptom) {
        return axios.post("http://localhost:8080/api/v1/medicinesymptoms", medicineSymptom);
    }

    addSymptomToRecord(recordSymptom) {
        return axios.post("http://localhost:8080/api/v1/recordsymptoms", recordSymptom);
    }

}

export default new SymptomService()