package com.backend.tfg.controller;

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

import com.backend.tfg.exception.ResourceNotFoundException;
import com.backend.tfg.model.DiseaseMedicine;
import com.backend.tfg.service.DiseaseMedicineService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class DiseaseMedicineController {

	private DiseaseMedicineService diseaseMedicineService;
	
	public DiseaseMedicineController(DiseaseMedicineService dms) {
		this.diseaseMedicineService = dms;
	}
	
	//Guardamos una referencia a una enfermedad que está referenciando a un medicamento en la base de datos
	@GetMapping("/diseasemedicines/{idMedicine}")
	public ResponseEntity<List<DiseaseMedicine>> getDiseasesOfMedicine(@PathVariable Long idMedicine) {
		List<DiseaseMedicine> diseaseMedicine = diseaseMedicineService.diseaseListByMedicine(idMedicine);
		return ResponseEntity.ok(diseaseMedicine);
	}
	
	//Guarda una enfermedad que referencia a una medicina
	@PostMapping("/diseasemedicines")
	public DiseaseMedicine createDiseaseMedicine(@RequestBody DiseaseMedicine dm) {
		return diseaseMedicineService.save(dm);
	}
	
	//Borramos la enfermedad que referencia a una medicina
	@DeleteMapping("/diseasemedicines/{idMedicine}")
	public ResponseEntity<Map<String, Boolean>> deleteDiseaseMedicine(@PathVariable Long idMedicine){
		DiseaseMedicine diseaseMedicine = diseaseMedicineService.findById(idMedicine).orElseThrow(() -> new ResourceNotFoundException("Medicine not exists with id :" + idMedicine));
		diseaseMedicineService.delete(diseaseMedicine);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	//Borrado en la base de datos
	@Transactional
	@DeleteMapping("/diseasemedicines/{idMedicine}/{idDM}")
	public ResponseEntity<Map<String, Boolean>> deleteDiseaseMedicine(@PathVariable Long idMedicine, @PathVariable Long idDM){
		diseaseMedicineService.deleteDiseaseOfMedicine(idMedicine, idDM);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}