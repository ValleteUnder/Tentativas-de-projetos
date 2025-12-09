(function(){
  const style = document.createElement('style');
  style.textContent = `
    .snowflake {
      position: fixed;
      top: -10px;
      z-index: 9999;
      pointer-events: none;
      user-select: none;
      font-size: 18px;
      opacity: 0.9;
      animation: fall linear forwards;
    }
    @keyframes fall {
      to { transform: translateY(110vh) rotate(360deg); }
    }
    .christmas-lights span {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin: 0 4px;
      border-radius: 50%;
      animation: blink 1.2s infinite;
    }
    @keyframes blink {
      0%,100% { transform: scale(1); }
      50% { transform: scale(1.6); }
    }
    .xmas-toggle {
      position: fixed;
      right: 16px;
      bottom: 16px;
      z-index: 10000;
      background: #fff;
      border: 2px solid #000;
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  function addLightsToH1(){
    const h1 = document.querySelector('h1');
    if(!h1 || h1.dataset.xmasLights) return;
    h1.dataset.xmasLights = '1';
    h1.style.position = 'relative';
    const colors = ['#ff4d4d','#4dff88','#ffd24d','#4db6ff','#d14dff'];
    ['left','right'].forEach(side =>{
      const wrapper = document.createElement('div');
      wrapper.style.position='absolute';
      wrapper.style.top='50%';
      wrapper.style.transform='translateY(-50%)';
      wrapper.style[side]='-48px';
      colors.forEach(c=>{
        const s=document.createElement('span');
        s.style.background=c;
        wrapper.appendChild(s);
      });
      h1.appendChild(wrapper);
    });
  }

  let snowEnabled = true;
  function createSnowflake(){
    if(!snowEnabled) return;
    const el = document.createElement('div');
    el.className = 'snowflake';
    el.textContent = '❄️';
    el.style.fontSize = (Math.random()*18 + 12) + 'px';
    el.style.left = Math.random()*100 + 'vw';
    el.style.animationDuration = (Math.random()*6 + 6) + 's';
    document.body.appendChild(el);
    setTimeout(()=> el.remove(), 15000);
  }

  function createToggle(){
    const btn = document.createElement('button');
    btn.className = 'xmas-toggle';
    btn.textContent = '🎄 Natal: ligado';
    btn.onclick = ()=>{
      snowEnabled = !snowEnabled;
      btn.textContent = snowEnabled ? '🎄 Natal: ligado' : '🎄 Natal: desligado';
      if(!snowEnabled){
        document.querySelectorAll('.snowflake').forEach(n=>n.remove());
      }
    };
    document.body.appendChild(btn);
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    addLightsToH1();
    createToggle();
    setInterval(createSnowflake, 400);
  });
})();

