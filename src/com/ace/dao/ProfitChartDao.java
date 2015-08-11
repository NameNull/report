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
 * @title ProfitChartDao 收入图表类
 * @description  
 * @author 俞杰
 * @time 2015年8月10日-下午5:26:18
 * @version 1.0.0
 * @since JDK1.7
 */
public class ProfitChartDao {
	public static List<Profit> findTodayProfit(){
		String sql="SELECT money,description,create_time,type_id FROM tm_profit WHERE DATE_FORMAT(create_time,'%Y-%m-%d') = DATE_FORMAT(NOW(),'%Y-%m-%d') AND is_delete = 0 and status=1 GROUP BY type_id ORDER BY money desc";
		Connection connection=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		List<Profit> profits=null;
		try {
			profits=new ArrayList<Profit>();
			Profit profit=null;
			connection=ConnectionUtil.getConnection();
			preparedStatement=connection.prepareStatement(sql);
			rs=preparedStatement.executeQuery();
			while(rs.next()){
				profit=new Profit();
				profit.setDescription(rs.getString("description"));
				profit.setMoney(rs.getFloat("money"));
				profit.setTypeId(rs.getInt("type_id"));
				profit.setCreateTime(rs.getTimestamp("create_time"));
				profits.add(profit);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return profits;
	}
	public static void main(String[] args) {
	List<Profit> profits=findTodayProfit();
		for (Profit profit : profits) {
			System.out.println(profit.getMoney());
			System.out.println(profit.getTypeId());
			System.out.println("=====");
		}
	}
}
