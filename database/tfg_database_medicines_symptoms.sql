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
-- Table structure for table `medicines_symptoms`
--

DROP TABLE IF EXISTS `medicines_symptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicines_symptoms` (
  `id_ms` int NOT NULL AUTO_INCREMENT,
  `id_medicine` int NOT NULL,
  `id_symptom` int NOT NULL,
  `symptom_name` varchar(200) NOT NULL,
  PRIMARY KEY (`id_ms`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicines_symptoms`
--

LOCK TABLES `medicines_symptoms` WRITE;
/*!40000 ALTER TABLE `medicines_symptoms` DISABLE KEYS */;
INSERT INTO `medicines_symptoms` VALUES (32,17,4,'Dolor de cabeza'),(33,17,1,'Fiebre'),(34,17,2,'Tos'),(35,18,1,'Fiebre'),(36,18,2,'Tos'),(37,18,4,'Dolor de cabeza'),(38,19,15,'Dolor en el pecho'),(39,20,52,'Dolor de oido'),(41,20,44,'Dolor abdominal'),(42,20,4,'Dolor de cabeza'),(43,20,6,'Dolor de garganta'),(44,20,10,'Dolor muscular'),(45,20,51,'Dolor torácico'),(46,21,3,'Fatiga'),(47,21,4,'Dolor de cabeza'),(48,22,52,'Dolor de oido'),(49,22,53,'Otorrea'),(50,23,9,'Dificultad para respirar'),(51,23,39,'Sensibilidad a la luz'),(52,23,18,'Destellos de luz'),(53,24,26,'Tos con sangre'),(54,24,27,'Sibilancia'),(55,25,42,'Picor'),(56,25,43,'Engrosamiento de la piel');
/*!40000 ALTER TABLE `medicines_symptoms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-23 19:49:32
