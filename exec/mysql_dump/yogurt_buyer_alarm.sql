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
-- Table structure for table `buyer_alarm`
--

DROP TABLE IF EXISTS `buyer_alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buyer_alarm` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `buyer_alarm_created` datetime(6) DEFAULT NULL,
  `buyer_alarm_status` int DEFAULT NULL,
  `buyer_id` bigint DEFAULT NULL,
  `seller_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8t2bka2obbetw5qwxhd9r7w7a` (`buyer_id`),
  KEY `FKouasfu3ggr9nbp93j296piulx` (`seller_id`),
  CONSTRAINT `FK8t2bka2obbetw5qwxhd9r7w7a` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKouasfu3ggr9nbp93j296piulx` FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyer_alarm`
--

LOCK TABLES `buyer_alarm` WRITE;
/*!40000 ALTER TABLE `buyer_alarm` DISABLE KEYS */;
INSERT INTO `buyer_alarm` VALUES (118,'2023-02-16 02:08:32.438000',1,23,17),(119,'2023-02-16 02:08:32.449000',1,20,17);
/*!40000 ALTER TABLE `buyer_alarm` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 11:13:09
