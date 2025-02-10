document.getElementById('generate-btn').addEventListener('click', async () => {
  try {
    // Simular loading
    const botao = document.getElementById('generate-btn');
    botao.disabled = true;
    botao.textContent = 'Gerando...';

    const response = await fetch('http://localhost:3000/gerar-swot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}) // Não precisa mais enviar dados
    });

    const data = await response.json();
    
    // Preencher seções com recomendações
    document.getElementById('report').style.display = 'block';
    document.getElementById('strengths-report').innerHTML = data.recommendations.forcas.map(i => `<li>${i}</li>`).join('');
    document.getElementById('weaknesses-report').innerHTML = data.recommendations.fraquezas.map(i => `<li>${i}</li>`).join('');
    document.getElementById('opportunities-report').innerHTML = data.recommendations.oportunidades.map(i => `<li>${i}</li>`).join('');
    document.getElementById('threats-report').innerHTML = data.recommendations.ameacas.map(i => `<li>${i}</li>`).join('');

  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao gerar recomendações');
  } finally {
    botao.disabled = false;
    botao.textContent = 'Gerar Recomendações';
  }
});