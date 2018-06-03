	//两个selector
	var regionSelector = document.getElementById('regionSelector');
	var productSelector = document.getElementById('productSelector');
	//表头
	var title = document.getElementById('title');	
	//渲染的位置
	var renderBox = document.getElementById('renderBox');
	var diqu = document.getElementById('diqu');
	var shangpin = document.getElementById('shangpin');
//============>两个下拉选择框单独监听，单独渲染，互不影响。	
	regionSelector.addEventListener('change',function(){
		
		renderDom();
	},false)
	productSelector.addEventListener('change',function(){
			
		renderDom();
	},false)
	
//============>获取选择地区
function getRegion(){
	return regionSelector[regionSelector.selectedIndex];
}
//============>获取选择商品 种类
function getProduct(){
	
	return productSelector[productSelector.selectedIndex];
}
//============>过滤渲染的数据，并返回真正需要的数据
function filterData(){
	//获取用户选择
	var region = getRegion()
	var product = getProduct();
	//console.log(region,typeof product)
	var requireDatas = [];
	//同时选中，进行过滤
	if(region.value!='-1' && product.value!=='-1'){
		//先过滤出符合地区条件的数组对象
		var arr1 = sourceData.filter((item,index,arr)=>{
		 	
			  return region.innerText.indexOf(item.region)>=0
			
			});
			//console.log(arr1)
		//再次选择匹配的数据
		var arr2 = arr1.filter((item,index,arr)=>{
			 return product.innerText.indexOf(item.product)>=0
		
		});
			//console.log(arr2)
		}
	return arr2;
	}
	


//============>渲染DOM并且插入
function renderDom(){
	//如果没有获取到正确的数组，返回。
	if(!filterData()){
		return false;
	}
	//因为过滤出的数据，只有一条，所以这里直接取0
	var data = filterData()[0];
	//商品和地区的容器不删，复用，遍历子元素判断。
	var nodes = Array.from(renderBox.children)
	nodes.forEach(function(item,index){
		if(index>1){
			renderBox.removeChild(item);
		}
	})
	title.innerText= data.region+"地区"+data.product+"全年销量情况";
	diqu.innerText = data.region;
	shangpin.innerText = data.product;
	
	data.sale.forEach((item,index)=>{
		var td = document.createElement('td');
		td.innerText = item;
		
		renderBox.appendChild(td);
	
	});
	
}
// ===========>初始化渲染,
window.onload=function(){
	//判断初始化时，才进行渲染
	
	var data = sourceData[0];
	title.innerText= data.region+"地区"+data.product+"全年销量情况";
	diqu.innerText = data.region;
	shangpin.innerText = data.product;
	
	data.sale.forEach((item,index)=>{
		var td = document.createElement('td');
		td.innerText = item;
		renderBox.appendChild(td);
	
	});
	
	
}
