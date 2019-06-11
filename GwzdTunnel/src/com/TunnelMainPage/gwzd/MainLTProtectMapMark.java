package com.TunnelMainPage.gwzd;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.TunnelTools.gwzd.DBTool;
import com.opensymphony.xwork2.ActionSupport;

public class MainLTProtectMapMark extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String rootID;
	private boolean success;
	private String mark;
	public String execute(){
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		//String str_UserName = session.getAttribute("UserName")!=null?session.getAttribute("UserName").toString():"";
		Boolean b_Online = session.getAttribute("Online")!=null?(Boolean)session.getAttribute("Online"):false;
		//System.out.println("打印Session里面的Username:" + str_UserName);
		if(b_Online){
			DBTool dbt = new DBTool();
			mark = dbt.GetMapMark(rootID);
			if(mark != null && !mark.isEmpty()){
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
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}

}
