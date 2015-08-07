package com.ace.action;

import java.util.List;

import com.ace.dao.ProfitDao;
import com.ace.entity.Profit;
import com.opensymphony.xwork2.Action;

/**
 * 
 * @title ProfitAction 
 * @description  收入action
 * @author 俞杰
 * @time 2015年8月7日-下午7:10:01
 * @version 1.0.0
 * @since JDK1.7
 */
public class ProfitAction extends BaseAction{
	private List<Profit> profits;
	private Integer id;
	private String result;
	/**
	 * 
	 * @description 查询所有收入
	 * @方法名 findProfits
	 * @return String
	 * @exception
	 */
	public String findProfits(){
		profits=ProfitDao.findProfits();
		return Action.SUCCESS;
	}
	/**
	 * 
	 * @description 逻辑删除一行收入
	 * @方法名 delProfit
	 * @return String
	 * @exception
	 */
	//没有get方法ajax不会进行序列化
	public String delProfit(){
		boolean flag=ProfitDao.deleteProfit(id);
		if(flag){
			result=SUCCESS;
		}else{
			result=FAIL;
		}
		return AJAX_SUCCESS;
	}
	//getter & setter
	public List<Profit> getProfits() {
		return profits;
	}
	/*public void setProfits(List<Profit> profits) {
		this.profits = profits;
	}*/
	/*public Integer getId() {
		return id;
	}*/
	public void setId(Integer id) {
		this.id = id;
	}
	public String getResult() {
		return result;
	}
	/*public void setResult(String result) {
		this.result = result;
	}*/
}
