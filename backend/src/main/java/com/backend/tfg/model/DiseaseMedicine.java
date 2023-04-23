package com.backend.tfg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "diseases_medicines")
public class DiseaseMedicine {

	@Id
	@Column(name = "id_dm")
	private long idDM;
		
	@Column(name = "id_disease")
	private long idDisease;
		
	@Column(name = "id_medicine")
	private long idMedicine;
	
	@Column(name = "disease_name")
	private String diseaseName;
	
	public DiseaseMedicine() {}
	
	public DiseaseMedicine(long idDisease, long idMedicine) {
		super();
		this.idDisease = idDisease;
		this.idMedicine = idMedicine;
	}

	public long getIdDM() {
		return idDM;
	}

	public void setIdDM(long idDM) {
		this.idDM = idDM;
	}

	public long getIdDisease() {
		return idDisease;
	}

	public void setIdDisease(long idDisease) {
		this.idDisease = idDisease;
	}

	public long getIdMedicine() {
		return idMedicine;
	}

	public void setIdMedicine(long idMedicine) {
		this.idMedicine = idMedicine;
	}

	public String getDiseaseName() {
		return diseaseName;
	}

	public void setDiseaseName(String diseaseName) {
		this.diseaseName = diseaseName;
	}
	
}