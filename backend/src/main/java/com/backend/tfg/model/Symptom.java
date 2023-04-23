package com.backend.tfg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "symptoms")
public class Symptom {
	
	@Id
	@Column(name = "id_sym")
	private long idSymptom;
	
	@Column(name = "symptom_name")
	private String symptomName;
	
	@Column(name = "symptom_description")
	private String symptomDescription;
	
	public Symptom() {}
	
	public Symptom(long idSymptom, String name, String description) {
		super();
		this.idSymptom = idSymptom;
		this.symptomName = name;
		this.symptomDescription = description;
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
	
	public String getSymptomDescription() {
		return symptomDescription;
	}

	public void setSymptomDescription(String desc) {
		this.symptomDescription = desc;
	}
	
}