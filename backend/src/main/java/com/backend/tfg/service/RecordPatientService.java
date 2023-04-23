package com.backend.tfg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.tfg.model.RecordPatient;
import com.backend.tfg.repository.RecordPatientRepository;

@Service
public class RecordPatientService {

	private RecordPatientRepository recordPatientRepository;
	
	public RecordPatientService(RecordPatientRepository rpr) {
		this.recordPatientRepository = rpr;
	}
	
	public List<RecordPatient> recordsListByPatient(long id) {
		return recordPatientRepository.recordsListByPatient(id);
	}
	
	public void deleteByIdPatient(Long idPatient) {
		recordPatientRepository.deleteByIdPatient(idPatient);
	}
	
	public RecordPatient recordOfAPatient(long id) {
		return recordPatientRepository.recordOfAPatient(id);
	}
	
	public List<RecordPatient> findAll() {
		return recordPatientRepository.findAll();
	}
	
	public Optional<RecordPatient> findById(Long idRecord) {
		return recordPatientRepository.findById(idRecord);
	}
	
	public RecordPatient save(RecordPatient record) {
		return recordPatientRepository.save(record);
	}
	
	public void delete(RecordPatient record) {
		recordPatientRepository.delete(record);
	}
	
}
