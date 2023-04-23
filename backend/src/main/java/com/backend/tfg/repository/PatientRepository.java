package com.backend.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.tfg.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>{
	
	@Query(value ="from Patient p where id_doctor = ?1")
    List<Patient> patientsListByDoctor(long id);
	
	@Modifying
	@Query("delete from Patient p where id_doctor = ?1")
	void deleteByIdDoctor(Long idDoctor);

}