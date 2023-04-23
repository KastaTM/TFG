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
import org.springframework.web.bind.annotation.RestController;

import com.backend.tfg.exception.ResourceNotFoundException;
import com.backend.tfg.model.Medicine;
import com.backend.tfg.service.MedicineService;
import com.backend.tfg.service.MedicineSymptomService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class MedicineController {

	private MedicineService medicineService;
	
	private MedicineSymptomService medicineSymptomService;
	
	public MedicineController(MedicineService ms, MedicineSymptomService mss) {
		this.medicineService = ms;
		this.medicineSymptomService = mss;
	}
	
	//Genera una lista con todas los medicamentos
	@GetMapping("/medicines")
	public List<Medicine> getAllMedicines(){
		return medicineService.findAll();
	}
	
	//Obtengo un medicamento en concreto para poder visualizar los detalles de esta
	@GetMapping("/medicines/{idMedicine}")
	public ResponseEntity<Medicine> getMedicineById(@PathVariable Long idMedicine) {
		Medicine medicine = medicineService.findById(idMedicine).orElseThrow(() -> new ResourceNotFoundException("Disease not exist with idDisease :" + idMedicine));
		return ResponseEntity.ok(medicine);
	}
	
	//Obtener los nombres de los medicamentos que hay en la base de datos para comprobar que no se añade un repetido
	@GetMapping("/medicines/nameList")
	public List<String> getMedicineNames(){
		List<Medicine> medicines = medicineService.findAll();
		List<String> ret = new ArrayList<>();
		for(int i = 0; i < medicines.size(); ++i) {
			ret.add(medicines.get(i).getMedicineName());
		}
		return ret;
	}
	
	//Actualizar la información sobre un medicamento
	@PutMapping("/medicines/{idMedicine}")
	public ResponseEntity<Medicine> updateMedicine(@PathVariable Long idMedicine, @RequestBody Medicine medicineDetails){
		Medicine medicine = medicineService.findById(idMedicine).orElseThrow(() -> new ResourceNotFoundException("Disease not exist with idDisease :" + idMedicine));
		medicine.setMedicineName(medicineDetails.getMedicineName());
		medicine.setMedicineDescription(medicineDetails.getMedicineDescription());
		Medicine updatedMedicine = medicineService.save(medicine);
		return ResponseEntity.ok(updatedMedicine);
	}
	
	//Guardo un medicamento en la base de datos
	@PostMapping("/medicines")
	public Medicine createMedicine(@RequestBody Medicine medicine) {
		return medicineService.save(medicine);
	}
	
	//Borrado de un medicamento de la base de datos
	@Transactional
	@DeleteMapping("/medicines/{idMedicine}")
	public ResponseEntity<Map<String, Boolean>> deleteMedicine(@PathVariable Long idMedicine){
		Medicine medicine = medicineService.findById(idMedicine).orElseThrow(() -> new ResourceNotFoundException("Disease not exists with id :" + idMedicine));
		
		//Vamos a borrar todos los síntomas asociados a este medicamento
		medicineSymptomService.deleteByIdMedicine(idMedicine);
		
		//Borro el medicamento
		medicineService.delete(medicine);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}