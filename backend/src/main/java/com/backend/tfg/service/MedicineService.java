package com.backend.tfg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.tfg.model.Medicine;
import com.backend.tfg.repository.MedicineRepository;

@Service
public class MedicineService {
	
	private MedicineRepository medicineRepository;
	
	
	public MedicineService(MedicineRepository mr) {
		medicineRepository = mr;
	}
	
	public Medicine knowMedicineById(long id) {
		return medicineRepository.knowMedicineById(id);
	}
	
	public List<Medicine> findAll() {
		return medicineRepository.findAll();
	}
	
	public Optional<Medicine> findById(Long idMedicine) {
		return medicineRepository.findById(idMedicine);
	}
	
	public Medicine save(Medicine medicine) {
		return medicineRepository.save(medicine);
	}
	
	public void delete(Medicine medicine) {
		medicineRepository.delete(medicine);
	}

}
