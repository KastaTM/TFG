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
public class Record {

	@Id
	@Column(name = "id_record")
	private long idRecord;
	
	@Column(name = "id_patient")
	private long idPatient;
	
	@Column(name = "date")
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(iso = ISO.DATE)
	private Date date;
	
	public Record() {}
	
	public Record(long idRecord, long idPatient, Date date) {
		super();
		this.idRecord = idRecord;
		this.idPatient = idPatient;
		this.date = date;
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

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
}