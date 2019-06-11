var map = null;
//创建百度地图
function CreateBaiduMap()
{
	//测试内部创建地图
	map = new BMap.Map("container",{enableMapClick:false});		// 创建地图实例  
	var point = new BMap.Point(116.403694,39.914714);// 创建点坐标
	map.setMinZoom(8);								//设置最小比例
	map.setMaxZoom(20);								//设置最大比例
	map.centerAndZoom(point, 13);				// 初始化地图，设置中心点坐标和地图级别  
	map.enableScrollWheelZoom(true);     		//开启鼠标滚轮缩放
	
	// 通过JavaScript的prototype属性继承于BMap.Control   
	ZoomControl.prototype = new BMap.Control();
	//创建自定义控件
	ZoomControl.prototype.initialize = function(map){    
	    // 创建一个DOM元素   
	    var div = document.createElement("div");    
	    // 添加文字说明    
	    div.appendChild(document.createTextNode("北京"));    
	    // 设置样式    
	    div.style.cursor = "pointer";    
	    div.style.border = "1px solid gray";    
	    div.style.backgroundColor = "white";    
	    // 绑定事件，点击一次放大两级    
	    div.onclick = function(e){  
	        //map.zoomTo(map.getZoom() + 2); 
	        map.reset();   
	    };    
	    // 添加DOM元素到地图中   
	    map.getContainer().appendChild(div);    
	    // 将DOM元素返回  
	    return div;    
	};
	// 创建控件实例    
	var myZoomCtrl = new ZoomControl();    
	// 添加到地图当中    
	map.addControl(myZoomCtrl);
	//map.addControl(new BMap.NavigationControl());//左上角地图缩放指示器
	map.addControl(new BMap.MapTypeControl());//地图类型
	//设置百度地图风格
	map.setMapStyle({style:'googlelite'});//去掉那些乱七八糟的标点
	/*
	Ext.defer(function(){
    		getHiddenToMap();
		}, 5000);
		*/
}
//地图
function getHiddenToMap()
{
	Ext.Ajax.request({
    	url: 'hiddeninfo.action',
		params: { doWhat : 'getHidden'},
		method: 'post',
		callback: function(options, success, response){
			if(typeof(response.responseText) != 'undefined' && response.responseText != '')
			{
				var respText = Ext.JSON.decode(response.responseText);
				//console.log("respText%s",respText.jsonRet);
				var ret = Ext.JSON.decode(respText.jsonRet);
				
				deletePoint(map);
				for(var obj in ret)
				{
					var id = ret[obj].towerid;
					var hidLev = ret[obj].hidLev;
					var x = ret[obj].x;
					var y = ret[obj].y;
					var addr = ret[obj].addr;
					var hidden = ret[obj].hidden;
					var showInfo = "<p style=’font-size:12px;lineheight:1.8em;’>杆塔标记:" + id;
					showInfo += "</br>地址:" + addr;
					if(typeof(hidden) != 'undefined')
					{
						for(var j in hidden)
						{
							var type = hidden[j].type;
							var ilev = hidden[j].ilev;
							var addu = hidden[j].addu;
							var addt = hidden[j].addt;
							showInfo += "</br></br>隐患类型:" + type;
							showInfo += "</br>隐患级别:" + ilev;
							showInfo += "</br>上 报 人:" + addu;
							showInfo += "</br>上报时间:" + addt;
						}
					}
					var point = new BMap.Point(y, x);
					//console.log("id:%s,showInfo:%s",id,showInfo);
					addMarker(point,id,showInfo);
				}
				
			}
		}
	});
}
//添加控件--百度地图操作
function ZoomControl(){    
    // 设置默认停靠位置和偏移量  
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;    
    this.defaultOffset = new BMap.Size(10, 10);    
}
//删除所有标签点
function deletePoint(){
	if(map)
	{
	    var allOverlay = map.getOverlays();
	    for(var i = 0;i<allOverlay.length;i++) {
	        //删除指定经度的点
	        map.removeOverlay(allOverlay[i]);
	    }
	}
}
function setCenter(y,x)
{
	//console.log('重新定位中心点!');
	map.panTo(new BMap.Point(y, x));
}
//添加标注点
function getMarkLabel(showText)
{
	var offsetSize = new BMap.Size(5, 45);
    var labelStyle = {
        color: "#000",
        backgroundColor: "0.05",
        border: "0"
    };
    var label = new BMap.Label(showText, {
        offset: offsetSize
    });
    label.setStyle(labelStyle);
    return label;
}
//向地图中添加map
function addMarker(point,labelShow,tishi){  // 创建图标对象   ,imageOffset: new BMap.Size(0, -15)
    var myIcon = new BMap.Icon("baiduMark/location_on_48px.png", new BMap.Size(50, 50));      
    // 创建标注对象并添加到地图   
    var marker = new BMap.Marker(point, {icon: myIcon});   
    marker.setLabel(getMarkLabel(labelShow));
    var infoWindow = new BMap.InfoWindow(tishi);
    marker.addEventListener("click", function(e){    
	    this.openInfoWindow(infoWindow);
	}); 
    map.addOverlay(marker);    
}
/**
 * @func 通过ajax向服务器获取立体防护安装点位的座标信息，然后标注mark
 * @author zxl
 * @time 2019.5.27
 */
