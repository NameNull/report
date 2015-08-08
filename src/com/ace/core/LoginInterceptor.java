package com.ace.core;

import org.apache.struts2.ServletActionContext;

import com.ace.entity.User;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;
/**
 * 
 * @title LoginInterceptor 
 * @description 登录拦截 
 * @author 俞杰
 * @time 2015年8月8日-下午7:24:56
 * @version 1.0.0
 * @since JDK1.7
 */
public class LoginInterceptor extends AbstractInterceptor{

	private static final long serialVersionUID = 1L;

	public String intercept(ActionInvocation invacation) throws Exception {
		User user=(User) ServletActionContext.getRequest().getSession().getAttribute("userSession");
		if(user==null){
			return "loginAction";
		}
		return invacation.invoke();
	}

}
