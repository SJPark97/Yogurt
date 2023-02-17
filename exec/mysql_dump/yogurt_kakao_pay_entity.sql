-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: i8b204.p.ssafy.io    Database: yogurt
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `kakao_pay_entity`
--

DROP TABLE IF EXISTS `kakao_pay_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kakao_pay_entity` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `total_amount` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `tid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kakao_pay_entity`
--

LOCK TABLES `kakao_pay_entity` WRITE;
/*!40000 ALTER TABLE `kakao_pay_entity` DISABLE KEYS */;
INSERT INTO `kakao_pay_entity` VALUES (94,'50000','','T3ec9ee44a466e29993c'),(95,'20000','ㅋㅋ','T3eca392003e7c9890ba'),(96,'20000','ㅋㅋ','T3eca3994a466e299980'),(97,'90000','','T3ecebf54a466e299b65'),(98,'50000','','T3ecec3f003e7c9892b0'),(99,'45000','','T3ecec6a003e7c9892b1'),(100,'50000','','T3ecfa8c4a466e299bbf'),(101,'42000','','T3ed13aa4a466e299c56'),(102,'15000','','T3ed141a4a466e299c57'),(103,'53000','','T3ed7cb8003e7c98966b'),(104,'20000','경기도 ','T3ed818a4a466e299f5d'),(105,'18000','','T3ed8d6c4a466e29a00a'),(106,'40000','','T3ed8f5d003e7c989777');
/*!40000 ALTER TABLE `kakao_pay_entity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 11:13:07
