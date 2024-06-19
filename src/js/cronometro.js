// Selecionando elementos do DOM
const labelTempo = document.getElementById("label-tempo");
const labelMsec = document.getElementById("label-msec");
const btnResume = document.getElementById("btn-resume");
const btnPause = document.getElementById("btn-pause");
const btnReset = document.getElementById("btn-reset");
const btnLap = document.getElementById("btn-lap");

// Variáveis para controle do cronômetro e voltas
let cronometroAtivo = false;
let tempoInicial = 0;
let tempoDecorrido = 0;
let intervaloCronometro;
let numeroVolta = 1;

// Função para formatar o tempo no formato mm:ss
function formatarTempo(tempo) {
  let minutos = Math.floor(tempo / 60000);
  let segundos = Math.floor((tempo % 60000) / 1000);
  let milissegundos = Math.floor((tempo % 1000) / 10);
  return `${minutos.toString().padStart(2, "0")}:${segundos
    .toString()
    .padStart(2, "0")}.${milissegundos.toString().padStart(2, "0")}`;
}

// Função para iniciar o cronômetro
function iniciarCronometro() {
  if (!cronometroAtivo) {
    cronometroAtivo = true;
    tempoInicial = Date.now() - tempoDecorrido;
    intervaloCronometro = setInterval(() => {
      tempoDecorrido = Date.now() - tempoInicial;
      atualizarTempo();
    }, 10);
    btnResume.disabled = true;
    btnPause.disabled = false;
    btnReset.disabled = false;
    btnLap.disabled = false;
  }
}

// Função para pausar o cronômetro
function pausarCronometro() {
  cronometroAtivo = false;
  clearInterval(intervaloCronometro);
  btnResume.disabled = false;
  btnPause.disabled = true;
}

// Função para retomar o cronômetro
function retomarCronometro() {
  iniciarCronometro();
}

// Função para resetar o cronômetro
function resetarCronometro() {
  cronometroAtivo = false;
  tempoInicial = 0;
  tempoDecorrido = 0;
  numeroVolta = 1;
  clearInterval(intervaloCronometro);
  atualizarTempo();
  btnResume.disabled = false;
  btnPause.disabled = true;
  btnReset.disabled = true;
  btnLap.disabled = true;
  limparVoltas();
}

// Função para registrar volta
function registrarVolta() {
  const voltaAnterior = document.createElement("div");
  voltaAnterior.classList.add("volta");
  voltaAnterior.innerText = `Volta ${numeroVolta}: ${formatarTempo(
    tempoDecorrido
  )}`;
  document.getElementById("panel-ferramentas").appendChild(voltaAnterior);
  numeroVolta++;
}

// Função para limpar as voltas registradas
function limparVoltas() {
  const panelFerramentas = document.getElementById("panel-ferramentas");
  while (panelFerramentas.firstChild) {
    panelFerramentas.removeChild(panelFerramentas.firstChild);
  }
}

// Função para atualizar o tempo no cronômetro
function atualizarTempo() {
  labelTempo.textContent = formatarTempo(tempoDecorrido);
  labelMsec.textContent = `.${(tempoDecorrido % 1000)
    .toString()
    .padStart(2, "0")}`;
}

// Event listeners para os botões
btnResume.addEventListener("click", retomarCronometro);
btnPause.addEventListener("click", pausarCronometro);
btnReset.addEventListener("click", resetarCronometro);
btnLap.addEventListener("click", registrarVolta);

// Inicialização do cronômetro ao carregar a página
resetarCronometro();
