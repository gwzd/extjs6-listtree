package com.TunnelMainPage.gwzd;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import net.sf.json.JSONArray;

import com.TunnelTools.gwzd.DBTool;
import com.opensymphony.xwork2.ActionSupport;

public class MainPageAlarm extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String rootID;
	private String chartData;
	private boolean success;
	
	public String execute()
	{
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(60*10);
		//String str_UserName = session.getAttribute("UserName")!=null?session.getAttribute("UserName").toString():"";
		Boolean b_Online = session.getAttribute("Online")!=null?(Boolean)session.getAttribute("Online"):false;
		//System.out.println("定时获取报警信息:" + b_Online);
		if(b_Online){
			DBTool dbt = new DBTool();
			JSONArray arr = dbt.GetProtectAlarmChart(rootID);
			//System.out.println("arr:" + arr.size());
			if(arr.size() > 0){
				chartData = arr.toString();
				setSuccess(true);
			}
			else{
				setSuccess(false);
			}
		}
		else
		{
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

}
