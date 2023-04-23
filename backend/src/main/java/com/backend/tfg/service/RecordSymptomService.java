package com.backend.tfg.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.tfg.model.RecordSymptom;
import com.backend.tfg.repository.RecordSymptomRepository;

@Service
public class RecordSymptomService {

	private RecordSymptomRepository recordSymptomRepository;
	
	public RecordSymptomService(RecordSymptomRepository rsr) {
		this.recordSymptomRepository = rsr;
	}
	
	public List<RecordSymptom> symptomsListByRecord(long id) {
		return recordSymptomRepository.symptomsListByRecord(id);
	}
	
	public void deleteByIdRecord(Long idRecord) {
		recordSymptomRepository.deleteByIdRecord(idRecord);
	}
	
	public void deleteSymptomOfRecord(Long idRecord, Long idDS) {
		recordSymptomRepository.deleteSymptomOfRecord(idRecord, idDS);
	}
	
	public RecordSymptom save(RecordSymptom rs) {
		return recordSymptomRepository.save(rs);
	}
	
}