function GetMapMark(){
	Ext.Ajax.request({
		url: 'MapMark.action',
		timeout:6000,
		params:{rootID:rootNode},
		success: function(response, opts) {
			var obj = Ext.decode(response.responseText);
		    var mark = Ext.decode(obj.mark);
		    for(var i=0 ; i<mark.length ; i++){
		    	var MarkNode = mark[i];
		    	var id = MarkNode.id;
		    	var Name = MarkNode.Name;
		    	var y = MarkNode.y;
		    	var x = MarkNode.x;
		    	var CameraID = MarkNode.CameraId;
		    	
		    	var point = new BMap.Point(x, y);
		    	var myIcon = new BMap.Icon("baiduMark/location_on_48px.png", new BMap.Size(50, 50)); 
		    	var marker = new BMap.Marker(point, {icon: myIcon});  
		    	//console.log('id',id);
		    	marker.Nodeid = id;
		    	marker.CameraID = CameraID;
		    	marker.MarkName = Name;
		    	marker.setLabel(getMarkLabel('<font color="#2f17cf"><B>' + Name + '</B></font>'));
		    	marker.addEventListener("click", function(e){
		    		var clientX = e.clientX;
		    		var clientY = e.clientY;
		    		//console.log('为mark添加点击的触发函数:' + this.Nodeid);
		    		MarkClick(clientX,clientY,this.Nodeid,this.CameraID,this.MarkName);
				}); 
			    map.addOverlay(marker);
		    }
		},
		failure: function(response, opts) {
		    console.log('server-side failure with status code ' + response.status);
		}
	});
}

/**
 * @func 百度地图上的mark点击
 * @param {} x
 * @param {} y
 * @param {} Nodeid
 * @param {} CameraID
 */
//图像显示窗口
var imageShowWindow = Ext.create('Ext.window.Window', {
	title: '<font size="3" color="#ffffff"><B>图像</B></font>',
	id:'ImageShowWindow',
	height: 460,
    width: 800,
    titleAlign:'center',
    closeAction:'close',
    closable:false,
    border:false,
    layout:'fit',
    header:{
    	cls:'gwThemeBtnBackground'
    },
    tools:[{
	    	cls:'x-fa fa-close',
	    	handler:function(){
	    		this.up('window').close();
	    	}
	    }
    ],
    items:[
    	{
    		xtype:'image',
    		itemId:'ImageShowWinImage',
    		src:'MyImage/gwzdLogo.png'
    	}
    ]
});
var urlHead = 'http://192.168.1.101:10002/';
/**
 * @func 录像
 */
