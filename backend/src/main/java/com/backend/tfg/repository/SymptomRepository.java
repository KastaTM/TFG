package com.backend.tfg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.tfg.model.Symptom;

public interface SymptomRepository extends JpaRepository<Symptom, Long>{

}