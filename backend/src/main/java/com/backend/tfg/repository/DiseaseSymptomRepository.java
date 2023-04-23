package com.backend.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.backend.tfg.model.DiseaseSymptom;

public interface DiseaseSymptomRepository extends JpaRepository<DiseaseSymptom, Long>{

	@Query(value ="from DiseaseSymptom d where id_disease = ?1")
    List<DiseaseSymptom>  listSymptomByDisease(long id);
	
	@Query(value ="from DiseaseSymptom d group by id_disease")
    List<DiseaseSymptom> listDiseases();
	
	@Modifying
	@Query("delete from DiseaseSymptom r where id_disease = ?1")
	void deleteByIdDisease(Long idDisease);
	
	@Modifying
	@Query("delete from DiseaseSymptom r where id_disease = ?1 and id_symptom = ?2")
	void deleteSymptomOfDisease(Long idDisease, Long idDS);
	
}