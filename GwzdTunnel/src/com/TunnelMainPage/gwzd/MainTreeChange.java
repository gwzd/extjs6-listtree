package com.TunnelMainPage.gwzd;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.TunnelTools.gwzd.DBTool;
import com.opensymphony.xwork2.ActionSupport;

public class MainTreeChange extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String nodeID;
	private String nodeName;
	private String coorX;
	private String coorY;
	private String cameraID;
	private boolean success;
	public String execute(){
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		//String str_UserName = session.getAttribute("UserName")!=null?session.getAttribute("UserName").toString():"";
		Boolean b_Online = session.getAttribute("Online")!=null?(Boolean)session.getAttribute("Online"):false;
		if(b_Online){
			if(nodeID != null && !nodeID.isEmpty()){
				DBTool dbt = new DBTool();
				int i_ret = dbt.MainTreeChage(nodeID, nodeName, coorX, coorY, cameraID);
				if(i_ret > 0){
					setSuccess(true);
				}
				else{
					setSuccess(false);
				}
			}
		}
		else{
			setSuccess(false);
		}
		return SUCCESS;
	}
	public String getNodeID() {
		return nodeID;
	}
	public void setNodeID(String nodeID) {
		this.nodeID = nodeID;
	}
	public String getNodeName() {
		return nodeName;
	}
	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}
	public String getCoorX() {
		return coorX;
	}
	public void setCoorX(String coorX) {
		this.coorX = coorX;
	}
	public String getCoorY() {
		return coorY;
	}
	public void setCoorY(String coorY) {
		this.coorY = coorY;
	}
	public String getCameraID() {
		return cameraID;
	}
	public void setCameraID(String cameraID) {
		this.cameraID = cameraID;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}


}
