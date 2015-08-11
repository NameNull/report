package com.ace.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	/**
	 * 
	 * @description 获取今日收入
	 * @方法名 findTodayProfit
	 * @return List<Profit>
	 * @exception
	 */
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
	/**
	 * 
	 * @description 获取年收入（每个类型每月总数）
	 * @方法名 findYearProfit
	 * @param year
	 * @return HashMap<String,Object>
	 * @exception
	 */
	public static HashMap<String, Object> findYearProfit(String year){
		String sql="SELECT DATE_FORMAT(create_time,'%c'),SUM(money),type_id FROM tm_profit WHERE is_delete = 0 AND `status`=1 AND DATE_FORMAT(create_time,'%Y') = ?  GROUP BY DATE_FORMAT(create_time,'%m'),type_id ORDER BY create_time";
		Connection connection=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		HashMap<String, Object> map=null;
		try {
			connection=ConnectionUtil.getConnection();
			preparedStatement=connection.prepareStatement(sql);
			preparedStatement.setString(1, year);
			rs=preparedStatement.executeQuery();
			map=new HashMap<String, Object>();
			while(rs.next()){
				map.put(rs.getString("DATE_FORMAT(create_time,'%c')")+"_"+rs.getInt("type_id"), rs.getString("SUM(money)"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
	/**
	 * 
	 * @description 获取{{type:3,month_money:{{month:1,money:"500"},{month:1,money:"500"},...}},{type:3,month_money:{{month:1,money:"500"},{month:1,money:"500"},...}},...}
	 * @方法名 findYearProfitDetails
	 * @param year
	 * @return HashMap<String,Object>
	 * @exception
	 */
	public static List<HashMap<String,Object>> findYearProfitDetails(String year){
		HashMap<String, Object> treeMap=findYearProfit(year);
		List<HashMap<String, Object>> hashMaps = new ArrayList<HashMap<String, Object>>();
		HashMap<String, Object> hashMap=null;
		String[] arr=new String[30];
 		for (Map.Entry<String, Object> entry: treeMap.entrySet()) {
 			String[] keys = entry.getKey().split("_");
			String type = keys[1];
			int typeNum=Integer.parseInt(type);
 			if((arr[typeNum])==null){
	 			hashMap=new HashMap<String, Object>();
 				arr[typeNum]=type;
				hashMap.put("type",type);
				List<HashMap<String,Object>> mmaps =  new ArrayList<HashMap<String, Object>>();
				HashMap<String, Object> mmap=null;
				for (int i = 1; i <=12; i++) {
					mmap=new HashMap<String, Object>();
					Object value = treeMap.get(i+"_"+type);
					mmap.put("month", i);
					mmap.put("money",value==null?0:value);
					mmaps.add(mmap);
				}
				hashMap.put("month_money",mmaps);
				hashMaps.add(hashMap);
 			}
		}
		return hashMaps;
	}
	public static void main(String[] args) {
		HashMap<String, Object> map=findYearProfit("2015");
		System.out.println(map);
	}
}
