package com.ace.dao.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * 
 * @title ConnectionDao 
 * @description 底层连接类 
 * @author 俞杰
 * @time 2015年8月7日-下午6:13:58
 * @version 1.0.0
 * @since JDK1.7
 */
public class ConnectionUtil {
	public static Connection getConnection(){
		Connection connection=null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection=DriverManager.getConnection("jdbc:mysql://localhost:3306/report","root","yujie");
		} catch (Exception e) {
			return null;
		}
		return connection;
	}
	public static void closeConnection(Connection connection){
		try {
			if(connection!=null){
				connection.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public static void closeStatement(Statement statement){
		try {
			if(statement!=null){
				statement.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public static void closeRs(ResultSet rs){
		try {
			if(rs!=null){
				rs.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public static void closeConnection(PreparedStatement preparedStatement){
		try {
			if(preparedStatement!=null){
				preparedStatement.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
