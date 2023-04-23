package com.backend.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.tfg.model.RecordPatient;

@Repository
public interface RecordPatientRepository extends JpaRepository<RecordPatient, Long>{
	
	@Query(value ="from RecordPatient r where id_patient = ?1")
    List<RecordPatient> recordsListByPatient(long id);
	
	@Modifying
	@Query("delete from Record r where id_patient = ?1")
	void deleteByIdPatient(Long idPatient);
	
	@Query(value ="from RecordPatient r where id_record = ?1 group by id_patient")
    RecordPatient recordOfAPatient(long id);
	
}