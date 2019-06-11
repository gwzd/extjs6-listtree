package com.TunnelMainPage.gwzd;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import net.sf.json.JSONArray;

import com.TunnelTools.gwzd.DBTool;
import com.opensymphony.xwork2.ActionSupport;


public class MainTreeMenu extends ActionSupport {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String rootID;
	private String chartData;
	private int allNumber;
	private boolean success;

	public String execute()
	{
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		//String str_UserName = session.getAttribute("UserName")!=null?session.getAttribute("UserName").toString():"";
		Boolean b_Online = session.getAttribute("Online")!=null?(Boolean)session.getAttribute("Online"):false;
		//System.out.println("定时获取报警信息:" + str_UserName);
		if(b_Online){
			DBTool dbt = new DBTool();
			JSONArray obj = dbt.GetProtectBattNewInfo(rootID,allNumber);
			if(obj.size() > 0){
				chartData = obj.toString();
				setSuccess(true);
			}
			else{
				setSuccess(false);
			}
		}
		else{
			setSuccess(false);
		}
		return SUCCESS;
	}
	public String getRootID() {
		return rootID;
	}

	public void setRootID(String rootID) {
		this.rootID = rootID;
	}
	public String getChartData() {
		return chartData;
	}
	public void setChartData(String chartData) {
		this.chartData = chartData;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public int getAllNumber() {
		return allNumber;
	}
	public void setAllNumber(int allNumber) {
		this.allNumber = allNumber;
	}
}
