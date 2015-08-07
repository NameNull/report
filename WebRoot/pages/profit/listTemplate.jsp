<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp" %>
<input type="hidden" id="itemCount" value="${result}">
<c:choose>
<c:when test="<%-- ${tz:getLength(profitBeans)==0} --%>">
<tr class="tmui-items">
	<td colspan="7"><h1>暂无数据</h1></td>
</tr>
</c:when>
<c:otherwise>
<c:forEach var="profit" items="${profitBeans}">
  <tr class="tmui-items">
    <td>${profit.id}</td>
    <td>￥${profit.money}</td>
    <td class="key">${profit.typeName}</td>
    <td class="key">${profit.username}</td>
    <td>$<%-- {tz:formateDate(profit.createTime,'yyyy-MM-dd HH:mm:ss')} --%></td>
    <td>${profit.description}</td>
    <td><a href="${basePath}/profit/add/${profit.id}"  data-opid="${profit.id}">编辑</a>&nbsp;<a href="javascript:void(0)" onclick="tm_delete(this)" data-opid="${profit.id}">删除</a></td>
  </tr>
</c:forEach>
</c:otherwise>
</c:choose>