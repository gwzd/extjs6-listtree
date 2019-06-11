package com.TunnelMainPage.gwzd;

import java.util.ArrayList;

public class MainTreeMenuNode {
	
	private String text;
	private String nodeID;
	private String treeTable;
	private ArrayList<MainTreeMenuNode> children;
	private String iconCls;
	private boolean leaf;
	
	public MainTreeMenuNode(String str_nodeID,String str_name,String str_treeTable,String str_Icon){
		setText(str_name);
		nodeID = str_nodeID;
		treeTable = str_treeTable;
		leaf = true;
		this.iconCls = str_Icon;
	}


	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public String getNodeID() {
		return nodeID;
	}

	public void setNodeID(String nodeID) {
		this.nodeID = nodeID;
	}

	public String getTreeTable() {
		return treeTable;
	}

	public void setTreeTable(String treeTable) {
		this.treeTable = treeTable;
	}

	public ArrayList<MainTreeMenuNode> getChildren() {
		return children;
	}

	public void setChildren(ArrayList<MainTreeMenuNode> children) {
		this.children = children;
	}

	public void insertChildNode(MainTreeMenuNode cNode){
		if(this.children == null){
			this.children = new ArrayList<MainTreeMenuNode>();
		}
		this.children.add(cNode);
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}


	public String getIconCls() {
		return iconCls;
	}


	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
}
