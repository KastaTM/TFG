import axios from 'axios';

const MEDICINE_API_BASE_URL = "http://localhost:8080/api/v1/medicines";

class MedicineService {

    createMedicine(medicine) {
        return axios.post(MEDICINE_API_BASE_URL, medicine);
    }

    getMedicines() {
        return axios.get(MEDICINE_API_BASE_URL);
    }

    getMedicinesNames() {
        return axios.get(MEDICINE_API_BASE_URL  + '/nameList');
    }

    getMedicineById(idMedicine) {
        return axios.get(MEDICINE_API_BASE_URL + '/' + idMedicine);
    }

    updateMedicine(idMedicine, medicine) {
        return axios.put(MEDICINE_API_BASE_URL + '/' + idMedicine, medicine);
    }

    deleteMedicine(idMedicine) {
        return axios.delete(MEDICINE_API_BASE_URL + '/' + idMedicine);
    }

    getSymptomsOfMedicine(idMedicine) {
        return axios.get(`http://localhost:8080/api/v1/medicinesymptoms/${idMedicine}`);
    }

    deleteSymptomOfMedicine(idMedicine, idDS) {
        return axios.delete(`http://localhost:8080/api/v1/medicinesymptoms/${idMedicine}/${idDS}`);
    }

    getRecommendationForSymptoms(idRecord) {
        return axios.get(`http://localhost:8080/api/v1/medicinesymptoms/${idRecord}/recommendations`);
    }

    getDiseasesOfMedicine(idMedicine) {
        return axios.get(`http://localhost:8080/api/v1/diseasemedicines/${idMedicine}`);
    }

    deleteDiseaseOfMedicine(idMedicine, idDM) {
        return axios.delete(`http://localhost:8080/api/v1/diseasemedicines/${idMedicine}/${idDM}`);
    }

    // deleteSymptom(idDS) {
    //     return axios.delete("http://localhost:8080/api/v1/medicinesymptoms" + '/' + idDS + 'symptom');
    // }

}

export default new MedicineService()