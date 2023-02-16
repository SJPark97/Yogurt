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
-- Table structure for table `live_room`
--

DROP TABLE IF EXISTS `live_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `live_room` (
  `liveroom_id` bigint NOT NULL AUTO_INCREMENT,
  `liveroom_created` datetime(6) DEFAULT NULL,
  `liveroom_status` int DEFAULT NULL,
  `liveroom_thumbnail` varchar(255) DEFAULT NULL,
  `liveroom_time` datetime(6) DEFAULT NULL,
  `liveroom_title` varchar(255) DEFAULT NULL,
  `seller_id` bigint DEFAULT NULL,
  PRIMARY KEY (`liveroom_id`),
  KEY `FKb7jo2hn0dvvqjce52v53okfgx` (`seller_id`),
  CONSTRAINT `FKb7jo2hn0dvvqjce52v53okfgx` FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `live_room`
--

LOCK TABLES `live_room` WRITE;
/*!40000 ALTER TABLE `live_room` DISABLE KEYS */;
INSERT INTO `live_room` VALUES (32,'2023-02-15 17:19:48.284000',2,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/2920bd73-c12f-45f4-bd0e-571ed8d09f51-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EC%8B%9C%EC%9E%91.JPG','2023-02-18 07:10:00.000000','금요일 라이브 시작할게요!',21),(33,'2023-02-16 11:08:32.310000',0,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/a1ca78c0-25ce-4329-8815-d7a6c178b4f1-c10ba956-fe8c-4e1b-af23-03e32bfb8143-b6239582-faff-4d08-ae48-03776c4f1ea1-cat%20%281%29.PNG','2023-02-16 20:08:00.000000','sdfsdf',17);
/*!40000 ALTER TABLE `live_room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 11:13:04
