var ShowErrorWin = Ext.create('Ext.window.Window', {
    title: '<font size="3" color="#ffffff"><B>提醒</B></font>',
    id:'ShowErrorWin',
    height: 180,
    width: 230,
    resizable:false,
    titleAlign:'center',
    closeAction:'hide',
    closable:false,
    layout: 'vbox',
    border:false,
    header:{
    	cls:'gwThemeBtnBackground'
    },
    tools:[{
	    	cls:'x-fa fa-close',
	    	handler:function(){
	    		this.up('window').hide();
	    	}
	    }
    ],
    items: [
    	{
    		xtype:'panel',
    		width:'100%',
    		flex:1,
    		border:false,
    		layout: {
		        type:'hbox',
		        align:'middle',
		        pack:'center'
		    },
    		items:[
	    		{
		    		xtype:'image',
		    		width:50,
					height:50,
					src:'./MyImage/alarm.png'
	    		},
	    		{
    				xtype:'tbtext',
    				text:'提醒信息!'
    			}
			]
    	},
    	{
    		xtype:'panel',
    		width:'100%',
    		height:50,
    		border:false,
    		layout: {
		        type:'hbox',
		        align:'middle',
		        pack:'center'
		    },
    		items:[
	    		{
		    		xtype:'button',
		    		text:'确定',
		    		icon:'./MyImage/ok.png',
			        cls:'gwThemeBtnBackground',
			        handler: function() {
			            this.up('window').hide();
			        }
	    		},
	    		{
    				xtype:'button',
		    		text:'取消',
		    		icon:'./MyImage/cancel.png',
			        cls:'gwThemeBtnBackground',
			        handler: function() {
			            this.up('window').hide();
			        }
    			}
			]
    	}
	]
});
/**
 * @author zxl
 * @func 禁止回退
 */
function disablePageBack() { //消除后退的所有动作。包括 键盘、鼠标手势等产生的后退动作。，用户登录到系统中后，浏览器回退按钮失效，只能点击退出按钮退出系统！
	history.pushState(null, null, document.URL); 
	window.addEventListener('popstate', function () { 
		history.pushState(null, null, document.URL); 
	}); 
};
/**
 * @func 统计设备树里面各个区域的设备数量
 * @author zxl
 * @time 2019.5.27
 */

function DeviceChar(){
	var TreeChildItem = Ext.decode(nodelist);
	var DeviceFBData = new Array();
	for(var i=0 ; i < TreeChildItem.length ; i++){
		if(TreeChildItem[i].treeTable == 'AREACTRL'){
			var i_CNodeCount = TreeChildItem[i].children.length;
			//console.log("i_CNodeCount:" + i_CNodeCount);
			var row1 = {};
			row1.Devname = TreeChildItem[i].text;
			row1.Devdata = i_CNodeCount;
			DeviceFBData.push(row1);
		}
	}
	//console.dir(DeviceFBData);
	Ext.getCmp('MainViewport').getComponent('mainCenter').getComponent('mainCenterFirstPage').getComponent('mainCenterFirstPageUp')
	    			.getComponent('mainCenterFirstPageUpDeviceFB').getComponent('mainCenterFirstPageUpDeviceFBChart').getStore().setData(DeviceFBData);
}
/**
 * 统计信息
 */
