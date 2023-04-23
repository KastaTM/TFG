package com.backend.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.backend.tfg.model.DiseasePatient;

public interface DiseasePatientRepository extends JpaRepository<DiseasePatient, Long>{

	@Query(value ="from DiseasePatient d where id_patient = ?1")
    List<DiseasePatient> diseaseListByPatient(long id);
	
	@Modifying
	@Query("delete from DiseasePatient d where id_disease = ?1")
	void deleteByIdDisease(Long idDisease);
	
	@Modifying
	@Query("delete from DiseasePatient r where id_patient = ?1 and id_disease = ?2")
	void deleteDiseaseOfPatient(Long idPatient, Long idDM);
}