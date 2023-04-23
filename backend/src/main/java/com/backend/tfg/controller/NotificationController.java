package com.backend.tfg.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.tfg.exception.ResourceNotFoundException;
import com.backend.tfg.model.Notification;
import com.backend.tfg.service.NotificationService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class NotificationController {
	
	
	private NotificationService notificationService;
	
	public NotificationController(NotificationService ns) {
		this.notificationService = ns;
	}
	
	//Añade una nueva notificación a la base de datos
	@PostMapping("/notifications")
	public Notification createNotification(@RequestBody Notification notification) {
		return notificationService.save(notification);
	}
	
	//Borra una notificación de la base de datos
	@DeleteMapping("/notifications/{idNotification}")
	public ResponseEntity<Map<String, Boolean>> deleteNotification(@PathVariable Long idNotification){
		Notification notification = notificationService.findById(idNotification).orElseThrow(() -> new ResourceNotFoundException("Notification not exists with id :" + idNotification));
		notificationService.delete(notification);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	//Obtiene una lista de todas las notificaciones asociadas a un doctor ordenadas según diferentes criterios
	@GetMapping("/notifications/{idDoctor}/{order}")
	public ResponseEntity<List<Notification>> getNotificationsOfDoctor(@PathVariable Long idDoctor, @PathVariable String order) {
		List<Notification> notification = new ArrayList<>();
		if(order.equals("id(increasing)")) {
			notification = notificationService.notificationListByDoctorAscendingId(idDoctor);
		}
		else if(order.equals("id(decreasing)")) {
			notification = notificationService.notificationListByDoctorDescendingId(idDoctor);
		}
		else if(order.equals("date(increasing)")) {
			notification = notificationService.notificationListByDoctorAscendingDate(idDoctor);
		}
		else {
			notification = notificationService.notificationListByDoctorDescendingDate(idDoctor);
		}
		return ResponseEntity.ok(notification);
	}
	
	//Obtener una notificación para así poder observar sus detalles
	@GetMapping("/notifications/{idNotification}/view")
	public ResponseEntity<Notification> getNotificationById(@PathVariable Long idNotification) {
		Notification notification = notificationService.findById(idNotification).orElseThrow(() -> new ResourceNotFoundException("Notification not exist with idPatient :" + idNotification));
		return ResponseEntity.ok(notification);
	}

}