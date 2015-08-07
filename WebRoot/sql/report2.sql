/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : report

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2014-12-29 00:13:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tm_pay
-- ----------------------------
DROP TABLE IF EXISTS `tm_pay`;
CREATE TABLE `tm_pay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `money` float(10,3) NOT NULL COMMENT '消费的金额',
  `description` varchar(1000) DEFAULT NULL COMMENT '消费的描述',
  `user_id` int(50) DEFAULT NULL COMMENT '消费者',
  `type_id` int(11) DEFAULT NULL COMMENT '消费类型',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '消费的时间',
  `updatetime` datetime DEFAULT NULL,
  `is_delete` int(1) DEFAULT NULL COMMENT '0未删除1已删除',
  `status` int(1) DEFAULT NULL COMMENT '状态0未发布1发布',
  `address` varchar(255) DEFAULT NULL COMMENT '消费的地点',
  `attchment` varchar(255) DEFAULT NULL COMMENT '交易证明和数据 ',
  `mark` int(1) DEFAULT NULL COMMENT '大金额如果超过1000mark=1否则0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `tm_pay_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tm_user` (`id`),
  CONSTRAINT `tm_pay_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `tm_pay_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tm_pay
-- ----------------------------

-- ----------------------------
-- Table structure for tm_pay_category
-- ----------------------------
DROP TABLE IF EXISTS `tm_pay_category`;
CREATE TABLE `tm_pay_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(50) NOT NULL COMMENT '支付的类型',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tm_pay_category
-- ----------------------------

-- ----------------------------
-- Table structure for tm_profit
-- ----------------------------
DROP TABLE IF EXISTS `tm_profit`;
CREATE TABLE `tm_profit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `money` float(10,3) DEFAULT NULL COMMENT '收入的金额',
  `description` varchar(500) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT NULL,
  `is_delete` int(1) DEFAULT NULL COMMENT '0未删除1删除',
  `status` int(1) DEFAULT NULL COMMENT '0未发布1发布',
  `type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `type_id` (`type_id`),
  KEY `money_index` (`money`),
  CONSTRAINT `tm_profit_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tm_user` (`id`),
  CONSTRAINT `tm_profit_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `tm_profit_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tm_profit
