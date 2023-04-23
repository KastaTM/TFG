package com.backend.tfg.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

@Entity
@Table(name = "appointments")
public class Appointment {

	@Id
	@Column(name = "id_appointment")
	private long idAppointment;
	
	@Column(name = "id_doctor")
	private long idDoctor;
	
	@Column(name = "id_patient")
	private long idPatient;
	
	@Column(name = "date_appointment")
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(iso = ISO.DATE)
	private Date dateAppointment;
	
	@Column(name = "appointment_description")
	private String appointmentDescription;

	public Appointment() {}
	
	public Appointment(long idAppointment, long idPatient, long idDoctor, Date dateAppointment, String appointmentDescription) {
		super();
		this.idAppointment = idAppointment;
		this.idPatient = idPatient;
		this.idDoctor = idDoctor;
		this.dateAppointment = dateAppointment;
		this.appointmentDescription = appointmentDescription;
	}
	
	public long getIdAppointment() {
		return idAppointment;
	}

	public void setIdAppointment(long idAppointment) {
		this.idAppointment = idAppointment;
	}
	
	public long getIdDoctor() {
		return idDoctor;
	}

	public void setIdDoctor(long idDoctor) {
		this.idDoctor = idDoctor;
	}

	public long getIdPatient() {
		return idPatient;
	}

	public void setIdPatient(long idPatient) {
		this.idPatient = idPatient;
	}

	public Date getDateAppointment() {
		return dateAppointment;
	}

	public void setDateAppointment(Date dateAppointment) {
		this.dateAppointment = dateAppointment;
	}

	public String getAppointmentDescription() {
		return appointmentDescription;
	}

	public void setAppointmentDescription(String appointmentDescription) {
		this.appointmentDescription = appointmentDescription;
	}
	
}