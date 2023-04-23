package com.backend.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.backend.tfg.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long>{

	@Query(value ="from Notification p where id_doctor = ?1 order by id_patient asc")
    List<Notification> notificationListByDoctorAscendingId(long id);
	
	@Query(value ="from Notification p where id_doctor = ?1 order by id_patient desc")
    List<Notification> notificationListByDoctorDescendingId(long id);
	
	@Query(value ="from Notification p where id_doctor = ?1 order by date_notification desc")
    List<Notification> notificationListByDoctorAscendingDate(long id);
	
	@Query(value ="from Notification p where id_doctor = ?1 order by date_notification asc")
    List<Notification> notificationListByDoctorDescendingDate(long id);
	
	@Modifying
	@Query("delete from Notification r where id_doctor = ?1")
	void deleteByIdDoctor(Long idDoctor);
	
	@Modifying
	@Query("delete from Notification r where id_patient = ?1")
	void deleteByIdPatient(Long idPatient);
	
}