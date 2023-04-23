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
-- Table structure for table `records_symptoms`
--

DROP TABLE IF EXISTS `records_symptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `records_symptoms` (
  `id_rs` int NOT NULL AUTO_INCREMENT,
  `id_record` int NOT NULL,
  `id_symptom` int NOT NULL,
  `symptom_name` varchar(200) NOT NULL,
  PRIMARY KEY (`id_rs`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `records_symptoms`
--

LOCK TABLES `records_symptoms` WRITE;
/*!40000 ALTER TABLE `records_symptoms` DISABLE KEYS */;
INSERT INTO `records_symptoms` VALUES (1,0,3,'Fatiga'),(2,0,2,'Tos'),(3,3,2,'Tos'),(4,13,2,'Tos'),(6,3,4,'Dolor de cabeza'),(7,3,7,'Pérdida del olfato'),(8,4,2,'Tos'),(9,4,7,'Pérdida del olfato'),(19,11,3,'Fatiga'),(32,13,4,'Dolor de cabeza'),(42,24,1,'Fiebre'),(43,24,2,'Tos'),(46,33,4,'Dolor de cabeza'),(47,33,3,'Fatiga'),(49,34,2,'Tos'),(51,35,1,'Fiebre'),(52,35,2,'Tos'),(53,35,4,'Dolor de cabeza'),(54,34,1,'Fiebre'),(55,34,4,'Dolor de cabeza'),(56,36,2,'Tos'),(57,36,1,'Fiebre'),(58,36,4,'Dolor de cabeza'),(59,37,4,'Dolor de cabeza'),(60,37,1,'Fiebre'),(61,38,3,'Fatiga'),(62,38,4,'Dolor de cabeza'),(63,39,3,'Fatiga'),(64,39,4,'Dolor de cabeza'),(65,40,53,'Otorrea'),(66,40,52,'Dolor de oido'),(67,41,2,'Tos'),(68,41,3,'Fatiga');
/*!40000 ALTER TABLE `records_symptoms` ENABLE KEYS */;
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
