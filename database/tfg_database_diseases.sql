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
-- Table structure for table `diseases`
--

DROP TABLE IF EXISTS `diseases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diseases` (
  `id_dis` int NOT NULL AUTO_INCREMENT,
  `disease_name` varchar(200) NOT NULL,
  `disease_description` varchar(5000) NOT NULL,
  PRIMARY KEY (`id_dis`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diseases`
--

LOCK TABLES `diseases` WRITE;
/*!40000 ALTER TABLE `diseases` DISABLE KEYS */;
INSERT INTO `diseases` VALUES (6,'Anemia','Anemia'),(7,'Ansiedad','Ansiedad'),(35,'Cáncer de púlmon','Es el cáncer que comienza en los pulmones. Es el tipo de cáncer más mortífero tanto para hombres como para mujeres. Cada año, mueren más personas de cáncer en el pulmón que de cáncer de mama, de colon y de próstata combinados. El cáncer pulmonar es más común en adultos mayores. Es poco común en personas menores de 45 años.'),(36,'Cataratas','Una catarata es una opacidad del cristalino, normalmente transparente, del ojo. Para las personas que tienen cataratas, ver a través de cristalinos opacos es algo parecido a mirar a través de una ventana escarchada o empañada. La visión nublada que causan las cataratas puede hacer que resulte más difícil leer, conducir un auto (especialmente de noche) o ver la expresión de la cara de un amigo.'),(37,'Diarrea','La diarrea (deposiciones blandas, líquidas y posiblemente más frecuentes) es un problema común.'),(38,'Eccema','El eccema es un proceso descamativo y asociado a picor que afecta a la piel.'),(39,'Faringitis','La faringitis es una afección que cursa con irritación, inflamación o infección de la faringe, y muy particularmente de su tejido linfoide.'),(40,'Gripe','La gripe es una enfermedad infecciosa aguda, que afecta al aparato respiratorio y produce también una serie de síntomas generales característicos. Suele aparecer en brotes u oleadas, varias a lo largo de cada invierno, y es una enfermedad de distribución mundial.'),(41,'Hemorroides','Las hemorroides, también llamadas almorranas, son venas hinchadas en el ano y la parte inferior del recto, similares a las venas varicosas. Las hemorroides pueden desarrollarse dentro del recto (hemorroides internas) o debajo de la piel alrededor del ano (hemorroides externas).'),(42,'Neumonía','La neumonía es una infección del pulmón que puede ser causada por múltiples microorganismos (bacterias, virus y hongos).'),(43,'Otitis','La otitis, como cualquier otro proceso dinámico, se puede clasificar de acuerdo con la secuencia temporal de la enfermedad en aguda (duración de los síntomas entre 0 y 3 semanas), subaguda (de 3 a 12 semanas) y crónica (más de 12 semanas).'),(44,'Migrañás','Las migrañas son un tipo recurrente de dolor de cabeza. Causan dolor de moderado a intenso que puede ser pulsante o vibrante. A menudo, el dolor se siente a un lado de su cabeza. También puede tener otros síntomas, como náuseas y debilidad.'),(45,'Bajón de azúcar','Es una afección que ocurre cuando el azúcar en la sangre del cuerpo (glucosa) disminuye y es demasiado bajo. El azúcar en la sangre por debajo de 70 mg/dL (3.9 mmol/L) se considera bajo. El azúcar sanguíneo a este nivel o por debajo puede ser dañino. El término médico para el azúcar bajo en la sangre es hipoglucemia.');
/*!40000 ALTER TABLE `diseases` ENABLE KEYS */;
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
