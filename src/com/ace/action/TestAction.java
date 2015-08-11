package com.ace.action;

import org.apache.struts2.ServletActionContext;

import com.ace.action.impl.BaseAction;
import com.ace.dao.ProfitDao;
import com.ace.entity.Profit;
import com.ace.entity.User;
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
	private Profit profit;
	User user=(User)ServletActionContext.getRequest().getSession().getAttribute("userSession");
	Integer userId=user.getId();
	public String search(){
		profit.setStatus(1);//已发布
		profit.setIsDelete(0);//未删除
		profit.setUserId(userId);
		boolean flag=ProfitDao.saveProfit(profit);
		if(flag){
			return SUCCESS;
		}else{
			return FAIL;
		}
	}
	//setter
	public void setProfit(Profit profit) {
		this.profit = profit;
	}
	public Profit getProfit() {
		return profit;
	}
}
