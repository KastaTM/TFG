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
import com.backend.tfg.model.Appointment;
import com.backend.tfg.service.AppointmentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class AppointmentController {
	
	//@Autowired
	//private AppointmentRepository appointmentRepository;
	private AppointmentService appointmentService;
	
	public AppointmentController(AppointmentService as) {
		this.appointmentService = as;
	}
	
	//Guardar una cita en la base de datos
	@PostMapping("/appointments")
	public Appointment createAppointment(@RequestBody Appointment appointment) {
		return appointmentService.save(appointment);
	}
	
	//Borrar una cita de la base de datos
	@DeleteMapping("/appointments/{idAppointment}")
	public ResponseEntity<Map<String, Boolean>> deleteAppointment(@PathVariable Long idAppointment){
		Appointment appointment = appointmentService.findById(idAppointment).orElseThrow(() -> new ResourceNotFoundException("Appointment not exists with id :" + idAppointment));
		appointmentService.delete(appointment);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
	//Obtener una lista de las citas que tiene un doctor, ordenadas bajo diferentes criterios
	@GetMapping("/appointments/{idDoctor}/{order}")
	public ResponseEntity<List<Appointment>> getAppointmentsOfDoctor(@PathVariable Long idDoctor, @PathVariable String order) {
		List<Appointment> appointment = new ArrayList<>();
		if(order.equals("id(increasing)")) {
			appointment = appointmentService.appointmentListByDoctorAscendingId(idDoctor);
		}
		else if(order.equals("id(decreasing)")) {
			appointment = appointmentService.appointmentListByDoctorDescendingId(idDoctor);
		}
		else if(order.equals("date(increasing)")) {
			appointment = appointmentService.appointmentListByDoctorAscendingDate(idDoctor);
		}
		else {
			appointment = appointmentService.appointmentListByDoctorDescendingDate(idDoctor);
		}
		return ResponseEntity.ok(appointment);
	}
	
	//Devuelve una cita para poder visualizar los detalles de la misma
	@GetMapping("/appointments/{idAppointment}/view")
	public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long idAppointment) {
		Appointment appointment = appointmentService.findById(idAppointment).orElseThrow(() -> new ResourceNotFoundException("Appointment not exist with idPatient :" + idAppointment));
		return ResponseEntity.ok(appointment);
	}

}