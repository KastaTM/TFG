package com.backend.tfg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "medicines_symptoms")
public class MedicineSymptom {

	@Id
	@Column(name = "id_ms")
	private long idMS;
	
	@Column(name = "id_medicine")
	private long idMedicine;
	
	@Column(name = "id_symptom")
	private long idSymptom;
	
	@Column(name = "symptom_name")
	private String symptomName;
	
	public MedicineSymptom() {}
	
	public MedicineSymptom(long idMedicine, long idSymptom) {
		super();
		this.idMedicine = idMedicine;
		this.idSymptom = idSymptom;
	}

	public long getIdMS() {
		return idMS;
	}

	public void setIdMS(long idMS) {
		this.idMS = idMS;
	}

	public long getIdMedicine() {
		return idMedicine;
	}

	public void setIdMedicine(long idMedicine) {
		this.idMedicine = idMedicine;
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

	public void setSymptomName(String symptomName) {
		this.symptomName = symptomName;
	}

}