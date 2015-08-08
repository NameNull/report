package com.ace.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @title User 
 * @description 用户实体类  
 * @author 俞杰 
 * @time 2015年8月8日-上午2:05:26
 * @version 1.0.0
 * @since JDK1.7
 */
public class User implements Serializable{
	private static final long serialVersionUID = 1L;
	//主键
	private Integer id;
	//用户名
	private String username;
	//账户
	private String account;
	//密码
	private String password;
	//生成时间
	private Date createTime;
	public User(){}
	public User(Integer id){
		this.id=id;
	}
	//getter & setter
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}