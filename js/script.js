const contactForm = document.getElementById("contactForm");
const telefoneInput = document.getElementById("telefone");
const formMessage = document.getElementById("formMessage");

function aplicarMascaraTelefone(valor) {
  valor = valor.replace(/\D/g, "");

  if (valor.length > 11) {
    valor = valor.slice(0, 11);
  }

  if (valor.length <= 10) {
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
  }

  return valor;
}

if (telefoneInput) {
  telefoneInput.addEventListener("input", (event) => {
    event.target.value = aplicarMascaraTelefone(event.target.value);
  });
}

function mostrarMensagem(tipo, texto) {
  if (!formMessage) return;

  formMessage.textContent = texto;
  formMessage.className = `form-message ${tipo}`;
}

function validarNome(nome) {
  return nome.trim().length >= 3;
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

function validarTelefone(telefone) {
  const numeros = telefone.replace(/\D/g, "");
  return numeros.length >= 10 && numeros.length <= 11;
}

function validarMensagem(mensagem) {
  const texto = mensagem.trim();
  return texto.length >= 10 && texto.length <= 1000;
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const mensagem = document.getElementById("mensagem").value;

    if (!validarNome(nome)) {
      event.preventDefault();
      mostrarMensagem("error", "Digite um nome válido com pelo menos 3 caracteres.");
      return;
    }

    if (!validarEmail(email)) {
      event.preventDefault();
      mostrarMensagem("error", "Digite um email válido.");
      return;
    }

    if (!validarTelefone(telefone)) {
      event.preventDefault();
      mostrarMensagem("error", "Digite um telefone válido com DDD.");
      return;
    }

    if (!validarMensagem(mensagem)) {
      event.preventDefault();
      mostrarMensagem("error", "A mensagem deve ter entre 10 e 1000 caracteres.");
      return;
    }

    mostrarMensagem("success", "Dados válidos. Enviando mensagem...");
    event.target.querySelector("button").disabled = true;
    event.target.querySelector("button").textContent = "Enviando...";
  });
}

const params = new URLSearchParams(window.location.search);
const status = params.get("status");

if (status === "sucesso") {
  mostrarMensagem("success", "Mensagem enviada com sucesso!");
  if (contactForm) {
    contactForm.reset();
  }
  history.replaceState({}, document.title, window.location.pathname + "#contato");
}

if (status === "erro") {
  mostrarMensagem("error", "Não foi possível enviar sua mensagem. Verifique os dados e tente novamente.");
  history.replaceState({}, document.title, window.location.pathname + "#contato");
}