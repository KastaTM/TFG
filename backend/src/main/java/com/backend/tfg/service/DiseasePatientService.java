package com.backend.tfg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.tfg.model.DiseasePatient;
import com.backend.tfg.repository.DiseasePatientRepository;

@Service
public class DiseasePatientService {

	private DiseasePatientRepository diseasePatientRepository;
	
	public DiseasePatientService(DiseasePatientRepository dpr) {
		this.diseasePatientRepository = dpr;
	}
	
	public List<DiseasePatient> diseaseListByPatient(long id) {
		return diseasePatientRepository.diseaseListByPatient(id);
	}
	
	public void deleteByIdDisease(Long idDisease) {
		diseasePatientRepository.deleteByIdDisease(idDisease);
	}
	
	public void deleteDiseaseOfPatient(Long idPatient, Long idDM) {
		diseasePatientRepository.deleteDiseaseOfPatient(idPatient, idDM);
	}
	
	public DiseasePatient save(DiseasePatient dp) {
		return diseasePatientRepository.save(dp);
	}
	
	public Optional<DiseasePatient> findById(Long idPatient) {
		return diseasePatientRepository.findById(idPatient);
	}
	
	public void delete(DiseasePatient dp) {
		diseasePatientRepository.delete(dp);
	}
}
