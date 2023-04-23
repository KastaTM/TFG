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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.tfg.model.DiseaseMedicine;
import com.backend.tfg.model.DiseasePatient;
import com.backend.tfg.model.Medicine;
import com.backend.tfg.model.MedicineSymptom;
import com.backend.tfg.model.RecordPatient;
import com.backend.tfg.model.RecordSymptom;
import com.backend.tfg.service.DiseaseMedicineService;
import com.backend.tfg.service.DiseasePatientService;
import com.backend.tfg.service.MedicineService;
import com.backend.tfg.service.MedicineSymptomService;
import com.backend.tfg.service.RecordPatientService;
import com.backend.tfg.service.RecordSymptomService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class MedicineSymptomController {

	
	private MedicineSymptomService medicineSymptomService;
	
	private RecordSymptomService recordSymptomService;
	
	private MedicineService medicineService;
	
	private RecordPatientService recordPatientService;
	
	private DiseasePatientService diseasePatientService;
	
	private DiseaseMedicineService diseaseMedicineService;
	
	public MedicineSymptomController(MedicineSymptomService mss, RecordSymptomService rss, MedicineService ms, RecordPatientService rps, DiseasePatientService dps, DiseaseMedicineService dms) {
		this.medicineSymptomService =  mss;
		this.recordSymptomService = rss;
		this.medicineService = ms;
		this.recordPatientService = rps;
		this.diseasePatientService = dps;
		this.diseaseMedicineService = dms;
	}
	
	//Obtener los sintomas correspondientes a un medicamento
	@GetMapping("/medicinesymptoms/{idMedicine}")
	public ResponseEntity<List<MedicineSymptom>> getSymptomsOfMedicine(@PathVariable Long idMedicine) {
		List<MedicineSymptom> medicineSymptom = medicineSymptomService.symptomListByMedicine(idMedicine);
		System.out.printf("%d",medicineSymptom.size());
		return ResponseEntity.ok(medicineSymptom);
	}
	
	//Cuando se quiere añadir un sintoma a un medicamento
	@PostMapping("/medicinesymptoms")
	public MedicineSymptom createSymptomMedicine(@RequestBody MedicineSymptom ms) {
		return medicineSymptomService.save(ms);
	}
	
	//Para borrar un sintoma de un medicamento
	@Transactional
	@DeleteMapping("/medicinesymptoms/{idMedicine}/{idDS}")
	public ResponseEntity<Map<String, Boolean>> deleteSymptomMedicine(@PathVariable Long idMedicine, @PathVariable Long idDS){
		medicineSymptomService.deleteSymptomOfMedicine(idMedicine, idDS);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
	//Aquí se realiza la recomendación de las medicinas más adecuadas según los síntomas presentados
	@GetMapping("/medicinesymptoms/{idRecord}/recommendations")
	public List<Medicine> getRecommendations(@PathVariable Long idRecord){
		List<Medicine> ret = new ArrayList<>();
		List<MedicineSymptom> medicine = new ArrayList<>();
		List<RecordSymptom> recordSymptoms = recordSymptomService.symptomsListByRecord(idRecord);
		
		if(recordSymptoms.size() > 0) { //Solo se realiza si hay sintomas
			Medicine med;
			int cont = 0;
			//Primero obtener la lista de todas las medicinas (Sus ids)
			List<MedicineSymptom> medicinesList = medicineSymptomService.listMedicines();
			for(int i = 0; i < medicinesList.size(); ++i) {
				medicine = medicineSymptomService.symptomListByMedicine(medicinesList.get(i).getIdMedicine());
				//Segundo para esa medicina comprobar hacer la comparativa con los sintomas que busco que cubra
				for(int j = 0; j < medicine.size(); ++j) {
					for(int k = 0; k < recordSymptoms.size(); ++k) {
						if(recordSymptoms.get(k).getIdSymptom() == medicine.get(j).getIdSymptom()) { //Si la medicina cubre uno de los síntomas que presenta el paciente obtiene un punto
							++cont;
						}
					}
					if(cont == recordSymptoms.size()) { //Si la medicina cubre todos los síntomas que presenta el paciente se añade a la lista de recomendados
						med =  medicineService.knowMedicineById(medicine.get(j).getIdMedicine());
						ret.add(med);
						cont = 0;
					}
				}
				cont = 0;
			}
		}
		
		//Con esto tenemos la lista de los medicamentos que cubren estos sintomas
		//Ahora tenemos que ver que esos medicamentos no intefieran con las enfermedades de ese paciente
		
		//1- Conseguir el paciente al que pertenece ese registro
		RecordPatient recordPatient = recordPatientService.recordOfAPatient(recordSymptoms.get(0).getIdRecord());
		//2- Obtener las enfermedades de ese paciente
		List<DiseasePatient> patientDiseaseList = diseasePatientService.diseaseListByPatient(recordPatient.getIdPatient());
		//3- Descartar aquellos medicamentos que contengan alguna de las enfermedades del paciente
		List<Medicine> ret2 = new ArrayList<>();
		int cont2 = 0;
		for(int i = 0; i < ret.size(); ++i) { //Para todas las medicinas recomendadas tras el primer filtro
			List<DiseaseMedicine> dm = diseaseMedicineService.diseaseListByMedicine(ret.get(i).getIdMedicine());
			for(int j = 0; j < dm.size(); ++j) { //Para cada enfermedad que no debemos de poner con ese medicamento
				for(int k = 0; k < patientDiseaseList.size(); ++k) { //Compruebo si algún paciente tiene esa enfermedad
					if(dm.get(j).getIdDisease() == patientDiseaseList.get(k).getIdDisease()) { //Si coinciden la cubre
						cont2++;
					}
				}
			}
			if(cont2 == 0) { //Si no interfiere con ninguna enfermedad del paciente se añade a la lista final
				ret2.add(ret.get(i));
			}
			cont2 = 0;
		}
		return ret2;
	}
	
}