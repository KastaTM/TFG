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
import com.backend.tfg.model.Patient;
import com.backend.tfg.model.RecordPatient;
import com.backend.tfg.service.AppointmentService;
import com.backend.tfg.service.NotificationService;
import com.backend.tfg.service.PatientService;
import com.backend.tfg.service.RecordPatientService;
import com.backend.tfg.service.RecordSymptomService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class PatientController {

	private PatientService patientService;
	
	private RecordPatientService recordPatientService;
	
	private RecordSymptomService recordSymptomService;
	
	private NotificationService notificationService;
	
	private AppointmentService appointmentService;
	
	public PatientController(PatientService ps, RecordPatientService rps, RecordSymptomService rss, NotificationService ns, AppointmentService as) {
		this.patientService = ps;
		this.recordPatientService = rps;
		this.recordSymptomService = rss;
		this.notificationService = ns;
		this.appointmentService = as;
	}
	
	//Obtener la lista de pacientes asociados a un doctor
	@GetMapping("/patients/{idDoctor}")
	public ResponseEntity<List<Patient>> getPatientsOfDoctor(@PathVariable Long idDoctor) {
		List<Patient> patient = patientService.patientsListByDoctor(idDoctor);
		return ResponseEntity.ok(patient);
	}
	
	//Obtener una lista de los distintos DNIs de los pacientes para asegurarnos de que no se está intentando añadir un duplicado
	@GetMapping("/patients/idList")
	public ResponseEntity<List<Long>> getIdPatients() {
		List<Patient> patient = patientService.findAll();
		List<Long> ret = new ArrayList<>();
		for(int i = 0; i < patient.size(); ++i) {
			ret.add(patient.get(i).getIdPatient());
		}
		return ResponseEntity.ok(ret);
	}
	
	//Obtener una lista de los distintos DNIs de los pacientes para asegurarnos de que no se está intentando añadir un duplicado
	@GetMapping("/patients/{idDoctor}/list")
	public ResponseEntity<List<Long>> getIdPatientsOfDoctor(@PathVariable Long idDoctor) {
		List<Patient> patient = patientService.patientsListByDoctor(idDoctor);
		List<Long> ret = new ArrayList<>();
		for(int i = 0; i < patient.size(); ++i) {
			ret.add(patient.get(i).getIdPatient());
		}
		return ResponseEntity.ok(ret);
	}
	
	
	//Permite obtener los datos de un paciente según el id que se recibe, este método nos ayuda en casdoa como el Header
	@GetMapping("/patients/{idDoctor}/{idPatient}")
	public ResponseEntity<Patient> getPatientById(@PathVariable Long idDoctor, @PathVariable Long idPatient) {	
		Patient patient = patientService.findById(idPatient).orElseThrow(() -> new ResourceNotFoundException("Patient not exist with idPatient :" + idPatient));
		return ResponseEntity.ok(patient);
	}
	
	//Actualiza la información de un paciente
	@PutMapping("/patients/{idPatient}")
	public ResponseEntity<Patient> updatePatient(@PathVariable Long idPatient, @RequestBody Patient patientDetails){
		Patient patient = patientService.findById(idPatient).orElseThrow(() -> new ResourceNotFoundException("Patient not exist with idPatient :" + idPatient));
		patient.setFirstName(patientDetails.getFirstName());
		patient.setLastName(patientDetails.getLastName());
		patient.setEmail(patientDetails.getEmail());
		patient.setBirthday(patientDetails.getBirthday());	
		Patient updatedPatient = patientService.save(patient);
		return ResponseEntity.ok(updatedPatient);
	}
	
	//Añade un nuevo paciente a la base de datos
	@PostMapping("/patients")
	public Patient createPatient(@RequestBody Patient patient) {
		return patientService.save(patient);
	}
	
	//Borra un paciente de la base de datos y todos los contenidos relacionados con este
	@Transactional
	@DeleteMapping("/patients/{idPatient}")
	public ResponseEntity<Map<String, Boolean>> deletePatient(@PathVariable Long idPatient){
		Patient patient = patientService.findById(idPatient).orElseThrow(() -> new ResourceNotFoundException("Patient not exists with id :" + idPatient));
		List<RecordPatient> listRecords = recordPatientService.recordsListByPatient(idPatient);
		for(int i = 0; i < listRecords.size(); ++i) {
			//Borro todos los sintomas de un registro para que no quede vacío
			recordSymptomService.deleteByIdRecord(listRecords.get(i).getIdRecord());
		}
		//Borro todos los registros correspondientes a un paciente
		recordPatientService.deleteByIdPatient(idPatient);
		
		//Borro todas las notificaciones del paciente
		notificationService.deleteByIdPatient(idPatient);
		//Borro todas las citas del paciente
		appointmentService.deleteByIdPatient(idPatient);
		//Borro al paciente
		patientService.delete(patient);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}