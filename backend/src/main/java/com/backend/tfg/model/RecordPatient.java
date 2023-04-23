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
@Table(name = "records")
public class RecordPatient {

	@Id
	@Column(name = "id_record")
	private long idRecord;
	
	@Column(name = "id_patient")
	private long idPatient;
	
	@Column(name = "date_record")
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(iso = ISO.DATE)
	private Date dateRecord;
	
	public RecordPatient() {}
	
	public RecordPatient(long idRecord, long idPatient, Date dateRecord) {
		super();
		this.idRecord = idRecord;
		this.idPatient = idPatient;
		this.dateRecord = dateRecord;
	}

	public long getIdRecord() {
		return idRecord;
	}

	public void setIdRecord(long idRecord) {
		this.idRecord = idRecord;
	}

	public long getIdPatient() {
		return idPatient;
	}

	public void setIdPatient(long idPatient) {
		this.idPatient = idPatient;
	}

	public Date getDateRecord() {
		return dateRecord;
	}

	public void setDateRecord(Date dateRecord) {
		this.dateRecord = dateRecord;
	}
	
}