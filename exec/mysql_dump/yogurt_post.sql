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
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` bigint NOT NULL AUTO_INCREMENT,
  `post_content` varchar(255) DEFAULT NULL,
  `detail_category` bigint DEFAULT NULL,
  `post_price` bigint DEFAULT NULL,
  `post_sale_price` bigint DEFAULT NULL,
  `post_size` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `post_title` varchar(255) DEFAULT NULL,
  `br_cate_id` bigint DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  `seller_id` bigint DEFAULT NULL,
  `type_cate_id` bigint DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `FKpspfmd8kt91uf4vgxkes2x91y` (`br_cate_id`),
  KEY `FKoh74wkqlr4edj4t00qi3a1a7g` (`id`),
  KEY `FK50jwnhnyevk2kxvt29cetcg9h` (`seller_id`),
  KEY `FKh8vgb6lp09ljq0r7g079p0jy7` (`type_cate_id`),
  CONSTRAINT `FK50jwnhnyevk2kxvt29cetcg9h` FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKh8vgb6lp09ljq0r7g079p0jy7` FOREIGN KEY (`type_cate_id`) REFERENCES `typecategory` (`type_cate_id`),
  CONSTRAINT `FKoh74wkqlr4edj4t00qi3a1a7g` FOREIGN KEY (`id`) REFERENCES `end_post` (`id`),
  CONSTRAINT `FKpspfmd8kt91uf4vgxkes2x91y` FOREIGN KEY (`br_cate_id`) REFERENCES `brandcategory` (`br_cate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (24,'마르지엘라 블랙 니트집업\n⚑ Price 12.5\n⚑ 컨디션 좋아요❕',21,150000,125000,'⚑ Size 총장 71 가슴 62\n(100-110 추천✔️)','STATUS_LIVE_SOON','마르지엘라 블랙 니트집업',6,NULL,17,2),(25,'⚑ Price 7.5\n\n⚑ 컨디션 좋아요❕',12,75000,50000,'⚑ Size 총장 72 가슴 59 어깨 55','STATUS_END','아페쎄 멜란지 맨투맨',6,NULL,17,1),(26,'⚑ Price 4.0\n\n⚑ 컨디션 좋아요❕\n',13,60000,40000,'⚑ Size 총장 66 가슴 55','STATUS_LIVE_SOON','라코스테 황토색 니트',2,NULL,17,1),(27,'⚑ Price 4.0\n\n⚑ 하자나 이염없이 상태 좋아요❕',14,70000,40000,'⚑ Size(실측) 총장 77 가슴 55 어깨 47','STATUS_LIVE_SOON','타미힐피거 스트라이프 셔츠',5,NULL,17,1),(28,'⚑ Price 6.0\n\n⚑ 상태 좋아요❕',14,80000,60000,'⚑ Size(실측) 총장 75 가슴 52 어깨 45','STATUS_LIVE_SOON','버버리 체크셔츠',3,NULL,17,1),(29,'✨ 상태 : 8.5/10\n-\n✨ 모든 상품의 이상유무는 사진에 첨부됩니다.\n-\n✨착샷문의 및 사이즈 문의는 받지 않습니다. (사이즈 cm표기)',21,20000,10000,'✨ 사이즈 : L 어깨 52 가슴 62 총장 66','STATUS_SELL','아디다스 후드티(기모O)',6,NULL,18,2),(30,'✨ 상태 : 8.5/10\n-\n✨ 모든 상품의 이상유무는 사진에 첨부됩니다.\n-\n✨착샷문의 및 사이즈 문의는 받지 않습니다. (사이즈 cm표기)',11,20000,10000,'✨ 사이즈 : L 어깨 50 가슴 60 총장 70','STATUS_SELL','타미힐피거 박스로고 반팔티',5,NULL,18,1),(31,'✨ 상태 : 8/10\n-\n✨ 모든 상품의 이상유무는 사진에 첨부됩니다.',33,40000,19000,'✨ 사이즈 : L 허리 허리끈O 허벅지 34 총장 10','STATUS_SELL','폴로 코튼 조거팬츠',1,NULL,18,3),(32,'✨ 상태 : 9/10(오염X)\n-\n✨ 모든 상품의 이상유무는 사진에 첨부됩니다',33,40000,19000,'✨ 사이즈 : L 허리 밴딩 허벅지 32 총장 100','STATUS_SELL','나이키 나일론 집업 트랙팬츠',4,NULL,18,3),(33,'✨ 상태 : 9/10\n-\n✨ 모든 상품의 이상유무는 사진에 첨부됩니다.',31,30000,15000,'✨ 사이즈 : M 허리 37.5 밑위 20 허벅지 27 밑단 15.5 총장 92','STATUS_SELL','디즈니 패치워크 데님 팬츠',6,NULL,18,3),(34,'✨ 상태 : 8.5/10\n-\n✨ 모든 상품의 이상유무는 사진에 첨부됩니다.',22,30000,15000,'✨ 사이즈 : M 어깨 48 가슴 62 총장 70','STATUS_SELL',' 나이키 올드스쿨 누빔자켓',4,NULL,18,2),(35,'✨ 모든 상품의 이상유무는 사진에 첨부됩니다.\n-\n✨착샷문의 및 사이즈 문의는 받지 않습니다. (사이즈 cm표기)',44,30000,15000,'✨ 사이즈 : 57cm','STATUS_SELL','아디다스 버킷햇',6,NULL,18,4),(36,'?제품 상태 : 10점 만점에 9점\n?특이사항 : 연식 대비 상태가 좋음.',15,40000,20000,'?사이즈 : XL\n▶️전체 길이 71cm\n▶️소매 길이 22cm\n▶️어깨 너비 45cm\n▶️가슴 단면 54cm','STATUS_SELL','폴로 랄프로렌 반팔 카라티 스트라이프',1,NULL,19,1),(37,'?제품 상태 : 10점 만점에 8.5점\n?특이사항 : 상태 양호.',24,40000,20000,'▶️전체 길이 75cm\n▶️소매 길이 62cm\n▶️어깨 너비 49cm\n▶️가슴 단면 54cm','STATUS_SELL','나이키 점퍼 블랙',5,NULL,19,2),(38,'?제품 상태 : 10점 만점에 9.5점\n?특이사항 : 상태 좋음.',14,40000,20000,'?사이즈 : XS\n▶️전체 길이 80cm\n▶️소매 길이 56cm\n▶️어깨 너비 40cm\n▶️가슴 단면 42cm','STATUS_SELL','타미힐피거 롱셔츠 체크',5,NULL,19,1),(41,'Color - 블루',21,50000,25000,'어깨 - 45cm\n가슴 - 52cm\n팔 - 69cm\n총장 - 65cm','STATUS_SELL','공용 (M) 타미힐피거 빈티지 후드집업',5,NULL,20,2),(42,'Color - 블루\nPrice - ₩ 15,000',14,40000,15000,'어깨 - 38cm\n가슴 - 42cm\n팔 - 16cm\n총장 - 61cm','STATUS_SELL','여성 (S) 폴로랄프로렌 스키니핏 카라티',1,NULL,20,1),(43,'Color - 블랙\nPrice - ₩ 13,000',23,28000,13000,'어깨 - 40cm\n가슴 - 52cm\n팔 - 63cm\n총장 - 61cm','STATUS_SELL','여성 (M) 빈티지 트위드 집업 가디건',6,NULL,20,2),(44,'Color - 베이지\nPrice - ₩ 30,000',22,70000,30000,'어깨 - 39cm\n가슴 - 46cm\n팔 - 55cm\n총장 - 84cm','STATUS_SELL','여성 (L) THE RYAN 무스탕 코트',6,NULL,20,2),(45,'Color - 레드\nPrice - 50000',22,89000,50000,'어깨 - 45cm\n가슴 - 50cm\n팔 - 63cm\n총장 - 66cm','STATUS_SELL','공용 (3Size) 라코스테 빅카라 스타디움 점퍼',2,NULL,20,2),(46,'comment. 상태 좋고 깔끔!!',24,75000,45000,'표기 : 보이즈XL / 실측 : 100(여)\n어깨 42 / 가슴 52 / 기장 68(단위 cm)','STATUS_SELL','나이키 아스널 바람막이',4,NULL,21,2),(47,'comment. 상태 좋고 깔끔!!',22,79000,59003,'표기 : L / 실측 : 110(남여공용)\n어깨 54 / 가슴 64 / 기장 70(단위 cm)','STATUS_SELL','타미힐피거 올드스쿨 누빔점퍼',5,NULL,21,2),(48,'comment. 상태 좋고 깔끔!!',21,89000,69000,'표기 : M / 실측 : 95(남여공용)\n어깨 46 / 가슴 56 / 기장 65(단위 cm)','STATUS_SELL','폴로 후드집업',1,NULL,21,2),(49,'comment. 상태 좋고 깔끔!!',21,69000,42000,'표기 : 보이즈XL / 실측 : 90(남여공용)\n어깨 44 / 가슴 54 / 기장 66(단위 cm)','STATUS_SELL','폴로 빅로고 후드집업',1,NULL,21,2),(50,'comment. 상태 좋고 깔끔!!',33,78000,42000,'표기 : L (남여공용)\n허리 38 / 밑위 38 / 허벅지 33 / 밑단 20 / 기장 102(단위 cm)','STATUS_SELL','아디다스 트랙팬츠',6,NULL,21,3),(51,'\ncomment. 상태 좋고 깔끔!!',33,68000,45000,'표기 : 90 (여)\n허리 36 / 밑위 28 / 허벅지 29 / 밑단 22 / 기장 98(단위 cm)','STATUS_SELL','아디다스 트랙팬츠',6,NULL,21,3),(52,'Color - 브라운\nPrice - ₩ 44,000',24,78000,44000,'어깨 - 39cm\n가슴 - 45cm\n팔 - 58cm\n총장 - 86cm','STATUS_SELL','여성 (M) CERENCIA 울 캐시미어 떡복이코트',6,NULL,20,2),(53,'Color - 레드\nPrice - ₩ 18,000',21,36000,18000,'어깨 - 45cm\n가슴 - 47cm\n팔 - 60cm\n총장 - 62cm','STATUS_SELL','공용 (F) LE COQ SPORTIF 기모 집업',6,NULL,20,2);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 11:13:06
