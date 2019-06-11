Ext.onReady(function() {

	Ext.BLANK_IMAGE_URL = "${pageContext.request.contextPath}/extjs6/build/resources/images/default/s.gif";
	Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    Ext.Ajax.timeout=300000;//设置ajax的超时时间为5分钟
    //Ext.useShims = true;//这样EXTJS的控件就不会被OCX遮挡了
    
    new Ext.Viewport({
    	id:'MainViewport',
		layout:"border",
		items:
		[
			{
				//reference:'treesTop',
            	xtype:'panel',
				region:'north',
				height:90
			},
			{
				region:'center',
				layout:'fit',
				title:'视频播放',
				items:[
					{
						xtype:'tabpanel',
						listeners: {
					        beforetabchange: function(tabs, newTab, oldTab) {
					            //return newTab.title != 'P2';
					        }
					    },
					    items: [{
					        title: '第一个页面',
					        closable:true
					    }, {
					        title: '第二个页面'
					    }, {
					        title: '第三个页面'
					    }]
						//title:'视频'
						//html:'<live-player video-url="http://192.168.1.108:10001/flv/hls/34020000001320000001_34020000001320000001_0200000001.flv"  aspect="16:9"></live-player>'
						//html:'<live-player video-url="http://192.168.1.108:10001/hls/34020000001320000001_34020000001320000001_0200000001/34020000001320000001_34020000001320000001_0200000001_live.m3u8"  aspect="16:9"></live-player>'
						//html:'<live-player id="ChromVideo1" video-url="rtmp://192.168.1.108:11935/hls/34020000001320000001_34020000001320000001_0200000001"  aspect="16:9"></live-player>'
						//html:'<live-player id="ChromVideo1" video-url=""  aspect="16:9"></live-player>'
					}
				],
				dockedItems: [{
				    xtype: 'toolbar',
				    dock: 'top',
				    items: [
				        { 
				        	xtype: 'button', 
				        	text: '查看',
				        	handler: function() {
				        		//var player = document.getElementById('ChromVideo1');
				        		//console.log(player.getAttribute('aspect'));
				        		//player.setAttribute('video-url','rtmp://192.168.1.108:11935/hls/34020000001320000001_34020000001320000001_0200000001');
				        		
				        	}
			        	}
				    ]
				}]
			},
			{
				region:'south',
				height:60
			}
		]
    });
});