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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.tfg.exception.ResourceNotFoundException;
import com.backend.tfg.model.RecordPatient;
import com.backend.tfg.service.RecordPatientService;
import com.backend.tfg.service.RecordSymptomService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class RecordPatientController {

	
	private RecordPatientService recordPatientService;

	private RecordSymptomService recordSymptomService;
	
	public RecordPatientController(RecordPatientService rps, RecordSymptomService rss) {
		this.recordPatientService = rps;
		this.recordSymptomService = rss;
	}
	
	public List<RecordPatient> getAllRecords(){
		return recordPatientService.findAll();
	}
	
	//Obtiene el listado de todos los registros asociados a un paciente
	@GetMapping("/records/{idPatient}")
	public ResponseEntity<List<RecordPatient>> getRecordsOfPatient(@PathVariable Long idPatient) {
		List<RecordPatient> record = recordPatientService.recordsListByPatient(idPatient);
		return ResponseEntity.ok(record);
	}
	
	//Obtiene un único registro que nos permite ver en detalle
	@GetMapping("/records/{idPatient}/{idRecord}")
	public ResponseEntity<RecordPatient> getRecordById(@PathVariable Long idPatient, @PathVariable Long idRecord) {
		RecordPatient record = recordPatientService.findById(idRecord).orElseThrow(() -> new ResourceNotFoundException("Record not exist with idPatient :" + idRecord));
		return ResponseEntity.ok(record);
	}
	
	//Actualizar los contenidos de un registro asociado a un paciente
	@PutMapping("/records/{idRecord}")
	public ResponseEntity<RecordPatient> updateRecord(@PathVariable Long idRecord, @RequestBody RecordPatient recordDetails){
		RecordPatient record = recordPatientService.findById(idRecord).orElseThrow(() -> new ResourceNotFoundException("Record not exist with idPatient :" + idRecord));
		record.setDateRecord(recordDetails.getDateRecord());		
		RecordPatient updatedRecord = recordPatientService.save(record);
		return ResponseEntity.ok(updatedRecord);
	}
	
	//Añado un registro asociado a un cliente a la base de datos
	@PostMapping("/records")
	public RecordPatient createRecord(@RequestBody RecordPatient record) {
		return recordPatientService.save(record);
	}
	
	//Borra un registro asociado a un paciente de la base de datos
	@Transactional
	@DeleteMapping("/records/{idRecord}")
	public ResponseEntity<Map<String, Boolean>> deleteRecord(@PathVariable Long idRecord){
		RecordPatient record = recordPatientService.findById(idRecord).orElseThrow(() -> new ResourceNotFoundException("Record not exists with id :" + idRecord));
		//Vamos a borrar todos los sintomas asociados a ese registro
		recordSymptomService.deleteByIdRecord(idRecord);
		//Borramos el registro
		recordPatientService.delete(record);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}