-- ----------------------------
INSERT INTO `tm_profit` VALUES ('29', '1000.000', '', '1', '2014-11-28 01:37:47', '2014-12-28 01:37:58', '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('30', '200.000', '', '1', '2014-10-28 01:37:47', '2014-12-28 01:37:58', '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('31', '89.000', '', '1', '2014-09-28 01:37:47', '2014-12-28 01:37:58', '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('42', '25.000', '2222', '1', '2014-12-28 01:42:11', '2014-12-28 01:37:58', '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('43', '56.000', '4444432423423423423423', '1', '2014-12-28 01:57:11', '2014-12-28 01:37:58', '0', '1', '5');
INSERT INTO `tm_profit` VALUES ('44', '56.000', '4444432423423423423423', '1', '2014-04-28 01:57:11', '2014-12-28 01:37:58', '1', '1', '5');
INSERT INTO `tm_profit` VALUES ('45', '500.000', '到发士大夫', '1', '2014-03-28 22:43:03', null, '1', '1', '5');
INSERT INTO `tm_profit` VALUES ('46', '25000.000', '第三方士大夫', '1', '2014-02-28 22:43:12', null, '1', '1', '1');
INSERT INTO `tm_profit` VALUES ('47', '33333.000', '33333', '1', '2014-01-28 22:45:14', null, '1', '1', '3');
INSERT INTO `tm_profit` VALUES ('48', '5600.000', '随碟附送大', '1', '2014-12-28 23:21:59', null, '1', '1', '6');
INSERT INTO `tm_profit` VALUES ('49', '1000.000', '3545645646464', '1', '2014-12-28 23:40:00', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('50', '1000.000', '3545645646464', '1', '2014-12-28 23:40:07', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('51', '1000.000', '3545645646464', '1', '2014-12-28 23:40:11', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('52', '1000.000', '3545645646464', '1', '2014-12-28 23:40:11', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('53', '1000.000', '3545645646464', '1', '2014-12-28 23:40:11', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('54', '1000.000', '3545645646464', '1', '2014-12-28 23:40:11', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('55', '1000.000', '3545645646464', '1', '2014-12-28 23:40:11', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('56', '1000.000', '3545645646464', '1', '2014-12-28 23:40:12', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('57', '1000.000', '3545645646464', '1', '2014-12-28 23:40:12', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('58', '1000.000', '3545645646464', '1', '2014-12-28 23:40:12', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('59', '1000.000', '3545645646464', '1', '2014-12-28 23:40:12', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('60', '1000.000', '3545645646464', '1', '2014-12-28 23:40:12', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('61', '1000.000', '3545645646464', '1', '2014-12-28 23:40:12', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('62', '1000.000', '3545645646464', '1', '2014-12-28 23:40:13', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('63', '1000.000', '3545645646464', '1', '2014-12-28 23:40:13', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('64', '1000.000', '3545645646464', '1', '2014-12-28 23:40:13', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('65', '1000.000', '3545645646464', '1', '2014-12-28 23:40:13', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('66', '1000.000', '3545645646464', '1', '2014-12-28 23:40:13', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('67', '1000.000', '3545645646464', '1', '2014-12-28 23:40:14', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('68', '1000.000', '3545645646464', '1', '2014-12-28 23:40:14', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('69', '1000.000', '3545645646464', '1', '2014-12-28 23:40:14', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('70', '1000.000', '3545645646464', '1', '2014-12-28 23:40:14', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('71', '1000.000', '3545645646464', '1', '2014-12-28 23:40:23', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('72', '1000.000', '3545645646464', '1', '2014-12-28 23:40:26', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('73', '1000.000', '3545645646464', '1', '2014-12-28 23:40:27', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('74', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('75', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('76', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('77', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('78', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('79', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('80', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('81', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('82', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('83', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('84', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('85', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('86', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('87', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('88', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('89', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('90', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('91', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('92', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('93', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('94', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('95', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('96', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('97', '1000.000', '3545645646464', '1', '2014-12-28 23:40:28', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('98', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('99', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('100', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('101', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('102', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('103', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('104', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('105', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('106', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('107', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('108', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('109', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('110', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('111', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('112', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('113', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('114', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('115', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('116', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('117', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('118', '1000.000', '3545645646464', '1', '2014-12-28 23:40:29', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('119', '1000.000', '3545645646464', '1', '2014-12-28 23:40:30', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('120', '1000.000', '3545645646464', '1', '2014-12-28 23:40:30', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('121', '1000.000', '3545645646464', '1', '2014-12-28 23:40:30', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('122', '1000.000', '3545645646464', '1', '2014-12-28 23:40:30', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('123', '1000.000', '3545645646464', '1', '2014-12-28 23:40:30', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('124', '1000.000', '3545645646464', '1', '2014-12-28 23:40:30', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('125', '1000.000', '3545645646464', '1', '2014-12-28 23:40:30', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('126', '1000.000', '3545645646464', '1', '2014-12-28 23:40:30', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('127', '1000.000', '3545645646464', '1', '2014-12-28 23:40:30', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('128', '234.000', '23423423', '1', '2014-12-28 23:43:22', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('129', '111111.000', '2222222222222222222222222222', '1', '2014-12-28 23:44:29', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('130', '111111.000', '2222222222222222222222222222', '1', '2014-12-28 23:44:53', null, '0', '1', '6');

-- ----------------------------
-- Table structure for tm_profit_category
-- ----------------------------
DROP TABLE IF EXISTS `tm_profit_category`;
CREATE TABLE `tm_profit_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(50) NOT NULL COMMENT '收入的类型(工资，理财，零花钱，压岁钱）',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  `status` int(1) DEFAULT NULL COMMENT '1发布0未发布',
  `is_delete` int(1) DEFAULT NULL COMMENT '0未删除1删除',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tm_profit_category
-- ----------------------------
INSERT INTO `tm_profit_category` VALUES ('1', '工资', '2014-12-25 22:09:52', '发了工资了', '1', '0', '4');
INSERT INTO `tm_profit_category` VALUES ('2', '红包', '2014-12-25 22:10:01', '过年的红包', '1', '0', '5');
INSERT INTO `tm_profit_category` VALUES ('3', '基金', '2014-12-25 22:10:10', null, '1', '0', '3');
INSERT INTO `tm_profit_category` VALUES ('4', '中奖了', '2014-12-25 22:10:16', null, '1', '1', '2');
INSERT INTO `tm_profit_category` VALUES ('5', '生活费', '2014-12-25 22:10:31', '每个月的生活费', '1', '0', '1');
INSERT INTO `tm_profit_category` VALUES ('6', '理财', '2014-12-27 23:33:42', null, '1', '0', '6');

-- ----------------------------
-- Table structure for tm_user
-- ----------------------------
DROP TABLE IF EXISTS `tm_user`;
CREATE TABLE `tm_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `account` varchar(50) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tm_user
-- ----------------------------
INSERT INTO `tm_user` VALUES ('1', '柯柯', '123456', 'keke', '2014-12-25 22:11:39');
