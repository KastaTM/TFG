package com.backend.tfg.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.tfg.model.MedicineSymptom;
import com.backend.tfg.repository.MedicineSymptomRepository;

@Service
public class MedicineSymptomService {

	private MedicineSymptomRepository medicineSymptomRepository;
	
	public MedicineSymptomService(MedicineSymptomRepository msr) {
		this.medicineSymptomRepository = msr;
	}
	
	public List<MedicineSymptom> symptomListByMedicine(long id) {
		return medicineSymptomRepository.symptomListByMedicine(id);
	}
	
	public List<MedicineSymptom> listMedicines() {
		return medicineSymptomRepository.listMedicines();
	}
	
	public void deleteByIdMedicine(Long idMedicine) {
		medicineSymptomRepository.deleteByIdMedicine(idMedicine);
	}

	public void deleteSymptomOfMedicine(Long idMedicine, Long idDS) {
		medicineSymptomRepository.deleteSymptomOfMedicine(idMedicine, idDS);
	}
	
	public MedicineSymptom save(MedicineSymptom ms) {
		return medicineSymptomRepository.save(ms);
	}
	
}