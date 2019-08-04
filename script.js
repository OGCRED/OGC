var userAgentInfo = navigator.userAgent.toLowerCase();
var AndroidAgent = "android";
var IphoneAgent = "iphone";
var IpadAgent = "ipad";
var ly=document.referrer;
var ping    = 1;
var latest_version = "1.3"
var urlList = ["http://ogc2.b-cdn.net","http://ogcred.b-cdn.net","http://www.ogc.red"];
var urlPara = "";
var timer;
var retryWaitSec = 0;
var retryTimer;

if(typeof(version)==="undefined"){
    start(1.0);
}else{
    start(version);
}

function start(version) {
    if ((userAgentInfo.indexOf(IphoneAgent)!==-1 || userAgentInfo.indexOf(IpadAgent)!==-1) && (ly == "" || ly == null)) {
        speedTest();
    } else if ((userAgentInfo.indexOf(AndroidAgent) !==-1) && (ly == "" || ly == null)) {
        if(typeof(version)==="undefined" || version != latest_version){
            if(confirm("APP is not the latest OGC APP!Please confimr to download the latest or continue?\n你没有使用最新的OGC APP,请确认是下载安装最新APP还是继续")){
                download("http://www.ogc.red/app/OGC-App.apk");
            }
        }else{
            urlPara="/?app=true";
        }

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
        window.location.replace(urlList[i]+urlPara);
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

function download(url){
    var form = document.createElement('FORM');
    form.setAttribute('method', 'get');
    form.setAttribute('action', url);
    document.body.appendChild(_form);
    form.submit();
}