//var ChartData;
function GetChartData(){
	Ext.Ajax.request({
		url: 'MainTree.action',
		timeout:6000,
		params:{rootID:rootNode,allNumber:antiCount},
		success: function(response, opts) {
	    	var obj = Ext.decode(response.responseText);
		    var chartInfo = Ext.decode(obj.chartData);
		    var OnLineChart = new Array();
		    var BettChart = new Array();
		    Ext.getCmp('MainViewport').getComponent('mainCenter').getComponent('mainCenterFirstPage').getComponent('mainCenterFirstPageUp')
	    			.getComponent('mainCenterFirstPageUpDeviceState').getComponent('mainCenterFirstPageUpDeviceStateForm').removeAll();
		    for(var i=0 ; i<chartInfo.length/2 ; i++){
				OnLineChart[i] = chartInfo[i];
				var CLabel = chartInfo[i].linename;
				var Cvalue = chartInfo[i].linedata;
				var Citem = {
			        fieldLabel: '<font size="4" color="#006569"><B><B>'+CLabel + '</B></B></font>',
			        labelAlign:'right',
        			labelWidth:230,
			        value:'<font size="4" color="#bfc016"><B><B>'+Cvalue + '</B></B></font>'
			    };
			    
			    Ext.getCmp('MainViewport').getComponent('mainCenter').getComponent('mainCenterFirstPage').getComponent('mainCenterFirstPageUp')
	    			.getComponent('mainCenterFirstPageUpDeviceState').getComponent('mainCenterFirstPageUpDeviceStateForm').add(Citem);
			}
			
			Ext.getCmp('MainViewport').getComponent('mainCenter').getComponent('mainCenterFirstPage').getComponent('mainCenterFirstPageUp')
	    			.getComponent('mainCenterFirstPageUpBettState').getComponent('mainCenterFirstPageUpBettStateForm').removeAll();
			for(var j=chartInfo.length/2 ; j<chartInfo.length ; j++){
				BettChart[j-chartInfo.length/2] = chartInfo[j];
				var CLabel = chartInfo[j].battname;
				var Cvalue = chartInfo[j].battdata;
				var Citem = {
			        fieldLabel: '<font size="4" color="#006569"><B><B>'+CLabel + '</B></B></font>',
			        labelAlign:'right',
        			labelWidth:230,
			        value:'<font size="4" color="#bfc016"><B><B>'+Cvalue + '</B></B></font>'
			    };
			    Ext.getCmp('MainViewport').getComponent('mainCenter').getComponent('mainCenterFirstPage').getComponent('mainCenterFirstPageUp')
	    			.getComponent('mainCenterFirstPageUpBettState').getComponent('mainCenterFirstPageUpBettStateForm').add(Citem);
			}
			//console.log(BettChart);
	    	Ext.getCmp('MainViewport').getComponent('mainCenter').getComponent('mainCenterFirstPage').getComponent('mainCenterFirstPageUp')
	    			.getComponent('mainCenterFirstPageUpDeviceState').getComponent('mainCenterFirstPageUpDeviceStateChart')
	    			.getStore().setData(OnLineChart);
			Ext.getCmp('MainViewport').getComponent('mainCenter').getComponent('mainCenterFirstPage').getComponent('mainCenterFirstPageUp')
	    			.getComponent('mainCenterFirstPageUpBettState').getComponent('mainCenterFirstPageUpBettStateChart')
	    			.getStore().setData(BettChart);
			
		},
		failure: function(response, opts) {
		    console.log('server-side failure with status code ' + response.status);
		}
	});
}

/**
 * @func 获取报警信息
 * @author zxl
 */
function GetAlarmChart(){
	//console.log('获取报警统计图!');
	Ext.Ajax.request({
		url: 'AlarmChart.action',
		timeout:6000,
		params:{rootID:rootNode},
		success: function(response, opts) {
			var obj = Ext.decode(response.responseText);
			if(obj.success){
			    var chartInfo = Ext.decode(obj.chartData);
			    Ext.getCmp('MainViewport').getComponent('mainCenter').getComponent('mainCenterFirstPage').getComponent('mainCenterFirstPageUp')
		    			.getComponent('mainCenterFirstPageUpAlarm').getComponent('mainCenterFirstPageUpAlarmChart')
		    			.getStore().setData(chartInfo);
		    	
			}
			else{
				Ext.getCmp('MainViewport').getComponent('mainCenter').getComponent('mainCenterFirstPage').getComponent('mainCenterFirstPageUp')
		    			.getComponent('mainCenterFirstPageUpAlarm').getComponent('mainCenterFirstPageUpAlarmChart')
		    			.getStore().setData([]);
			}
		},
		failure: function(response, opts) {
		    console.log('server-side failure with status code ' + response.status);
		}
	});
	//循环 
	Ext.defer(function(){
		 GetAlarmChart();   
	}, 1000*60*5);//1000*60*3
}
/**
 * @func 报警处理
 * @param {} id
 * @param {} mark
 */
