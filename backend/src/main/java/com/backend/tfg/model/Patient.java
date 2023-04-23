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
@Table(name = "patients")
public class Patient {

	@Id
	@Column(name = "id_patient")
	private long idPatient;
	
	@Column(name = "id_doctor")
	private long idDoctor;
	
	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "birthday")
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(iso = ISO.DATE)
	private Date birthday;
	
	@Column(name = "patient_picture")
	private String patientPicture;
	
	public Patient() {}
	
	public Patient(long idPatient, long idDoctor, String firstName, String lastName, String email, Date birthday, String patientPicture) {
		super();
		this.idPatient = idPatient;
		this.idDoctor = idDoctor;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.birthday = birthday;
		this.patientPicture = patientPicture;
	}

	public long getIdPatient() {
		return idPatient;
	}

	public void setIdPatient(long idPatient) {
		this.idPatient = idPatient;
	}

	public long getIdDoctor() {
		return idDoctor;
	}

	public void setIdDoctor(long idDoctor) {
		this.idDoctor = idDoctor;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getPatientPicture() {
		return patientPicture;
	}

	public void setPatientPicture(String patientPicture) {
		this.patientPicture = patientPicture;
	}
	
}