package com.backend.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.backend.tfg.model.MedicineSymptom;

public interface MedicineSymptomRepository extends JpaRepository<MedicineSymptom, Long>{

	@Query(value ="from MedicineSymptom d where id_medicine = ?1")
    List<MedicineSymptom> symptomListByMedicine(long id);
	
	@Query(value ="from MedicineSymptom d group by id_medicine")
    List<MedicineSymptom> listMedicines();
	
	@Modifying
	@Query("delete from MedicineSymptom r where id_medicine = ?1")
	void deleteByIdMedicine(Long idMedicine);
	
	@Modifying
	@Query("delete from MedicineSymptom r where id_medicine = ?1 and id_symptom = ?2")
	void deleteSymptomOfMedicine(Long idMedicine, Long idDS);
	
}