package com.backend.tfg.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.backend.tfg.exception.ResourceNotFoundException;
import com.backend.tfg.model.DiseasePatient;
import com.backend.tfg.service.DiseasePatientService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class DiseasePatientController {

	@Autowired
	private DiseasePatientService diseasePatientService;
	
	public DiseasePatientController(DiseasePatientService dps) {
		this.diseasePatientService = dps;
	}
	
	//Guardamos una referencia a una enfermedad que está referenciando a un paciente en la base de datos
	@GetMapping("/diseasepatients/{idPatient}")
	public ResponseEntity<List<DiseasePatient>> getDiseasesOfPatient(@PathVariable Long idPatient) {
		List<DiseasePatient> diseasePatient = diseasePatientService.diseaseListByPatient(idPatient);
		return ResponseEntity.ok(diseasePatient);
	}
	
	//Guarda una enfermedad que referencia a un paciente
	@PostMapping("/diseasepatients")
	public DiseasePatient createDiseasePatient(@RequestBody DiseasePatient dp) {
		return diseasePatientService.save(dp);
	}
	
	//Borramos la enfermedad que referencia a un paciente
	@DeleteMapping("/diseasepatients/{idPatient}")
	public ResponseEntity<Map<String, Boolean>> deleteDiseasePatient(@PathVariable Long idPatient){
		DiseasePatient diseasePatient = diseasePatientService.findById(idPatient).orElseThrow(() -> new ResourceNotFoundException("Patient not exists with id :" + idPatient));
		diseasePatientService.delete(diseasePatient);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	//Borrado en la base de datos
	@Transactional
	@DeleteMapping("/diseasepatients/{idPatient}/{idDP}")
	public ResponseEntity<Map<String, Boolean>> deleteDiseasePatient(@PathVariable Long idPatient, @PathVariable Long idDP){
		diseasePatientService.deleteDiseaseOfPatient(idPatient, idDP);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}