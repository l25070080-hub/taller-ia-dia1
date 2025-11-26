document.addEventListener('DOMContentLoaded', () => {
  const cInput = document.getElementById('celsius');
  const convertBtn = document.getElementById('convertBtn');
  const resetBtn = document.getElementById('resetBtn');
  const resultEl = document.getElementById('result');

  function formatNumber(n){
    return Number(n).toLocaleString(undefined, {maximumFractionDigits:2, minimumFractionDigits:0});
  }

  function showResult(text, isError){
    resultEl.textContent = text;
    resultEl.style.color = isError ? '#ff6b6b' : '';
  }

  function convert(){
    const raw = cInput.value;
    if(raw === '' || raw === null){
      showResult('Ingresa un valor en Celsius', true);
      return;
    }
    const c = Number(raw);
    if(Number.isNaN(c)){
      showResult('Valor no válido', true);
      return;
    }
    const f = (c * 9/5) + 32;
    showResult(`${formatNumber(c)} °C = ${formatNumber(f)} °F`, false);
  }

  convertBtn.addEventListener('click', (e)=>{ e.preventDefault(); convert(); });
  cInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter'){ e.preventDefault(); convert(); }});
  resetBtn.addEventListener('click', ()=>{ cInput.value=''; showResult('—'); cInput.focus(); });
});
