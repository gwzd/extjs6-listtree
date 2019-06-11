package com.TunnelTools.gwzd;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.TunnelMainPage.gwzd.MainAllAlarmNode;
import com.TunnelMainPage.gwzd.MainNodeAlarmNode;
import com.TunnelMainPage.gwzd.MainTreeMenuNode;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class DBTool {
	
	
	public synchronized Connection getSqlServerConn() throws SQLException {  
		try {  
			Context jndiCntx = new InitialContext();  
			DataSource ds = (DataSource)jndiCntx.lookup( "java:comp/env/jdbc/oracledsLTFH");  
			return ds.getConnection();  
		}catch (NamingException ne) {  
			//throw new EJBException(ne);  
			return null;
		}
	}
	/**
	 * @func 客户登录
	 * @author zhangxianli
	 * @param str_UserName
	 * @param str_Random
	 * @return json格式的客户信息
	 */
	public String login(String str_UserName,String str_pass)
	{
		Connection dbConn = null;
		JSONObject obj_log_ret = new JSONObject();
		try {
			dbConn = getSqlServerConn();
			if(dbConn == null)
			{
				obj_log_ret.put("Code", 1);
			}
			else{
				String str_sqlCheckLogin = "update Login set loginstate=1 where loginstate=0 and username=? and password=?";
				PreparedStatement pmst_CheckLogin = dbConn.prepareStatement(str_sqlCheckLogin);
				pmst_CheckLogin.setString(1, str_UserName);
				pmst_CheckLogin.setString(2, str_pass);
				int i_ret = pmst_CheckLogin.executeUpdate();
				if(i_ret > 0){
					obj_log_ret.put("Code", 0);
				}
				else{
					obj_log_ret.put("Code", 1);
				}
				pmst_CheckLogin.close();
			}
			closeDB(dbConn);
		}catch(Exception e)
		{
			closeDB(dbConn);
			e.printStackTrace();
		}
		return obj_log_ret.toString();
	}
	/**
	 * @func 客户退出登录
	 * @author zhangxianli
	 * @time 2019.5.17
	 * @param userName
	 */
	public int logout(String userName){
		Connection dbConn = null;
		int i_ret = 0;
		try {
			dbConn = getSqlServerConn();
			if(dbConn != null)
			{
				String str_sqlCheckLogin = "update Login set LoginState=0 where loginstate=1 and username=?";
				PreparedStatement pmst_CheckLogin = dbConn.prepareStatement(str_sqlCheckLogin);
				pmst_CheckLogin.setString(1, userName);
				i_ret = pmst_CheckLogin.executeUpdate();
				pmst_CheckLogin.close();
			}
			closeDB(dbConn);
		}catch(Exception e)
		{
			closeDB(dbConn);
			e.printStackTrace();
		}
		return i_ret;
	}
	/**
	 * @func 获取主页信息 真实姓名，设备树
	 * @author zxl
	 * @param UserName
	 * @return
	 */
	public JSONObject GetMainPage(String UserName){
		Connection dbConn = null;
		JSONObject obj = new JSONObject();
		try {
			dbConn = getSqlServerConn();
			if(dbConn != null)
			{
				String str_sqlCheckLogin = "select realname,rootid,rootname from Login where username=?";
				PreparedStatement pmst_CheckLogin = dbConn.prepareStatement(str_sqlCheckLogin);
				pmst_CheckLogin.setString(1, UserName);
				ResultSet res = pmst_CheckLogin.executeQuery();
				if(res.next()){
					obj.put("realName", res.getString(1));
					obj.put("rootID", res.getString(2));
					obj.put("Group", res.getString(3));
				}
				res.close();
				pmst_CheckLogin.close();
			}
			closeDB(dbConn);
		}catch(Exception e)
		{
			closeDB(dbConn);
			e.printStackTrace();
		}
		return obj;
	}
	/**
	 * @func 获取立体防护左侧设备树
	 * @author zxl
	 * @param rootID
	 * @return
	 */
	public JSONObject GetDeviceTree(String rootID){
		ArrayList<MainTreeMenuNode> array = null;
		int i_AntiCount = 0;
		Connection dbConn = null;
		try {
			dbConn = getSqlServerConn();
			if(dbConn != null)
			{
				String str_sqlCheckLogin = "select nodeid,nodename,pid,treetable from maingroup where nodeid !=? start with nodeid=? connect by prior nodeid=pid";
				PreparedStatement pmst_CheckLogin = dbConn.prepareStatement(str_sqlCheckLogin);
				pmst_CheckLogin.setString(1, rootID);
				pmst_CheckLogin.setString(2, rootID);
				//System.out.println("str_sqlCheckLogin:" + str_sqlCheckLogin);
				//System.out.println("rootID:" + rootID);
				ResultSet res = pmst_CheckLogin.executeQuery();
				array = new ArrayList<MainTreeMenuNode>();
				while(res.next()){
					String str_NodeID = res.getString(1);
					String str_NodeName = res.getString(2);
					String str_Pid = res.getString(3);
					String str_treeTable = res.getString(4);
					MainTreeMenuNode node = new MainTreeMenuNode(str_NodeID,str_NodeName,str_treeTable,"");
					if(str_treeTable.compareTo("ANTICTRL") == 0){
						node.setIconCls("x-fa fa-shield");
						i_AntiCount ++;
					}
					else if(str_treeTable.compareTo("CAMERA") == 0){
						node.setIconCls("x-fa fa-camera");
					}
					else{
						node.setIconCls("x-fa fa-home");
					}
					MainTreeMenuNode pNode = GetClassTreeItem(array,str_Pid);
					if(pNode == null){
						array.add(node);
					}
					else{
						pNode.insertChildNode(node);
						pNode.setLeaf(false);
					}
					//JSONArray jsonarrIn = JSONArray.fromObject(array);
					//System.out.println("jsonarrIn:" + jsonarrIn);
				}
			}
			closeDB(dbConn);
		}catch(Exception e)
		{
			closeDB(dbConn);
			e.printStackTrace();
		}
		JSONObject objret = new JSONObject();
		objret.put("AntiCount", i_AntiCount);
		if(array != null){
			JSONArray arr = JSONArray.fromObject(array);
			objret.put("TreeIndex", arr);
		}
		return objret;
	}
	/**
	 * @func 遍历设备树类链表找到父节点
	 * @author zxl
	 * @param arr
	 * @param str_NodeID
	 * @return
	 */
	private MainTreeMenuNode GetClassTreeItem(ArrayList<MainTreeMenuNode> arr,String str_NodeID){
		if(arr == null || arr.size()==0 || str_NodeID.isEmpty()){
			//System.out.println("递归函数调用错误，参数不对:");
			return null;
		}
		MainTreeMenuNode retItem = null;
		for(int i=0 ; i<arr.size() ; i++)
		{
			MainTreeMenuNode getItem = arr.get(i);
			if(getItem.getNodeID().compareTo(str_NodeID) == 0){
				retItem = getItem;
			}
			else{
				if(getItem.getChildren() != null){
					retItem = GetClassTreeItem(getItem.getChildren(),str_NodeID);
				}
			}
		}
		//System.out.println("递归函数打印父级节点:" + retItem==null?"节点为null":retItem.getName());
		return retItem;
	}
	/**
	 * @func 从电池电压历史信息表中获取最新的电池电压信息
	 * @author zxl
	 * @return
	 */
	public JSONArray GetProtectBattNewInfo(String str_RootNodeID,int allNumber){
		JSONArray array = new JSONArray();
		Connection dbConn = null;
		try {
			dbConn = getSqlServerConn();
			if(dbConn != null)
			{
				String Str_Sql = "select ANTIID,battlevel,to_char(timestamp,'yyyy-MM-dd HH24:mi:ss') as CJtime from (select a.*,row_number() over (partition by a.antiid order by TIMESTAMP desc) as rn from batteryhisdata a ) where rn = 1 and antiid in (select nodeid from maingroup where nodeid !=? start with nodeid=? connect by prior nodeid=pid)";
				PreparedStatement pmst_CheckLogin = dbConn.prepareStatement(Str_Sql);
				pmst_CheckLogin.setString(1, str_RootNodeID);
				pmst_CheckLogin.setString(2, str_RootNodeID);
				ResultSet res = pmst_CheckLogin.executeQuery();
				//MainPageChartNode chartNode = new MainPageChartNode();
				int i_bigger13v = 0;
				int i_between11vTo13v = 0;
				int i_little11v = 0;
				
				int i_onLine = 0;
				int i_threeDayUnline = 0;
				int i_afterThreeDayUnline = 0;
				while(res.next()){
					//String str_AntiID = res.getString(1);
					float battVol = res.getFloat(2);
					String str_Time = res.getString(3);
					//统计电源状态
					if(battVol > 13){
						i_bigger13v ++;
					}
					else if(battVol < 11){
						i_little11v ++;
					}
					else{
						i_between11vTo13v ++;
					}
					//统计在线状态
					SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					Date now = new Date();
					try {
			            Date date = df.parse(str_Time);
			            //System.out.println(date);
			            if(now.getTime() - date.getTime() < 6*60*60*1000){
			            	i_onLine ++;
			            }
			            else if(now.getTime() - date.getTime() >= 6*60*60*1000 && now.getTime() - date.getTime() < 3*24*60*60*1000){
			            	i_threeDayUnline ++;
			            }
			            else{
			            	i_afterThreeDayUnline ++;
			            }
			        } catch(Exception px) {
			            px.printStackTrace();
			            continue;
			        }
				}
				JSONObject obj1 = new JSONObject();
				obj1.put("linename", "在线设备");
				obj1.put("linedata",i_onLine);
				array.add(obj1);
				JSONObject obj2 = new JSONObject();
				obj2.put("linename", "三天内离线");
				obj2.put("linedata",i_threeDayUnline);
				array.add(obj2);
				JSONObject obj3 = new JSONObject();
				obj3.put("linename", "三天前离线");
				obj3.put("linedata",i_afterThreeDayUnline);
				array.add(obj3);
				JSONObject obj4 = new JSONObject();
				obj4.put("linename", "未使用");
				obj4.put("linedata",allNumber-i_onLine-i_threeDayUnline-i_afterThreeDayUnline);
				array.add(obj4);
				JSONObject obj1_bett = new JSONObject();
				obj1_bett.put("battname", "13v↑");
				obj1_bett.put("battdata",i_bigger13v);
				array.add(obj1_bett);
				JSONObject obj2_bett = new JSONObject();
				obj2_bett.put("battname", "11v~13v");
				obj2_bett.put("battdata",i_between11vTo13v);
				array.add(obj2_bett);
				JSONObject obj3_bett = new JSONObject();
				obj3_bett.put("battname", "11v↓");
				//int i_ran = (int)(1+Math.random()*(10-1+1));
				obj3_bett.put("battdata",i_little11v);
				array.add(obj3_bett);
				JSONObject obj4_bett = new JSONObject();
				obj4_bett.put("battname", "未使用");
				obj4_bett.put("battdata",allNumber - i_little11v - i_between11vTo13v - i_bigger13v);
				array.add(obj4_bett);
			}
			closeDB(dbConn);
		}catch(Exception e)
		{
			closeDB(dbConn);
			e.printStackTrace();
		}
		
		return array;
	}
	/**
	 * @func 获取报警统计信息
	 * @author zxl
	 * @param str_RootNodeID
	 * @return
	 */
	public JSONArray GetProtectAlarmChart(String str_RootNodeID){
		
		JSONArray obj = new JSONArray();
		Connection dbConn = null;
		try {
			dbConn = getSqlServerConn();
			if(dbConn != null)
			{
				String str_getAlarmInfo = "select ALARMUNIT_TYPE,count(*) from antihisdata where end_timestamp is null and timestamp>TRUNC(SYSDATE-1) and ANTIID in (select nodeid from maingroup where nodeid !=? start with nodeid=? connect by prior nodeid=pid) group by ALARMUNIT_TYPE";
				PreparedStatement pmst_CheckLogin = dbConn.prepareStatement(str_getAlarmInfo);
				pmst_CheckLogin.setString(1, str_RootNodeID);
				pmst_CheckLogin.setString(2, str_RootNodeID);
				ResultSet res = pmst_CheckLogin.executeQuery();
				while(res.next()){
					JSONObject object = new JSONObject();
					int type = res.getInt(1);
					int count = res.getInt(2);
					switch(type){
					case 0:
						object.put("name", "水平扫描");
						object.put("data", count);
						break;
					case 1:
						object.put("name", "垂直扫描");
						object.put("data", count);
						break;
					case 2:
						object.put("name", "高压防触碰");
						object.put("data", count);
						break;
					case 3:
					default:
						object.put("name", "电子围栏");
						object.put("data", count);
					}
					obj.add(object);
				}
			}
			closeDB(dbConn);
		}catch(Exception e)
		{
			closeDB(dbConn);
			e.printStackTrace();
		}
		return obj;
	}
	/**
	 * @func 获取百度地图上施工地点的位置
	 * @time 2019.5.27
	 * @author zxl
	 * @param rootid
	 * @return
	 */
	public String GetMapMark(String rootid){
		String str_ret = null;
		Connection dbConn = null;
		try {
			dbConn = getSqlServerConn();
			if(dbConn != null)
			{
				String sql = "select name,x,y,id,cameraid from antictrl where id in (select nodeid from maingroup where nodeid !=? start with nodeid=? connect by prior nodeid=pid)";
				PreparedStatement pmst_CheckLogin = dbConn.prepareStatement(sql);
				pmst_CheckLogin.setString(1, rootid);
				pmst_CheckLogin.setString(2, rootid);
				ResultSet res = pmst_CheckLogin.executeQuery();
				JSONArray arr = new JSONArray();
				while(res.next()){
					String str_Name = res.getString(1);
					Float x = res.getFloat(2);
					Float y = res.getFloat(3);
					String strID = res.getString(4);
					String strCamID = res.getString(5);
					JSONObject obj = new JSONObject();
					obj.put("Name", str_Name);
					obj.put("x", x);
					obj.put("y", y);
					obj.put("id", strID);
					obj.put("CameraId", strCamID);
					arr.add(obj);
				}
				str_ret = arr.toString();
				res.close();
				pmst_CheckLogin.close();
				closeDB(dbConn);
			}
		}catch(Exception e)
		{
			closeDB(dbConn);
			e.printStackTrace();
		}
		return str_ret;
	}
	/**
	 * @func 获取节点的报警信息
	 * @author zxl
	 * @param str_id
	 * @return
	 */
	public ArrayList<MainNodeAlarmNode> GetNodeAlarm(String str_id){
		ArrayList<MainNodeAlarmNode> str_ret = new ArrayList<MainNodeAlarmNode>();
		Connection dbConn = null;
		try {
			dbConn = getSqlServerConn();
			if(dbConn != null)
			{
				String str_sql = "select antiid,to_char(timestamp,'yyyy-MM-dd hh24:mm:ss'),"
						+ "alarmunit_type,alarmno,acquisition_distance,alarm_picpath from "
						+ "(select a.*,row_number() over (partition by a.alarmunit_type order by timestamp desc ) as rn "
						+ "from antihisdata a where antiid=? and end_timestamp is null "
						+ "and timestamp>TRUNC(SYSDATE-1) ) where rn = 1";
				PreparedStatement pmst_CheckLogin = dbConn.prepareStatement(str_sql);
				pmst_CheckLogin.setString(1, str_id);
				ResultSet res = pmst_CheckLogin.executeQuery();
				while(res.next()){
					//String str_antiID = res.getString(1);
					String str_BegTime = res.getString(2);
					int i_alarm_type = res.getInt(3);
					int i_alarmNo = res.getInt(4);
					int i_alarmJL = res.getInt(5);
					String str_PicPath = res.getString(6);
					String str_Type = "";
					switch(i_alarm_type){
					case 0:
						str_Type = "水平扫描";
						break;
					case 1:
						str_Type = "垂直扫描";
						break;
					case 2:
						str_Type = "高压防触碰";
						break;
					case 3:
					default:
						str_Type = "电子围栏";
					}
					MainNodeAlarmNode nodealarm = new MainNodeAlarmNode(str_BegTime,str_Type,i_alarmNo,i_alarmJL,str_PicPath);
					str_ret.add(nodealarm);
				}
				closeDB(dbConn);
			}
		}catch(Exception e)
		{
			closeDB(dbConn);
			e.printStackTrace();
		}
		return str_ret;
	}
	/**
	 * @func 获取全部报警信息表的条目数
	 * @author zxl
	 * @param NodeID
	 * @return
	 */
	public int GetAllAlarmNum(String NodeID){
		//select count(*) from (select a.*,row_number() over (partition by a.antiid,a.alarmunit_type order by timestamp desc ) as rn from antihisdata a where end_timestamp is null and timestamp>TRUNC(SYSDATE-1) ) b,antictrl c where b.rn = 1 and b.antiid=c.id and c.id in (select nodeid from maingroup start with nodeid='DFEGWZDZXLKFCS0001' connect by prior nodeid=pid)
		int i_Ret = 0;
		Connection dbConn = null;
		try {
			dbConn = getSqlServerConn();
			if(dbConn != null)
			{
				//String str_Sql = "select count(*) from (select a.*,row_number() over (partition by a.antiid,a.alarmunit_type order by timestamp desc ) as rn from antihisdata a where end_timestamp is null and timestamp>TRUNC(SYSDATE-1) ) b,antictrl c where b.rn = 1 and b.antiid=c.id and c.id in (select nodeid from maingroup start with nodeid=? connect by prior nodeid=pid)";
				//这个sql语句是只取有照片的报警
				String str_Sql = "select count(*) from (select a.*,row_number() over (partition by a.antiid,a.alarmunit_type order by timestamp desc ) as rn from antihisdata a where end_timestamp is null and timestamp>TRUNC(SYSDATE-1) ) b,antictrl c where b.rn = 1 and b.antiid=c.id and c.id in (select nodeid from maingroup start with nodeid=? connect by prior nodeid=pid)";
				PreparedStatement pmst_CheckLogin = dbConn.prepareStatement(str_Sql);
				pmst_CheckLogin.setString(1, NodeID);
				//System.out.println("NodeID:" + NodeID);
				ResultSet res = pmst_CheckLogin.executeQuery();
				if(res.next()){
					i_Ret = res.getInt(1);
				}
				closeDB(dbConn);
			}
		}catch(Exception e)
		{
			closeDB(dbConn);
			e.printStackTrace();
		}
		return i_Ret;
	}
	/**
	 * @func 获取全部报警信息
	 * @author zxl
	 * @return
	 */
	public ArrayList<MainAllAlarmNode> GetAllAlarm(String NodeID,int start,int endrow){
		ArrayList<MainAllAlarmNode> alarmList = new ArrayList<MainAllAlarmNode>();
		Connection dbConn = null;
		try {
			dbConn = getSqlServerConn();
			if(dbConn != null)
			{
				String strSql = "select * from (select c.name,to_char(b.timestamp,'yyyy-MM-dd hh24:mm:ss') Mytime,b.alarmunit_type,b.alarmno,b.acquisition_distance,b.alarm_picpath,c.cameraid,rownum rowno from (select a.*,row_number() over (partition by a.antiid,a.alarmunit_type order by timestamp desc ) as rn from antihisdata a where end_timestamp is null and timestamp>TRUNC(SYSDATE-1) ) b,antictrl c where b.rn = 1 and b.antiid=c.id and c.id in (select nodeid from maingroup start with nodeid=? connect by prior nodeid=pid)) where rowno>? and rowno<?";
				PreparedStatement pmst_CheckLogin = dbConn.prepareStatement(strSql);
				pmst_CheckLogin.setString(1, NodeID);
				pmst_CheckLogin.setInt(2,start);
				pmst_CheckLogin.setInt(3,endrow);
				ResultSet res = pmst_CheckLogin.executeQuery();
				while(res.next()){
					String str_Name = res.getString(1);
					String str_BegTime = res.getString(2);
					int i_alarm_type = res.getInt(3);
					int i_alarmNo = res.getInt(4);
					int i_alarmJL = res.getInt(5);
					String str_PicPath = res.getString(6);
					String str_CamID = res.getString(7);
					String str_Type = "";
					switch(i_alarm_type){
					case 0:
						str_Type = "水平扫描";
						break;
					case 1:
						str_Type = "垂直扫描";
						break;
					case 2:
						str_Type = "高压防触碰";
						break;
					case 3:
					default:
						str_Type = "电子围栏";
					}
					MainAllAlarmNode nodealarm = new MainAllAlarmNode(str_Name,str_BegTime,str_Type,i_alarmNo,i_alarmJL,str_PicPath,str_CamID);
					alarmList.add(nodealarm);
				}
				closeDB(dbConn);
			}
		}catch(Exception e)
		{
			closeDB(dbConn);
			e.printStackTrace();
		}
		return alarmList;
	}
	/**
	 * @func 修改立体防护节点的信息
	 * @param nodeid
	 * @param nodename
	 * @param coorx
	 * @param coory
	 * @param cameraid
	 * @return
	 */
	public int MainTreeChage(String nodeid,String nodename,String coorx,String coory,String cameraid)
	{
		int i_ret = 0;
		Connection dbConn = null;
		try {
			dbConn = getSqlServerConn();
			if(dbConn != null)
			{
				String str_Sql = "update maingroup set nodename=? where nodeid=?";
				PreparedStatement pmst_CheckLogin = dbConn.prepareStatement(str_Sql);
				pmst_CheckLogin.setString(1, nodename);
				pmst_CheckLogin.setString(2, nodeid);
				i_ret = pmst_CheckLogin.executeUpdate();
				if(i_ret > 0){
					str_Sql = "update antictrl set name=?,x=?,y=?,cameraid=? where id=?";
					PreparedStatement pmst_anti = dbConn.prepareStatement(str_Sql);
					pmst_anti.setString(1, nodename);
					pmst_anti.setString(2, coorx);
					pmst_anti.setString(3, coory);
					pmst_anti.setString(4, cameraid);
					pmst_anti.setString(5, nodeid);
					i_ret = pmst_anti.executeUpdate();
				}
				pmst_CheckLogin.close();
			}
			closeDB(dbConn);
		}
		catch(Exception e)
		{
			closeDB(dbConn);
			e.printStackTrace();
		}
		return i_ret;
	}
	/**
	 * @function 关闭数据库连接池
	 * @param dbConn
	 */
	private void closeDB(Connection dbConn)
	{
		if(dbConn != null)
		{
			try{
				dbConn.close();
				dbConn = null;
			}catch(Exception e1)
			{
				System.out.println("关闭数据库连接池抛出异常");
				e1.printStackTrace();
			}
		}
	}
}