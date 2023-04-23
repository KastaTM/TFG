package com.backend.tfg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "records_symptoms")
public class RecordSymptom {

	@Id
	@Column(name = "id_rs")
	private long idRS;
	
	@Column(name = "id_record")
	private long idRecord;
	
	@Column(name = "id_symptom")
	private long idSymptom;
	
	@Column(name = "symptom_name")
	private String symptomName;
	
	public RecordSymptom() {}
	
	public RecordSymptom(long idRecord, long idSymptom) {
		super();
		this.idRecord = idRecord;
		this.idSymptom = idSymptom;
	}

	public long getIdRS() {
		return idRS;
	}

	public void setIdRS(long idRS) {
		this.idRS = idRS;
	}

	public long getIdRecord() {
		return idRecord;
	}

	public void setIdRecord(long idRecord) {
		this.idRecord = idRecord;
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