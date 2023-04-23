package com.backend.tfg.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.tfg.model.DiseaseSymptom;
import com.backend.tfg.repository.DiseaseSymptomRepository;

@Service
public class DiseaseSymptomService {

	private DiseaseSymptomRepository diseaseSymptomRepository;
	
	public DiseaseSymptomService(DiseaseSymptomRepository dsr) {
		this.diseaseSymptomRepository = dsr;
	}
	
	public List<DiseaseSymptom>  listSymptomByDisease(long id) {
		return diseaseSymptomRepository.listSymptomByDisease(id);
	}
	
	public List<DiseaseSymptom> listDiseases() {
		return diseaseSymptomRepository.listDiseases();
	}
	
	public void deleteByIdDisease(Long idDisease) {
		diseaseSymptomRepository.deleteByIdDisease(idDisease);
	}
	
	public void deleteSymptomOfDisease(Long idDisease, Long idDS) {
		diseaseSymptomRepository.deleteSymptomOfDisease(idDisease, idDS);
	}
	
	public DiseaseSymptom save(DiseaseSymptom ds) {
		return diseaseSymptomRepository.save(ds);
	}
	
}
