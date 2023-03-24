(function(){"use strict";var e={2541:function(e,t,n){var s=n(9963),i=n(6252);function o(e,t,n,s,o,l){const r=(0,i.up)("Calendar");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i.Wm)(r)])}var l=n(3577);const r=e=>((0,i.dD)("data-v-4d3aef37"),e=e(),(0,i.Cn)(),e),a={class:"calendar"},d={class:"calendar-header"},c={class:"current-time"},u=r((()=>(0,i._)("p",null,"In London",-1))),v=["onClick"],h={class:"day-number"},w={class:"day-events"},m={class:"event-time"},f=["onClick"],E=["onClick"],p={key:1,class:"modal"},D={class:"modal-content"},y=r((()=>(0,i._)("label",{for:"start-time"},"Start Time:",-1))),M=r((()=>(0,i._)("label",{for:"end-time"},"End Time:",-1)));function g(e,t,n,o,r,g){return(0,i.wg)(),(0,i.iD)("div",a,[(0,i._)("div",d,[(0,i._)("button",{onClick:t[0]||(t[0]=(...e)=>g.previousMonth&&g.previousMonth(...e))},"Prev"),(0,i._)("div",{class:"current-month",ref:"currentMonth"},(0,l.zw)(g.monthYear),513),(0,i._)("div",c,[u,(0,i.Uk)(" "+(0,l.zw)(g.londonTime),1)]),(0,i._)("button",{onClick:t[1]||(t[1]=(...e)=>g.nextMonth&&g.nextMonth(...e))},"Next")]),(0,i._)("table",null,[(0,i._)("thead",null,[(0,i._)("tr",null,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(r.daysOfWeek,(e=>((0,i.wg)(),(0,i.iD)("th",{key:e},(0,l.zw)(e),1)))),128))])]),(0,i._)("tbody",null,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(g.weeks,(e=>((0,i.wg)(),(0,i.iD)("tr",{key:e},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e,(e=>((0,i.wg)(),(0,i.iD)("td",{key:e,onClick:t=>g.selectDay(e)},[(0,i._)("div",h,(0,l.zw)(new Date(e).getDate()),1),(0,i._)("div",w,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(g.eventsOnDay(e),(e=>((0,i.wg)(),(0,i.iD)("div",{key:e.id,class:"event"},[(0,i._)("div",null,(0,l.zw)(e.title),1),(0,i._)("div",m,(0,l.zw)(g.formatTime(e.start))+" - "+(0,l.zw)(g.formatTime(e.end)),1),(0,i._)("button",{onClick:t=>g.editEvent(e)},"Edit",8,f)])))),128))]),(0,i._)("button",{onClick:t=>g.addNewEvent(e)},"Add Event",8,E)],8,v)))),128))])))),128))])]),r.showModal?((0,i.wg)(),(0,i.iD)("div",{key:0,class:"modal-backdrop",onClick:t[2]||(t[2]=(...e)=>g.closeModal&&g.closeModal(...e))})):(0,i.kq)("",!0),r.showModal?((0,i.wg)(),(0,i.iD)("div",p,[(0,i._)("button",{class:"modal-close",onClick:t[3]||(t[3]=(...e)=>g.closeModal&&g.closeModal(...e))},"X"),(0,i._)("div",D,[(0,i._)("h2",null,"Add Event for "+(0,l.zw)(r.selectedDay&&r.selectedDay instanceof Date?r.selectedDay.toLocaleDateString("en-US",{day:"numeric",month:"numeric",year:"numeric"}):""),1),(0,i.wy)((0,i._)("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=e=>r.newEventTitle=e),placeholder:"Event Titleh"},null,512),[[s.nr,r.newEventTitle]]),(0,i._)("div",null,[y,(0,i.wy)((0,i._)("input",{type:"time",id:"start-time","onUpdate:modelValue":t[5]||(t[5]=e=>r.newEventStart=e)},null,512),[[s.nr,r.newEventStart]])]),(0,i._)("div",null,[M,(0,i.wy)((0,i._)("input",{type:"time",id:"end-time","onUpdate:modelValue":t[6]||(t[6]=e=>r.newEventEnd=e)},null,512),[[s.nr,r.newEventEnd]])]),(0,i._)("button",{onClick:t[7]||(t[7]=(...e)=>g.saveEvent&&g.saveEvent(...e))},"Save"),(0,i._)("button",{class:"delete",onClick:t[8]||(t[8]=(...e)=>g.deleteEvent&&g.deleteEvent(...e))},"Delete")])])):(0,i.kq)("",!0)])}n(7658);var k=n(8037),_=n(584),b=n(3703),T=n(7090),Z=n(4135),S=n(7042),O=n(8420),C=n(1640),x=n(1574);const I="Europe/London";var H={name:"Calendar",data(){return{currentMonth:new Date,daysOfWeek:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],currentTime:null,selectedDay:new Date,selectedEvent:null,newEventTitle:"",newEventStart:"",newEventEnd:"",events:JSON.parse(localStorage.getItem("events"))||[{id:1,title:"Lunch",start:new Date(2023,2,26,12,0),end:new Date(2023,2,26,13,0)}],showModal:!1}},mounted(){const e=JSON.parse(localStorage.getItem("events"));e&&(this.events=e),setInterval((()=>{const e=(0,x.Z)(new Date,I);this.currentTime=(0,k.Z)(e,"h:mm:ss a",{timeZone:I})}),6e4)},computed:{weeks(){const e=(0,_.Z)((0,b.Z)(this.currentMonth)),t=(0,T.Z)((0,Z.Z)(this.currentMonth)),n=e,s=[];while(n<=t){const e=[];for(let t=0;t<7;t++)e.push(new Date(n)),n.setDate(n.getDate()+1);s.push(e)}return s},monthYear(){return(0,k.Z)(this.currentMonth,"MMMM yyyy")},londonTime(){const e=new Date,t=(0,x.Z)(e,I);return(0,k.Z)(t,"h:mm a ",{timeZone:I})}},methods:{formatTime(e){const t=new Date(e),n=t.getHours(),s=t.getMinutes();return`${n}:${s<10?"0":""}${s}`},findEvent(e){return this.events.find((t=>t.id===e))},addNewEvent(e){this.selectedDay=e,this.selectedEvent=null,this.newEventTitle="",this.newEventStart="",this.newEventEnd=""},saveEvent(){const e=(0,S.Z)(this.selectedDay,parseInt(this.newEventStart)),t=(0,S.Z)(this.selectedDay,parseInt(this.newEventEnd));if(this.selectedEvent)this.selectedEvent.title=this.newEventTitle,this.selectedEvent.start=e,this.selectedEvent.end=t;else{const n=Math.max(...this.events.map((e=>e.id)))+1;this.events.push({id:n,title:this.newEventTitle,start:e,end:t})}localStorage.setItem("events",JSON.stringify(this.events)),this.showModal=!1},editEvent(e){this.selectedEvent=e,this.selectedDay=e.start,this.newEventTitle=e.title,this.newEventStart=(0,k.Z)((0,O.Z)(e.start),"HH:mm"),this.newEventEnd=(0,k.Z)((0,O.Z)(e.end),"HH:mm"),this.showModal=!0},deleteEvent(e){if(this.selectedEvent=e,this.selectedEvent){const e=this.events.findIndex((e=>e.id===this.selectedEvent.id));this.events.splice(e,1),localStorage.setItem("events",JSON.stringify(this.events)),this.selectedEvent=null}this.showModal=!1},eventsOnDay(e){const t=this.events.filter((t=>{const n=new Date(t.start);return n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate()}));return t},formatTimeInput(e){const t=new Date,[n,s]=e.split(":");return t.setHours(n),t.setMinutes(s),t},showModalWindow(){this.showModal=!0},closeModal(){this.showModal=!1},combineDateTime(e,t){const[n,s]=t.split(":");return(0,S.Z)(e,n,s)},previousMonth(){this.currentMonth=(0,C.Z)(this.currentMonth,-1)},nextMonth(){this.currentMonth=(0,C.Z)(this.currentMonth,1)},selectDay(e){this.selectedDay=new Date(e),this.selectedEvent=null,this.showModal=!0},addEvent(e){this.selectedDay=e}}},z=n(3744);const Y=(0,z.Z)(H,[["render",g],["__scopeId","data-v-4d3aef37"]]);var N=Y,j={name:"App",components:{Calendar:N}};const U=(0,z.Z)(j,[["render",o]]);var W=U;(0,s.ri)(W).mount("#app")}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,s,i,o){if(!s){var l=1/0;for(c=0;c<e.length;c++){s=e[c][0],i=e[c][1],o=e[c][2];for(var r=!0,a=0;a<s.length;a++)(!1&o||l>=o)&&Object.keys(n.O).every((function(e){return n.O[e](s[a])}))?s.splice(a--,1):(r=!1,o<l&&(l=o));if(r){e.splice(c--,1);var d=i();void 0!==d&&(t=d)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[s,i,o]}}(),function(){n.d=function(e,t){for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,s){var i,o,l=s[0],r=s[1],a=s[2],d=0;if(l.some((function(t){return 0!==e[t]}))){for(i in r)n.o(r,i)&&(n.m[i]=r[i]);if(a)var c=a(n)}for(t&&t(s);d<l.length;d++)o=l[d],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(c)},s=self["webpackChunknew"]=self["webpackChunknew"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=n.O(void 0,[998],(function(){return n(2541)}));s=n.O(s)})();
//# sourceMappingURL=app.cece2876.js.map