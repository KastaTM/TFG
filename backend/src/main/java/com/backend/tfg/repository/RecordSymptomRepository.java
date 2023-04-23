package com.backend.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.backend.tfg.model.RecordSymptom;

public interface RecordSymptomRepository extends JpaRepository<RecordSymptom, Long>{

	@Query(value ="from RecordSymptom d where id_record = ?1")
    List<RecordSymptom> symptomsListByRecord(long id);
	
	@Modifying
	@Query("delete from RecordSymptom r where id_record = ?1")
	void deleteByIdRecord(Long idRecord);
	
	@Modifying
	@Query("delete from RecordSymptom r where id_record = ?1 and id_symptom = ?2")
	void deleteSymptomOfRecord(Long idRecord, Long idDS);
	
}