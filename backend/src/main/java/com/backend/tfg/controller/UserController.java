package com.backend.tfg.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.tfg.exception.ResourceNotFoundException;
import com.backend.tfg.model.Patient;
import com.backend.tfg.model.RecordPatient;
import com.backend.tfg.model.User;
import com.backend.tfg.service.AppointmentService;
import com.backend.tfg.service.NotificationService;
import com.backend.tfg.service.PatientService;
import com.backend.tfg.service.RecordPatientService;
import com.backend.tfg.service.RecordSymptomService;
import com.backend.tfg.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class UserController {

	private UserService userService;
	
	private PatientService patientService;
	
	private RecordPatientService recordPatientService;
	
	private RecordSymptomService recordSymptomService;
	
	private NotificationService notificationService;
	
	private AppointmentService appointmentService;
	
	public UserController(UserService us, PatientService ps, RecordPatientService rps, RecordSymptomService rss, NotificationService ns, AppointmentService as) {
		this.userService = us;
		this.patientService = ps;
		this.recordPatientService = rps;
		this.recordSymptomService = rss;
		this.notificationService = ns;
		this.appointmentService = as;
	}
	
	//Get all users
	@GetMapping("/users")
	public List<User> getAllUsers(){
		return userService.findAll();
	}
	
	//Añade un usuario a la base de datos
	@PostMapping("/users")
	public User createUser(@RequestBody User user) {
		return userService.save(user);
	}
	
	//Obtener un usuario por id, utilizado principalmente en el header y login
	@GetMapping("/users/{userId}")
	public ResponseEntity<User> getUserById(@PathVariable Long userId) {
		User user = userService.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + userId));
		return ResponseEntity.ok(user);
	}
	
	//Obtener una lista de los distintos emails de los usuarios para evitar posibles creaciones de duplicados en la base de datos
	@GetMapping("/users/emailList")
	public List<String> getUsersEmail(){
		List<User> users = userService.findAll();
		List<String> ret = new ArrayList<>();
		for(int i = 0; i < users.size(); ++i) {
			ret.add(users.get(i).getEmail());
		}
		return ret;
	}
	
	//Obtener una lista de los distintos ids de los usuarios para evitar posibles creaciones de duplicados en la base de datos
	@GetMapping("/users/idList")
	public List<Long> getUsersId(){
		List<User> users = userService.findAll();
		List<Long> ret = new ArrayList<>();
		for(int i = 0; i < users.size(); ++i) {
			ret.add(users.get(i).getId());
		}
		return ret;
	}
	
	//Obtener el último usuario añadido para mostrar una notificación con su id de que ha sido añadido
	@GetMapping("/users/lastUser")
	public ResponseEntity<User> getLastUser(){
		User ret;
		
		List<User> users = userService.lastUser();
		ret = users.get(0);
		return ResponseEntity.ok(ret);
	}
	
	//Actualización de los datos del usuario
	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails){
		User user = userService.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
		user.setFirstName(userDetails.getFirstName());
		user.setLastName(userDetails.getLastName());
		user.setEmail(userDetails.getEmail());
		user.setEmail(userDetails.getCity());
		user.setSpecialty(userDetails.getSpecialty());
		user.setWorkplace(userDetails.getWorkplace());
		User updatedUser = userService.save(user);
		return ResponseEntity.ok(updatedUser);
	}
	
	//Actualización de la contraseña del usuario
	@PutMapping("/users/{id}/updatePassword")
	public ResponseEntity<User> updatePassword(@PathVariable Long id, @RequestBody User userDetails){
		User user = userService.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
		user.setPassword(userDetails.getPassword());
		User updatedUser = userService.save(user);
		return ResponseEntity.ok(updatedUser);
	}
	
	//Borrar un usuario de la base de datos y todos los contenidos relacionados con el mismo
	@Transactional
	@DeleteMapping("/users/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id){
		User user = userService.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
		//1 Haz una consulta que te devuelva todos los id de pacientes pertenecientes a un médico
		List<Patient> patient = patientService.patientsListByDoctor(id);
		//2 Recorre esa lista y borra todos los records con esos pacientes
		for(int i = 0; i < patient.size(); ++i) {		
			//Obtengo la lista de registros por paciente
			List<RecordPatient> listRecords = recordPatientService.recordsListByPatient(i);
			
			//Obtengo todos los sintomas del registro de ese paciente
			for(int j = 0; j < listRecords.size(); ++j) {
				//Borro todos los sintomas de un registro para que no quede vacío
				recordSymptomService.deleteByIdRecord(listRecords.get(j).getIdRecord());
			}
			recordPatientService.deleteByIdPatient(patient.get(i).getIdPatient());
		}
		//3 Borra a todos los pacientes que tengan a ese doctor
		patientService.deleteByIdDoctor(id);
		
		//4 Borra todas las notis asignadas a ese doctor
		notificationService.deleteByIdDoctor(id);
		//5 Borra todas las citas asignadas a ese doctor
		appointmentService.deleteByIdDoctor(id);
		//6 Borra al doctor
		userService.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	//Compruebo si el user y contraseña insertados son correctos o no a la hora de logear
	@GetMapping("/login")
	public Long queryUser(@RequestParam Long userId, @RequestParam String password) {
		User user = userService.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + userId));
		System.out.printf("Id: %d\n", user.getId());
		System.out.printf("password: %s\n", user.getPassword());
		System.out.printf("name: %s\n", user.getFirstName());
		if(user.getPassword().equals(password) && user.getId() == userId) {
			return user.getId();
		}	
		return null;
	}
	
}