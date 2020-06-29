/*
 * 动画函数
 * @param {Object}  obj           当前要操作的元素对象
 * @param {Object}  json          所有要修改的属性及属性值的json
 * @param {Object}  fn            回调函数
 */

 //多物体运动时要把定时器绑定在对应的物体上。
var speed = 0;
function startAnimation(obj, json, fn){
  clearInterval(obj.timer);

  obj.timer = setInterval(function(){
    var cur = 0;
    //for in 循环遍历json
    for(attr in json){
      //判断传入的属性是否时opacity
      if(attr === 'opacity'){
        //因为值(浮点型*100)不准，所以对小数位四舍五入round
        cur = Math.round(parseFloat(getStyle(obj, attr)*100));
      }else{
        cur = parseInt(getStyle(obj, attr));
      }

      //speed
      speed = (json[attr] - cur)/20;
      speed = json[attr] > cur ? Math.ceil(speed) : Math.floor(speed);
      //边界处理
      if(json[attr] === cur){
        clearInterval(obj.timer);
        //有没有传入fn?
        if(fn){
          fn();
        }
        return;
      }

      //判断传入的属性是否是opacity
      var sum = cur + speed;
      if(attr === 'opacity'){
        obj.style[attr] = sum/100;
        obj.style['filter'] = "alpha(opacity="+sum+")";
      }else{
        obj.style[attr] = sum + 'px';
      }
    }

  },30);
}

//获取元素的样式属性
function getStyle(obj, attr){
  if(obj.currentStyle){
    return obj.currentStyle[attr];
  }else{
    return getComputedStyle(obj, null)[attr];
  }
}
