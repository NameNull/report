package com.ace.action;

import com.ace.dao.ProfitDao;
import com.ace.entity.Profit;
/**
 * 
 * @title TestAction 测试表单重复提交
 * @description  
 * @author 俞杰
 * @time 2015年8月10日-上午1:01:15
 * @version 1.0.0
 * @since JDK1.7
 */
public class TestAction extends BaseAction{
	private Integer id;
	private Profit profit;
	public String search(){
		profit=ProfitDao.getProfit(id);
		if(profit==null){
			return FAIL;
		}else{
			return SUCCESS;
		}
	}
	//setter
	public void setId(Integer id) {
		this.id = id;
	}
	public Profit getProfit() {
		return profit;
	}
}
