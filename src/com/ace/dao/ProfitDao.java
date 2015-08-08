package com.ace.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
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
	/**
	 * 
	 * @description 计数收入行数
	 * @方法名 countProfits
	 * @param userId
	 * @param typeId
	 * @param minMoney
	 * @param maxMoney
	 * @return int
	 * @exception
	 */
	public static int countProfits(Integer userId,Integer typeId,Integer minMoney,Integer maxMoney){
		String sql="SELECT COUNT(1) FROM TM_PROFIT P,TM_PROFIT_CATEGORY C,TM_USER U WHERE P.TYPE_ID=C.ID "+
				" AND P.USER_ID=U.ID AND P.USER_ID=? AND P.IS_DELETE=0 AND P.STATUS=1 ";
		if(typeId!=null){
			sql+=" AND P.TYPE_ID="+typeId;
		}
		if(minMoney!=null&&maxMoney!=null){
			sql+=" AND P.MONEY BETWEEN "+minMoney+" AND "+maxMoney+" ";
		}
		Connection connection=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		int count=0;
		try {
			connection=ConnectionUtil.getConnection();
			preparedStatement=connection.prepareStatement(sql);
			preparedStatement.setInt(1, userId);
			rs=preparedStatement.executeQuery();
			if(rs.next()){
				count=rs.getInt(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			ConnectionUtil.closeRs(rs);
			ConnectionUtil.closeConnection(preparedStatement);
			ConnectionUtil.closeConnection(connection);
		}
		return count;
	}
	/**
	 * 
	 * @description 
	 * @方法名 findProfits 查找收入
	 * @param userId
	 * @param typeId
	 * @param minMoney
	 * @param maxMoney
	 * @param startIndex
	 * @param length
	 * @return List<Profit>
	 * @exception
	 */
	public static List<Profit> findProfits(Integer userId,Integer typeId,Integer minMoney,Integer maxMoney,Integer startIndex,Integer length){
		String sql="SELECT P.*,C.NAME,U.USERNAME FROM TM_PROFIT P,TM_PROFIT_CATEGORY C,TM_USER U WHERE P.TYPE_ID=C.ID "+
				" AND P.USER_ID=U.ID AND P.USER_ID=? AND P.IS_DELETE=0 AND P.STATUS=1 ";
		if(typeId!=null){
			sql+=" AND P.TYPE_ID="+typeId;
		}
		if(minMoney!=null&&maxMoney!=null){
			sql+=" AND P.MONEY BETWEEN "+minMoney+" AND "+maxMoney+" ";
		}
		sql+=" ORDER BY P.CREATE_TIME DESC LIMIT ?,?";
		Connection connection=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		List<Profit> profits=null;
		try {
			profits=new ArrayList<Profit>();
			connection=ConnectionUtil.getConnection();
			preparedStatement=connection.prepareStatement(sql);
			preparedStatement.setInt(1, userId);
			preparedStatement.setInt(2, startIndex);
			preparedStatement.setInt(3, length);
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
				profit.setUserName(rs.getString("username"));
				profit.setTypeName(rs.getString("name"));
				profits.add(profit);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			ConnectionUtil.closeRs(rs);
			ConnectionUtil.closeConnection(preparedStatement);
			ConnectionUtil.closeConnection(connection);
		}
		return profits;
	}
	/**
	 * 
	 * @description 增加收入信息
	 * @方法名 saveProfit
	 * @param profit
	 * @return boolean
	 * @exception
	 */
	public static boolean saveProfit(Profit profit){
		String sql="INSERT INTO TM_PROFIT (MONEY,DESCRIPTION,USER_ID,STATUS,IS_DELETE,TYPE_ID) VALUES(?,?,?,?,?,?)";
		Connection connection=null;
		PreparedStatement preparedStatement=null;
		int count=0;
		try {
			connection=ConnectionUtil.getConnection();
			preparedStatement=connection.prepareStatement(sql);
			preparedStatement.setFloat(1,profit.getMoney());
			preparedStatement.setString(2,profit.getDescription());
			preparedStatement.setInt(3,profit.getUserId());
			preparedStatement.setInt(4,profit.getStatus());
			preparedStatement.setInt(5,profit.getIsDelete());
			preparedStatement.setInt(6,profit.getTypeId());
			count=preparedStatement.executeUpdate();
			return count>0?true:false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}finally{
			ConnectionUtil.closeConnection(preparedStatement);
			ConnectionUtil.closeConnection(connection);
		}
	}
	/**
	 * 
	 * @description 删除收入
	 * @方法名 deleteProfit
	 * @param id
	 * @return boolean
	 * @exception
	 */
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
		}finally{
			ConnectionUtil.closeConnection(preparedStatement);
			ConnectionUtil.closeConnection(connection);
		}
	}
	/**
	 * 
	 * @description 收入类型
	 * @方法名 FindProfitType
	 * @return List<HashMap<String,Object>>
	 * @exception
	 */
	public static List<HashMap<String, Object>> FindProfitType(){
		String sql="SELECT * FROM TM_PROFIT_CATEGORY WHERE IS_DELETE=0 AND STATUS=1 ORDER BY SORT DESC";
		Connection connection=null;
		PreparedStatement preparedStatement=null;
		ResultSet rs=null;
		List<HashMap<String, Object>> maps=null;
		try {
			maps=new ArrayList<HashMap<String, Object>>();
			connection=ConnectionUtil.getConnection();
			preparedStatement=connection.prepareStatement(sql);
			rs=preparedStatement.executeQuery();
			HashMap<String, Object> map=null;
			while(rs.next()){
				map=new HashMap<String, Object>();
				map.put("id",rs.getInt("id"));
				map.put("name", rs.getString("name"));
				map.put("createTime", rs.getString("create_time"));
				map.put("description", rs.getString("description"));
				map.put("status", rs.getString("status"));
				map.put("isDelete", rs.getString("is_delete"));
				map.put("sort", rs.getString("sort"));	
				maps.add(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			ConnectionUtil.closeRs(rs);
			ConnectionUtil.closeConnection(preparedStatement);
			ConnectionUtil.closeConnection(connection);
		}
		return maps;
	}
}
