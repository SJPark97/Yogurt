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
-- Table structure for table `typecategory`
--

DROP TABLE IF EXISTS `typecategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `typecategory` (
  `type_cate_id` bigint NOT NULL,
  `type_cate_created` datetime(6) DEFAULT NULL,
  `detail1` bigint DEFAULT NULL,
  `detail1_image` varchar(255) DEFAULT NULL,
  `detail2` bigint DEFAULT NULL,
  `detail2_image` varchar(255) DEFAULT NULL,
  `detail3` bigint DEFAULT NULL,
  `detail3_image` varchar(255) DEFAULT NULL,
  `detail4` bigint DEFAULT NULL,
  `detail4_image` varchar(255) DEFAULT NULL,
  `detail5` bigint DEFAULT NULL,
  `detail5_image` varchar(255) DEFAULT NULL,
  `detail6` bigint DEFAULT NULL,
  `detail6_image` varchar(255) DEFAULT NULL,
  `detail7` bigint DEFAULT NULL,
  `detail7_image` varchar(255) DEFAULT NULL,
  `detail8` bigint DEFAULT NULL,
  `detail8_image` varchar(255) DEFAULT NULL,
  `type_cate_image` varchar(255) DEFAULT NULL,
  `type_cate_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`type_cate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typecategory`
--

LOCK TABLES `typecategory` WRITE;
/*!40000 ALTER TABLE `typecategory` DISABLE KEYS */;
INSERT INTO `typecategory` VALUES (1,NULL,11,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/1134853a-fc98-4d15-a922-b92b930c689a-11.PNG',12,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/ccbed332-69ad-46fc-86dc-50b1edd94e28-12.PNG',13,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/1c969a54-0c10-4e98-a614-f6c48ef06d7c-13.PNG',14,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/a8589046-582a-4fbd-8885-cbd261848bb7-14.PNG',15,NULL,16,NULL,NULL,NULL,NULL,NULL,NULL,'상의'),(2,NULL,21,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/d68c260f-e520-4ad1-82fa-f10430373ef9-21.PNG',22,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/2a12cc75-62fb-4e14-ad2e-c5a599e5446f-22.PNG',23,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/d61db531-3c1b-4838-85a3-e081f9863431-23.PNG',24,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/33794e09-b00d-4722-a337-70c9f420e54e-24.PNG',25,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'아우터'),(3,NULL,31,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/5ca9fb9e-0a0f-4e1f-8d88-e49048ae159e-31.PNG',32,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/5a089ea3-0a0a-4aa5-8cd5-9ef6d2e4ed6d-32.PNG',33,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/1b2ef2cb-dbfd-4613-854e-3d42ef937e19-33.PNG',34,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/af20ceb7-4144-4f92-8a81-1b708cfe0649-34.PNG',35,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/fe0aa773-289d-4763-9966-e5af1c36b3f5-35.PNG',36,NULL,NULL,NULL,NULL,NULL,NULL,'바지'),(4,NULL,41,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/f0c2caef-b147-4eda-8d9d-64f0bd1030fa-41.PNG',42,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/f09ab724-3e99-4258-9da6-65794af1da70-42.PNG',43,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/11666f78-e363-45fa-855b-abaf46487a2a-43.PNG',44,'https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/9e564641-9f83-4fcc-93df-49941a867a83-44.PNG',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'악세사리');
/*!40000 ALTER TABLE `typecategory` ENABLE KEYS */;
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
