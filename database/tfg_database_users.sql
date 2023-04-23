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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `user_picture` varchar(5000) NOT NULL,
  `city` varchar(200) NOT NULL,
  `specialty` varchar(200) NOT NULL,
  `workplace` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0,'admin','admin','admintfg@gmail.com','U2FsdGVkX19fj9JCgJahWg6PohyucgMDm1QTsk08Ym0=','https://icons.veryicon.com/png/o/miscellaneous/yuanql/icon-admin.png','admin','admin','admin'),(282602654,'Ana','Amaro Alonso','ana@gmail.com','U2FsdGVkX1/aRhwTT/S5PWi/oEWluAPt4K5d8WvNhLE=','https://media.istockphoto.com/id/1089633230/photo/glasses-girl-in-white.jpg?s=612x612&w=0&k=20&c=qtq-7I75UA_ViQdi0GWbaGnLUYjHIRBJE3ry1v5T-TA=','Madrid','Pediatra','Hospital 12 de Octubre'),(282823532,'Eduardo','Campanos Martínez','educampanos@gmail.com','U2FsdGVkX1/MOFiKLl5v1MjJA/bPz/DSTvbQbWXWa+Y=','https://media.gettyimages.com/id/1314489757/es/foto/smiling-hispanic-man-against-white-background.jpg?s=170x170&k=20&c=D0Bl3BQtPeXTKmUhstc8wDlfTVywwr0o-62cRNdc2NU=','Oviedo','Médico de Cabecera','HUCA (Hospital Universitario Central de Asturias)');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