function HandlerAlarm(id,mark){
	//AlarmHandler
	Ext.Ajax.request({
		url: 'AlarmHandler.action',
		timeout:6000,
		params:{alarmID:id,alarmMark:mark},
		success: function(response, opts) {
			var obj = Ext.decode(response.responseText);
			if(obj.success){
			   AllAlarmStore.loadPage(1);
			}
			else{
				ShowErrorWin.show();
            	ShowErrorWin.down('image').setSrc('./MyImage/error.png');
            	ShowErrorWin.down('tbtext').setText('操作失败!');
			}
		},
		failure: function(response, opts) {
		    ShowErrorWin.show();
        	ShowErrorWin.down('image').setSrc('./MyImage/error.png');
        	ShowErrorWin.down('tbtext').setText('操作失败!');
		}
	});
}
/**
 * @func 获取全部报警信息
 * @author zxl
 * @time 2019.5.29
 */
var AllAlarmStore = Ext.create('Ext.data.Store', {
    fields: ['alarmName','alarmTime', 'alarmType', 'alarmNo','alarmJL','alarmPicPath','cameraID','alarmID'],
    pageSize: 6,
    proxy: {
         type: 'ajax',
         url: 'AllAlarm.action',
         reader: {
             type: 'json',
             rootProperty: 'root',
             totalProperty: 'total'
         },
         extraParams:{nodeID:rootNode}
     }
});
var ShowAllAlarmWin = Ext.create('Ext.window.Window', {
    title: '<font size="3" color="#ffffff"><B>报警列表</B></font>',
    //id:'ShowMarkInfoID',
    height: 340,
    width: 600,
    resizable:false,
    titleAlign:'center',
    closeAction:'hide',
    closable:false,
    layout: 'fit',
    border:false,
    header:{
    	cls:'gwThemeBtnBackground'
    },
    tools:[{
	    	cls:'x-fa fa-close',
	    	handler:function(){
	    		this.up('window').hide();
	    	}
	    }
    ],
    items: [{
	    xtype:'grid',
	    store: AllAlarmStore,
	    selModel: {
	        type: 'rowmodel'
	    },
		columns: [
			{ text: '点位',width:140, dataIndex: 'alarmName' },
		    { text: '时间',width:150, dataIndex: 'alarmTime' },
			{ text: '类型',width:80, dataIndex: 'alarmType'},
			{ text: '序号', dataIndex: 'alarmNo',width:60},
			{ text: '距离(m)', dataIndex: 'alarmJL',width:50},
			{ text: '图片', dataIndex: 'alarmPicPath',hidden:true,sortable: false,hideable: false},
			{ text: '视频', dataIndex: 'cameraID',hidden:true,sortable: false,hideable: false},
			{ text: 'AlarmID', dataIndex: 'alarmID',hidden:true,sortable: false,hideable: false},
			{ 
				width:50,
				text:'展示',
				xtype: 'actioncolumn',
				sortable: false,
				hideable: false,
				items:[
					{
						iconCls:'x-fa fa-picture-o',
						handler: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            //console.log("alarmPicPath",rec.get("alarmPicPath"));
                            var alarmPicPath = rec.get("alarmPicPath");
                            //console.log('alarmPicPath',alarmPicPath);
                            if(alarmPicPath != null && alarmPicPath != ''){
                            	var SrcPath = 'showPic.action?imagePath=' + alarmPicPath;
                                imageShowWindow.getComponent("ImageShowWinImage").setSrc(SrcPath);
                                imageShowWindow.show();
                            }
                            else{
                            	ShowErrorWin.show();
			                	ShowErrorWin.down('image').setSrc('./MyImage/error.png');
			                	ShowErrorWin.down('tbtext').setText('该报警尚未上传报警图片!');
                            }
                        }
					},
					{
						iconCls:'x-fa fa-camera',
						handler: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            //console.log("alarmPicPath",rec.get("alarmPicPath"));
                            var video = rec.get("cameraID");
                            //console.log('alarmPicPath',alarmPicPath);
                            if(video != null && video != ''){
                            	PlayVideo(video);
                            }
                            else{
                            	ShowErrorWin.show();
			                	ShowErrorWin.down('image').setSrc('./MyImage/error.png');
			                	ShowErrorWin.down('tbtext').setText('该设备尚未绑定摄像机!');
                            }
                        }
					}
				]
			},
			{
				width:50,
				text:'处理',
				sortable: false,
				hideable: false,
				xtype: 'actioncolumn',
				items:[
					{
						iconCls:'x-fa fa-exclamation-circle',
						handler: function (grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);
							var AlarmID = rec.get("alarmID");
							//console.log('alarmID:' , AlarmID);
							HandlerAlarm(AlarmID,2);	//隐患
						}
					},
					{
						iconCls:'x-fa fa-check-circle',
						handler: function (grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);
							var AlarmID = rec.get("alarmID");
							//console.log('alarmID:' , AlarmID);
							HandlerAlarm(AlarmID,1);	//普通处理
						}
					}
				]
			}
		],
        dockedItems: [
        	{
		        xtype: 'pagingtoolbar',
		        store: AllAlarmStore, 
		        dock: 'bottom',
		        displayInfo: true
		    }
        ]
	}]
});
function GetAlarmAllTable()
{
	AllAlarmStore.loadPage(1);
	ShowAllAlarmWin.show();
}

