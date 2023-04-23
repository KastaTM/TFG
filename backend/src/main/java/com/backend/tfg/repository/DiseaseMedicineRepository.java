package com.backend.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.backend.tfg.model.DiseaseMedicine;

public interface DiseaseMedicineRepository extends JpaRepository<DiseaseMedicine, Long>{

	@Query(value ="from DiseaseMedicine d where id_medicine = ?1")
    List<DiseaseMedicine> diseaseListByMedicine(long id);
	
	@Modifying
	@Query("delete from DiseaseMedicine r where id_medicine = ?1 and id_disease = ?2")
	void deleteDiseaseOfMedicine(Long idMedicine, Long idDM);
	
}