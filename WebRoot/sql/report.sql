/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50623
Source Host           : localhost:3306
Source Database       : report

Target Server Type    : MYSQL
Target Server Version : 50623
File Encoding         : 65001

Date: 2015-08-12 02:44:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tm_pay
-- ----------------------------
DROP TABLE IF EXISTS `tm_pay`;
CREATE TABLE `tm_pay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `money` float(13,3) NOT NULL COMMENT '消费的金额',
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
  `money` float(13,3) DEFAULT NULL COMMENT '收入的金额',
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
) ENGINE=InnoDB AUTO_INCREMENT=229 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tm_profit
-- ----------------------------
INSERT INTO `tm_profit` VALUES ('133', '2312.000', '暑期生活费', '1', '2014-09-09 03:13:37', '2015-08-09 01:33:24', '0', '1', '5');
INSERT INTO `tm_profit` VALUES ('134', '100.910', '股票收入', '1', '2014-09-09 03:13:37', '2015-08-09 01:33:28', '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('135', '900.000', '新年红包', '1', '2014-08-09 03:13:37', '2015-08-09 01:33:31', '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('136', '1000.000', '项目开发工资', '1', '2014-08-09 03:13:37', '2015-08-09 01:33:33', '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('137', '80.000', '国家基金', '1', '2014-09-09 03:13:37', '2015-08-09 01:33:37', '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('138', '123.000', '炒股收入', '1', '2014-09-09 03:13:37', '2015-08-09 01:33:40', '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('139', '234.000', '卖力', '1', '2014-10-09 03:13:37', '2015-08-09 02:37:55', '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('140', '213.000', '基金回报', '1', '2014-10-09 03:13:37', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('141', '3424.000', '基金回报', '1', '2014-11-09 03:13:37', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('142', '342.000', '基金回报', '1', '2014-11-09 03:13:37', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('143', '343.000', '基金回报', '1', '2014-12-09 03:13:37', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('144', '34.000', '基金回报', '1', '2014-08-09 03:13:37', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('145', '1232.000', '基金回报', '1', '2014-08-09 03:13:37', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('146', '100.000', '基金回报', '1', '2014-08-09 03:13:37', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('147', '123.000', '基金回报', '1', '2014-08-09 03:13:37', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('148', '546.000', '基金回报', '1', '2014-08-09 03:13:37', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('149', '667.000', '基金回报', '1', '2014-08-09 03:13:37', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('150', '456.000', '基金回报', '1', '2014-08-09 03:13:37', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('151', '5656.000', '基金回报', '1', '2014-08-09 03:13:37', '2015-08-09 18:13:40', '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('152', '354.000', '基金回报', '1', '2015-01-09 17:35:37', '2015-08-09 18:13:31', '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('153', '123.000', '基金回报', '1', '2015-01-10 01:32:13', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('154', '1231.000', '基金回报', '1', '2015-01-10 01:32:33', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('155', '1232.000', '基金回报', '1', '2015-02-10 01:33:02', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('156', '122.000', '基金回报', '1', '2015-02-10 01:33:03', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('157', '544.000', '基金回报', '1', '2015-03-10 01:33:04', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('158', '566.000', '基金回报', '1', '2015-04-10 01:33:05', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('159', '45.000', '基金回报', '1', '2015-05-10 01:33:06', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('160', '456.000', '基金回报', '1', '2015-04-10 01:33:07', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('161', '466.000', '基金回报', '1', '2015-04-10 01:33:07', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('162', '56.000', '基金回报', '1', '2015-05-10 01:33:08', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('163', '84.000', '基金回报', '1', '2015-05-10 01:33:08', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('164', '900.000', '基金回报', '1', '2015-05-10 01:33:08', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('165', '450.000', '基金回报', '1', '2015-05-10 01:33:08', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('166', '58.000', '基金回报', '1', '2015-05-10 01:33:08', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('167', '15.000', 'niu', '1', '2015-07-10 01:46:15', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('168', '1512.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('169', '123.000', '23', '1', '2015-07-10 03:15:51', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('170', '123.000', '基金回报', '1', '2015-07-10 03:15:51', '2015-08-10 05:23:36', '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('171', '58.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('172', '258.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('173', '58.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('174', '58.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('175', '58.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('176', '58.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('177', '58.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('178', '58.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('179', '58.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '4');
INSERT INTO `tm_profit` VALUES ('180', '58.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('181', '58.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('182', '58.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('183', '2.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('184', '58.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('185', '58.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('186', '58.000', '基金回报', '1', '2015-07-10 03:15:51', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('187', '58.000', '基金回报', '1', '2015-08-10 05:40:22', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('188', '58.000', '基金回报', '1', '2015-08-10 05:40:33', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('189', '58.000', '基金回报', '1', '2015-08-10 05:40:42', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('190', '58.000', '基金回报', '1', '2015-08-10 05:41:02', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('191', '58.000', '基金回报', '1', '2015-08-10 05:41:13', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('192', '58.000', '基金回报', '1', '2015-08-10 05:41:40', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('193', '58.000', '基金回报', '1', '2015-08-10 05:42:14', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('194', '58.000', '基金回报', '1', '2015-08-10 05:42:22', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('195', '2.000', '基金回报', '1', '2015-08-10 05:42:29', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('196', '2.000', '基金回报', '1', '2015-08-10 05:42:38', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('197', '2.000', '基金回报', '1', '2015-08-10 05:42:48', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('198', '2.000', '基金回报', '1', '2015-08-10 05:43:04', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('199', '21.000', '基金回报', '1', '2015-08-10 05:43:15', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('200', '21.000', '基金回报', '1', '2015-08-10 05:43:36', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('201', '21.000', '基金回报', '1', '2015-08-10 05:43:46', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('204', '21.000', '基金回报', '1', '2015-08-10 05:44:27', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('205', '31.000', '12313', '1', '2015-08-10 15:49:33', '2015-08-10 15:49:40', '0', '1', '4');
INSERT INTO `tm_profit` VALUES ('206', '11.000', '基金回报', '1', '2015-08-10 16:49:57', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('207', '22.000', '基金回报', '1', '2015-08-10 16:50:02', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('208', '33.000', '基金回报', '1', '2015-08-10 16:50:09', null, '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('209', '44.000', '基金回报', '1', '2015-08-10 16:50:14', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('210', '55.000', '基金回报', '1', '2015-08-10 16:50:20', null, '0', '1', '4');
INSERT INTO `tm_profit` VALUES ('211', '61.000', '基金回报', '1', '2015-08-10 16:50:25', null, '0', '1', '5');
INSERT INTO `tm_profit` VALUES ('212', '21.000', '基金回报', '1', '2015-08-11 15:32:39', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('213', '23.000', '基金回报', '1', '2015-08-11 15:32:44', null, '0', '1', '2');
INSERT INTO `tm_profit` VALUES ('214', '32.000', '赚钱了', '1', '2015-08-11 15:32:50', '2015-08-12 02:14:15', '0', '1', '1');
INSERT INTO `tm_profit` VALUES ('215', '100.000', '基金回报', '1', '2015-08-11 16:24:15', null, '0', '1', '3');
INSERT INTO `tm_profit` VALUES ('216', '123.000', '基金回报', '1', '2015-08-11 16:24:24', null, '0', '1', '4');
INSERT INTO `tm_profit` VALUES ('217', '132.000', '基金回报', '1', '2015-08-11 16:24:32', null, '0', '1', '5');
INSERT INTO `tm_profit` VALUES ('218', '123.000', '基金回报', '1', '2015-08-12 00:41:21', null, '1', '1', '6');
INSERT INTO `tm_profit` VALUES ('219', '123.000', '', '1', '2015-08-12 02:05:26', null, '1', '1', '6');
INSERT INTO `tm_profit` VALUES ('227', '123.000', '理财', '1', '2015-08-12 02:15:45', null, '0', '1', '6');
INSERT INTO `tm_profit` VALUES ('228', '400.000', '中奖了', '1', '2015-08-12 02:16:00', null, '0', '1', '4');

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
INSERT INTO `tm_profit_category` VALUES ('1', '工资', '2015-08-09 22:09:52', '', '1', '0', '4');
INSERT INTO `tm_profit_category` VALUES ('2', '红包', '2015-08-09 22:09:52', '', '1', '0', '5');
INSERT INTO `tm_profit_category` VALUES ('3', '基金', '2015-08-09 22:09:52', null, '1', '0', '3');
INSERT INTO `tm_profit_category` VALUES ('4', '中奖', '2015-08-09 22:09:52', null, '1', '0', '2');
INSERT INTO `tm_profit_category` VALUES ('5', '生活费', '2015-08-09 22:09:52', '', '1', '0', '1');
INSERT INTO `tm_profit_category` VALUES ('6', '理财', '2015-08-09 22:09:52', null, '1', '0', '6');

-- ----------------------------
-- Table structure for tm_user
-- ----------------------------
DROP TABLE IF EXISTS `tm_user`;
CREATE TABLE `tm_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `account` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tm_user
-- ----------------------------
INSERT INTO `tm_user` VALUES ('1', '管理员叔叔', 'admin', 'admin', '2015-08-08 22:11:39');
