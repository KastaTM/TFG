package com.backend.tfg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.tfg.model.Symptom;
import com.backend.tfg.repository.SymptomRepository;

@Service
public class SymptomService {

	private SymptomRepository symptomRepository;
	
	public SymptomService(SymptomRepository sr) {
		this.symptomRepository = sr;
	}
	
	public List<Symptom> findAll() {
		return symptomRepository.findAll();
	}
	
	public Optional<Symptom> findById(Long idSymptom) {
		return symptomRepository.findById(idSymptom);
	}
	
	public Symptom save(Symptom symptom) {
		return symptomRepository.save(symptom);
	}
	
	public void delete(Symptom symptom) {
		symptomRepository.delete(symptom);
	}
	
}
