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
-- Table structure for table `brandcategory`
--

DROP TABLE IF EXISTS `brandcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brandcategory` (
  `br_cate_id` bigint NOT NULL,
  `br_cate_created` datetime(6) DEFAULT NULL,
  `br_cate_image` varchar(255) DEFAULT NULL,
  `br_cate_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`br_cate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brandcategory`
--

LOCK TABLES `brandcategory` WRITE;
/*!40000 ALTER TABLE `brandcategory` DISABLE KEYS */;
INSERT INTO `brandcategory` VALUES (1,NULL,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/c3158375-6c21-49b4-b551-e6fe1d64f09a-polo.PNG','폴로'),(2,NULL,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/b0a206dd-5e1d-41d0-8f2e-fb501dec2020-raco.PNG','라코스테'),(3,NULL,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/b743c530-0ffc-407d-afc8-7605cb24dde6-bubu.PNG','버버리'),(4,NULL,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/d2e20682-2a70-4191-a763-5288363b26c3-nike.PNG','나이키'),(5,NULL,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/3aaa958d-22a3-471a-bdb6-e4a5cf96007e-tommy.PNG','타미힐피거'),(6,NULL,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/1743988c-bb87-4461-9a00-c1eb46f94d28-etc.PNG','기타 브랜드');
/*!40000 ALTER TABLE `brandcategory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 11:13:05
