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
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id_patient` int NOT NULL,
  `id_doctor` int NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `birthday` date NOT NULL,
  `patient_picture` varchar(5000) NOT NULL,
  PRIMARY KEY (`id_patient`),
  KEY `id_doctor` (`id_doctor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (34,282602654,'Iker','Casillas','iker@gmail.com','2022-11-06',''),(18227851,282823532,'Enrique','Valverde Alcaraz','enrival@gmail.com','1978-03-13','https://media.gettyimages.com/id/609695986/es/foto/jubilaci%C3%B3n-te-la-has-ganado-ahora-disfr%C3%BAtalo.jpg?s=612x612&w=0&k=20&c=gWhc3mR67HkNX3xIKkB1U0_xps43KtrcddhgdNDJIpY='),(19749765,282602654,'Carlota','Pardo Jiménez','carlopaji@gmail.com','2001-04-09','https://media.gettyimages.com/id/1159600049/es/foto/retrato-de-una-adolescente.jpg?s=170x170&k=20&c=I2XZV-VglS9Zrau_3vn5r6t-KML4KgVwpajGvrHax_U='),(25430251,282602654,'Daniel','Rivas Villar','danixrivas11@gmail.com','1998-08-22','https://media.licdn.com/dms/image/C5603AQGU9HE--9ZEhA/profile-displayphoto-shrink_800_800/0/1619682754281?e=2147483647&v=beta&t=jHRqjZRsd-vGUjST08Yf9ZJQqw9cOwJjSqwGY4pTSPQ'),(28788463,282602654,'Marco','Asensio Willemsen','marcoase@gmail.com','1996-01-21','https://img.a.transfermarkt.technology/portrait/big/296622-1664970818.jpg?lm=1'),(45678901,282602654,'Alicia','Requena Gómez','alirequenago@gmail.com','1988-11-07','https://media.gettyimages.com/id/543148595/es/foto/head-and-shoulders-portrait.jpg?s=612x612&w=0&k=20&c=DEimajplS1p5AFdv25edS9ilXr2-VKPwgXz-E6i5VZU='),(52581250,282823532,'Dolores','Reigosa Flores','dolo@gamil.com','1953-05-26','https://media.gettyimages.com/id/1190822971/es/foto/portrait-senior-black-woman-at-family-cookout.jpg?s=612x612&w=0&k=20&c=uwJ_py1qwIfzmWrn-T1XYv3z9HLkeCFmqTAvkE3ysm4='),(52865447,282602654,'Rosario','Pérez Garrido','rosape@gmail.com','1973-08-15','https://media.gettyimages.com/id/84040649/es/foto/portrait-of-senior-lady.jpg?s=612x612&w=0&k=20&c=LHkvNeGhIMJXLTGZT_ITwqsS3Gr0KO2tpVSeFqBkntA='),(59432981,282602654,'Miguel','González Álvarez','miguelmuros@gmail.com','1999-03-01','https://media.licdn.com/dms/image/D4D03AQFK32TIXUtrnQ/profile-displayphoto-shrink_800_800/0/1681492686565?e=2147483647&v=beta&t=cP7zYlkZIMVlAzTcZUNIbK7aXiAGcJrvw1F8D-6NiUY');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
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
