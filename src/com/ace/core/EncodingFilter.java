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

import com.ace.util.StringUtils;
/**
 * 
 * @title EncodingFilter 
 * @description  编码过滤
 * @author 俞杰
 * @time 2015年8月6日-下午2:50:17
 * @version 1.0.0
 * @since JDK1.7
 */
public class EncodingFilter implements Filter {
	public void destroy() {	
	}
	private FilterConfig config;
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		HttpServletRequest request=(HttpServletRequest) arg0;
		HttpServletResponse response=(HttpServletResponse) arg1;
		System.out.println("编码过滤器");
		String encoding=config.getInitParameter("Encoding");
		if(StringUtils.isNotEmpty(encoding)){
			request.setCharacterEncoding(encoding);
			response.setCharacterEncoding(encoding);
			response.setContentType("text/html;charset="+encoding);
		}
		arg2.doFilter(request,response);
	}
	public void init(FilterConfig arg0) throws ServletException {
		this.config=arg0;
	}
}
