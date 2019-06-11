package com.TunnelMainPage.gwzd;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import net.sf.json.JSONObject;

import com.TunnelTools.gwzd.DBTool;
import com.opensymphony.xwork2.ActionSupport;

public class MainPage extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String realName;
	private String rootNode;
	private String group;
	private int antiCount;
	private String nodelist;
	public String execute(){
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		String str_UserName = session.getAttribute("UserName")!=null?session.getAttribute("UserName").toString():"";
		Boolean b_Online = session.getAttribute("Online")!=null?(Boolean)session.getAttribute("Online"):false;

		if(b_Online){
			try{
				DBTool dbt = new DBTool();
				JSONObject obj = dbt.GetMainPage(str_UserName);
				realName = obj.containsKey("realName")?obj.getString("realName"):"";
				rootNode = obj.containsKey("rootID")?obj.getString("rootID"):"";
				group = obj.containsKey("Group")?obj.getString("Group"):"";
				JSONObject getObj = dbt.GetDeviceTree(rootNode);
				antiCount = getObj.containsKey("AntiCount")?getObj.getInt("AntiCount"):0;
				nodelist = getObj.containsKey("TreeIndex")?getObj.getJSONArray("TreeIndex").toString():"";
				//nodelist = nodelist.replace("\"", "'");
				//System.out.println("nodelist:" + nodelist);
				return SUCCESS;
			}
			catch(Exception e){
				e.printStackTrace();
				return ERROR;
			}
		}
		else{
			return ERROR;
		}
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getRootNode() {
		return rootNode;
	}
	public void setRootNode(String rootNode) {
		this.rootNode = rootNode;
	}
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
	public int getAntiCount() {
		return antiCount;
	}
	public void setAntiCount(int antiCount) {
		this.antiCount = antiCount;
	}
	public String getNodelist() {
		return nodelist;
	}
	public void setNodelist(String nodelist) {
		this.nodelist = nodelist;
	}

}
