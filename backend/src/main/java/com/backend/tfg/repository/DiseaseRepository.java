package com.backend.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.tfg.model.Disease;

public interface DiseaseRepository extends JpaRepository<Disease, Long>{

	@Query(value ="from Disease d order by disease_name asc")
	List<Disease> diseasesAlphabetical();
	
	@Query(value ="from Disease d where id_dis = ?1")
	Disease knowDiseaseById(long id);
	
}
