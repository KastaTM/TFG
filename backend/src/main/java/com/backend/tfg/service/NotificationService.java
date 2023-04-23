package com.backend.tfg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.tfg.model.Notification;
import com.backend.tfg.repository.NotificationRepository;

@Service
public class NotificationService {

	private NotificationRepository notificationRepository;
	
	public NotificationService(NotificationRepository nr) {
		this.notificationRepository = nr;
	}
	
	public List<Notification> notificationListByDoctorAscendingId(long id) {
		return notificationRepository.notificationListByDoctorAscendingId(id);
	}
	
	public List<Notification> notificationListByDoctorDescendingId(long id) {
		return notificationRepository.notificationListByDoctorDescendingId(id);
	}
	
	public List<Notification> notificationListByDoctorAscendingDate(long id) {
		return notificationRepository.notificationListByDoctorAscendingDate(id);
	}
	
	public List<Notification> notificationListByDoctorDescendingDate(long id) {
		return notificationRepository.notificationListByDoctorDescendingDate(id);
	}
	
	public void deleteByIdDoctor(Long idDoctor) {
		notificationRepository.deleteByIdDoctor(idDoctor);
	}
	
	public void deleteByIdPatient(Long idPatient) {
		notificationRepository.deleteByIdPatient(idPatient);
	}
	
	public Notification save(Notification notification) {
		return notificationRepository.save(notification);
	}
	
	public Optional<Notification> findById(Long idNotification) {
		return notificationRepository.findById(idNotification);
	}
	
	public void delete(Notification notification) {
		notificationRepository.delete(notification);
	}
}