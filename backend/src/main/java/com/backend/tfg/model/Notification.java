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
@Table(name = "notifications")
public class Notification {

	@Id
	@Column(name = "id_notification")
	private long idNotification;
	
	@Column(name = "id_doctor")
	private long idDoctor;
	
	@Column(name = "id_patient")
	private long idPatient;
	
	@Column(name = "date_notification")
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(iso = ISO.DATE)
	private Date dateNotification;
	
	@Column(name = "notification_description")
	private String notificationDescription;
	
	public Notification() {}
	
	public Notification(long idNotification, long idPatient, long idDoctor, Date dateNotification, String notificationDescription) {
		super();
		this.idNotification = idNotification;
		this.idPatient = idPatient;
		this.idDoctor = idDoctor;
		this.dateNotification = dateNotification;
		this.notificationDescription = notificationDescription;
	}

	public long getIdNotification() {
		return idNotification;
	}

	public void setIdNotification(long idNotification) {
		this.idNotification = idNotification;
	}

	public long getIdDoctor() {
		return idDoctor;
	}

	public void setIdDoctor(long idDoctor) {
		this.idDoctor = idDoctor;
	}

	public long getIdPatient() {
		return idPatient;
	}

	public void setIdPatient(long idPatient) {
		this.idPatient = idPatient;
	}

	public Date getDateNotification() {
		return dateNotification;
	}

	public void setDateNotification(Date dateNotification) {
		this.dateNotification = dateNotification;
	}

	public String getNotificationDescription() {
		return notificationDescription;
	}

	public void setNotificationDescription(String notificationDescription) {
		this.notificationDescription = notificationDescription;
	}
	
}