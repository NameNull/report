<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp" %>
<input type="hidden" id="itemCount" value="${count }"/>
<c:choose>
 	<c:when test="${count==0 }">
	<tr class="tmui-items">
		<td colspan="7"><h1>暂无数据</h1></td>
	</tr>
	</c:when>
	<c:otherwise>
	<c:forEach var="profit" items="${profits}" varStatus="p">
	  <tr class="tmui-items">
	    <td>${p.index+1}</td>
	    <td>￥${profit.money}</td>
	    <td class="key">${profit.typeName}</td>
	    <td>${yj:getTimeFormat(profit.updateTime)}</td>
	    <td>${yj:formatDate(profit.createTime,"yyyy年MM月dd日 HH:mm:ss") }</td>
	    <td>${profit.description}</td>
	    <td>
	    	<a href="profit/add/${profit.id}">编辑</a>&nbsp;&nbsp;&nbsp;
	    	<a href="javascript:void(0)" onclick="tm_delete(this)" data-opid="${profit.id}">删除</a>
	    </td>
	  </tr>
	</c:forEach>
	</c:otherwise>
</c:choose>