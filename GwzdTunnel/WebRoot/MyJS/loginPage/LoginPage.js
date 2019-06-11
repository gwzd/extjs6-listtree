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
Ext.onReady(function() {

	Ext.BLANK_IMAGE_URL = "${pageContext.request.contextPath}/extjs6/build/resources/images/default/s.gif";
	Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    Ext.Ajax.timeout=30000;//设置ajax的超时时间为30S
    
    //$(document).attr('title',SysTitle);
	new Ext.Viewport({
		cls:'gwThemeBtnBackground',
        layout : {
            type : 'hbox',
            align:'begin',
            pack:'center'
        },
        items : [
        	{
        		xtype:'panel',
        		bodyStyle:'background-color:#006569 !important',
        		border:false,
        		layout:{
        			type:'vbox',
        			align:'middle',
        			pack:'center'
        		},
        		items:[
        			{
		        		xtype:'tbtext',
		        		height:80
        			},
        			{
		        		xtype:'tbtext',
		        		text:'<font size="11" color="#ffffff"><B><B>国网中电立体安防平台</B></B></font>'
		        	},
		        	{
		        		xtype:'tbtext',
		        		height:130
        			},
			    	{
			    		xtype:'image',
			    		width:128,
			    		height:128,
			    		src:'./MyImage/loginTouxiang.png'
			    	},
			    	{
					    title: '<B><B>客户登录</B></B>',
					    xtype:'form',
					    bodyPadding: 1,
					    x:'40%',
					    y:370,
					    width: 250,
					    url: 'login.action',
					    titleAlign: "center",
					    method : 'post',
					    layout: 'anchor',
					    labelAlign : 'right',
				        labelWidth : 25,
				        buttonAlign : 'center',
				        header:{
				        	cls:'IndexTreeMenuHead'
				        },
					    defaults: {
					        anchor: '100%'
					    },
					    defaultType: 'textfield',
					    items: [{
					        fieldLabel: '<font color="#006569" size="2"><B><B>用户名</B></B></font>',
					        labelAlign : 'right',
					        labelWidth : 45,
					        name: 'userName',
					        value:userName,
					        allowBlank: false
					    },{
					        fieldLabel: '<font color="#006569" size="2"><B><B>密码</B></B></font>',
					        labelAlign : 'right',
					        labelWidth : 45,
					        name: 'userPass',
					        inputType:'password', 
					        value:userPass,
					        allowBlank: false
					    }],
					    buttons: [{
					        text: '重置',
					        icon:'./MyImage/reset_password.png',
					        cls:'gwThemeBtnBackground',
					        handler: function() {
					            this.up('form').getForm().reset();
		                    	
					        }
					    }, {
					        text: '提交',
					        icon:'./MyImage/user.png',
					        cls:'gwThemeBtnBackground',
					        formBind: true, 
					        disabled: true,
					        handler: function() {
					            var form = this.up('form').getForm();
					            Ext.MessageBox.wait('Loading', 'Please Wait…');
					            if (form.isValid()) {
					                form.submit({
					                    success: function(form, action) {
					                    	document.location = 'MainPage.action';
					                    	Ext.MessageBox.hide();
					                    },
					                    failure: function(form, action) {
					                    	Ext.MessageBox.hide();
					                        switch (action.failureType) {  
							                case Ext.form.Action.CLIENT_INVALID:  
							                    //Ext.Msg.alert('错误提示', '表单数据非法请核实后重新输入....');  
							                	ShowErrorWin.show();
							                	ShowErrorWin.down('image').setSrc('./MyImage/error.png');
							                	ShowErrorWin.down('tbtext').setText('表单数据非法<br/>请核实后重新输入....');
							                    break;  
							                case Ext.form.Action.CONNECT_FAILURE:  
							                	ShowErrorWin.show();
							                    ShowErrorWin.down('image').setSrc('./MyImage/error.png');
							                	ShowErrorWin.down('tbtext').setText('网络连接异常....');
							                    break;  
							                case Ext.form.Action.SERVER_INVALID:
							                    ShowErrorWin.show();
							                    ShowErrorWin.down('image').setSrc('./MyImage/error.png');
							                    ShowErrorWin.down('tbtext').setText('您的输入用户信息有误<br/>请核实后重新输入....');
							                    break;
							                default:
							                   ;    
							            	}
							            	
					                    }
					                });
					            }
					        }
					    }]
					}
        		]
        	}
        	
        ]
    });
});