function RecordVideo(CameraID,StartOrStop){
	if(StartOrStop){
		$.ajax({
		    type:"GET",
		    data:"serial=" + CameraID,
		    url:urlHead+"api/v1/record/start",
		    success:function(msg){
		    	console.log(msg);
		    },
		    error:function(){
		        console.log('error');
		    }
		});
	}
	else{
		$.ajax({
		    type:"GET",
		    data:"serial=" + CameraID,
		    url:urlHead+"api/v1/record/query",
		    success:function(msg){
		    	console.log(msg);
		    },
		    error:function(){
		        console.log('error');
		    }
		});
	}
}
/**
 * @func 云台控制
 * @param {} CameraID
 * @param {} Command
 */
function PtzControl(CameraID,Command){
	if(CameraID && Command){
		$.ajax({
		    type:"GET",
		    data:"serial=" + CameraID + "&command=" + Command,
		    url:urlHead+"urlHeadapi/v1/control/ptz",
		    success:function(msg){
		    	//console.log(msg);
		    },
		    error:function(){
		        //console.log('error');
		    }
		});
	}
}
/**
 * @func 打开视频
 * @param {} CameraID
 */
function PlayVideo(CameraID){
	if(!CameraID){
		return;
	}
	Ext.MessageBox.wait('Loading', 'Please Wait…');
	$.ajax({
	    type:"GET",
	    data:"serial=" + CameraID,
	    url:urlHead + "api/v1/stream/start",
	    success:function(msg){
	        Ext.MessageBox.hide();
	    	var PlayFLV = msg.FLV;
	    	//var player = document.getElementById('ChromVideoPlay');
    		//player.setAttribute('video-url',PlayFLV);
	    	var BtnWidth = 32;
	    	var BtnHeight = 32;
	    	var WinWidth = 1152;
	    	var WinHeight = 648;
	    	var CenterX = WinWidth/2 - BtnWidth/2;
	    	var CenterY = WinHeight/2 - BtnHeight/2;
    		//视频显示画面
			Ext.create('Ext.window.Window', {
				title: '<font size="3" color="#ffffff"><B>视频</B></font>',
				//id:'VideoShowWindow',
				height: WinHeight + (BtnHeight*1.5),
			    width: WinWidth,
			    resizable:false,
			    titleAlign:'center',
			    closeAction:'destroy',
			    closable:true,
			    border:false,
			    layout:'fit',
			    PlayingID:CameraID,
			    header:{
			    	cls:'gwThemeBtnBackground'
			    },
			    tools:[
				    {
				    	iconCls:'x-fa fa-paypal',
				    	Clicked:false,
				    	handler:function(){
				    		//console.log('云台控制',this.Clicked);
				    		if(!this.Clicked){
					    		this.up('window').getComponent('VideoShowWindowPlay').getComponent('ptzCtrlUp').show();
					    		this.up('window').getComponent('VideoShowWindowPlay').getComponent('ptzCtrlRight').show();
					    		this.up('window').getComponent('VideoShowWindowPlay').getComponent('ptzCtrlDown').show();
					    		this.up('window').getComponent('VideoShowWindowPlay').getComponent('ptzCtrlPlus').show();
					    		this.up('window').getComponent('VideoShowWindowPlay').getComponent('ptzCtrlCut').show();
					    		this.up('window').getComponent('VideoShowWindowPlay').getComponent('ptzCtrlLeft').show();
					    		this.Clicked = true;
				    		}
				    		else{
				    			this.up('window').getComponent('VideoShowWindowPlay').getComponent('ptzCtrlUp').hide();
					    		this.up('window').getComponent('VideoShowWindowPlay').getComponent('ptzCtrlRight').hide();
					    		this.up('window').getComponent('VideoShowWindowPlay').getComponent('ptzCtrlDown').hide();
					    		this.up('window').getComponent('VideoShowWindowPlay').getComponent('ptzCtrlPlus').hide();
					    		this.up('window').getComponent('VideoShowWindowPlay').getComponent('ptzCtrlCut').hide();
					    		this.up('window').getComponent('VideoShowWindowPlay').getComponent('ptzCtrlLeft').hide();
					    		this.Clicked = false;
				    		}
				    	}
				    }/*,
				    {
				    	iconCls:'x-fa fa-paypal',
				    	Clicked:false,
				    	handler:function(){
				    		if(!this.Clicked){
				    			console.log('录像');
				    			this.Clicked = true;
				    		}
				    		else{
				    			console.log('停止录像');
				    			this.Clicked = false;
				    		}
				    	}
				    }*/
			    ],
			    items:[
			    	{
			    		xtype:'panel',
			    		itemId:'VideoShowWindowPlay',
			    		layout:'absolute',
			    		items:[
			    			{
			    				x:0,
			    				y:0,
			    				anchor:'100% 100%',
			    				html:'<live-player video-url="'+PlayFLV+'"  aspect="16:9"></live-player>'
			    			},
			    			{
			    				xtype:'button',
			    				itemId:'ptzCtrlUp',
			    				//cls:'PtzCtrlBtnBKColor',
			    				border:false,
			    				text:'↑',
			    				hidden:true,
			    				width:BtnWidth,
			    				height:BtnHeight,
			    				x:CenterX,
			    				y:0,
			    				Clicked:false,
			    				handler:function(){
			    					if(!this.Clicked){
			    						this.Clicked = true;
			    						var CameraID = this.up('window').PlayingID;
			    						PtzControl(CameraID,'up');
			    					}
			    					else{
			    						this.Clicked = false;
			    						var CameraID = this.up('window').PlayingID;
			    						PtzControl(CameraID,'stop');
			    					}
			    				}
			    			},
			    			{
			    				xtype:'button',
			    				itemId:'ptzCtrlRight',
			    				//cls:'PtzCtrlBtnBKColor',
			    				border:false,
			    				hidden:true,
			    				text:'→',
			    				width:BtnWidth,
			    				height:BtnHeight,
			    				x:WinWidth - BtnWidth - 10,
			    				y:CenterY,
			    				Clicked:false,
			    				handler:function(){
			    					if(!this.Clicked){
			    						this.Clicked = true;
			    						var CameraID = this.up('window').PlayingID;
			    						PtzControl(CameraID,'right');
			    					}
			    					else{
			    						this.Clicked = false;
			    						var CameraID = this.up('window').PlayingID;
			    						PtzControl(CameraID,'stop');
			    					}
			    				}
			    			},
			    			{
			    				xtype:'button',
			    				itemId:'ptzCtrlDown',
			    				//cls:'PtzCtrlBtnBKColor',
			    				border:false,
			    				hidden:true,
			    				text:'↓',
			    				width:BtnWidth,
			    				height:BtnHeight,
			    				x:CenterX,
			    				y:WinHeight - BtnHeight,
			    				Clicked:false,
			    				handler:function(){
			    					if(!this.Clicked){
			    						this.Clicked = true;
			    						var CameraID = this.up('window').PlayingID;
			    						PtzControl(CameraID,'down');
			    					}
			    					else{
			    						this.Clicked = false;
			    						var CameraID = this.up('window').PlayingID;
			    						PtzControl(CameraID,'stop');
			    					}
			    				}
			    			},
			    			{
			    				xtype:'button',
			    				itemId:'ptzCtrlPlus',
			    				//cls:'PtzCtrlBtnBKColor',
			    				border:false,
			    				hidden:true,
			    				text:'+',
			    				width:32,
			    				height:32,
			    				x:CenterX / 2,
			    				y:CenterY,
			    				Clicked:false,
			    				handler:function(){
			    					if(!this.Clicked){
			    						this.Clicked = true;
			    						var CameraID = this.up('window').PlayingID;
			    						PtzControl(CameraID,'zoomout');
			    					}
			    					else{
			    						this.Clicked = false;
			    						var CameraID = this.up('window').PlayingID;
			    						PtzControl(CameraID,'stop');
			    					}
			    				}
			    			},
			    			{
			    				xtype:'button',
			    				itemId:'ptzCtrlCut',
			    				//cls:'PtzCtrlBtnBKColor',
			    				border:false,
			    				hidden:true,
			    				text:'-',
			    				width:BtnWidth,
			    				height:BtnHeight,
			    				x:CenterX + (CenterX/2),
			    				y:CenterY,
			    				Clicked:false,
			    				handler:function(){
			    					if(!this.Clicked){
			    						this.Clicked = true;
			    						var CameraID = this.up('window').PlayingID;
			    						PtzControl(CameraID,'zoomin');
			    					}
			    					else{
			    						this.Clicked = false;
			    						var CameraID = this.up('window').PlayingID;
			    						PtzControl(CameraID,'stop');
			    					}
			    				}
			    			},
			    			{
			    				xtype:'button',
			    				itemId:'ptzCtrlLeft',
			    				//cls:'PtzCtrlBtnBKColor',
			    				border:false,
			    				hidden:true,
			    				text:'←',
			    				width:32,
			    				height:32,
			    				x:0,
			    				y:CenterY,
			    				Clicked:false,
			    				handler:function(){
			    					if(!this.Clicked){
			    						this.Clicked = true;
			    						var CameraID = this.up('window').PlayingID;
			    						PtzControl(CameraID,'left');
			    					}
			    					else{
			    						this.Clicked = false;
			    						var CameraID = this.up('window').PlayingID;
			    						PtzControl(CameraID,'stop');
			    					}
			    				}
			    			}
			    		]
			    	}
			    ]
			}).show();
	    },
	    error:function(){
	    	Ext.MessageBox.hide();
	        //console.log('error');
	    	Ext.getCmp('ShowErrorWin').show();
			Ext.getCmp('ShowErrorWin').down('image').setSrc('./MyImage/error.png');
	    	Ext.getCmp('ShowErrorWin').down('tbtext').setText('视频设备处于离线状态!');
	    }
	});
}
/**
 * @func 关闭播放
 * @param {} CameraID
 */
