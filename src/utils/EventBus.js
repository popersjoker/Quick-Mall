
// import  {DIYEvent} from './EventBus.d.ts'
const map={}

const get=(name)=>{
    return map[name].details;
}
export default{
$emit(name,params){
    if(!map[name])//
    {
        console.log("事件"+name+"未被监听");
    }
    else {
        map[name].details=params;//传参
        
        window.dispatchEvent(map[name]);
    }

},get,
$on(name,callback=()=>map[name].details){
    console.log("事件"+name+"已被监听");
    map[name]=new Event(name);
    // window.addEventListener(name,callback); 原来的
    window.addEventListener(name,callback.bind(this,map[name]));

}



}