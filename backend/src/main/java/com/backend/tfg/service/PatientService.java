package com.backend.tfg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.tfg.model.Patient;
import com.backend.tfg.repository.PatientRepository;

@Service
public class PatientService {

	private PatientRepository patientRepository;
	
	public PatientService(PatientRepository pr) {
		this.patientRepository = pr;
	}
	
	public List<Patient> patientsListByDoctor(long id) {
		return patientRepository.patientsListByDoctor(id);
	}
	
	public void deleteByIdDoctor(Long idDoctor) {
		patientRepository.deleteByIdDoctor(idDoctor);
	}
	
	public List<Patient> findAll(){
		return patientRepository.findAll();
	}
	
	public Patient save(Patient patient) {
		return patientRepository.save(patient);
	}
	
	public Optional<Patient> findById(Long idPatient) {
		return patientRepository.findById(idPatient);
	}
	
	public void delete(Patient patient) {
		patientRepository.delete(patient);
	}
	
}
