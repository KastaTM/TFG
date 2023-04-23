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
-- Table structure for table `symptoms`
--

DROP TABLE IF EXISTS `symptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `symptoms` (
  `id_sym` int NOT NULL AUTO_INCREMENT,
  `symptom_name` varchar(200) NOT NULL,
  `symptom_description` varchar(5000) NOT NULL,
  PRIMARY KEY (`id_sym`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symptoms`
--

LOCK TABLES `symptoms` WRITE;
/*!40000 ALTER TABLE `symptoms` DISABLE KEYS */;
INSERT INTO `symptoms` VALUES (1,'Fiebre','La fiebre está relacionada habitualmente con la estimulación del sistema inmunitario del organismo, ya que ayuda a combatir a determinados organismos que causan enfermedades.'),(2,'Tos','La tos es la manera que tiene el cuerpo de responder cuando algo irrita la garganta o las vías respiratorias. Un agente irritante estimula los nervios que envían un mensaje al cerebro. Luego, el cerebro les indica a los músculos del pecho y el abdomen que liberen el aire de los pulmones para expulsar al agente irritante.Una tos ocasional es normal y saludable. Sin embargo, una tos persistente durante varias semanas o acompañada de expectoración con mucosidad descolorida o con sangre puede indicar una enfermedad que necesita atención médica. A veces, la tos puede ser muy fuerte. Una tos prolongada y vigorosa puede irritar los pulmones y causar aún más tos. Produce cansancio y puede causar problemas para dormir, mareos o desmayos, dolores de cabeza, incontinencia urinaria, vómitos y hasta costillas rotas. '),(3,'Fatiga','La fatiga es una falta de energía y de motivación. Esta puede ser una respuesta normal e importante al esfuerzo físico, al estrés emocional, al aburrimiento o a la falta de sueño. La fatiga es un síntoma común y por lo regular no se debe a una enfermedad seria. Pero puede ser un signo de un trastorno físico o mental más grave.'),(4,'Dolor de cabeza','Es un dolor o molestia en la cabeza, el cuero cabelludo o el cuello. Las causas graves de los dolores de cabeza son raras. La mayoría de las personas con dolores de cabeza se pueden sentir mucho mejor haciendo cambios en su estilo de vida, aprendiendo formas de relajarse y, algunas veces, tomando medicamentos.'),(6,'Dolor de garganta',''),(7,'Pérdida del olfato',''),(8,'Pérdida del gusto',''),(9,'Dificultad para respirar','La dificultad para respirar puede involucrar:  Respiración difícil,  Respiración incómoda, Sentirse como si no estuviera recibiendo suficiente aire'),(10,'Dolor muscular',''),(11,'Escalofríos',''),(12,'Náuseas',''),(13,'Vómito',''),(14,'Congestión',''),(15,'Dolor en el pecho','El dolor de pecho aparece de muchas formas, desde una punzada intensa hasta un dolor sordo. En ocasiones, se puede sentir como una sensación de opresión o ardor. En otros casos, el dolor se desplaza por el cuello, llega a la mandíbula y luego se propaga a la espalda o por un brazo o ambos.'),(16,'Confusión',''),(18,'Destellos de luz',''),(19,'Agotamiento',''),(20,'Inflamación',''),(21,'Sangrado',''),(22,'Amoratamiento',''),(23,'Estreñimiento',''),(24,'Problemas de audición',''),(25,'Úlceras',''),(26,'Tos con sangre','La tos con sangre procedente del tracto respiratorio se denomina hemoptisis. La cantidad de sangre expulsada puede variar desde unos pocos hilos de sangre mezclada con esputos normales hasta grandes cantidades de sangre pura. Pueden aparecer otros síntomas, como fiebre y dificultad para respirar, en función de la causa de la hemoptisis.'),(27,'Sibilancia','Son un sonido silbante y chillón durante la respiración, que ocurre cuando el aire se desplaza a través de los conductos respiratorios estrechos en los pulmones.'),(34,'Ardor al orinar',''),(35,'Sangre al orinar',''),(36,'Necesidad constante de orinar',''),(37,'Molestias el la zona de la pelvis',''),(38,'Visión nublada',''),(39,'Sensibilidad a la luz',''),(40,'Dificultad para ver durante la noche',''),(41,'Visión doble',''),(42,'Picor',''),(43,'Engrosamiento de la piel',''),(44,'Dolor abdominal',''),(45,'Sangre en las heces',''),(46,'Piel seca',''),(47,'Placas descamativas',''),(48,'Enrojecimiento de la faringe',''),(49,'Malestar',''),(50,'Dolor',''),(51,'Dolor torácico',''),(52,'Dolor de oido',''),(53,'Otorrea','');
/*!40000 ALTER TABLE `symptoms` ENABLE KEYS */;
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
