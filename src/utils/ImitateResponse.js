export function get(url,meta){
    
    return new Promise((res,rej)=>{

        let timeout=Math.random()*2;
       let rate =Math.random();
        setTimeout(() => {
            if(rate<1){
                res({
                    status:200,
                    data:{result:meta}
                })
            }else 
            {
                rej({
                    status:504,
                    message:'服务器错误'
                })
            }
        
        }, timeout);

    })

}

export function post(url,meta){
    return get(url,meta);

}