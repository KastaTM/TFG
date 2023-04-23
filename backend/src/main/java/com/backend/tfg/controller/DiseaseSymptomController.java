package com.backend.tfg.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.tfg.model.Disease;
import com.backend.tfg.model.DiseaseSymptom;
import com.backend.tfg.model.RecordSymptom;
import com.backend.tfg.service.DiseaseService;
import com.backend.tfg.service.DiseaseSymptomService;
import com.backend.tfg.service.RecordSymptomService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class DiseaseSymptomController {

	private DiseaseSymptomService diseaseSymptomService;
	
	private RecordSymptomService recordSymptomService;
	
	private DiseaseService diseaseService;
	
	public DiseaseSymptomController(DiseaseSymptomService dss, RecordSymptomService rss, DiseaseService ds) {
		this.diseaseSymptomService = dss;
		this.recordSymptomService = rss;
		this.diseaseService = ds;
	}
	
	//Obtener los sintomas correspondientes a una enfermedad
	@GetMapping("/diseasesymptoms/{idDisease}")
	public ResponseEntity<List<DiseaseSymptom>> getSymptomsOfDisease(@PathVariable Long idDisease) {
		List<DiseaseSymptom> diseaseSymptom = diseaseSymptomService.listSymptomByDisease(idDisease);
		return ResponseEntity.ok(diseaseSymptom);
	}
	
	//Cuando se quiere añadir un sintoma a una enfermedad
	@PostMapping("/diseasesymptoms")
	public DiseaseSymptom createSymptomDisease(@RequestBody DiseaseSymptom ds) {
		return diseaseSymptomService.save(ds);
	}
	
	//Para borrar un sintoma de una enfermedad
	@Transactional
	@DeleteMapping("/diseasesymptoms/{idDisease}/{idDS}")
	public ResponseEntity<Map<String, Boolean>> deleteSymptomDisease(@PathVariable Long idDisease, @PathVariable Long idDS){
		diseaseSymptomService.deleteSymptomOfDisease(idDisease, idDS);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	//Aquí se realiza la recomendación de las posibles enfermedades más adecuadas según los síntomas presentados
	@GetMapping("/diseasesymptoms/{idRecord}/recommendations")
	public List<Disease> getRecommendations(@PathVariable Long idRecord){
		List<Disease> ret = new ArrayList<>();
		List<DiseaseSymptom> symptoms = new ArrayList<>();
		List<RecordSymptom> recordSymptoms = recordSymptomService.symptomsListByRecord(idRecord);
		
		if(recordSymptoms.size() > 0) {
			Disease dis;
			int cont = 0;
			//Primero obtener la lista de todas las enfermedades (Sus ids)
			List<DiseaseSymptom> diseasesList = diseaseSymptomService.listDiseases();
			for(int a = 0; a < diseasesList.size(); ++a) {//Para todas las enfermedades posibles
				symptoms = diseaseSymptomService.listSymptomByDisease(diseasesList.get(a).getIdDisease());
				//Segundo para esa enfermedad comprobar hacer la comparativa con los sintomas que busco que cubra
				for(int b = 0; b < symptoms.size(); ++b) { //Para todos los sintomas de esa enfermedad
					for(int c = 0; c < recordSymptoms.size(); ++c) { //Busco si coincide el sintoma del paciente con alguno de la enfermedad
						if(recordSymptoms.get(c).getIdSymptom() == symptoms.get(b).getIdSymptom()) { //Si la enfermedad abarca uno de los síntomas que presenta el paciente obtiene un punto
							++cont;
						}
					}
				}
				if(cont == recordSymptoms.size()) { //Si esta enfermedad cubre todos los sintomas la añado
					dis =  diseaseService.knowDiseaseById(diseasesList.get(a).getIdDisease());
					ret.add(dis);
					cont = 0;
				}
				cont = 0;
			}
		}
		return ret;
	}
	
}