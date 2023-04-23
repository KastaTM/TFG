package com.backend.tfg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "medicines")
public class Medicine {

	@Id
	@Column(name = "id_med")
	private long idMedicine;
	
	@Column(name = "medicine_name")
	private String medicineName;
	
	@Column(name = "medicine_description")
	private String medicineDescription;
	
	@Column(name = "medicine_picture")
	private String medicinePicture;
	
	public Medicine() {}
	
	public Medicine(long idMedicine, String name, String desc) {
		super();
		this.idMedicine = idMedicine;
		this.medicineName = name;
		this.medicineDescription = desc;
	}

	public long getIdMedicine() {
		return idMedicine;
	}

	public void setIdMedicine(long idMedicine) {
		this.idMedicine = idMedicine;
	}

	public String getMedicineName() {
		return medicineName;
	}

	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}

	public String getMedicineDescription() {
		return medicineDescription;
	}

	public void setMedicineDescription(String medicineDescription) {
		this.medicineDescription = medicineDescription;
	}

	public String getMedicinePicture() {
		return medicinePicture;
	}

	public void setMedicinePicture(String medicinePicture) {
		this.medicinePicture = medicinePicture;
	} 
	
}