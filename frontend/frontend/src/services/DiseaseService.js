import axios from 'axios';

const DISEASE_API_BASE_URL = "http://localhost:8080/api/v1/diseases";

class DiseaseService {

    createDisease(disease) {
        return axios.post(DISEASE_API_BASE_URL, disease);
    }

    getDiseases() {
        return axios.get(DISEASE_API_BASE_URL);
    }

    getDiseasesNames() {
        return axios.get(DISEASE_API_BASE_URL  + '/nameList');
    }

    getDiseaseById(idDisease) {
        return axios.get(DISEASE_API_BASE_URL + '/' + idDisease);
    }

    updateDisease(idDisease, disease) {
        return axios.put(DISEASE_API_BASE_URL + '/' + idDisease, disease);
    }

    deleteDisease(idDisease) {
        return axios.delete(DISEASE_API_BASE_URL + '/' + idDisease);
    }

    getSymptomsOfDisease(idDisease) {
        return axios.get(`http://localhost:8080/api/v1/diseasesymptoms/${idDisease}`);
    }

    deleteSymptomOfDisease(idDisease, idDS) {
        return axios.delete(`http://localhost:8080/api/v1/diseasesymptoms/${idDisease}/${idDS}`);
    }

    getRecommendationForSymptoms(idRecord) {
        return axios.get(`http://localhost:8080/api/v1/diseasesymptoms/${idRecord}/recommendations`);
    }

    addDiseaseToPatient(diseasePatient) {
        return axios.post("http://localhost:8080/api/v1/diseasepatients", diseasePatient);
    }

    getDiseasesOfPatient(idPatient) {
        return axios.get(`http://localhost:8080/api/v1/diseasepatients/${idPatient}`);
    }

    getRestDiseasesPatient(idPatient) {
        return axios.get(DISEASE_API_BASE_URL + '/' + idPatient + '/restPatient');
    }

    getRestDiseasesMedicine(idMedicine) {
        return axios.get(DISEASE_API_BASE_URL + '/' + idMedicine + '/restMedicine');
    }

    addDiseaseToMedicine(diseaseMedicine) {
        return axios.post("http://localhost:8080/api/v1/diseasemedicines", diseaseMedicine);
    }

}

export default new DiseaseService()