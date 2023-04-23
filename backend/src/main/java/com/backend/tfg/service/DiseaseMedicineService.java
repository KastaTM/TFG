package com.backend.tfg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.tfg.model.DiseaseMedicine;
import com.backend.tfg.repository.DiseaseMedicineRepository;

@Service
public class DiseaseMedicineService {

	private DiseaseMedicineRepository diseaseMedicineRepository;
	
	public DiseaseMedicineService(DiseaseMedicineRepository dmr) {
		this.diseaseMedicineRepository = dmr;
	}
	
	public void deleteDiseaseOfMedicine(Long idMedicine, Long idDM)  {
		diseaseMedicineRepository.deleteDiseaseOfMedicine(idMedicine, idDM);
	}

	public List<DiseaseMedicine> diseaseListByMedicine(long id) {
		return diseaseMedicineRepository.diseaseListByMedicine(id);
	}
	
	public DiseaseMedicine save(DiseaseMedicine dm) {
		return diseaseMedicineRepository.save(dm);
	}
	
	public Optional<DiseaseMedicine> findById(Long idMedicine) {
		return diseaseMedicineRepository.findById(idMedicine);
	}
	
	public void delete(DiseaseMedicine dm) {
		diseaseMedicineRepository.delete(dm);
	}
	
}
