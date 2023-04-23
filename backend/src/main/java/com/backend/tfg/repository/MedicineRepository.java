package com.backend.tfg.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.tfg.model.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine, Long>{

	@Query(value ="from Medicine d where id_med = ?1")
	Medicine knowMedicineById(long id);
	
}