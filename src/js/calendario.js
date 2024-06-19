// Função para obter o nome completo do mês
function getFullMonthName(month) {
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return monthNames[month];
}

// Variáveis globais para armazenar o ano e o mês atual
let currentYear = null;
let currentMonth = null;

// Função para preencher o calendário com um mês específico
function fillCalendar(year, month) {
  currentYear = year;
  currentMonth = month;

  // Preencher o nome completo do mês e ano
  const fullMonthName = getFullMonthName(month);
  document.querySelector(".month h2").textContent = `${fullMonthName} ${year}`;

  // Preencher os dias do mês
  const daysContainer = document.querySelector(".days");
  daysContainer.innerHTML = "";

  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Último dia do mês atual

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = day;
    daysContainer.appendChild(dayElement);
  }

  // Destacar o dia atual
  highlightCurrentDay();
}

// Função para destacar o dia atual
function highlightCurrentDay() {
  const today = new Date();
  if (
    today.getFullYear() === currentYear &&
    today.getMonth() === currentMonth
  ) {
    const currentDay = today.getDate();
    const dayElements = document.querySelectorAll(".day");
    dayElements.forEach((dayElement) => {
      if (parseInt(dayElement.textContent) === currentDay) {
        dayElement.classList.add("current");
      } else {
        dayElement.classList.remove("current");
      }
    });
  }
}

// Função para navegar para o mês anterior
function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  fillCalendar(currentYear, currentMonth);
}

// Função para navegar para o próximo mês
function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  fillCalendar(currentYear, currentMonth);
}

// Chamar a função para preencher o calendário ao carregar a página
window.onload = function () {
  const today = new Date();
  currentYear = today.getFullYear();
  currentMonth = today.getMonth();
  fillCalendar(currentYear, currentMonth);
};
