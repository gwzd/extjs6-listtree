package com.TunnelMainPage.gwzd;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import net.sf.json.JSONArray;

import com.TunnelTools.gwzd.DBTool;
import com.opensymphony.xwork2.ActionSupport;

public class MainNodeAlarm extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String nodeID;
	private ArrayList<MainNodeAlarmNode> root;
	private int total;//总计多少条
	private int page;//第几页
	private int start;//初始条数  0 开始
	private int limit;//每页多少条
	private boolean success;
	public String execute(){
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		//String str_UserName = session.getAttribute("UserName")!=null?session.getAttribute("UserName").toString():"";
		Boolean b_Online = session.getAttribute("Online")!=null?(Boolean)session.getAttribute("Online"):false;
		if(b_Online){
			DBTool dbt = new DBTool();
			root = dbt.GetNodeAlarm(nodeID);
			if(root != null && root.size() > 0){
				setTotal(root.size());
				setPage(root.size()/limit + 1);
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
	public String getNodeID() {
		return nodeID;
	}
	public void setNodeID(String nodeID) {
		this.nodeID = nodeID;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public ArrayList<MainNodeAlarmNode> getRoot() {
		return root;
	}
	public void setRoot(ArrayList<MainNodeAlarmNode> root) {
		this.root = root;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}

}
