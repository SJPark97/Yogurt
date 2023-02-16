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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ban_count` bigint DEFAULT NULL,
  `create_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nick_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `update_date` datetime(6) DEFAULT NULL,
  `user_id` varchar(255) NOT NULL,
  `user_status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (17,0,'2023-02-15 07:01:32.560000','입을 수 있는 옷만 판매합니다\n,후기 최고 재구매율 1등 맛집 ?❕','hizzu@naver.com','최첨단','365샵','$2a$10$E43T4n26wJksfnG802LHfe32Pl1Dp3p.l4vM7CyNeUE2dz0VsxJam','01011112222','https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/2131718f-e513-4277-8779-b1168b228c81-%EB%B9%88%ED%8B%B0%EC%A7%80%EC%83%B5.JPG','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9TRUxMRVIiLCJ1c2VySWQiOiJoaXp6dSIsImV4cCI6MTY3Njc3MjM3Nn0.vEn4Ig_2NMRmtG_e3iKW3ncCt328_yvERFOjGjMSVDo','ROLE_SELLER','2023-02-15 07:01:32.560000','hizzu','ACTIVE'),(18,0,'2023-02-15 07:14:51.963000','전부 만원 빈티지샵(all manwon)','allman@naver.com','알간지','allman_v','$2a$10$pfehzvhSQ/lgpt6l9jqq1eeSPLIZYVJhN0H1ufyK27vuyq4ItDsXq','01011112222','https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/252a6730-582a-46f7-888f-ea28769eba54-%EC%98%AC%EB%A7%A8.JPG','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9TRUxMRVIiLCJ1c2VySWQiOiJhbGxtYW4iLCJleHAiOjE2NzY3MDQ0MjB9.aZA1Nyi0a4Vt-vXGKljV4T3gC-sU7hg1rf7M2wn7I9E','ROLE_SELLER','2023-02-15 07:14:51.963000','allman','ACTIVE'),(19,0,'2023-02-15 07:31:26.926000','구제 빈티지샵 빈도리???\n빈티지 스토어','dory@naver.com','빈도리','dory','$2a$10$jwrCyw1WlZpx1tXjlzwiy.tEYU4uGX/uMZq2ADgKilLw4Ig7dlwvO','01011112222','https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/d72dfa0b-3084-4954-9c1b-8c174f94002a-%EB%B9%88%EB%8F%84%EB%A6%AC.JPG','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9TRUxMRVIiLCJ1c2VySWQiOiJkb3J5IiwiZXhwIjoxNjc2NzA1NDM0fQ.4ysZGWggFxqeiPiOzojwDWTGV8BNBdj5iesfz3T2_Og','ROLE_SELLER','2023-02-15 07:31:26.926000','dory','ACTIVE'),(20,0,'2023-02-15 07:54:25.164000','뉴리턴 : 온라인 구제 빈티지샵\n? 온라인 뉴리턴 빈티지샵','return@google.com','뉴리턴','Nreturn','$2a$10$xYjQXwAVmKfI759puArjMeuuSC2.9mH4T9wCpGHlZEQVUEYtHCgXG','01011112222','https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/3fc1b108-90c0-4cc0-97f5-79d54e468399-%EB%89%B4%EB%A6%AC%ED%84%B4.JPG','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9TRUxMRVIiLCJ1c2VySWQiOiJuZXdyZXR1cm4iLCJleHAiOjE2NzY3MTAxNTh9.8_V0BTud13OZDZNa4H9np3dWlMdgNsGeJmgStYlj54M','ROLE_SELLER','2023-02-15 07:54:25.164000','newreturn','ACTIVE'),(21,0,'2023-02-15 08:05:52.205000','•‍ 구매 가능 상품??#노빠꾸구매가능 최근게시물\n• 전상품 무료배송(제주 및 도서산간 +3,000)','nopa@naver.com','노빠꾸','nopaku','$2a$10$2QYffkYT1F3n041Z1s8KQ.jqpZ5PvVt/EH6VGVPI16v0OPIJp/SSe','01011112222','https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/aa29026c-79a5-4318-90e1-b7225c29beeb-%EC%BA%A1%EC%B2%98.JPG','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9TRUxMRVIiLCJ1c2VySWQiOiJub3Bha3UiLCJleHAiOjE2NzY3MDc1Mjd9.nltOB3z6nFkcLIQP6zfOI_L2iGj9k4q_rI1SgDh3kYg','ROLE_SELLER','2023-02-15 08:05:52.205000','nopaku','ACTIVE'),(22,0,'2023-02-15 14:53:47.572000',NULL,'cjsdks518@naver.com','송은지','웅쟈','$2a$10$/HHN.ADfTJJooo8Nj7Jwhu1FLg2lGtYQSqSlZH4axQUHdyTnI6XDa','01011112222',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9CVVlFUiIsInVzZXJJZCI6InVuZ2phIiwiZXhwIjoxNjc2NzY1ODYzfQ.evtNz-Dwk-LKMFdjJxEwphHi_LXxFJd2lHlQHqALp4g','ROLE_BUYER','2023-02-15 14:53:47.572000','ungja','ACTIVE'),(23,0,'2023-02-16 00:12:24.693000',NULL,'cjsdks518@naver.com','길상욱','상욱임돠','$2a$10$Qp72ON6cdVpv9R/hpEFqa.hqu0ubIG4zEaHzNObHovtBA5mp//uMe','01011112222','https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/685e1cc5-8d28-4a55-a006-fa7cf9bedf62-1676506337695.png','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9CVVlFUiIsInVzZXJJZCI6InNhbmd1ayIsImV4cCI6MTY3Njc2NzI3MX0.8PaKlnwoVTqZeEvxJKQNFGT8gbIEBb1lKsDwtNfbkGM','ROLE_BUYER','2023-02-16 00:12:24.693000','sanguk','ACTIVE'),(24,0,'2023-02-15 17:19:00.119000',NULL,'dsdsddcc@gmail.com','testname','test','$2a$10$HgluC5.VaRAzWcKAxflsMuoVDltkKaTyy8EtJAoKGKPQYStbE7QKu','01011112222',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9CVVlFUiIsInVzZXJJZCI6InRlc3QiLCJleHAiOjE2NzY3NDA3NDV9.soIDHJPCWBpy3iSH_bE8XLkX6-62CoThnz_f4OVgctI','ROLE_BUYER','2023-02-15 17:19:00.119000','test','ACTIVE'),(25,0,'2023-02-16 00:11:37.524000',NULL,'aaa@naver.com','성현','멋쟁이토마토','$2a$10$I1SnrjB0lbh95Sy0VHIbSO.lrbLELPbTkJFxUD1BFXIMGtNqMziNu','01011112222','https://yogurt-bucket.s3.ap-northeast-2.amazonaws.com/49d3e811-6309-4364-aab4-6661266222cb-%ED%86%A0%EB%A7%88%ED%86%A0.png','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9CVVlFUiIsInVzZXJJZCI6ImFhYSIsImV4cCI6MTY3Njc2NTQ2MH0.q-v0Gz77zHgbHqbZ2eMAmOC2y6PLfBaZiB8KrRHZRQo','ROLE_BUYER','2023-02-16 00:11:37.524000','aaa','ACTIVE');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
