<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:choose>
 	<c:when test="${fn:length(profits)==0 }">
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
	    <td class="key">${profit.userName}</td>
	    <td>${yj:formatDate(profit.createTime,"yyyy年MM月dd日 HH:mm:ss") }</td>
	    <td>${profit.description}</td>
	    <td>
	    	<a href="profit/add/${profit.id}"  data-opid="${profit.id}">编辑</a>
	    	<a href="javascript:void(0)" onclick="tm_delete(this)" data-opid="${profit.id}">删除</a>
	    </td>
	  </tr>
	</c:forEach>
	</c:otherwise>
</c:choose>