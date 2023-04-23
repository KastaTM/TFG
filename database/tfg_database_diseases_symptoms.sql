-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: tfg_database
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `diseases_symptoms`
--

DROP TABLE IF EXISTS `diseases_symptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diseases_symptoms` (
  `id_ds` int NOT NULL AUTO_INCREMENT,
  `id_disease` int NOT NULL,
  `id_symptom` int NOT NULL,
  `symptom_name` varchar(200) NOT NULL,
  PRIMARY KEY (`id_ds`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diseases_symptoms`
--

LOCK TABLES `diseases_symptoms` WRITE;
/*!40000 ALTER TABLE `diseases_symptoms` DISABLE KEYS */;
INSERT INTO `diseases_symptoms` VALUES (26,35,26,'Tos con sangre'),(27,35,27,'Sibilancia'),(28,35,3,'Fatiga'),(29,35,9,'Dificultad para respirar'),(30,35,15,'Dolor en el pecho'),(31,36,38,'Visión nublada'),(32,36,39,'Sensibilidad a la luz'),(33,36,40,'Dificultad para ver durante la noche'),(34,36,41,'Visión doble'),(35,37,1,'Fiebre'),(36,37,13,'Vómito'),(37,37,44,'Dolor abdominal'),(38,37,45,'Sangre en las heces'),(39,38,46,'Piel seca'),(40,38,47,'Placas descamativas'),(41,38,42,'Picor'),(42,39,1,'Fiebre'),(43,39,6,'Dolor de garganta'),(44,39,49,'Malestar'),(45,40,4,'Dolor de cabeza'),(46,40,1,'Fiebre'),(47,40,49,'Malestar'),(48,40,10,'Dolor muscular'),(49,41,45,'Sangre en las heces'),(50,41,50,'Dolor'),(51,42,2,'Tos'),(52,42,51,'Dolor torácico'),(53,42,11,'Escalofríos'),(54,42,1,'Fiebre'),(55,43,52,'Dolor de oido'),(56,43,53,'Otorrea'),(57,43,1,'Fiebre'),(58,44,1,'Fiebre'),(59,44,2,'Tos'),(60,44,4,'Dolor de cabeza'),(61,45,3,'Fatiga'),(62,45,4,'Dolor de cabeza');
/*!40000 ALTER TABLE `diseases_symptoms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-23 19:49:33
