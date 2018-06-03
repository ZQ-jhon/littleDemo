//创建全局bool值，用于点击全选时，来设定所有元素的checked 为 true 或者 false
	var hd = document.getElementById('hd');
	var hb = document.getElementById('hb');	
	var hn = document.getElementById('hn');
	var sj = document.getElementById('sj')
	var bjb = document.getElementById('bjb');
	var znyx = document.getElementById('znyx');
		
	var all1 = document.getElementById('all1');
	var all2 = document.getElementById('all2');	
//*****将获取到的对象集合转换成数组******
		var checkboxesDom = Array.from(document.getElementsByTagName('input'));
		//所有的checkbox进行遍历
		checkboxesDom.forEach((item,index)=>{
			//如果是普通的checkBox（非全选的CheckBox）
			if(item.value.indexOf('selectAll')<0){
				item.addEventListener('click',function(e){
					//用status 来缓存当前checkbox的选中状态
					var status = item.checked;
					//创建全选checkbox，该全选checkbox 对应的几个 checkbox
					var selectParent,selectCheckbox;
					//判断 属于哪个selectAll来接管(即确定  是哪一个全选的Checkbox)
					if(item.name=='region'){
						selectParent=all1;
						selectCheckbox = [hd,hb,hn];
					}
					else{
						selectParent=all2;
						selectCheckbox = [sj,bjb,znyx];
					}
					resetSelectAll(status,selectParent,selectCheckbox);
				},false);
			}
		});

	
//两个全选按钮点击后的执行代码。
			all1.addEventListener('click',function(e){
				//用status 来缓存 全选表单的check状态。
					var status =  e.target.checked;
				//点全选框，传给全选函数 对应的 checkbox DOM对象集合
					setAllCheckbox([hd,hb,hn],status);
			},false);
			
			all2.addEventListener('click',function(e){
				//用status 来缓存 全选表单的check状态。
				var status =  e.target.checked;
				//点全选框，传给全选函数 对应的 checkbox DOM对象集合
					setAllCheckbox([sj,bjb,znyx],status);
				
			},false);
		//全选点下去，对应的 checkbox 应该统一为true/false
		function setAllCheckbox(arr,status){
			//接收一个数组，遍历设置每一项checked为true，或者false
			arr.forEach(function(item,index,arr){
					item.checked = status;
			})
		}
		//普通checkbox点击，来改变selectAll的状态
		function resetSelectAll(status,selectParent,selectCheckbox){
			//参数
			/*  status           子checkbox点击时的checked状态
			 *  selectParent     全选checkbox
			 *  selectCheckbox   该全选checkbox 对应的几个 子checkbox
			*/
			//如果status为真,对所有元素遍历，倘若都选中了，父checkbox 才会checked = true
			if(status){
				//console.dir(selectCheckbox)
				var bool = selectCheckbox.every((item)=>{
					return item.checked === true;
				})
				if(bool){selectParent.checked = status;}
			}
			//为假时，一假则假
			else{
				selectParent.checked = status;
			}
			
		}