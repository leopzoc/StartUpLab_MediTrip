// Home specific logic
document.addEventListener('DOMContentLoaded', () => {
  // Logic initialized
});

//PRENDERSI IL NOME E AGGIUNGERLO AL SALUTO 
const nome = localStorage.getItem('user_name');
document.getElementById('salutoNome').textContent = `Hello ${nome}`;
