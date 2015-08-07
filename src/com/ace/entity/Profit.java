package com.ace.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @title Profit 
 * @description  收入实体类
 * @author 俞杰
 * @time 2015年8月7日-下午6:39:03
 * @version 1.0.0
 * @since JDK1.7
 */
public class Profit implements Serializable{
	private static final long serialVersionUID = 1L;
	//主键
	private Integer id;
	//金额
	private Float money;
	//描述
	private String description;
	//用户
	private Integer userId;
	//生成时间
	private Date createTime;
	//更新时间
	private Date updateTime;
	//是否删除 0未删除 1已删除
	private Integer isDelete;
	//是否发布 0未发布 1已发布
	private Integer status;
	//收入类型
	private Integer typeId;
	
	public Profit(){
		
	}
	public Profit(Integer id){
		this.id=id;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Float getMoney() {
		return money;
	}
	public void setMoney(Float money) {
		this.money = money;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public Integer getIsDelete() {
		return isDelete;
	}
	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getTypeId() {
		return typeId;
	}
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}
}