	//渲染的位置
	var renderBox = document.getElementById('renderBox');
	
	var checkInputs = Array.from(document.getElementsByTagName('input'));
	//删除两个全选
//		checkInputs.splice(0,1);
//		checkInputs.splice(0,4);

	checkInputs.forEach((item,index,arr)=>{
		item.addEventListener('click',function(e){
			renderDom();
		},false);
	});
//===================>获取用户选择的所有地区,并变成字符串数组，方便后续操作
function getRigon(){
	//筛选出符合条件的DOM 元素，并存储成数组。
	var regionDoms = Array.from(document.getElementsByName('region')).filter((item)=>{
		return item.checked == true;
	});
	//将数组中的每个成员，由DOM = > DOM.value
	var region = regionDoms.map((item)=>{return item.value});
	return region;
}
//===================>获取用户选择的所有商品，并变成字符串数组，方便后续操作
function getProduct(){
	//筛选出符合条件的DOM 元素，并存储成数组。
	var productDoms = Array.from(document.getElementsByName('product')).filter((item)=>{
		return item.checked == true;
	});
	//将数组中的每个成员，由DOM = > DOM.value
    var product = productDoms.map((item)=>{return item.value});
    return product;
}
//============>过滤出能满足用户选择的地区和商品的所有数据
function filterData(){
	//用户选择的地区(string数组)
	var reg = getRigon();
	//用户选择的商品(string数组)
	var pro = getProduct();
	/*data1存储符合地区要求的数据。
	* data2存储的是在data1的基础上进一步筛选出符合商品要求的数据
	*/  
	var data1=[];
	var data2=[];
	//如果没有获取到正确的数组，返回。即上下两组checkbox，至少各选一个！否则直接退出。
	if(!reg || !pro){
		return false;
	}
/*如果都不为0，执行正常逻辑*/
	for(var i=0,len=reg.length;i<len;i++){
		//reg[i] 是用户选择的 string
		sourceData.forEach((regData)=>{
			if(regData.region.indexOf(reg[i])>=0){
				data1.push(regData);
			}
		})
		
	}
	//此时，datas里面存储的数据，都是符合地区要求的数据，在此基础上二次过滤
	for (var j=0;j<pro.length;j++) {
		//pro[i] 是用户选择的 string
		data1.forEach((proData,index)=>{
			if(proData.product.indexOf(pro[j])>=0){
				data2.push(proData);
				
			}
		})
	}

		return data2

}
/************ 最终的Render 逻辑********/
function renderDom(){
	var requireData = filterData();
	//如果拿到的数据，一条都没有，直接返回。
	if(!requireData){return false;}
	
//每次渲染之前，先把原来的东西清空
	renderBox.innerHTML = null;
	var tr = document.createElement('tr');

	requireData.forEach((item,index,arr)=>{
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		
		td1.innerText = item.region;
		td2.innerText = item.product;
		tr.appendChild(td1);
		tr.appendChild(td2);
		
		item.sale.forEach((item)=>{
			var saleTd = document.createElement('td');
			saleTd.innerText = item;
			tr.appendChild(saleTd);
		})
		
	})
	
	renderBox.appendChild(tr)
	
	
}