function StopVideo(){
	if(VideoShowWindow.PlayingID){
		//关闭摄像机
		$.ajax({
	    type:"GET",
	    data:"serial=" + VideoShowWindow.PlayingID,
	    url:urlHead + "api/v1/stream/stop",
	    success:function(msg){
	        //alert(msg);//msg就是页面返回的图片地址
	    	console.log(msg);
	    },
	    error:function(){
	        console.log('error');
	    }
	});
	}
	else{
		console.log('前面没有视频播放!');
	}
}
//立体防护设备属性显示窗口
var NodeInfoWindow = Ext.create('Ext.window.Window', {
    title: '<font size="3" color="#ffffff"><B>属性修改</B></font>',
    id:'NodeInfoWindow',
    autoHeight: true,
    width: 280,
    resizable:false,
    titleAlign:'center',
    closeAction:'hide',
    closable:true,
    layout: 'form',
    border:false,
    header:{
    	cls:'gwThemeBtnBackground'
    },
    tools:[{
	    	cls:'x-fa fa-save',
	    	handler:function(){
	    		//this.up('window').hide();
	    		//console.log("nodeID:" , this.nodeID);
	    		var TnodeID = this.up('window').getComponent('NodeID').value;
	    		var TnodeName = this.up('window').getComponent('NodeName').value;
				var TcoorX = this.up('window').getComponent('NodeCoorX').value;
				var TcoorY = this.up('window').getComponent('NodeCoorY').value;
				var TcameraID = this.up('window').getComponent('NodeCameraID').value;
				
				if(TnodeName != '' && TcoorX != '' && TcoorY != ''){
		    		Ext.Ajax.request({
						url: 'MainTreeChange.action',
						timeout:6000,
						params:{nodeID:TnodeID,nodeName:TnodeName,coorX:TcoorX,coorY:TcoorY,cameraID:TcameraID},
						success: function(response, opts) {
							var obj = Ext.decode(response.responseText);
			    			if(obj.success){
			    				Ext.getCmp('ShowErrorWin').show();
				    			Ext.getCmp('ShowErrorWin').down('image').setSrc('./MyImage/success.png');
			                	Ext.getCmp('ShowErrorWin').down('tbtext').setText('提交成功!');
			                	Ext.getCmp('NodeInfoWindow').hide();
			    			}
			    			else{
			    				Ext.getCmp('ShowErrorWin').show();
				    			Ext.getCmp('ShowErrorWin').down('image').setSrc('./MyImage/error.png');
			                	Ext.getCmp('ShowErrorWin').down('tbtext').setText('提交失败!');
			    			}
						},
						failure: function(response, opts) {
						    console.log('server-side failure with status code ' + response.status);
						}
		    		});
				}
				else{
					Ext.getCmp('ShowErrorWin').show();
	    			Ext.getCmp('ShowErrorWin').down('image').setSrc('./MyImage/error.png');
                	Ext.getCmp('ShowErrorWin').down('tbtext').setText('请填写完全!');
				}
	    	}
	    }
    ],
    items:[
    	{
    		xtype:'textfield',
    		fieldLabel: '<font size="3" color="#006569"><B><B>节点ID</B></B></font>',
	        labelAlign:'right',
	        itemId:'NodeID',
			labelWidth:80,
			allowBlank: false,
	        value:''
    	},
    	{
    		xtype:'textfield',
    		fieldLabel: '<font size="3" color="#006569"><B><B>节点名称</B></B></font>',
	        labelAlign:'right',
	        itemId:'NodeName',
			labelWidth:80,
			allowBlank: false,
	        value:''
    	},
    	{
    		xtype:'numberfield',
    		fieldLabel: '<font size="3" color="#006569"><B><B>座标东经</B></B></font>',
	        labelAlign:'right',
	        itemId:'NodeCoorX',
			labelWidth:80,
			allowBlank: false,
			maxValue: 120,
    		minValue: 110,
    		decimalPrecision:8,
	        value:''
    	},
    	{
    		xtype:'numberfield',
    		fieldLabel: '<font size="3" color="#006569"><B><B>座标北纬</B></B></font>',
	        labelAlign:'right',
	        itemId:'NodeCoorY',
			labelWidth:80,
			allowBlank: false,
			maxValue: 50,
    		minValue: 30,
    		decimalPrecision:8,
	        value:''
    	},
    	{
    		xtype:'textfield',
    		fieldLabel: '<font size="3" color="#006569"><B><B>视频编码</B></B></font>',
	        labelAlign:'right',
	        itemId:'NodeCameraID',
			labelWidth:80,
	        value:''
    	}
    ]
});
/**
 * @func 地图上的mark点击触发事件
 * @param {} Winx
 * @param {} Winy
 * @param {} Nodeid
 * @param {} CameraID
 * @param {} Name
 */
