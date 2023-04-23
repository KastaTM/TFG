package com.backend.tfg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "diseases")
public class Disease {

	@Id
	@Column(name = "id_dis")
	private long idDisease;
	
	@Column(name = "disease_name")
	private String diseaseName;
	
	@Column(name = "disease_description")
	private String diseaseDescription;
	
	public Disease() {}
	
	public Disease(long idDisease, String name, String desc) {
		super();
		this.idDisease = idDisease;
		this.diseaseName = name;
		this.diseaseDescription = desc;
	}

	public long getIdDisease() {
		return idDisease;
	}

	public void setIdDisease(long idDisease) {
		this.idDisease = idDisease;
	}

	public String getDiseaseName() {
		return diseaseName;
	}

	public void setDiseaseName(String diseaseName) {
		this.diseaseName = diseaseName;
	}

	public String getDiseaseDescription() {
		return diseaseDescription;
	}

	public void setDiseaseDescription(String diseaseDescription) {
		this.diseaseDescription = diseaseDescription;
	}
	
}