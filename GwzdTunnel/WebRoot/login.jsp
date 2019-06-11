<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <script type="text/javascript"> 
    	var userName = '<s:property value="userName"/>';
    	var userPass = '<s:property value="userPass"/>';
   	</script>
    <title>立体防护平台</title>
	<link rel="stylesheet" type="text/css" href="extjs6/build/classic/theme-triton/resources/theme-triton-all.css">
	<!-- 引入ExtJs核心Js -->
	<script type="text/javascript" src="extjs6/ext-bootstrap.js"></script>
	<script type="text/javascript" src="extjs6/build/ext-all.js"></script>
	<script type="text/javascript" src="extjs6/build/classic/locale/locale-zh_CN.js"></script>
	<!-- 导入自定义的css -->
	<link rel="stylesheet" type="text/css" href="MyCss/MyExtjs.css">
	<!-- 页面Js -->
	<script type="text/javascript" src="MyJS/loginPage/LoginPage.js"></script>
  </head>
  
  <body>
    
  </body>
</html>
