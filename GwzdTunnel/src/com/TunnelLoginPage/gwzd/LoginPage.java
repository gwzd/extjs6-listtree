package com.TunnelLoginPage.gwzd;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.TunnelTools.gwzd.DBTool;
import com.opensymphony.xwork2.ActionSupport;
public class LoginPage extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private String userName;
	private String userPass;
	private boolean logMark;
	private boolean success;
	
	public String execute()
	{
		DBTool dbt = new DBTool();
		System.out.println("登录退出标记:"+logMark);
		if(!logMark){
			String LoginRet = dbt.login(userName, userPass);
			//System.out.println(LoginRet);
			try{
				JSONObject obj = JSONObject.fromObject(LoginRet);
				HttpServletRequest request = ServletActionContext.getRequest();
				HttpSession session = request.getSession();
				session.setMaxInactiveInterval(60*10);
				if(obj.getInt("Code") == 0){
					session.setAttribute("Online", true);
					session.setAttribute("UserName", userName);
					setSuccess(true);
				}
				else{
					//用户名密码验证失败
					session.setAttribute("Online", false);
					setSuccess(false);
				}
			}
			catch(Exception e){
				e.printStackTrace();
			}
		}
		else{
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			String str_UserName = session.getAttribute("UserName")!=null?session.getAttribute("UserName").toString():"";
			if(!str_UserName.isEmpty()){
				int i_ret = dbt.logout(str_UserName);
				if(i_ret > 0){
					setSuccess(true);
				}
				else{
					setSuccess(false);
				}
			}
			else{
				setSuccess(true);
			}
		}
		return SUCCESS;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPass() {
		return userPass;
	}
	public void setUserPass(String userPass) {
		this.userPass = userPass;
	}
	public boolean isLogMark() {
		return logMark;
	}
	public void setLogMark(boolean logMark) {
		this.logMark = logMark;
	}
}
