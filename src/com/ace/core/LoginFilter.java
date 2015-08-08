package com.ace.core;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ace.entity.User;
/**
 * 
 * @title EncodingFilter 
 * @description  登录过滤
 * @author 俞杰
 * @time 2015年8月6日-下午2:50:17
 * @version 1.0.0
 * @since JDK1.7
 */
public class LoginFilter implements Filter {
	public void destroy() {	
	}
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		HttpServletRequest request=(HttpServletRequest) arg0;
		HttpServletResponse response=(HttpServletResponse) arg1;
		User user=(User)request.getSession().getAttribute("userSession");
		String url=request.getRequestURI();
		if(user==null
			&&url.indexOf("login")==-1
			&&url.indexOf("images")==-1
			&&url.indexOf("css")==-1
			&&url.indexOf("js")==-1
			&&url.indexOf("font")==-1){
			response.sendRedirect("/report/login");
		}
		arg2.doFilter(request,response);
	}
	public void init(FilterConfig arg0) throws ServletException {
		
	}
}
