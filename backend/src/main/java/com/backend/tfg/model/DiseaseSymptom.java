package com.backend.tfg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "diseases_symptoms")
public class DiseaseSymptom {
	
	@Id
	@Column(name = "id_ds")
	private long idDS;
	
	@Column(name = "id_disease")
	private long idDisease;
	
	@Column(name = "id_symptom")
	private long idSymptom;
	
	@Column(name = "symptom_name")
	private String symptomName;
	
	public DiseaseSymptom() {}
	
	public DiseaseSymptom(long idDisease, long idSymptom) {
		super();
		this.idDisease = idDisease;
		this.idSymptom = idSymptom;
	}

	public long getIdDisease() {
		return idDisease;
	}

	public void setIdDisease(long idDisease) {
		this.idDisease = idDisease;
	}

	public long getIdSymptom() {
		return idSymptom;
	}

	public void setIdSymptom(long idSymptom) {
		this.idSymptom = idSymptom;
	}
	
	public String getSymptomName() {
		return symptomName;
	}

	public void setSymptomName(String name) {
		this.symptomName = name;
	}

	public long getIdDS() {
		return idDS;
	}

	public void setIdDS(long idDS) {
		this.idDS = idDS;
	}
	
}