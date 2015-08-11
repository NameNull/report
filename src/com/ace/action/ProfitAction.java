package com.ace.action;

import java.util.HashMap;
import java.util.List;

import org.apache.struts2.ServletActionContext;

import com.ace.action.impl.BaseAction;
import com.ace.dao.ProfitChartDao;
import com.ace.dao.ProfitDao;
import com.ace.entity.Profit;
import com.ace.entity.User;

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
	//收入列表--查询
	private List<Profit> profits;
	//收入id--删除
	private Integer id;
	//收入类型
	private List<HashMap<String, Object>> maps;
	//单条收入--增加
	private Profit profit;
	//list起始下标
	private Integer startIndex;
	//list页数
	private Integer pageSize;
	//收入条数
	private Integer count;
	//收入类型
	private Integer typeId;
	//最小金额
	private Integer minMoney;
	//最大金额
	private Integer maxMoney;
	//图表--年份
	private String year;
	/**
	 * 
	 * @description 获取每年每月收入总额
	 * @方法名 yearsProfit
	 * @return String
	 * @exception
	 */
	public String yearsProfit(){
		maps=ProfitChartDao.findYearsProfitDetails();
		return AJAX_SUCCESS;
	}
	/**
	 * 
	 * @description 获取今年每月每个类型收入--图表
	 * @方法名 findYearProfit
	 * @return String
	 * @exception
	 */
	public String yearProfit(){
		maps=ProfitChartDao.findYearProfitDetails(year);
		return AJAX_SUCCESS;
	}
	/**
	 * 
	 * @description 今日金额展示--图表
	 * @方法名 todayProfit
	 * @return String
	 * @exception
	 */
	public String todayProfit(){
		profits=ProfitChartDao.findTodayProfit();
		return AJAX_SUCCESS;
	}
	/**
	 * 
	 * @description 进入收入列表
	 * @方法名 findProfits
	 * @return String
	 * @exception
	 */
	public String list(){
		//session userId
		User user=(User)ServletActionContext.getRequest().getSession().getAttribute("userSession");
		Integer userId=user.getId();
		count=ProfitDao.countProfits(userId, typeId, minMoney, maxMoney);
		maps=ProfitDao.FindProfitType();
		profits=ProfitDao.findProfits(userId, typeId, minMoney, maxMoney, 0, 10);
		return SUCCESS;
	}
	/**
	 * 
	 * @description 增加收入页面
	 * @方法名 add
	 * @return String
	 * @exception
	 */
	public String add(){
		if(id!=null){
			profit=ProfitDao.getProfit(id);
		}
		maps=ProfitDao.FindProfitType();
		return SUCCESS;
	}
	/**
	 * 
	 * @description 保存收入信息
	 * @方法名 save
	 * @return String
	 * @exception
	 */
	public String save(){
		//session userId
		User user=(User)ServletActionContext.getRequest().getSession().getAttribute("userSession");
		Integer userId=user.getId();
		profit.setStatus(1);//已发布
		profit.setIsDelete(0);//未删除
		profit.setUserId(userId);
		boolean flag=ProfitDao.saveProfit(profit);
		if(flag){
			result=SUCCESS;
		}else{
			result=FAIL;
		}
		return AJAX_SUCCESS;
	}
	/**
	 * 
	 * @description 收入明细详情
	 * @方法名 detail
	 * @return String
	 * @exception
	 */
	public String detail(){
		maps=ProfitDao.FindProfitType();
		return SUCCESS;
	}
	/**
	 * 
	 * @description 编辑收入页面
	 * @方法名 update
	 * @return String
	 * @exception
	 */
	public String update(){
		boolean flag=ProfitDao.updateProfit(profit);
		if(flag){
			result=SUCCESS;
		}else{
			result=FAIL;
		}
		return AJAX_SUCCESS;
	}
	/**
	 * 
	 * @description 模板技术
	 * @方法名 listTemplate
	 * @return String
	 * @exception
	 */
	public String listTemplate(){
		//session userId
		User user=(User)ServletActionContext.getRequest().getSession().getAttribute("userSession");
		Integer userId=user.getId();
		count=ProfitDao.countProfits(userId, typeId, minMoney, maxMoney);
		profits=ProfitDao.findProfits(userId, typeId, minMoney, maxMoney, startIndex, pageSize);
		return SUCCESS;
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
	public List<HashMap<String, Object>> getMaps() {
		return maps;
	}
	/*public void setMaps(List<HashMap<String, Object>> maps) {
		this.maps = maps;
	}*/
	public Profit getProfit() {
		return profit;
	}
	public void setProfit(Profit profit) {
		this.profit = profit;
	}
	/*public Integer getPageSize() {
		return pageSize;
	}*/
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	/*public Integer getStartIndex() {
		return startIndex;
	}*/
	public void setStartIndex(Integer startIndex) {
		this.startIndex = startIndex;
	}
	public Integer getCount() {
		return count;
	}
	/*public void setCount(Integer count) {
		this.count = count;
	}*/
	/*public Integer getTypeId() {
		return typeId;
	}*/
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}
	/*public Integer getMinMoney() {
		return minMoney;
	}*/
	public void setMinMoney(Integer minMoney) {
		this.minMoney = minMoney;
	}
	/*public Integer getMaxMoney() {
		return maxMoney;
	}*/
	public void setMaxMoney(Integer maxMoney) {
		this.maxMoney = maxMoney;
	}
	public void setYear(String year) {
		this.year = year;
	}
	/*public String getYear() {
		return year;
	}*/
}
