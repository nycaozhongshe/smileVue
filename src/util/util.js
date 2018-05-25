/**
 * 判断对象是否相等
 * @param a
 * @param b
 * @returns {boolean}
 */
function isEqual(a,b){
  //如果a和b本来就全等
  if(a===b){
    console.log('a和b本来就全等');
    //判断是否为0和-0
    return a !== 0 || 1/a ===1/b;
  }
  //判断是否为null和undefined
  if(a==null||b==null){
    console.log('均为null或undefined');
    return a===b;
  }
  //接下来判断a和b的数据类型
  var classNameA=toString.call(a),
    classNameB=toString.call(b);
  //如果数据类型不相等，则返回false
  if(classNameA !== classNameB){
    console.log('数据类型不相等');
    return false;
  }
  //如果数据类型相等，再根据不同数据类型分别判断
  switch(classNameA){
    case '[object RegExp]':
    case '[object String]':
      //进行字符串转换比较
      return '' + a ==='' + b;
    case '[object Number]':
      //进行数字转换比较,判断是否为NaN
      if(+a !== +a){
        return +b !== +b;
      }
      //判断是否为0或-0
      return +a === 0?1/ +a === 1/b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b;
  }
  //如果是对象类型
  if(classNameA == '[object Object]'){
    console.log('对象类型');
    //获取a和b的属性长度
    var propsA = Object.getOwnPropertyNames(a),
      propsB = Object.getOwnPropertyNames(b);
    if(propsA.length != propsB.length){
      console.log('长度不同');
      return false;
    }
    for(var i=0;i<propsA.length;i++){
      var propName=propsA[i];
      //如果对应属性对应值不相等，则返回false
      if(a[propName] !== b[propName]){
        return false;
      }
    }
    return true;
  }
  //如果是数组类型
  if(classNameA == '[object Array]'){
    console.log('数据类型为数组');
    if(JSON.stringify(a) === JSON.stringify(b)){
      return true;
    }
    return false;
  }
}

//获取url中的参数
function getUrlParams(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export { isEqual , getUrlParams}
