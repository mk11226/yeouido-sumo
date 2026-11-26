'use strict';
const scenarios = {
  night: {hour:'03:00',title:'심야 교통',description:'차량이 적은 시간대입니다. 비교적 여유 있는 도로에서도 신호와 주변 차량을 살피는 주행이 필요합니다.',cars:3},
  day: {hour:'12:00',title:'주간 교통',description:'일상적인 도심 교통 속에서 신호와 주변 차량에 대응하며 목적지로 향합니다.',cars:6},
  rush: {hour:'08:00',title:'출근 교통',description:'차량이 몰리는 시간대입니다. 정체와 신호 대기, 교차로에서의 상호작용으로 주행이 더 복잡해집니다.',cars:9}
};
const tabs = [...document.querySelectorAll('[data-scenario]')];
function setScenario(key){
  const data = scenarios[key]; if(!data)return;
  tabs.forEach(tab=>{const selected=tab.dataset.scenario===key;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;});
  document.querySelector('#scenario-hour').textContent=data.hour;
  document.querySelector('#scenario-title').textContent=data.title;
  document.querySelector('#scenario-description').textContent=data.description;
  document.querySelector('#scenario-detail').setAttribute('aria-labelledby',`tab-${key}`);
  document.querySelectorAll('.road-demo .lane').forEach((lane,row)=>{
    lane.replaceChildren();
    for(let i=0;i<data.cars;i++){
      const car=document.createElement('span');car.className='car'+(row===1&&i===1?' ego':'');
      car.style.left=`${5+((i*87/data.cars+row*7)%88)}%`;lane.append(car);
    }
  });
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>setScenario(tab.dataset.scenario));
  tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight')next=(index+1)%tabs.length;
    if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=tabs.length-1;
    if(next!==undefined){event.preventDefault();tabs[next].focus();setScenario(tabs[next].dataset.scenario);}
  });
});
setScenario('day');
function safeURL(value){try{const url=new URL(value);return url.protocol==='https:'?url.href:null;}catch{return null;}}
fetch('project.json').then(response=>{if(!response.ok)throw new Error('Project links unavailable');return response.json();}).then(config=>{
  ['github','dataset'].forEach(key=>{const url=safeURL(config[key]);if(url)document.querySelectorAll(`[data-resource="${key}"]`).forEach(link=>link.href=url);});
  [['presentation','presentation-card','발표 PDF 열기'],['video','video-card','주행 영상 보기']].forEach(([key,id,label])=>{
    const url=safeURL(config[key]);if(!url)return;
    const card=document.getElementById(id);const link=document.createElement('a');
    link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.className='resource-action';link.textContent=label;
    card.classList.remove('pending');card.querySelector('.pending-label').replaceWith(link);
  });
}).catch(()=>{/* HTML의 GitHub·데이터셋 링크는 설정 파일이 없어도 동작한다. */});
