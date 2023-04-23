package com.backend.tfg.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.tfg.exception.ResourceNotFoundException;
import com.backend.tfg.model.DiseaseSymptom;
import com.backend.tfg.model.MedicineSymptom;
import com.backend.tfg.model.RecordSymptom;
import com.backend.tfg.model.Symptom;
import com.backend.tfg.service.DiseaseSymptomService;
import com.backend.tfg.service.MedicineSymptomService;
import com.backend.tfg.service.RecordSymptomService;
import com.backend.tfg.service.SymptomService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class SymptomController {

	private SymptomService symptomService;
	
	private MedicineSymptomService medicineSymptomService;
	
	private RecordSymptomService recordSymptomService;
	
	private DiseaseSymptomService diseaseSymptomService;
	
	public SymptomController(SymptomService ss, MedicineSymptomService mss, RecordSymptomService rss, DiseaseSymptomService dss) {
		this.symptomService = ss;
		this.medicineSymptomService = mss;
		this.recordSymptomService = rss;
		this.diseaseSymptomService = dss;
	}
	
	//Lista para poder visualizar todos los síntomas
	@GetMapping("/symptoms")
	public List<Symptom> getAllSymptoms(){
		return symptomService.findAll();
	}
	
	//Obtener un síntoma para poder visualizar sus detalles
	@GetMapping("/symptoms/{idSymptom}")
	public ResponseEntity<Symptom> getSymptomById(@PathVariable Long idSymptom) {
		Symptom symptom = symptomService.findById(idSymptom).orElseThrow(() -> new ResourceNotFoundException("Symptom not exist with idPatient :" + idSymptom));
		return ResponseEntity.ok(symptom);
	}
	
	//Obtener los nombres de los síntomas que hay en la base de datos para comprobar que no se añade un repetido
	@GetMapping("/symptoms/nameList")
	public List<String> getSymptomsNames(){
		List<Symptom> symptoms = symptomService.findAll();
		List<String> ret = new ArrayList<>();
		for(int i = 0; i < symptoms.size(); ++i) {
			ret.add(symptoms.get(i).getSymptomName());
		}
		return ret;
	}
	
	//Obtener el resto de síntomas que todavía se pueden añadir a un medicamento
	@GetMapping("/symptoms/{idMedicine}/restMedicine")
	public List<Symptom> getRestSymptomsToMedicine(@PathVariable Long idMedicine){
		List<MedicineSymptom> medicineSymptoms = medicineSymptomService.symptomListByMedicine(idMedicine);
		List<Symptom> symptoms = symptomService.findAll();
		List<Symptom> ret = new ArrayList<>();
		boolean isCoincidence = false;
		for(int i = 0; i < symptoms.size(); ++i) {
			for(int j = 0; j < medicineSymptoms.size(); ++j) {
				if(medicineSymptoms.get(j).getIdSymptom() == symptoms.get(i).getIdSymptom()) { //Si este síntoma ya está relacionado con el medicamento lo ignoro
					isCoincidence = true;
				}
			}
			if(!isCoincidence) {
				ret.add(symptoms.get(i));
			}
			isCoincidence = false;
		}
		return ret;
	}
	
	//Obtener el resto de síntomas que todavía se pueden añadir a un registro
	@GetMapping("/symptoms/{idRecord}/restRecord")
	public List<Symptom> getRestSymptomsToRecord(@PathVariable Long idRecord){
		List<RecordSymptom> symptomsRecord = recordSymptomService.symptomsListByRecord(idRecord);
		List<Symptom> symptoms = symptomService.findAll();
		List<Symptom> ret = new ArrayList<>();
		boolean isCoincidence = false;
		for(int i = 0; i < symptoms.size(); ++i) {
			for(int j = 0; j < symptomsRecord.size(); ++j) {
				if(symptomsRecord.get(j).getIdSymptom() == symptoms.get(i).getIdSymptom()) { //Si este síntoma ya está relacionado con el registro lo ignoro
					isCoincidence = true;
				}
			}
			if(!isCoincidence) {
				ret.add(symptoms.get(i));
			}
			isCoincidence = false;
		}
		return ret;
	}
	
	//Obtener el resto de síntomas que todavía se pueden añadir a una enfermedad
	@GetMapping("/symptoms/{idDisease}/restDisease")
	public List<Symptom> getRestSymptomsToDisease(@PathVariable Long idDisease){
		List<DiseaseSymptom> symptomsMedicine = diseaseSymptomService.listSymptomByDisease(idDisease);
		List<Symptom> symptoms = symptomService.findAll();
		List<Symptom> ret = new ArrayList<>();
		boolean isCoincidence = false;
		for(int i = 0; i < symptoms.size(); ++i) {
			for(int j = 0; j < symptomsMedicine.size(); ++j) {
				if(symptomsMedicine.get(j).getIdSymptom() == symptoms.get(i).getIdSymptom()) { //Si este síntoma ya está relacionado con la enfermedad lo ignoro
					isCoincidence = true;
				}
			}
			if(!isCoincidence) {
				ret.add(symptoms.get(i));
			}
			isCoincidence = false;
		}
		return ret;
	}
	
	//Guardo un síntoma en la base de datos
	@PostMapping("/symptoms")
	public Symptom createSymptom(@RequestBody Symptom symptom) {
		return symptomService.save(symptom);
	}
	
	//Borro un síntoma de la base de datos
	@DeleteMapping("/symptoms/{idSymptom}")
	public ResponseEntity<Map<String, Boolean>> deleteSymptom(@PathVariable Long idSymptom){
		Symptom symptom = symptomService.findById(idSymptom).orElseThrow(() -> new ResourceNotFoundException("Symptom not exists with id :" + idSymptom));
		symptomService.delete(symptom);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}