function MarkClick(Winx,Winy,Nodeid,CameraID,Name,Tx,Ty){
	var TableStore = Ext.create('Ext.data.Store', {
	    fields: ['alarmTime', 'alarmType', 'alarmNo','alarmJL','alarmPicPath'],
	    pageSize: 5,
	    proxy: {
	         type: 'ajax',
	         url: 'NodeAlarm.action',
	         reader: {
	             type: 'json',
	             rootProperty: 'root',
	             totalProperty: 'total'
	         },
	         extraParams:{nodeID:Nodeid}
	     }
	});
	var ShowInfoWin = Ext.create('Ext.window.Window', {
	    title: '<font size="3" color="#ffffff"><B>' + Name + '</B></font>',
	    //id:'ShowMarkInfoID',
	    height: 260,
	    width: 400,
	    x:Winx-200,
	    y:Winy-260,
	    resizable:false,
	    titleAlign:'center',
	    closeAction:'close',
	    closable:false,
	    layout: 'fit',
	    border:false,
	    header:{
	    	cls:'gwThemeBtnBackground'
	    },
	    tools:[
	    	{
		    	cls:'x-fa fa-cog',
		    	handler:function(){
		    		if(Nodeid){
			    		//PlayVideo(CameraID);
		    			console.log('CameraID',CameraID);
		    			NodeInfoWindow.getComponent('NodeID').setValue(Nodeid);
		    			NodeInfoWindow.getComponent('NodeName').setValue(Name);
		    			NodeInfoWindow.getComponent('NodeCoorX').setValue(Tx);
		    			NodeInfoWindow.getComponent('NodeCoorY').setValue(Ty);
		    			NodeInfoWindow.getComponent('NodeCameraID').setValue(CameraID);
		    			NodeInfoWindow.show();
		    		}
		    		else{
		    			Ext.getCmp('ShowErrorWin').show();
		    			Ext.getCmp('ShowErrorWin').down('image').setSrc('./MyImage/error.png');
	                	Ext.getCmp('ShowErrorWin').down('tbtext').setText('节点标识获取失败!');
		    		}
		    	}
		    },
	    	{
		    	cls:'x-fa fa-camera',
		    	handler:function(){
		    		if(CameraID){
			    		PlayVideo(CameraID);
		    		}
		    		else{
		    			Ext.getCmp('ShowErrorWin').show();
		    			Ext.getCmp('ShowErrorWin').down('image').setSrc('./MyImage/error.png');
	                	Ext.getCmp('ShowErrorWin').down('tbtext').setText('该设备没有绑定摄像机!');
		    		}
		    	}
		    },{
		    	cls:'x-fa fa-close',
		    	handler:function(){
		    		this.up('window').close();
		    	}
		    }
	    ],
	    items: [{
		    xtype:'grid',
		    store: TableStore,
		    selModel: {
		        type: 'rowmodel'
		    },
			columns: [
			    { text: '时间',width:150, dataIndex: 'alarmTime' },
				{ text: '类型',width:80, dataIndex: 'alarmType'},
				{ text: '序号', dataIndex: 'alarmNo',width:60},
				{ text: '距离(m)', dataIndex: 'alarmJL',width:70},
				{ text: '图片',hidden:true, dataIndex: 'alarmPicPath',sortable: false,hideable: false},
				{ 
					width:30,
					xtype: 'actioncolumn',
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
						}
					]
				}
			]
		}]
	});
	TableStore.loadPage(1);
	ShowInfoWin.show();
}
//删除所有标签点
function SetSelectMark(selNode){
	if(map)
	{
	    var allOverlay = map.getOverlays();
	    for(var i = 0;i<allOverlay.length;i++) {
	        //删除指定经度的点
	        var mark = allOverlay[i];
	        //console.log('markNodeid', mark.Nodeid);
	        if(selNode == mark.Nodeid)
	        {
	        	//console.dir(mark);
	        	var x = mark.point.lng;
	        	var y = mark.point.lat;
	        	var point = new BMap.Point(x, y);
	        	map.setCenter(point);
	        	var pixel=map.pointToPixel(point);
				var pixelArray=new Array(pixel.x,pixel.y);
				//console.dir(Ext.getCmp("MainViewport").getComponent("MainWest"));
				var westPanelWidth = Ext.getCmp("MainViewport").getComponent("MainWest").width;
				var northPanelHeight = Ext.getCmp("MainViewport").getComponent("MainNorth").height;
				var MainCenterHeight = Ext.getCmp("MainViewport").getComponent("mainCenter").getComponent("mainCenterFirstPage").getComponent("mainCenterFirstPageUp").height;
				var winX = pixelArray[0] + westPanelWidth - 210 + 200;
				var winY = pixelArray[1] + northPanelHeight + MainCenterHeight - 260 + 40 + 300 ;
	        	MarkClick(winX,winY,mark.Nodeid,mark.CameraID,mark.MarkName,x,y);
	        }
	    }
	}
}