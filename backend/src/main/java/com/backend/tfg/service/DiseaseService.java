package com.backend.tfg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.tfg.model.Disease;
import com.backend.tfg.repository.DiseaseRepository;

@Service
public class DiseaseService {

	private DiseaseRepository diseaseRepository;
	
	
	public DiseaseService(DiseaseRepository dr) {
		this.diseaseRepository = dr;
	}
	
	public List<Disease> diseasesAlphabetical() {
		return diseaseRepository.diseasesAlphabetical();
	}
	
	public Disease knowDiseaseById(long id) {
		return diseaseRepository.knowDiseaseById(id);
	}
	
	public Optional<Disease> findById(Long idDisease) {
		return diseaseRepository.findById(idDisease);
	}
	
	public List<Disease> findAll() {
		return diseaseRepository.findAll();
	}
	
	public Disease save(Disease disease) {
		return diseaseRepository.save(disease);
	}
	
	public void delete(Disease disease) {
		diseaseRepository.delete(disease);
	}
	
}