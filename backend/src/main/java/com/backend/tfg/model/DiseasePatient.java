package com.backend.tfg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "diseases_patients")
public class DiseasePatient {

	@Id
	@Column(name = "id_dp")
	private long idDP;
	
	@Column(name = "id_disease")
	private long idDisease;
	
	@Column(name = "id_patient")
	private long idPatient;
	
	@Column(name = "disease_name")
	private String diseaseName;
	
	public DiseasePatient() {}
	
	public DiseasePatient(long idDisease, long idPatient) {
		super();
		this.idDisease = idDisease;
		this.idPatient = idPatient;
	}

	public long getIdDisease() {
		return idDisease;
	}

	public void setIdDisease(long idDisease) {
		this.idDisease = idDisease;
	}


	public long getIdPatient() {
		return idPatient;
	}

	public void setIdPatient(long idPatient) {
		this.idPatient = idPatient;
	}
	
	public String getDiseaseName() {
		return diseaseName;
	}

	public void setDiseaseName(String name) {
		this.diseaseName = name;
	}

	public long getIdDP() {
		return idDP;
	}

	public void setIdDP(long idDP) {
		this.idDP = idDP;
	}
	
}