Ext.onReady(function() {

	Ext.BLANK_IMAGE_URL = "${pageContext.request.contextPath}/extjs6/build/resources/images/default/s.gif";
	Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    //Ext.Ajax.timeout=300000;//设置ajax的超时时间为5分钟
    nodelist = nodelist.replace(/&quot;/g,"'");
    var TreeChildItem = Ext.decode(nodelist);
    //var csItem = [{'iconCls':'x-fa fa-home','leaf':false,'nodeID':'YanQingQu','text':'延庆区','treeTable':'AREACTRL'}];
    
    var Cstore = Ext.create('Ext.data.TreeStore', {
		//model: 'myApp.FirstLevel',
	    root: {
	        expanded: true,
	        text: '立体防护',
	        children: TreeChildItem
	    }
	});
	
	new Ext.Viewport({
    	id:'MainViewport',
		layout:"border",
		items:
		[
			{
				itemId:'MainNorth',
				region:"north",
				bodyStyle:'background:#006569;',
				border:false,
				bodyBorder:false,
				//split:true,
				height:80,
				layout: {
			        type:'hbox',
			        align:'middle',
			        pack:'start'
			    },
			    items:[
			    	{
			    		xtype:'image',
			    		src:'./MyImage/gwzd_white.png',
			    		width:150,
			    		height:70
			    	},
			    	{
			    		xtype:'tbtext',
			    		text:'<font size="6" color="#fff"><B><B>国网中电立体安防平台</B></B></font>'
			    	},
			    	{
			    		xtype:'panel',
			    		flex:1,
			    		height:40,
			    		bodyStyle:'background:#006569',
			    		border:false,
			    		layout: {
					        type:'hbox',
					        align:'middle',
					        pack:'end'
					    },
					    items:[
					    	/*{
					    		xtype:'panel',
					    		width:40,
					    		height:40,
					    		layout:'absolute',
					    		bodyStyle:{
					    			background:'#006569',
					    			cursor: 'pointer'
				    			},
			    				border:false,
					    		items:[
					    			{
					    				xtype:'image',
					    				x:0,
					    				y:0,
					    				width:40,
					    				height:40,
					    				src:'./MyImage/alarm.png'
					    			},
					    			{
					    				xtype:'tbtext',
					    				width:16,
					    				height:16,
					    				x:19,
					    				y:4,
					    				text:'<font color="#f00"><B><B>0</B></B></font>'
					    			}
					    		]
					    	},*/
					    	{
					    		xtype:'tbtext',
					    		width:30
					    	},
					    	{
					    		xtype:'button',
					    		arrowAlign: 'right',
					    		text:realName,
					    		border:false,
					    		style:{
					    			background:'#006569'
					    		},
					    		icon:'./MyImage/user.png',
							    menu : [
							        {text: '设置',icon:'./MyImage/set.png'},
							        {text: '退出',icon:'./MyImage/exit.png',listeners:{
							        	'click':function(){
								        	Ext.Ajax.request({
												url: 'login.action',
												params: { logMark:true },
												method: 'post',
												success: function(response, opts) {
												    document.location = 'Userlogin.action';
												},
												failure: function(response, opts){
													console.log('系统退出失败!');
												}
											});
							        	}
							        }}
							    ]
					    	},
					    	{
					    		xtype:'tbtext',
					    		width:50
					    	}
					    ]
			    	}
			    ]
			},
			{
				xtype:"panel",
				region:'west',
				width:220,
				title:'<font size="3" color="#fff"><B><B>'+group+'</B></B></font>',
				itemId:'MainWest',
				bodyBorder:false,
				border:false,
				hideCollapseTool:true,
				split:true,
				collapsible: true,
				useArrows:true,
				autoScroll:true,
				collapseMode:'mini',
				bodyStyle:'background:#0a4a4b;',
				//layout:'fit',
				header:{
					cls:'IndexTreeMenuHead',
					icon:'./MyImage/expand_White.png'
				},
				items:[
					{
						xtype:'treelist',
						listeners: {
					        itemClick:function( thisNode, record, item, index, e, eOpts) {
					        	SetSelectMark(record.node.data.nodeID);
				            }
						},
						rootVisible:false,
						store: Cstore
					}
				]
			},
			{
				region:'center',
				xtype:'tabpanel',
				itemId:'mainCenter',
				listeners: {
			        beforetabchange: function(tabs, newTab, oldTab) {
			            //return newTab.title != 'P2';
			        }
			    },
			    items: [
			    	{
				        title: '首页',
				        iconCls:'x-fa fa-home',
				        itemId:'mainCenterFirstPage',
				        closable:false,
				        layout:{
				        	type:'vbox',
				        	align:'center',
			        		pack:'begin'
				        },
				        items:[
				        	{
				        		width:'100%',
				        		height:240,
				        		itemId:'mainCenterFirstPageUp',
				        		layout:{
						        	type:'hbox',
						        	align:'middle',
					        		pack:'start'
						        },
						        items:[
						        	{
						        		title:'设备分布',
						        		itemId:'mainCenterFirstPageUpDeviceFB',
						        		header:{
						        			cls:'gwThemePaneltitleBackground'
						        		},
						        		flex:1,
						        		height:'100%',
						        		labelAlign:'right',
						        		titleAlign:'center',
						        		margin: '0 10 0 10',
						        		layout:'fit',
						        		items:[
						        			{
						        				xtype: 'polar',
										    	itemId:'mainCenterFirstPageUpDeviceFBChart',
										    	width: "70%",
   												height: "70%",
   												interactions: 'rotate',
												store: {
												    fields: ['Devname', 'Devdata']
												},
												series: {
												    type: 'pie3d',
												    showInLegend: true,
												    highlight: true,//鼠标滑过的时候有特殊标记
												    angleField: 'Devdata',
												    donut: 20,
												    label:{
												    	field:'Devname'
												    },
												    tooltip: {
														trackMouse: true,
														renderer: function (tooltip, record, item) {
															var value = record.get('Devdata');
															tooltip.setHtml(record.get('Devname') + ': ' + value + '套');
														}
													},
													listeners: {
														itemmouseover:function ( series, item, event, eOpts ) 
														{
															console.log('事件itemmouseover');
														}
													}
												}
											}
						        		]
						        	},
						        	{
						        		title:'设备状态',
						        		itemId:'mainCenterFirstPageUpDeviceState',
						        		header:{
						        			cls:'gwThemePaneltitleBackground'
						        		},
						        		tools:[
						        			{
						        				type:'refresh',
						        				callback: function() {
										            GetChartData();
										        }
					        				}
					        			],
						        		flex:1,
						        		height:'100%',
						        		labelAlign:'right',
						        		titleAlign:'center',
						        		margin: '0 10 0 10',
						        		layout:'hbox',
						        		items:[
						        			{
								        		layout: 'form',
								        		itemId:'mainCenterFirstPageUpDeviceStateForm',
								        		defaultType: 'displayfield',
								        		//bodyStyle:'background-color:#0a4a4d !important;',
								        		height:'100%',
								        		items: []
						        			},
						        			{
										    	flex:1,
										    	xtype: 'polar',
										    	itemId:'mainCenterFirstPageUpDeviceStateChart',
										    	width:'100%',
										    	height:'100%',
										    	animate: true,
												//theme: '#006569',
												interactions: ['rotate'],
												store: {
												    fields: ['linename', 'linedata']
												    //data: ChartStoreData
												},
												series: {
												    type: 'pie3d',
												    showInLegend: true,
												    highlight: true,//鼠标滑过的时候有特殊标记
												    angleField: 'linedata',
												    donut: 20,
												    label:{
												    	field:'linename'
												    },
												    tooltip: {
														trackMouse: true,
														renderer: function (tooltip, record, item) {
															var value = ((parseFloat(record.get('linedata') / record.store.sum('linedata')) * 100.0).toFixed(2));
															tooltip.setHtml(record.get('linename') + ': ' + value + '%');
														}
													}
												}
						        			}
					        			]
						        	},
						        	{
						        		title:'电量信息',
						        		tools:[
						        			{
						        				type:'refresh',
						        				callback: function() {
										            GetChartData();
										        }
					        				}
					        			],
						        		itemId:'mainCenterFirstPageUpBettState',
						        		header:{
						        			cls:'gwThemePaneltitleBackground'
						        		},
						        		flex:1,
						        		height:'100%',
					        			margin: '0 10 0 10',
						        		titleAlign:'center',
						        		layout:'hbox',
						        		items:[
						        			{
								        		layout: 'form',
								        		itemId:'mainCenterFirstPageUpBettStateForm',
								        		defaultType: 'displayfield',
								        		height:'100%',
								        		items: []
						        			},
						        			{
										    	flex:1,
										    	itemId:'mainCenterFirstPageUpBettStateChart',
										    	xtype: 'polar',
										    	width:'100%',
										    	height:'100%',
												//theme: 'green',
												interactions: ['rotate', 'itemhighlight'],
												store: {
												    fields: ['battname', 'battdata']
												},
												series: {
												    type: 'pie3d',
												    highlight: true,//鼠标滑过的时候有特殊标记
												    angleField: 'battdata',
												    donut: 20,
												    label:{
												    	field:'battname'
												    },
												    tooltip: {
														trackMouse: true,
														renderer: function (tooltip, record, item) {
															var value = ((parseFloat(record.get('battdata') / record.store.sum('battdata')) * 100.0).toFixed(2));
															tooltip.setHtml(record.get('battname') + ': ' + value + '%');
														}
													}
												}
						        			}
						        		]
						        	},
						        	{
						        		title:'报警统计',
						        		itemId:'mainCenterFirstPageUpAlarm',
						        		header:{
						        			cls:'gwThemePaneltitleBackground',
						        			listeners:{
						        				'click':function(){
						        					//console.log('标题头点击!');
						        					//install3D(this.up('tabpanel'));
						        				}
						        			}
						        		},
						        		tools:[
						        			{
						        				type:'refresh',
						        				//iconCls:'x-fa fa-close',
						        				callback: function() {
										            GetAlarmChart();
										        }
					        				},
					        				{
					        					iconCls:'x-fa fa-bell',
					        					callback: function() {
										            GetAlarmAllTable();
										        }
					        				}
					        			],
						        		flex:1,
						        		height:'100%',
					        			margin: '0 10 0 10',
						        		titleAlign:'center',
						        		layout:'hbox',
						        		items:[
										    {
										    	itemId:'mainCenterFirstPageUpAlarmChart',
										    	flex:1,
										    	xtype: 'polar',
										    	width:'100%',
										    	height:'100%',
												//theme: 'green',
												interactions: ['rotate'],
												store: {
												    fields: ['name', 'data']
												    //data: ChartStoreData
												},
										    	legend:{
										    		docked:'left',
										    		boxStrokeWidth: 0,
										    		field:'name'
										    	},
												series: [{
												    type: 'pie3d',
												    highlight: true,//鼠标滑过的时候有特殊标记
												    showInLegend:true,
												    angleField: 'data',
												    donut: 20,
												    label:{
												    	field:'name'
												    },
												    tooltip: {
														trackMouse: true,
														renderer: function (tooltip, record, item) {
															var value = record.get('data');//((parseFloat(record.get('data') / record.store.sum('data')) * 100.0).toFixed(2));
															tooltip.setHtml(record.get('name') + ': ' + value );
														}
													},
												    listeners: { // Listen to itemclick events on all series.
												        itemclick: function (chart, item, event) {
												            console.log('itemclick');//, item.category, item.field
												        }
												    }
												}]
										    }
									    ]
						        	}
						        ]
				        	},
				        	{
				        		title:'设备分布',
				        		titleAlign:'center',
				        		header:{
				        			cls:'gwThemeBtnBackground'
				        		},
				        		flex:2,
				        		width:'100%',
				        		html:'<div id="container" style="height:100%"></div>'
				        	}
				        ]
				    }
			    ]
			}
		]
    });
    //获取统计图数据
    GetChartData();
    GetAlarmChart();
    DeviceChar();
    //创建百度地图
    CreateBaiduMap();
    //获取百度地址中安装位置
    GetMapMark();
    //禁止回退
    disablePageBack();
});