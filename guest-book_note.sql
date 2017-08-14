CREATE DATABASE  IF NOT EXISTS `guest-book` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `guest-book`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: guest-book
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `text` tinytext,
  `create` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `id_note_user_idx` (`id_user`),
  CONSTRAINT `id_note_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
INSERT INTO `note` VALUES (1,1,'fgh','asd','2017-08-10 17:32:57.260996'),(2,1,'<span>kek</span>','<span>kek</span>','2017-08-10 17:35:23.675658'),(3,1,'uy','','2017-08-10 18:23:50.759795'),(4,1,'uy','','2017-08-10 18:23:50.767300'),(22,1,'длфоавы','выфа ко','2017-08-11 19:26:53.595832'),(23,1,'afda','1324scvnx fdsga','2017-08-11 19:27:39.969760'),(24,1,'wert345','xchsada','2017-08-11 19:27:48.662055'),(25,1,'eaq4yhd','bsadr6tyh','2017-08-11 19:28:48.326822'),(26,1,'eaq4yhd','bsadr6tyh','2017-08-11 19:30:05.492297'),(27,2,'чебурек','сидел\r\n','2017-08-11 19:33:26.351429'),(29,2,'ДРАКДЫПДЖП','дылваролдпртфлд авпфпроыапр','2017-08-11 19:33:44.598605'),(30,2,'цыавыпро','оцуоныап','2017-08-11 19:33:50.488531'),(31,2,'ываптмчмит','ваыаф4к5','2017-08-11 19:33:55.177657'),(32,2,'4уфыаммти','авпвф','2017-08-11 19:33:58.657977'),(33,2,'ываримьтс м','4унфтит  имчс','2017-08-11 19:34:04.861113'),(34,1,'nporasdf','fgsdhgf','2017-08-11 19:44:42.178247'),(35,1,'nporasdf','fgsdhgf','2017-08-11 19:46:01.924958'),(36,1,'nporasdf','fgsdhgf','2017-08-11 19:47:09.851868'),(37,1,'nporasdf','fgsdhgf','2017-08-11 19:47:17.587526');
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-08-14 15:48:01
