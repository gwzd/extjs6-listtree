<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>电缆隧道监控平台</title>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script type="text/javascript"> 
    	var realName = '<s:property value="realName"/>';
    	var rootNode = '<s:property value="rootNode"/>';
    	var group = '<s:property value="group"/>';
    	var nodelist = '<s:property value="nodelist"/>';
    	var antiCount = '<s:property value="antiCount"/>';
   	</script>
	<!-- 导入extjs样式-->
	<!-- <link rel="stylesheet" type="text/css" href="extjs6/build/classic/theme-crisp/resources/theme-crisp-all.css"> -->
	<link rel="stylesheet" type="text/css" href="extjs6/build/classic/theme-triton/resources/theme-triton-all.css">
	<!-- 导入extjs -->
	<script type="text/javascript" src="extjs6/ext-bootstrap.js"></script>
	<script type="text/javascript" src="extjs6/build/ext-all.js"></script>
	<script type="text/javascript" src="extjs6/build/classic/locale/locale-zh_CN.js"></script>
	<!-- 导入 jquery 需要使用jquery的ajax做跨域访问LiveGBS-->
	<script type="text/javascript" src="jquery/jquery.js"></script>
	<!-- 统计图 -->
	<script type="text/javascript" src="extjs6/build/packages/charts/classic/charts.js"></script>
	<link rel="stylesheet" type="text/css" href="extjs6/build/packages/charts/classic/triton/resources/charts-all.css">
	<!-- 导入自己的CSS 其中也有覆盖extjs原来的css -->
	<link rel="stylesheet" type="text/css" href="MyCss/MyExtjs.css">
	<!-- 导入live播放器 -->
	<script type="text/javascript" src="LiveGBS/VideoPlayer.js"></script>
	<!--  百度底图api  -->
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=Zy31TjGzVfSQmHrZhqzL9TWaYbaU1k4I&s=1"></script>
	<script type="text/javascript" src="MyJS/baiduMap/mapShow.js"></script>
	<!-- 立体防护3D模型 -->
	<script src="webgl/build/three.js"></script>
	<script src="webgl/js/WebGL.js"></script>
    <script src="webgl/js/controls/OrbitControls.js"></script>
    <script src="webgl/js/renderers/CSS2DRenderer.js"></script>
    <script src="webgl/js/libs/stats.min.js"></script>
    <!-- <script src="webgl/js/Cloth.js"></script> -->
    
	<!-- 导入自己的js -->
	<script type="text/javascript" src="MyJS/widget/TebPanelItem.js"></script>
	<script type="text/javascript" src="MyJS/MainPage.js"></script>
  </head>
  
  <body>
    
  </body>
</html>
