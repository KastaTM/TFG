package com.backend.tfg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.tfg.model.Appointment;
import com.backend.tfg.repository.AppointmentRepository;

@Service
public class AppointmentService {

	private AppointmentRepository appointmentRepository;
	
	public AppointmentService(AppointmentRepository ar) {
		this.appointmentRepository = ar;
	}
	
	public List<Appointment> appointmentListByDoctorAscendingId(long id) {
		return appointmentRepository.appointmentListByDoctorAscendingId(id);
	}
	
	public List<Appointment> appointmentListByDoctorDescendingId(long id) {
		return appointmentRepository.appointmentListByDoctorDescendingId(id);
	}
	
	public List<Appointment> appointmentListByDoctorAscendingDate(long id) {
		return appointmentRepository.appointmentListByDoctorAscendingDate(id);
	}
	
	public List<Appointment> appointmentListByDoctorDescendingDate(long id) {
		return appointmentRepository.appointmentListByDoctorDescendingDate(id);
	}
	
	public void deleteByIdDoctor(Long idDoctor) {
		appointmentRepository.deleteByIdDoctor(idDoctor);
	}
	
	public void deleteByIdPatient(Long idPatient) {
		appointmentRepository.deleteByIdPatient(idPatient);
	}
	
	public Optional<Appointment> findById(Long idAppointment) {
		return appointmentRepository.findById(idAppointment);
	}
	
	public void delete(Appointment appointment) {
		appointmentRepository.delete(appointment);
	}
	
	public Appointment save(Appointment appointment) {
		return appointmentRepository.save(appointment);
	}
	
}
