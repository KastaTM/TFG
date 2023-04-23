package com.backend.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.tfg.model.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long>{

	@Query(value ="from Appointment p where id_doctor = ?1 order by id_patient asc")
    List<Appointment> appointmentListByDoctorAscendingId(long id);
	
	@Query(value ="from Appointment p where id_doctor = ?1 order by id_patient desc")
    List<Appointment> appointmentListByDoctorDescendingId(long id);
	
	@Query(value ="from Appointment p where id_doctor = ?1 order by date_appointment desc")
    List<Appointment> appointmentListByDoctorAscendingDate(long id);
	
	@Query(value ="from Appointment p where id_doctor = ?1 order by date_appointment asc")
    List<Appointment> appointmentListByDoctorDescendingDate(long id);
	
	@Modifying
	@Query("delete from Appointment r where id_doctor = ?1")
	void deleteByIdDoctor(Long idDoctor);
	
	@Modifying
	@Query("delete from Appointment r where id_patient = ?1")
	void deleteByIdPatient(Long idPatient);
	
}