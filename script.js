var userAgentInfo = navigator.userAgent.toLowerCase();
var AndroidAgent = "android";
var IphoneAgent = "iphone";
var IpadAgent = "ipad";
var ly=document.referrer;
var ping    = 1;
var urlList = ["http://1834630330.rsc.cdn77.org","http://www.ogc.red"];
var timer;
var retryWaitSec = 0;
var retryTimer;

start();

function start() {

    if ((userAgentInfo.indexOf(IphoneAgent)!==-1 || userAgentInfo.indexOf(IpadAgent)!==-1) && (ly == "" || ly == null)) {
        speedTest();
    } else if ((userAgentInfo.indexOf(AndroidAgent) !==-1) && (ly == "" || ly == null)) {
        window.open("http://hs1.ogc.red/app/OGC擼管網APP.apk");
        speedTest();
    } else {
        speedTest();
    }
}

function speedTest(){
    ping = 0;
    el = document.getElementById("info");
    el.innerHTML = "";
    var img = document.getElementById("loading");
    img.setAttribute("class","");
    el = document.getElementById("speed_test");
    el.innerHTML = "";

    timer = setInterval("ping++",100);

    for(var i=0;i<urlList.length;i++){
        var img= document.createElement("img");
        img.setAttribute("src",urlList[i]+"/"+Math.random());
        img.setAttribute("onerror","handle("+i+")");
        img.style.display = "none";
        el.appendChild(img);
    }
}

function handle(i){

    if(!timer){
        return;
    }

    if(ping>20){
        clearInterval(timer);
        timer = null;
        if(!retryTimer){
            retryWaitSec = 10;
            retryTimer = setInterval(retry, 1000);
        }
    }else{
        this.location.href= urlList[i];
    }
}

function retry(){
    var img = document.getElementById("loading");
    img.setAttribute("class","hide");
    el = document.getElementById("speed_test");
    el.innerHTML = "";
    el = document.getElementById("info");
    el.innerHTML = "Network Problem, No Avaiable Server! Retry after"+retryWaitSec+" seconds !<br> 网络问题,没有可访问的服务器!"+retryWaitSec+"秒后重试！";
    retryWaitSec--;
    if(retryWaitSec<=0){
        location.reload();
    }
}
