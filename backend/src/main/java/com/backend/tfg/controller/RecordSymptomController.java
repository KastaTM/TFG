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

import com.backend.tfg.model.RecordSymptom;
import com.backend.tfg.service.RecordSymptomService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class RecordSymptomController {

	private RecordSymptomService recordSymptomService;
	
	public RecordSymptomController(RecordSymptomService rss) {
		this.recordSymptomService = rss;
	}
	
	//Obtener el listado de todos los síntomas de un registro
	@GetMapping("/recordsymptoms/{idRecord}")
	public ResponseEntity<List<RecordSymptom>> getSymptomsOfRecord(@PathVariable Long idRecord) {
		List<RecordSymptom> recordSymptom = recordSymptomService.symptomsListByRecord(idRecord);
		return ResponseEntity.ok(recordSymptom);
	}
	
	//Añade un síntoma a un registro en la base de datos
	@PostMapping("/recordsymptoms")
	public RecordSymptom createSymptomRecord(@RequestBody RecordSymptom rs) {
		return recordSymptomService.save(rs);
	}
	
	//Borra un síntoma de un registro de la base de datos
	@Transactional
	@DeleteMapping("/recordsymptoms/{idRecord}/{idDS}")
	public ResponseEntity<Map<String, Boolean>> deleteSymptomRecord(@PathVariable Long idRecord, @PathVariable Long idDS){
		recordSymptomService.deleteSymptomOfRecord(idRecord, idDS);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}