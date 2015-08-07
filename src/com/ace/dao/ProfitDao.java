package com.ace.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.ace.dao.util.ConnectionUtil;
import com.ace.entity.Profit;

/**
 * 
 * @title ProfitDao 
 * @description 收入业务逻辑类 
 * @author 俞杰
 * @time 2015年8月7日-下午6:34:37
 * @version 1.0.0
 * @since JDK1.7
 */
public class ProfitDao {
	public static List<Profit> findProfits(){
		String sql="SELECT * FROM TM_PROFIT WHERE IS_DELETE=0";
		Connection connection=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		List<Profit> profits=null;
		try {
			profits=new ArrayList<Profit>();
			connection=ConnectionUtil.getConnection();
			preparedStatement=connection.prepareStatement(sql);
			rs=preparedStatement.executeQuery();
			Profit profit=null;
			while(rs.next()){
				profit=new Profit();
				profit.setCreateTime(rs.getTimestamp("create_time"));
				profit.setDescription(rs.getString("description"));
				profit.setId(rs.getInt("id"));
				profit.setIsDelete(rs.getInt("is_delete"));
				profit.setMoney(rs.getFloat("money"));
				profit.setStatus(rs.getInt("status"));
				profit.setTypeId(rs.getInt("type_id"));
				profit.setUpdateTime(rs.getTimestamp("update_time"));
				profit.setUserId(rs.getInt("user_id"));
				profits.add(profit);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return profits;
	}
	
	public static boolean deleteProfit(Integer id){
		String sql="UPDATE TM_PROFIT SET IS_DELETE=1 WHERE ID=?";
		Connection connection=null;
		PreparedStatement preparedStatement=null;
		int count=0;
		try {
			connection=ConnectionUtil.getConnection();
			preparedStatement=connection.prepareStatement(sql);
			preparedStatement.setInt(1,id);
			count=preparedStatement.executeUpdate();
			return count>0?true:false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	public static void main(String[] args) {
		System.out.println(deleteProfit(30));
	}
}
