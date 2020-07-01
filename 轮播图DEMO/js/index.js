window.onload = function(){
  var slider = document.getElementById('slider');
  var slider_main = document.getElementById('slider_main');
  var allBoxs = slider_main.children;
  var next = document.getElementById('next');
  var prev = document.getElementById('prev');
  var slider_index = document.getElementById('slider_index');
  var slider_index_icon = slider_index.children;
  var iNow = 0; //当前可视元素的索引
  var timer = null;

  //动态生成索引器
  for(var i=0; i<allBoxs.length; i++){
    var span = document.createElement('span');
    if(i === 0){
      span.className = 'slider_index_icon current';
    }else{
      span.className = 'slider_index_icon';
    }
    span.innerText = i+1;
    slider_index.appendChild(span);
  }

  //让滚动的元素归位
  var scroll_w = parseInt(getStyle(slider, 'width'));
  for(var j=1; j<allBoxs.length; j++){
    allBoxs[j].style.left = scroll_w + 'px';
  }

  //next
  next.onclick = function(){
    //让当前显示区的图片动画左移到显示区之外后，让下一张图片先到显示区右边（等候区），最后让下一张图片动画左移到显示区
    startAnimation(allBoxs[iNow],{
      "left": -scroll_w
    });
    //更新当前索引
    iNow++;
    if(iNow >= allBoxs.length){
      iNow = 0;
    }
    allBoxs[iNow].style.left = scroll_w + 'px';
    startAnimation(allBoxs[iNow],{
      "left": 0
    });
    changeIndex();
  };
  //prev
  prev.onclick = function(){
    //类似于next的效果，只是方向相反
    startAnimation(allBoxs[iNow],{
      "left": scroll_w
    });
    //更新索引
    iNow--;
    if(iNow < 0){
      iNow = allBoxs.length - 1;
    }
    allBoxs[iNow].style.left = -scroll_w + 'px';
    startAnimation(allBoxs[iNow],{
      "left": 0
    });
    changeIndex();
  };

  //开启定时器自动播放轮播
  timer = setInterval(autoPlay,2000);
  //自动播放（自动轮播到下一张）的代码
  function autoPlay(){
    //让当前显示区的图片动画左移到显示区之外后，让下一张图片先到显示区右边（等候区），最后让下一张图片动画左移到显示区
    startAnimation(allBoxs[iNow],{
      "left": -scroll_w
    });
    //更新当前索引
    iNow++;
    if(iNow >= allBoxs.length){
      iNow = 0;
    }
    allBoxs[iNow].style.left = scroll_w + 'px';
    startAnimation(allBoxs[iNow],{
      "left": 0
    });
    changeIndex();
  }
  //鼠标移动到显示区时清除定时器 , 移除则再开启定时器
  slider.onmouseover = function(){
    clearInterval(timer);
  }
  slider.onmouseout = function(){
    timer = setInterval(autoPlay,2000);
  }

  //索引器(循环遍历添加监听器)
  //当点击的索引大于当前索引时就是左移(类似于next的效果)，反之右移(类似prev)
  for(var k=0; k<slider_index_icon.length; k++){
    slider_index_icon[k].onmousedown = function(){
      var index = parseInt(this.innerText) - 1;
      //点击的索引与当前的索引对比
      if(index > iNow){
        startAnimation(allBoxs[iNow],{
          "left": -scroll_w
        });
        allBoxs[index].style.left = scroll_w + 'px';
      }else if(index < iNow){
        startAnimation(allBoxs[iNow],{
          "left": scroll_w
        });
        allBoxs[index].style.left = -scroll_w + 'px';
      }
      //更新索引
      iNow = index;
      startAnimation(allBoxs[iNow],{
        "left": 0
      });
      changeIndex();
    }
  }

  //控制当前索引
  function changeIndex(){
    for(var i=0; i<slider_index_icon.length; i++){
      slider_index_icon[i].className = 'slider_index_icon';
    }
    slider_index_icon[iNow].className = 'slider_index_icon current';
  }
}
