
var camera, scene, renderer;
var stats;
var SysLocker = false;
function MyInit(){
	SysLocker = false;
	//透视摄像机
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
	//camera.position.set( 0, 100, 700 );
	camera.position.set( 0, 280,400 );
	//场景
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xcce0ff );
	scene.fog = new THREE.Fog( 0xcce0ff, 800, 1000 );
	
	//光源
	//添加一个环境光源
	var ambientLight = new THREE.AmbientLight( 0x333333 );	// 0.2
	var light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light.position.set(0,0,0);
	scene.add( ambientLight );
	scene.add( light );
	//创建天空盒子
	var path = "webgl/textures/cube/skybox/";
	scene.background = new THREE.CubeTextureLoader().setPath(path).load(
        [
            'px.jpg',
            'nx.jpg',
            'py.jpg',
            'ny.jpg',
            'pz.jpg',
            'nz.jpg'
        ]
    );
    // 大地
	var loader = new THREE.TextureLoader();
	var groundTexture = loader.load( 'webgl/textures/terrain/grasslight-big.jpg' );
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set( 25, 25 );
	groundTexture.anisotropy = 16;
	
	var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
	var Mmesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( -10000, -10000 ), groundMaterial );
	Mmesh.position.z = 0;
	Mmesh.position.y = 0;
	Mmesh.rotation.x = - Math.PI / 2;   // 旋转90度    如果摄像机Y 为0 那么就看不见地面了
	//mesh.receiveShadow = true;
	scene.add( Mmesh );
	//搭建架空线以及两个高压铁塔
	/*
	var Towergeometry = new THREE.BoxBufferGeometry( 30, 30, 30 ,2 ,2 ,2 );
	var TowerMaterial = new THREE.MeshBasicMaterial( {color: 0xfefefe, wireframe: true, opacity: 0.5} );
	var cubeA = new THREE.Mesh( Towergeometry, TowerMaterial );
	cubeA.position.set( 100, 15, -100 );
	var cubeB = new THREE.Mesh( Towergeometry, TowerMaterial );
	cubeB.position.set( -100, 15, -100 );
	//create a group and add the two cubes
	//These cubes can now be rotated / scaled etc as a group
	var group = new THREE.Group();
	group.add( cubeA );
	group.add( cubeB );
	scene.add( group );
	*/
	//Create a closed wavey loop
	var curve = new THREE.CatmullRomCurve3( [
		new THREE.Vector3( -10, 0, 10 ),
		new THREE.Vector3( -5, 5, 5 ),
		new THREE.Vector3( 0, 0, 0 ),
		new THREE.Vector3( 5, -5, 5 ),
		new THREE.Vector3( 10, 0, 10 )
	] );
	
	var geometry1 = new THREE.Geometry();
	geometry1.vertices = curve.getPoints( 50 );
	
	var material1 = new THREE.LineBasicMaterial( { color : 0xff0000 } );
	var Mmesh1 = new THREE.Line( geometry1, material1 );
	scene.add( Mmesh1 );

	// renderer 渲染器
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;
	//页面上的DIV
    var div = document.getElementById('canvas-frame');
    div.appendChild( renderer.domElement );
	// 控制
	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.maxPolarAngle = Math.PI * 0.5;
	//controls.minDistance = 1000;
	controls.maxDistance = 500;
	//帧率显示
	stats = new Stats();
	div.appendChild( stats.dom );
}

function Myanimate() {
	//这里是最占用GPU的，关闭这个循环即可
	if(SysLocker == false){
		//console.log('执行无限循环!');
		requestAnimationFrame( Myanimate );
		renderer.render( scene, camera );
		stats.update();
	}
	else{
		console.log('互斥锁开启，停止无限循环!');
	}
}

//清理 
function clearScene(){
	// 从scene中删除模型并释放内存
	var myObjects = scene.children;
	if(myObjects.length > 0){		
		for(var i = 0; i< myObjects.length; i++){
			var currObj = myObjects[i];
			// 判断类型
			if(currObj instanceof THREE.Scene){
				var children = currObj.children;
				for(var i = 0; i< children.length; i++){
					deleteGroup(children[i]);
				}	
			}else{				
				deleteGroup(currObj);
			}
			console.log('删除3D',i);
			scene.remove(currObj);
		}
		THREE.Cache.clear();
	}
	SysLocker = true;
}

// 删除group，释放内存
function deleteGroup(group) {
	//console.log(group);
    if (!group) return;
    // 删除掉所有的模型组内的mesh
    group.traverse(function (item) {
        if (item instanceof THREE.Mesh) {
            item.geometry.dispose(); // 删除几何体
            item.material.dispose(); // 删除材质
        }
    });
}

function install3D( teb ){
	var tabItem = Ext.getCmp('tabPanelAlarmItem');
	if(!tabItem)
	{
		var tabPanelAlarmItem = {
			id:'tabPanelAlarmItem',
			xtype:'panel',
			closable:true,
		    title: '报警',
		    width: 200,
		    html: '<div id=canvas-frame></div>',
		    listeners:{
		    	'beforedestroy':function(){
		    		//console.log('tab item destroy!');
		    		clearScene();
		    		$('#canvas-frame').html('');
		    	}
		    }
		};
		teb.add(tabPanelAlarmItem).show();
		MyInit();
		Myanimate();
	}
	else{
		console.log('报警页面已经存在!');
	}
}