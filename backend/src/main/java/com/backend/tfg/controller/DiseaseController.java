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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.tfg.exception.ResourceNotFoundException;
import com.backend.tfg.model.Disease;
import com.backend.tfg.model.DiseaseMedicine;
import com.backend.tfg.model.DiseasePatient;
import com.backend.tfg.service.DiseaseMedicineService;
import com.backend.tfg.service.DiseasePatientService;
import com.backend.tfg.service.DiseaseService;
import com.backend.tfg.service.DiseaseSymptomService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class DiseaseController {

	private DiseaseService diseaseService;
	
	private DiseaseSymptomService diseaseSymptomService;
	
	private DiseasePatientService diseasePatientService;
	
	private DiseaseMedicineService diseaseMedicineService;
	
	public DiseaseController(DiseaseService ds, DiseaseSymptomService dss, DiseasePatientService dps, DiseaseMedicineService dms) {
		this.diseaseService = ds;
		this.diseaseSymptomService = dss;
		this.diseasePatientService = dps;
		this.diseaseMedicineService = dms;
	}
	
	//Obtengo una lista con todos las enfermedades registradas en la base de datos
	@GetMapping("/diseases")
	public List<Disease> getAllDiseases(){
		return diseaseService.diseasesAlphabetical();
	}
	
	//Obtengo una enfermedad para poder mostrar sus detalles
	@GetMapping("/diseases/{idDisease}")
	public ResponseEntity<Disease> getDiseaseById(@PathVariable Long idDisease) {
		Disease disease = diseaseService.findById(idDisease).orElseThrow(() -> new ResourceNotFoundException("Disease not exist with idDisease :" + idDisease));
		return ResponseEntity.ok(disease);
	}
	
	//Obtengo los nombres de todas las enfermedades para poder comprobar que no se vaya a insertar una duplicada
	@GetMapping("/diseases/nameList")
	public List<String> getDiseasesNames(){
		List<Disease> diseases = diseaseService.findAll();
		List<String> ret = new ArrayList<>();
		for(int i = 0; i < diseases.size(); ++i) {
			ret.add(diseases.get(i).getDiseaseName());
		}
		return ret;
	}
	
	//Actualización de los datos de una enfermedad en la base de datos
	@PutMapping("/diseases/{idDisease}")
	public ResponseEntity<Disease> updateDisease(@PathVariable Long idDisease, @RequestBody Disease diseaseDetails){
		Disease disease = diseaseService.findById(idDisease).orElseThrow(() -> new ResourceNotFoundException("Disease not exist with idDisease :" + idDisease));
		disease.setDiseaseName(diseaseDetails.getDiseaseName());
		disease.setDiseaseDescription(diseaseDetails.getDiseaseDescription());
		Disease updatedDisease = diseaseService.save(disease);
		return ResponseEntity.ok(updatedDisease);
	}
	
	//Guardo una enfermedad en la base de datos
	@PostMapping("/diseases")
	public Disease createDisease(@RequestBody Disease disease) {
		return diseaseService.save(disease);
	}
	
	//Borro una enfermedad de la base de datos y con ello todo lo que conlleva (Borrado en aquellos sitios donde puede llegar a estar referenciada)
	@Transactional
	@DeleteMapping("/diseases/{idDisease}")
	public ResponseEntity<Map<String, Boolean>> deleteDisease(@PathVariable Long idDisease){
		Disease disease = diseaseService.findById(idDisease).orElseThrow(() -> new ResourceNotFoundException("Disease not exists with id :" + idDisease));
		//Borro todos los sintomas asociados a esa enfermedad
		diseaseSymptomService.deleteByIdDisease(idDisease);
		//Borro esa enfermedad de todos los pacientes que puedan tenerla (Rara vez borraremos una enfermedad que tenga alguien salvo error)
		diseasePatientService.deleteByIdDisease(idDisease);
		//Borro la enfermedad
		diseaseService.delete(disease);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
	//Obtengo la lista del resto de los medicamentos asociados a una enfermedad los cuales no deben tomarse
	@GetMapping("/diseases/{idMedicine}/restMedicine")
	public List<Disease> getRestDiseasesToMedicine(@PathVariable Long idMedicine){
		List<DiseaseMedicine> medicinesDisease = diseaseMedicineService.diseaseListByMedicine(idMedicine);
		List<Disease> diseases = diseaseService.findAll();
		List<Disease> ret = new ArrayList<>();
		boolean isCoincidence = false;
		for(int i = 0; i < diseases.size(); ++i) {
			for(int j = 0; j < medicinesDisease.size(); ++j) {
				if(medicinesDisease.get(j).getIdDisease() == diseases.get(i).getIdDisease()) { //Si ya hago referencia a esa enfermedad la ignoro
					isCoincidence = true;
				}
			}
			if(!isCoincidence) {
				ret.add(diseases.get(i));
			}
			isCoincidence = false;
		}
		return ret;
	}
	
	//Obtengo la lista del resto de los medicamentos asociados a un paciente de tal manera que no se repitan en caso de tener que añadir mas
	@GetMapping("/diseases/{idPatient}/restPatient")
	public List<Disease> getRestDiseasesToPatient(@PathVariable Long idPatient){
		List<DiseasePatient> patientDisease = diseasePatientService.diseaseListByPatient(idPatient);
		List<Disease> diseases = diseaseService.findAll();
		List<Disease> ret = new ArrayList<>();
		boolean isCoincidence = false;
		for(int i = 0; i < diseases.size(); ++i) {
			for(int j = 0; j < patientDisease.size(); ++j) {
				if(patientDisease.get(j).getIdDisease() == diseases.get(i).getIdDisease()) { //Si ya hago referencia a esa enfermedad la ignoro
					isCoincidence = true;
				}
			}
			if(!isCoincidence) {
				ret.add(diseases.get(i));
			}
			isCoincidence = false;
		}
		return ret;
	}
	
}