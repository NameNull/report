package com.ace.action;

import org.apache.struts2.ServletActionContext;

import com.ace.dao.UserDao;
import com.ace.entity.User;

/**
 * 
 * @title UserAction 
 * @description 用户action 
 * @author 俞杰
 * @time 2015年8月8日-上午2:01:26
 * @version 1.0.0
 * @since JDK1.7
 */
public class UserAction extends BaseAction{
	private String account;
	private String password;
	private User user;
	private String result;
	/**
	 * 
	 * @description 退出
	 * @方法名 exit
	 * @return String
	 * @exception
	 */
	public String exit(){
		ServletActionContext.getRequest().getSession().invalidate();
		return LOGINACTION;
	}
	/**
	 * 
	 * @description 登录校验
	 * @方法名 loginValidate
	 * @return String
	 * @exception
	 */
	public String loginValidate(){
		user=UserDao.getUser(account, password);
		if(user!=null){
			ServletActionContext.getRequest().getSession().setAttribute("userSession", user);
			result=SUCCESS;
		}else{
			result=FAIL;
		}
		return AJAX_SUCCESS;
	}
	/**
	 * 
	 * @description 登录页
	 * @方法名 execute
	 * @return String
	 * @exception
	 */
	public String execute(){
		return LOGIN;
	}
	/*public String getAccount() {
		return account;
	}*/
	public void setAccount(String account) {
		this.account = account;
	}
	/*public String getPassword() {
		return password;
	}*/
	public void setPassword(String password) {
		this.password = password;
	}
	public User getUser() {
		return user;
	}
	/*public void setUser(User user) {
		this.user = user;
	}*/
	public String getResult() {
		return result;
	}
	/*public void setResult(String result) {
		this.result = result;
	}*/
}
