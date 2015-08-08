package com.ace.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.ace.dao.util.ConnectionUtil;
import com.ace.entity.User;

/**
 * 
 * @title ProfitDao 
 * @description 收入业务逻辑类 
 * @author 俞杰
 * @time 2015年8月7日-下午6:34:37
 * @version 1.0.0
 * @since JDK1.7
 */
public class UserDao {
	public static User getUser(String account,String password){
		String sql="SELECT ID,ACCOUNT,USERNAME,CREATE_TIME,PASSWORD FROM TM_USER WHERE ACCOUNT=? AND PASSWORD=?";
		Connection connection=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		User user=null;
		try {
			connection=ConnectionUtil.getConnection();
			preparedStatement=connection.prepareStatement(sql);
			preparedStatement.setString(1, account);
			preparedStatement.setString(2, password);
			rs=preparedStatement.executeQuery();
			if(rs.next()){
				user=new User();
				user.setAccount(rs.getString("account"));
				user.setUsername(rs.getString("username"));
				user.setPassword(rs.getString("password"));
				user.setId(rs.getInt("id"));
				user.setCreateTime(rs.getTimestamp("create_time"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			ConnectionUtil.closeRs(rs);
			ConnectionUtil.closeConnection(preparedStatement);
			ConnectionUtil.closeConnection(connection);
		}
		return user;
	}
}
