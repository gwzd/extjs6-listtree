package com.TunnelMainPage.gwzd;

import java.util.ArrayList;


import com.TunnelTools.gwzd.DBTool;
import com.opensymphony.xwork2.ActionSupport;

public class MainAllAlarm extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String nodeID;
	private ArrayList<MainAllAlarmNode> root;
	private int total;//总计多少条
	private int page;//第几页
	private int start;//初始条数  0 开始
	private int limit;//每页多少条
	private boolean success;
	public String execute(){
		if(nodeID != null && !nodeID.isEmpty()){
			DBTool dbt = new DBTool();
			total = dbt.GetAllAlarmNum(nodeID);
			if(total > 0){
				root = dbt.GetAllAlarm(nodeID,start,page*limit + 1);
				if(root.size() > 0){
					setSuccess(true);
				}
				else{
					setSuccess(false);
				}
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
	public ArrayList<MainAllAlarmNode> getRoot() {
		return root;
	}
	public void setRoot(ArrayList<MainAllAlarmNode> root) {
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
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}

}
