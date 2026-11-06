// Tracking optional: if a progress.js later defines window.pmTrack, events are sent;
// if it fails to load (adblock, network), the quiz keeps working.
const pmTrack = (...args) => window.pmTrack?.(...args);

const app = document.querySelector("#app");
const backButton = document.querySelector("#backButton");
const appHeader = document.querySelector("#appHeader");
const stepCounter = document.querySelector("#stepCounter");
const progressBar = document.querySelector("#progressBar");
const landingParams = new URLSearchParams(window.location.search);

const brand = "ProMove";

// Links do rodapé. Vazio = o link não leva a lugar nenhum.
// A versão antiga apontava para os termos da promuse.ai: troque pelos termos do ProMove.
const legal = { terms: "", privacy: "", subscription: "", guarantee: "" };

// Oferta: plano único de 4 semanas na Payt. Se mudar o preço na Payt, ajuste aqui também.
// fullPrice é o preço "de", usado no selo de 50% OFF que a roleta libera.
const offer = {
  checkoutUrl: "https://payt.site/eGCOK6x",
  price: 47,
  fullPrice: 94,
  weeks: 4,
};
// Cronômetro do topo da oferta, em segundos (4:14, como na versão anterior).
const countdownSeconds = 254;

const money = (value) => `R$ ${value.toFixed(2).replace(".", ",")}`;
const offPercent = Math.round((1 - offer.price / offer.fullPrice) * 100);

const iconCheck = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg>`;
const iconStar = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/></svg>`;

// Depoimentos e números vêm da versão anterior do funil, com nomes e cidades brasileiros de exemplo.
// Substitua por depoimentos e números reais do ProMove antes de anunciar.
// Formato: [texto, nome, cidade].
const loaderReviews = [
  ["Eu tinha pavor de ficar para trás, mas o ProMove torna tudo muito simples. Sem jargões assustadores, só dicas úteis que eu uso todos os dias.", "Fernanda Oliveira", "Curitiba, PR"],
  ["Usei as ferramentas de IA para reescrever todas as descrições dos meus produtos. Levei minutos em vez de dias, e as vendas começaram a aparecer na hora.", "Luciana Barbosa", "Goiânia, GO"],
  ["Entre filhos e trabalho, meu tempo livre é zero. As aulas em áudio de 15 minutos são perfeitas para o trajeto. Sinto que fico mais inteligente a cada dia.", "Camila Nogueira", "São Paulo, SP"],
  ["Nunca achei que seria \"criativa\", mas transformar fotos da família em arte é muito divertido. É surpreendentemente fácil e virou meu novo hobby favorito.", "Adriana Moreira", "Fortaleza, CE"],
  ["Diferente de outros cursos que são só teoria, este me deu ferramentas que pude usar na hora. Melhor investimento que fiz por mim mesma em anos.", "Patrícia Duarte", "Florianópolis, SC"],
];

const question = (id, title, subtitle, options) => ({
  id,
  kind: "single",
  title,
  subtitle,
  options: options.map(([, label]) => label),
  icons: options.map(([icon]) => icon),
});

// Caminhos do quiz. A resposta da primeira tela escolhe o caminho:
// os 4 primeiros cartões seguem "trabalho"; "Sem trabalho / Buscando uma fonte de renda" segue "renda".
// Telas com `path` só aparecem no caminho delas; telas sem `path` aparecem nos dois.
const perfilPaths = ["trabalho", "trabalho", "trabalho", "trabalho", "renda"];
const onPath = (path, list) => list.map((step) => ({ ...step, path }));

const steps = [
  {
    id: "perfil",
    kind: "tiles",
    title: "O que melhor descreve você agora?",
    subtitle: "Vamos construir seu caminho de IA com base na sua situação real.",
    options: ["Trabalho para uma empresa", "Trabalho por conta própria", "Tenho um pequeno negócio", "Estou mudando de direção", "Sem trabalho / Buscando uma fonte de renda"],
    // O 5º cartão ainda não tem imagem (images/perfil-sem-trabalho.webp): no index.html ele mostra só o emoji.
    images: ["images/perfil-empresa.webp", "images/perfil-autonomo.webp", "images/perfil-negocio.webp", "images/perfil-mudando.webp"],
    emojis: ["🏢", "🧑‍💻", "🏪", "🧭", "🔎"],
  },
  {
    id: "comunidade",
    kind: "info",
    image: "images/info-fundador.webp",
    imageSize: [670, 670],
    kicker: "Mais de 2.000.000",
    title: "de pessoas entraram no {brand} para dominar a IA",
    paragraphs: ["Agora vamos entender o seu dia a dia para montar um caminho que faça sentido para você."],
    cta: "Continuar",
  },
  ...onPath("renda", [
    question("r_area", "Com o que você mais se identifica?", "Escolha a opção mais próxima.", [
      ["📣", "Redes sociais / Conteúdo"],
      ["🎨", "Artes / Design"],
      ["✍️", "Escrita / Textos"],
      ["🎬", "Vídeos / Edição"],
      ["💬", "Vendas / WhatsApp"],
      ["🤝", "Atendimento a clientes"],
      ["📋", "Organização / Administrativo"],
      ["🌎", "Idiomas / Tradução"],
      ["🎓", "Ensinar / Explicar coisas"],
      ["🛍️", "Produtos / Loja online"],
      ["💻", "Tecnologia / Computador"],
      ["✨", "Outro"],
    ]),
    question("r_objetivo", "O que você mais quer conquistar com a IA?", "Escolha o que é mais importante para você.", [
      ["💸", "Gerar uma renda com IA com poucas horas por dia"],
      ["💼", "Conseguir melhores oportunidades de emprego"],
      ["🦅", "Conquistar minha independência financeira"],
      ["🏡", "Construir um futuro estável para minha família"],
      ["🙌", "Parar de depender de outras pessoas"],
    ]),
    // Telas de reforço do caminho "renda": mesmas posições e imagens do caminho "trabalho", texto voltado para renda.
    {
      id: "r_nao_generico",
      kind: "info",
      image: "images/info-renda-nao-generico.webp",
      imageSize: [670, 447],
      title: "Seu plano de renda com IA não pode ser genérico.",
      paragraphs: ["A maioria das pessoas não consegue ganhar dinheiro com IA porque recebe dicas soltas, ferramentas aleatórias e nenhum caminho claro. O {brand} monta o seu caminho com base na sua área, no seu objetivo e na sua primeira vitória."],
      cta: "Continuar",
    },
    question("r_situacao", "O que mais pesa na sua situação hoje?", "Muitas pessoas que hoje ganham com IA começaram exatamente daqui.", [
      ["📉", "As contas apertadas no fim do mês"],
      ["📨", "Mandar currículo e não ter retorno"],
      ["⏰", "Não ter tempo nem flexibilidade"],
      ["⏳", "Sentir que estou perdendo tempo"],
      ["🔒", "Não ter uma renda só minha"],
      ["😔", "Não saber por onde recomeçar"],
      ["🙇", "Depender financeiramente de outra pessoa"],
    ]),
    // Depoimento de exemplo: troque por um depoimento real do ProMove antes de anunciar.
    {
      id: "r_avaliacao",
      kind: "review",
      title: "Você não precisa de experiência para começar",
      reviewTitle: "Meu primeiro cliente veio na segunda semana",
      text: "Eu estava sem trabalho e não sabia nem por onde começar. Segui o passo a passo, montei meu perfil e fechei meu primeiro cliente criando posts com IA. Hoje tenho uma renda que é só minha.",
      author: "Renata Alves",
      authorNote: "Cliente verificada · Salvador, BA",
      cta: "Continuar",
    },
    question("r_primeira_semana", "O que você precisa conquistar já na primeira semana?", "Quem começa com uma vitória rápida não desiste no meio do caminho.", [
      ["💰", "Fazer minha primeira venda com IA"],
      ["📲", "Fechar meu primeiro cliente"],
      ["🧭", "Saber exatamente o que vender e para quem"],
      ["🎨", "Ter meu primeiro trabalho pronto para oferecer"],
      ["🗂️", "Montar um perfil que atraia clientes"],
      ["🚫", "Parar de perder tempo e começar de verdade"],
    ]),
    question("r_conhecimento", "Quanto você sabe sobre Inteligência Artificial?", "", [
      ["🤓", "Sei bastante sobre IA"],
      ["🙂", "Conheço algumas ferramentas"],
      ["😞", "Meu conhecimento é bem limitado"],
      ["🤕", "Não sei nada sobre IA"],
    ]),
    {
      id: "r_nao_tecnico",
      kind: "info",
      image: "images/info-nao-tecnico.webp",
      imageSize: [670, 459],
      title: "Boa notícia: você não precisa entender de tecnologia.",
      paragraphs: ["A IA de hoje tem menos a ver com programação e mais com saber o que pedir, como transformar isso em uma fonte de renda e como usar a ferramenta certa na hora certa."],
      cta: "Continuar",
    },
    question("r_barreira", "O que está te travando para começar a ganhar com IA?", "Seja sincero: é exatamente isso que o seu plano vai eliminar.", [
      ["🧭", "Não sei por onde começar"],
      ["🧰", "São ferramentas demais"],
      ["⏳", "Não tenho tempo suficiente"],
      ["🧩", "Parece complicado demais"],
      ["😬", "Tenho medo de usar errado"],
      ["💸", "Não sei como ganhar dinheiro com ela"],
    ]),
    question("r_sentimento", "Quando as pessoas falam de IA, o que você mais sente?", "Seja honesto: a maioria dos membros começa aqui.", [
      ["😳", "Que estou ficando para trás"],
      ["🤔", "Desconfiado, mas curioso"],
      ["🫣", "Que é só para quem entende de tecnologia"],
      ["😤", "Raiva por ainda não ter começado"],
      ["🔥", "Vontade de tentar agora mesmo"],
      ["🙏", "Esperança de que pode dar certo para mim"],
    ]),
    question("r_motivo", "Existe algum motivo para você querer começar agora?", "Um motivo claro facilita o começo.", [
      ["🧾", "Pagar as contas do mês"],
      ["🔎", "Ter renda enquanto procuro emprego"],
      ["🎄", "Fechar o ano com dinheiro e começar o próximo com uma renda nova"],
      ["🏡", "Juntar para algo importante (casa, viagem, curso)"],
      ["🙌", "Ajudar em casa com as despesas"],
      ["🛡️", "Nenhuma data, só não quero ficar parado"],
    ]),
    {
      id: "r_sem_esperar",
      kind: "info",
      image: "images/info-renda-sem-esperar.webp",
      imageSize: [670, 447],
      title: "Você não precisa esperar se sentir pronto.",
      paragraphs: ["A maioria das pessoas fica parada porque espera a IA parecer menos confusa. O {brand} te ajuda a começar pequeno, conquistar seu primeiro resultado com inteligência artificial e ganhar confiança a partir daí."],
      cta: "Continuar",
    },
    question("r_tempo", "Quanto tempo você consegue dedicar por dia, na realidade?", "Seu plano vai caber na sua rotina, mesmo que ela seja corrida.", [
      ["⚡", "10 min/dia"],
      ["⏱️", "15 min/dia"],
      ["🕒", "30 min/dia"],
      ["🎯", "1 hora ou mais/dia"],
    ]),
    question("r_formato", "O que faria aprender a ganhar com IA parecer mais fácil?", "Escolha o tipo de ajuda que você realmente usaria.", [
      ["🎬", "Aulas curtas em vídeo"],
      ["🪄", "Prompts prontos para copiar e usar"],
      ["✅", "Um passo a passo por dia"],
      ["👨‍🏫", "Orientação estilo mentor"],
      ["👥", "Exemplos de pessoas que começaram do zero"],
    ]),
    question("r_prova", "O que mostraria que você está pronto para ganhar com IA?", "O progresso fica melhor quando você consegue ver.", [
      ["🎓", "Um Certificado de IA"],
      ["💼", "Meus primeiros trabalhos prontos para oferecer"],
      ["📈", "Meu progresso visível semana a semana"],
      ["🤝", "Meu primeiro cliente interessado"],
      ["💸", "Meu primeiro pagamento recebido"],
    ]),
    question("r_pronto", "Pronto para criar seu plano de renda com IA?", "Vamos usar suas respostas para montar seu plano de 28 dias.", [
      ["🚀", "Sim, criar meu plano agora"],
      ["👀", "Quero ver como fica o meu caminho"],
      ["😬", "Estou nervoso, mas quero começar"],
      ["⚡", "Quero dar meu primeiro passo hoje"],
    ]),
    {
      id: "r_plano_pronto",
      kind: "info",
      image: "images/info-plano-pronto.webp",
      imageSize: [670, 459],
      title: "Seu caminho de 28 dias até o Certificado de IA está pronto",
      paragraphs: ["Criado com base na sua área, no seu objetivo e na sua primeira vitória com IA."],
      cta: "Ver meu plano de certificação",
    },
  ]),
  ...onPath("trabalho", [
  question("area", "O que mais ocupa o seu dia de trabalho?", "Escolha a opção mais próxima.", [
    ["🧾", "Contabilidade / Financeiro"],
    ["💵", "Finanças / Análise"],
    ["📣", "Marketing / Conteúdo"],
    ["🤝", "Vendas / Atendimento a clientes"],
    ["⚙️", "Operações / Administrativo"],
    ["🏗️", "Gestão de Projetos / Programas"],
    ["🎨", "Criativo / Design"],
    ["🏥", "Saúde / Apoio Clínico"],
    ["🎓", "Educação / Ensino"],
    ["💻", "Tecnologia / TI"],
    ["👥", "RH / Recrutamento"],
    ["✨", "Outra coisa"],
  ]),
  question("mudanca", "Em 28 dias, o que faria você se sentir diferente?", "Escolha a mudança que você mais quer.", [
    ["😌", "Me sentir confiante usando IA no trabalho"],
    ["⚡", "Terminar o trabalho rotineiro mais rápido"],
    ["🧠", "Saber quais ferramentas de IA usar"],
    ["🚀", "Criar coisas que eu não conseguia criar antes"],
    ["🛡️", "Parar de me sentir para trás"],
    ["🌱", "Construir novas possibilidades de carreira"],
  ]),
  // Telas de reforço entre perguntas: imagem + frase curta. A imagem que faltar aparece como caixa com o nome do arquivo.
  {
    id: "nao_generico",
    kind: "info",
    image: "images/info-nao-generico.webp",
    imageSize: [670, 459],
    title: "Seu plano de IA não precisa ser genérico.",
    paragraphs: ["Muita gente desiste da IA porque junta dicas soltas e ferramentas aleatórias, sem um caminho. O {brand} monta o seu em torno do seu trabalho, do seu objetivo e da sua primeira vitória prática."],
    cta: "Continuar",
  },
  question("rotina", "De que trabalho rotineiro você está cansado de passar horas?", "A IA já está ajudando pessoas a acelerar tarefas como essas.", [
    ["✉️", "E-mails e mensagens"],
    ["📊", "Relatórios, números ou análises"],
    ["🔎", "Pesquisas e resumos"],
    ["📝", "Conteúdos, posts ou apresentações"],
    ["✅", "Tarefas administrativas repetitivas"],
    ["💬", "Follow-ups com clientes e contatos"],
  ]),
  {
    id: "avaliacao",
    kind: "review",
    title: "Você não precisa passar o fim de semana inteiro nisso",
    reviewTitle: "Meu chefe ficou impressionado",
    text: "Aprendi a automatizar meus relatórios de e-mail chatos em um fim de semana. Meu chefe ficou impressionado, e agora eu tenho tempo até para o almoço.",
    author: "Juliana Torres",
    authorNote: "Cliente verificada · Belo Horizonte, MG",
    cta: "Continuar",
  },
  question("primeira_semana", "O que faria sua primeira semana valer a pena?", "Comece com uma vitória prática de IA.", [
    ["✍️", "Escrever uma mensagem de trabalho caprichada"],
    ["📄", "Resumir algo complexo"],
    ["🎨", "Criar conteúdo do zero"],
    ["🧩", "Organizar uma tarefa bagunçada"],
    ["💡", "Encontrar melhores ideias mais rápido"],
    ["🔁", "Construir um fluxo de trabalho reutilizável"],
  ]),
  question("experiencia", "O que melhor descreve sua experiência com IA hoje?", "Vamos combinar o caminho com o seu ponto de partida.", [
    ["🌱", "Sou completamente novo em IA"],
    ["🧪", "Já experimentei algumas vezes"],
    ["🛠️", "Uso IA para tarefas simples"],
    ["📈", "Uso IA com frequência, mas preciso de um sistema mais claro"],
  ]),
  {
    id: "nao_tecnico",
    kind: "info",
    image: "images/info-nao-tecnico.webp",
    imageSize: [670, 459],
    title: "Boa notícia: você não precisa ser técnico.",
    paragraphs: ["Usar IA hoje tem pouco a ver com programar. O que conta é saber o que pedir, organizar seu trabalho e escolher a ferramenta certa na hora certa."],
    cta: "Continuar",
  },
  question("barreira", "O que tem te impedido de usar IA com consistência?", "É essa parte que o seu plano deve remover.", [
    ["🧭", "Não sei por onde começar"],
    ["🧰", "São ferramentas demais"],
    ["⏳", "Não tenho tempo suficiente"],
    ["🧩", "Parece complicado demais"],
    ["😬", "Tenho medo de usar errado"],
    ["😐", "Não vejo como se encaixa no meu trabalho"],
  ]),
  question("sentimento", "Quando as pessoas falam de IA, o que você mais sente?", "Seja honesto — a maioria dos membros começa aqui.", [
    ["😳", "Para trás, mas curioso"],
    ["😵", "Sobrecarregado"],
    ["🫣", "Como se todos soubessem mais do que eu"],
    ["😎", "Confortável, mas sem sistema"],
    ["🤔", "Cético, mas aberto"],
  ]),
  question("momento", "Existe um momento em que estar pronto para IA ajudaria?", "Um motivo claro facilita o começo.", [
    ["🧑‍💼", "Uma avaliação de desempenho ou promoção"],
    ["🎤", "Uma apresentação ou prazo de projeto"],
    ["🤝", "Uma oportunidade de cliente ou negócio"],
    ["🔍", "Uma busca por emprego ou entrevista"],
    ["🏡", "Começar ou fazer crescer algo meu"],
    ["🛡️", "Nenhuma data — só não quero ficar para trás"],
  ]),
  {
    id: "sem_esperar",
    kind: "info",
    image: "images/info-sem-esperar.webp",
    imageSize: [670, 459],
    title: "Você não precisa esperar se sentir pronto.",
    paragraphs: ["A maioria trava esperando a IA ficar menos confusa. Com o {brand} você começa pequeno, tira um resultado útil e ganha confiança a partir dele."],
    cta: "Continuar",
  },
  question("tempo", "Quanto tempo você consegue dedicar por dia, na realidade?", "Seu plano deve caber na sua vida real.", [
    ["⚡", "3 min/dia"],
    ["⏱️", "5 min/dia"],
    ["🕒", "10 min/dia"],
    ["🎯", "15 min/dia"],
  ]),
  question("formato", "O que faria aprender IA parecer mais fácil?", "Escolha o tipo de orientação que você realmente usaria.", [
    ["🎬", "Aulas visuais curtas"],
    ["🪄", "Prompts prontos para copiar e usar"],
    ["✅", "Checklists diárias"],
    ["🧰", "Ferramentas de IA em um só lugar"],
    ["👨‍🏫", "Orientação estilo mentor"],
    ["👥", "Exemplos de pessoas como eu"],
  ]),
  question("prova", "Qual prova faria você sentir que está ficando pronto para IA?", "O progresso fica melhor quando você consegue ver.", [
    ["🎓", "Um Certificado de IA que eu possa guardar"],
    ["🗂️", "Prompts e fluxos de trabalho reutilizáveis"],
    ["💼", "Entregas de trabalho que eu realmente use"],
    ["📈", "Progresso visível semana a semana"],
    ["🚀", "Confiança para continuar usando IA"],
  ]),
  question("pronto", "Pronto para criar seu caminho pessoal de IA?", "Vamos usar suas respostas para criar seu plano de 28 dias.", [
    ["🚀", "Sim, criar meu plano"],
    ["👀", "Quero ver como fica o meu caminho"],
    ["😬", "Estou nervoso, mas quero começar"],
    ["⚡", "Quero minha primeira vitória de IA hoje"],
  ]),
  ]),
  {
    id: "plano_pronto",
    path: "trabalho",
    kind: "info",
    image: "images/info-plano-pronto.webp",
    imageSize: [670, 459],
    title: "Seu caminho de 28 dias até o Certificado de IA está pronto",
    paragraphs: ["Montado em torno do seu trabalho, do seu objetivo e da sua primeira vitória com IA."],
    cta: "Ver meu plano de certificação",
  },
  {
    id: "criando",
    kind: "loader",
    title: "Criando seu Programa de Certificação Pessoal...",
    // Rótulo e duração (ms) de cada barra.
    bars: [
      ["Analisando suas respostas", 1800],
      ["Escolhendo suas ferramentas de IA", 2600],
      ["Montando seu plano de 28 dias", 2200],
    ],
  },
  { id: "nome", kind: "name", title: "Como devemos te chamar?", placeholder: "Seu nome" },
  { id: "resumo", kind: "report" },
  { id: "antes_depois", kind: "compare" },
  { id: "depoimentos", kind: "proof" },
  { id: "roleta", kind: "spin" },
  { id: "venda", kind: "sales" },
];

const state = {
  index: 0,
  path: "trabalho",
  name: "",
  answers: {},
  picks: {},
  timers: [],
  trackedIndex: -1,
};

const inPath = (step) => !step.path || step.path === state.path;

// Perguntas numeradas no contador "3/12" do topo (só as do caminho atual).
const questionIds = () => steps.filter((step) => step.kind === "single" && inPath(step)).map((step) => step.id);

// Índice da opção escolhida (0 = primeira). -1 se a pergunta não foi respondida.
const pick = (id) => state.picks[id] ?? -1;

const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function fill(text = "") {
  return text.replace(/\{brand\}/g, brand);
}

function rich(text) {
  return fill(text).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

// "Ana, seu resumo" com nome; "Seu resumo" sem nome.
function withName(rest) {
  const name = escapeHtml(state.name);
  return name ? `${name}, ${rest}` : rest.charAt(0).toUpperCase() + rest.slice(1);
}

function imageTag(path, [width, height] = [800, 600], emoji = "", extra = "") {
  return `<img src="${path}" alt="" width="${width}" height="${height}" decoding="async"${emoji ? ` data-emoji="${emoji}"` : ""}${extra} />`;
}

// Imagem que não existe vira uma caixa com o nome do arquivo esperado.
function guardImages(root) {
  root.querySelectorAll("img").forEach((image) => {
    const swap = () => {
      const box = document.createElement("div");
      box.className = "img-placeholder";
      const emoji = image.dataset.emoji;
      box.innerHTML = `${emoji ? `<span class="img-placeholder__emoji">${emoji}</span>` : ""}<small>${image.getAttribute("src").split("?")[0]}</small>`;
      image.replaceWith(box);
    };
    if (image.complete && image.naturalWidth === 0) swap();
    else image.addEventListener("error", swap, { once: true });
  });
}

function stagger(root) {
  [...root.children].forEach((child, index) => {
    child.style.setProperty("--delay", `${(child.classList.contains("cta-bar") ? 160 : 80) + index * 70}ms`);
    child.classList.add("rise");
  });
}

function setScreen(html, { flush = false } = {}) {
  coverPrerendered = false;
  app.classList.remove("screen");
  void app.offsetWidth;
  app.classList.add("screen");
  app.classList.toggle("screen--flush", flush);
  app.innerHTML = html;
  stagger(app);
  guardImages(app);
  window.scrollTo({ top: 0, behavior: "instant" });
}

function updateHeader() {
  const step = steps[state.index];
  appHeader.classList.toggle("hidden", step.kind === "sales");
  backButton.classList.toggle("is-visible", state.index > 0 && !["loader", "spin"].includes(step.kind));
  const ids = questionIds();
  const number = ids.indexOf(step.id) + 1;
  stepCounter.innerHTML = number ? `<b>${number}</b>/${ids.length}` : "";
  // Telas entre perguntas mantêm a barra no ponto da última pergunta respondida (sem contador).
  const answered = steps.slice(0, state.index + 1).filter((item) => item.kind === "single" && inPath(item)).length;
  const inQuiz = answered > 0 && state.index < steps.findIndex((item) => item.kind === "loader");
  progressBar.classList.toggle("hidden", !inQuiz);
  progressBar.firstElementChild.style.width = `${(answered / ids.length) * 100}%`;
}

// Telas visitadas, para o "voltar" respeitar o caminho feito.
const history = [];

function goTo(index) {
  history.push(state.index);
  state.index = index;
  render();
}

// Pula as telas de outro caminho.
function next() {
  let index = state.index + 1;
  while (index < steps.length - 1 && !inPath(steps[index])) index += 1;
  goTo(index);
}

function back() {
  let index = history.pop();
  while (index !== undefined && ["loader", "spin"].includes(steps[index].kind)) index = history.pop();
  state.index = index ?? 0;
  render();
}

function answer(value, index) {
  const step = steps[state.index];
  state.answers[step.id] = value;
  if (index !== undefined) state.picks[step.id] = index;
  if (step.id === "perfil") state.path = perfilPaths[index] || "trabalho";
  pmTrack("answer", { key: step.id, value });
  next();
}

// Resposta única: marca a opção e avança sozinho depois de 300 ms.
function choose(button, value, index) {
  if (app.dataset.locked) return;
  app.dataset.locked = "1";
  button.classList.add("is-active");
  state.timers.push(
    setTimeout(() => {
      delete app.dataset.locked;
      answer(value, index);
    }, 300),
  );
}

const renderers = {
  tiles: renderTiles,
  single: renderQuestion,
  info: renderInfo,
  review: renderReview,
  loader: renderLoader,
  name: renderName,
  report: renderReport,
  compare: renderCompare,
  proof: renderProof,
  spin: renderSpin,
  sales: renderSales,
};

function render() {
  state.timers.forEach((timer) => {
    clearInterval(timer);
    clearTimeout(timer);
  });
  state.timers = [];
  delete app.dataset.locked;
  document.querySelectorAll(".modal").forEach((modal) => modal.remove());
  updateHeader();
  const step = steps[state.index];
  if (state.index > state.trackedIndex) {
    state.trackedIndex = state.index;
    pmTrack("step", { idx: state.index, id: step.id });
  }
  renderers[step.kind](step);
  prefetchAhead();
}

// Baixa em segundo plano as imagens das próximas telas, depois da página carregada.
const stepImages = {
  compare: ["images/antes.webp", "images/depois.webp"],
  proof: ["images/avatar-michelle.webp", "images/avatar-olivia.webp", "images/avatar-susan.webp", "images/avatar-ross.webp"],
};
const prefetched = new Set();
function prefetchAhead() {
  if (document.readyState !== "complete") return window.addEventListener("load", prefetchAhead, { once: true });
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
  idle(() => {
    let found = 0;
    for (let i = state.index + 1; i < steps.length && found < 2; i += 1) {
      const step = steps[i];
      if (!inPath(step)) continue;
      const urls = [...(step.images || []), step.image, ...(stepImages[step.kind] || [])].filter(Boolean);
      if (!urls.length) continue;
      found += 1;
      urls.forEach((url) => {
        if (prefetched.has(url)) return;
        prefetched.add(url);
        new Image().src = url;
      });
    }
  });
}

function ctaBar(label, id, { disabled = false, type = "button" } = {}) {
  return `<div class="cta-bar"><button class="primary" id="${id}" type="${type}"${disabled ? " disabled" : ""}>${fill(label)}</button></div>`;
}

// A primeira pergunta vem pronta no index.html (aparece antes do script carregar).
const coverHTML = app.innerHTML;
let coverPrerendered = Boolean(app.querySelector(".tiles"));
guardImages(app);

function legalLinks(root) {
  root.querySelectorAll("[data-legal]").forEach((link) => {
    const href = legal[link.dataset.legal];
    if (href) {
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener";
    } else link.addEventListener("click", (event) => event.preventDefault());
  });
}

function renderTiles(step) {
  if (coverPrerendered) coverPrerendered = false;
  else setScreen(coverHTML);
  legalLinks(app);
  app.querySelectorAll("[data-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.option);
      choose(button, step.options[index], index);
    });
  });
}

function renderQuestion(step) {
  const buttons = step.options
    .map((label, index) => {
      const active = state.answers[step.id] === label ? " is-active" : "";
      return `<button class="option${active}" data-option="${index}" type="button"><span class="option__emoji" aria-hidden="true">${step.icons[index]}</span><span class="option__label">${label}</span></button>`;
    })
    .join("");
  setScreen(`
    <h1 class="title">${rich(step.title)}</h1>
    ${step.subtitle ? `<p class="subtitle">${rich(step.subtitle)}</p>` : ""}
    <div class="options">${buttons}</div>
  `);
  app.querySelectorAll("[data-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.option);
      choose(button, step.options[index], index);
    });
  });
}

function renderInfo(step) {
  setScreen(`
    ${step.image ? `<div class="info-image">${imageTag(step.image, step.imageSize)}</div>` : ""}
    <div class="info-card">
      <h1 class="info-title">${step.kicker ? `<span class="info-title__kicker">${fill(step.kicker)}</span>` : ""}${rich(step.title)}</h1>
      ${(step.paragraphs || []).map((item) => `<p class="info-text">${rich(item)}</p>`).join("")}
      ${step.checks ? `<ul class="info-checks">${step.checks.map((item) => `<li><span class="info-checks__icon">${iconCheck}</span><span>${rich(item)}</span></li>`).join("")}</ul>` : ""}
    </div>
    ${ctaBar(step.cta || "Continuar", "infoNext")}
  `);
  app.querySelector("#infoNext").addEventListener("click", next);
}

const stars = (count = 5) => `<span class="stars" aria-label="${count} estrelas">${iconStar.repeat(count)}</span>`;

function renderReview(step) {
  setScreen(`
    <h1 class="title">${rich(step.title)}</h1>
    <article class="review-card">
      <div class="review-card__top">
        <span class="review-card__tag">Avaliação real</span>
        <span class="review-card__rating">${stars()}</span>
      </div>
      <h2 class="review-card__title">${fill(step.reviewTitle)}</h2>
      <p class="review-card__text">${fill(step.text)}</p>
      <div class="review-card__author">
        <span class="avatar">${step.author.charAt(0)}</span>
        <span><strong>${step.author}</strong><small>${step.authorNote}</small></span>
      </div>
    </article>
    ${ctaBar(step.cta, "reviewNext")}
  `);
  app.querySelector("#reviewNext").addEventListener("click", next);
}

// Uma barra por etapa, em sequência, com depoimentos girando embaixo. No fim, avança sozinho.
function renderLoader(step) {
  setScreen(`
    <h1 class="title title--center">${rich(step.title)}</h1>
    <div class="loader-bars">
      ${step.bars
        .map(
          ([label], index) => `
          <div class="loader-row" id="row${index}">
            <div class="loader-row__head"><span>${label}</span><span class="loader-row__pct" id="pct${index}">0%</span></div>
            <div class="mini-track"><span id="bar${index}"></span></div>
          </div>`,
        )
        .join("")}
    </div>
    <div class="loader-proof">
      <strong>2.000.000+ pessoas</strong>
      <span>escolheram o ${brand}</span>
    </div>
    <div class="carousel" id="carousel"></div>
    <p class="loader-note">Avaliações em destaque de usuários iniciais.</p>
  `);

  const carousel = app.querySelector("#carousel");
  let current = 0;
  const showReview = () => {
    const [text, author, city] = loaderReviews[current];
    carousel.innerHTML = `<article class="review-card carousel__item">${stars()}<p class="review-card__text">${text}</p><div class="carousel__author"><strong>${author}</strong><small>✓ Cliente verificada · ${city}</small></div></article>`;
    current = (current + 1) % loaderReviews.length;
  };
  showReview();
  state.timers.push(setInterval(showReview, 2500));

  const tick = 50;
  let bar = 0;
  let elapsed = 0;
  const timer = setInterval(() => {
    const [, duration] = step.bars[bar];
    elapsed += tick;
    const value = Math.min(100, (elapsed / duration) * 100);
    app.querySelector(`#bar${bar}`).style.setProperty("--w", `${value}%`);
    app.querySelector(`#pct${bar}`).textContent = `${Math.round(value)}%`;
    if (value < 100) return;
    app.querySelector(`#row${bar}`).classList.add("is-done");
    app.querySelector(`#pct${bar}`).innerHTML = iconCheck;
    bar += 1;
    elapsed = 0;
    if (bar < step.bars.length) return;
    clearInterval(timer);
    state.timers.push(setTimeout(next, 600));
  }, tick);
  state.timers.push(timer);
}

function renderName(step) {
  setScreen(`
    <form class="name-form" id="nameForm" novalidate>
      <h1 class="title title--center">${rich(step.title)}</h1>
      <input class="text-input" id="nameInput" name="name" type="text" autocomplete="given-name" maxlength="50" placeholder="${step.placeholder}" value="${escapeHtml(state.name)}" />
      ${ctaBar("Continuar", "nameNext", { disabled: !state.name, type: "submit" })}
    </form>
  `);
  const input = app.querySelector("#nameInput");
  const button = app.querySelector("#nameNext");
  input.addEventListener("input", () => {
    button.disabled = !input.value.trim();
  });
  input.focus({ preventScroll: true });
  app.querySelector("#nameForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = input.value.trim();
    if (!name) return;
    state.name = name;
    next();
  });
}

// Nível de IA pela resposta de "experiência".
const levels = [
  { label: "Baixo", pos: 8, text: "você ainda está dando os primeiros passos com IA" },
  { label: "Baixo", pos: 20, text: "você está apenas experimentando, sem dominar a IA" },
  { label: "Médio", pos: 45, text: "você já usa IA, mas só no básico" },
  { label: "Médio", pos: 60, text: "você usa IA, mas ainda sem um sistema claro" },
];

// Caminho "renda": "Quanto você sabe sobre IA" vai de mais para menos, ao contrário de "experiência".
const levelIndex = () => (state.path === "renda" ? [3, 2, 1, 0][pick("r_conhecimento")] : pick("experiencia"));

function renderReport() {
  const level = levels[levelIndex()] || levels[1];
  setScreen(`
    <h1 class="title title--center">${withName("seu resumo pessoal")}</h1>
    <p class="subtitle subtitle--center">Com base nas suas respostas, ${level.text}. Você precisa evoluir rápido!</p>
    <div class="meter-card">
      <small>Habilidades em IA</small>
      <strong>${level.label}</strong>
      <div class="meter"><span class="meter__marker" id="marker"></span></div>
      <div class="meter__labels"><span>Baixo</span><span>Médio</span><span>Alto</span></div>
    </div>
    <div class="meter-card">
      <small>Potencial</small>
      <strong id="potential">0%</strong>
      <p class="meter-card__tip">💡 Ainda assim, suas respostas indicam alto potencial para dominar a IA</p>
    </div>
    ${ctaBar("Continuar", "reportNext")}
  `);
  state.timers.push(setTimeout(() => app.querySelector("#marker")?.style.setProperty("left", `${level.pos}%`), 150));
  let potential = 0;
  const target = app.querySelector("#potential");
  const timer = setInterval(() => {
    potential = Math.min(85, potential + 1);
    target.textContent = `${potential}%`;
    if (potential >= 85) clearInterval(timer);
  }, 15);
  state.timers.push(timer);
  app.querySelector("#reportNext").addEventListener("click", next);
}

function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}

function compareColumn({ good, image, head, bold, label, items }) {
  return `
    <div class="ba-col ba-col--${good ? "good" : "bad"}">
      ${imageTag(image, [240, 224], good ? "😄" : "😣", ' class="ba-col__image"')}
      <div class="ba-col__head">${head}<strong>${bold}</strong></div>
      <small>${label}</small>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;
}

function renderCompare() {
  setScreen(`
    <h1 class="title title--center">Seu Programa Pessoal de Certificação em IA de 28 Dias</h1>
    <p class="subtitle subtitle--center">Esperamos que você conquiste seu Certificado de IA <strong class="date">até ${addDays(28)}</strong></p>
    <div class="ba-grid">
      ${compareColumn({ image: "images/antes.webp", head: "Você está aqui:", bold: "Baixo", label: "Dificuldades", items: ["Não sei por onde começar", "Nenhuma credencial reconhecida", "Pouca confiança nas ferramentas de IA", "Invisível para empregadores"] })}
      ${compareColumn({ good: true, image: "images/depois.webp", head: "Você com", bold: brand, label: "Soluções", items: ["Caminho de certificação claro", "Credencial de IA compartilhável", "Resultados confiáveis com IA", "Destaque entre 90% dos profissionais"] })}
    </div>
    ${ctaBar("Continuar", "compareNext")}
  `);
  app.querySelector("#compareNext").addEventListener("click", next);
}

const proofStats = [
  ["1M+", "pessoas aprenderam novas habilidades"],
  ["240k+", "conquistaram certificados de IA"],
  ["90%", "de avaliações positivas"],
];

const testimonials = [
  {
    photo: "images/avatar-michelle.webp",
    name: "Michele J.",
    sub: "Porto Alegre, RS • 1 avaliação",
    stars: true,
    body: ["As aulas são construídas em torno de situações reais, então é fácil imaginar como usá-las no dia a dia do trabalho. Também gostei da orientação prática sobre como escrever prompts claros para obter resultados úteis e relevantes, mantendo sempre o uso responsável e ético da IA."],
  },
  {
    photo: "images/avatar-olivia.webp",
    name: "Beatriz A.",
    sub: "Estudante de Direito · Recife, PE",
    body: [
      "✨ Encerrei um ciclo de aprendizado muito divertido ✨",
      "Acabei de concluir uma trilha de IA no ProMove e ela cobriu:",
      "✅ Jasper AI – formas práticas de melhorar a escrita de conteúdos<br />✅ DeepSeek AI – evoluir no raciocínio e na resolução de problemas<br />✅ Desafio de IA de 28 Dias – prática diária para usar IA de forma consistente",
      "O que eu mais gostei é que não foi só \"teoria de IA\". Mostrou como aplicar prompts em situações reais e criar hábitos que posso continuar usando na faculdade e no trabalho.",
    ],
  },
  {
    photo: "images/avatar-susan.webp",
    name: "Luana M.",
    sub: "Estudante de Marketing · Salvador, BA",
    body: [
      "Neste verão dediquei mais de 40 horas aprendendo IA pelo ProMove e acabei conquistando certificados em várias ferramentas principais de IA.",
      "Ao longo do programa, usei IA para rascunhos de conteúdo, pesquisas mais rápidas e ideias de campanha. As partes práticas me ajudaram a entender a escrita de prompts, geração de imagens e quando usar ferramentas de texto ou de imagem.",
      "Me sinto muito mais confiante usando IA no meu dia a dia, e estou animada para continuar evoluindo.",
    ],
  },
  {
    photo: "images/avatar-ross.webp",
    name: "Rodrigo T.",
    sub: "Analista de dados · Campinas, SP",
    body: [
      "Comecei a treinar com o ProMove esta semana. Sinceramente, não imaginava o quanto isso poderia acelerar meu fluxo de trabalho até experimentar. Ainda é o começo, mas já estou conseguindo melhores resultados mais rápido.",
      "Você pode ignorar tudo isso e ficar para trás, ou aprender de verdade a usar e se manter afiado. Hora de colocar para funcionar.",
    ],
  },
];

function renderProof() {
  setScreen(`
    <h1 class="title title--center">Veja como o ${brand} <strong>transforma pessoas</strong></h1>
    <div class="stats">
      ${proofStats.map(([number, label]) => `<div class="stat"><strong>${number}</strong><small>${label}</small></div>`).join("")}
    </div>
    <h2 class="section-title">Ouça o que outros estão dizendo sobre o ${brand}</h2>
    <div class="reviews">
      ${testimonials
        .map(
          (item) => `
          <blockquote class="review">
            <div class="review-head">
              ${imageTag(item.photo, [36, 36], "", ' class="avatar" loading="lazy"')}
              <div><strong>${item.name}</strong><small class="review-sub">${item.sub}</small></div>
            </div>
            ${item.stars ? `<div class="review-stars">★★★★★</div>` : ""}
            ${item.body.map((text) => `<p>${text}</p>`).join("")}
          </blockquote>`,
        )
        .join("")}
    </div>
    ${ctaBar("Continuar", "proofNext")}
  `);
  app.querySelector("#proofNext").addEventListener("click", next);
}

// Roleta antes da oferta: sempre para no maior desconto (o mesmo da oferta).
const wheelSlices = ["20%", "30%", "35%", "40%", `${offPercent}%`, "10%", "15%"];
const wheelPrizeIndex = 4;
const wheelColors = ["var(--primary)", "var(--lavender)", "var(--primary-dark)", "var(--pink)"];

function renderSpin() {
  const angle = 360 / wheelSlices.length;
  const gradient = wheelSlices
    .map((_, index) => `${index === wheelPrizeIndex ? "var(--success)" : wheelColors[index % wheelColors.length]} ${index * angle}deg ${(index + 1) * angle}deg`)
    .join(", ");
  const spinDegrees = 6 * 360 + (360 - (wheelPrizeIndex * angle + angle / 2));
  setScreen(`
    <h1 class="title title--center">Gire e garanta seu <strong>Programa de Certificação em IA!</strong></h1>
    <p class="subtitle subtitle--center">Não perca a chance de obter o certificado com uma oferta personalizada 🎁</p>
    <div class="wheel-wrap wheel-wrap--big">
      <span class="wheel-pointer">▼</span>
      <div class="wheel" id="wheel" style="background: conic-gradient(${gradient})">
        ${wheelSlices.map((label, index) => `<span class="wheel-slice" style="--a:${index * angle + angle / 2}deg"><span>${label}<small>off</small></span></span>`).join("")}
      </div>
      <span class="wheel-hub" aria-hidden="true"></span>
    </div>
    ${ctaBar("Girar", "spinButton")}
  `);
  const wheel = app.querySelector("#wheel");
  const button = app.querySelector("#spinButton");
  button.addEventListener("click", () => {
    if (button.disabled) return;
    button.disabled = true;
    pmTrack("answer", { key: "roleta", value: `${offPercent}%` });
    wheel.style.transform = `rotate(${spinDegrees}deg)`;
    wheel.addEventListener("transitionend", showPrize, { once: true });
  });
}

function showPrize() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="prizeTitle">
      <div class="modal-card__icon" aria-hidden="true">🎁</div>
      <h2 id="prizeTitle">Parabéns!</h2>
      <p>Você ganhou</p>
      <strong class="modal-card__prize">${offPercent}% OFF</strong>
      <p>no seu Programa de Certificação em IA</p>
      <button class="primary" id="claim" type="button">Resgatar meu desconto</button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector("#claim").addEventListener("click", next);
  modal.querySelector("#claim").focus();
}

// ---------- Página de venda ----------

const checkoutHref = () => offer.checkoutUrl || "#oferta1";

// Resposta curta da pergunta "mudança", para o quadro "Seu objetivo".
const goalShort = [
  "Confiança usando IA no trabalho",
  "Terminar o trabalho rotineiro mais rápido",
  "Saber quais ferramentas de IA usar",
  "Criar o que eu não conseguia antes",
  "Parar de me sentir para trás",
  "Novas possibilidades de carreira",
];

// Caminho "renda": resposta curta de "O que você mais quer conquistar com a IA?".
const goalShortRenda = [
  "Gerar renda com IA em poucas horas por dia",
  "Melhores oportunidades de emprego",
  "Minha independência financeira",
  "Um futuro estável para minha família",
  "Parar de depender de outras pessoas",
];

const tools = [
  ["DeepSeek", "deepseek"],
  ["ChatGPT", "chatgpt"],
  ["Rows", "rows"],
  ["ClickUp", "clickup"],
  ["HubSpot", "hubspot"],
  ["Notion", "notion"],
  ["Zapier", "zapier"],
  ["Canva", "canva"],
  ["Midjourney", "midjourney"],
  ["Firefly", "firefly"],
  ["Perplexity", "perplexity"],
  ["Grammarly", "grammarly"],
  ["Figma", "figma"],
  ["Make", "make"],
  ["Trello", "trello"],
];

const featureIcon = (path) =>
  `<svg viewBox="0 0 35 35" width="35" height="35" fill="none" aria-hidden="true"><circle cx="17.5" cy="17.5" r="17.5" fill="var(--soft)"/><g transform="translate(7.5 7.5)" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${path}</g></svg>`;

const planFeatures = [
  ["Programa de 28 dias", "um passo por dia, montado com as suas respostas, sem adivinhação.", featureIcon('<path d="M4 5h12M4 10h12M4 15h8"/>')],
  ["As principais ferramentas de IA", "ChatGPT, Gemini, Grok e mais, aplicadas ao seu trabalho.", featureIcon('<path d="M11 2 4 11h5l-1 7 7-9h-5z"/>')],
  ["Mais de 1.000 prompts comprovados", "para produtividade, negócios e criatividade.", featureIcon('<path d="M3 4h14v10H7l-4 3z"/>')],
  ["Certificado de IA", "para mostrar suas novas habilidades e ganhar credibilidade.", featureIcon('<circle cx="10" cy="8" r="5"/><path d="M7 12l-1.5 6L10 16l4.5 2L13 12"/>')],
  ["Acompanhamento do progresso", "veja sua evolução semana a semana.", featureIcon('<path d="M3 16l5-5 3 3 6-7"/>')],
];

// Nomes de exemplo na faixa de inscrições: ajuste para dados reais antes de anunciar.
const recentSignups = [
  ["Alana O.", "Recife"],
  ["Guilherme", "Belo Horizonte"],
  ["Gabriela", "Manaus"],
  ["Marcos T.", "Rio de Janeiro"],
  ["Juliana", "Natal"],
  ["Rafael M.", "Londrina"],
  ["Camila", "Vitória"],
  ["Pedro H.", "Brasília"],
  ["Larissa", "Belém"],
  ["Bruno S.", "Ribeirão Preto"],
];

// Reaproveita depoimentos do carregamento: [nome, texto, cidade, foto].
// As fotos são as mesmas dos depoimentos do GoodKids: troque por fotos de alunos reais do ProMove antes de anunciar.
const salesPhotos = ["images/avatar-luciana.webp", "images/avatar-camila.webp", "images/avatar-patricia.webp"];
const salesReviews = [1, 2, 4].map((index, position) => {
  const [text, name, city] = loaderReviews[index];
  return [name, text, city, salesPhotos[position]];
});

const faqItems = [
  ["Preciso já saber usar IA?", "Não. O programa começa do seu ponto de partida, mesmo que você nunca tenha usado uma ferramenta de IA."],
  ["Quanto tempo por dia preciso dedicar?", "Pouco tempo. O plano segue o tempo por dia que você escolheu no quiz."],
  ["O que eu recebo?", "O Programa Pessoal de Certificação em IA de 28 dias, com as principais ferramentas de IA, mais de 1.000 prompts e o acompanhamento do seu progresso."],
];

function planCard() {
  return `
    <div class="pw-plan is-selected">
      <span class="pw-plan__ribbon">Cupom resgatado · ${offPercent}% OFF</span>
      <span class="pw-plan__radio" aria-hidden="true">${iconCheck}</span>
      <span class="pw-plan__info">
        <strong>Plano de ${offer.weeks} semanas</strong>
        <span>Programa de Certificação em IA</span>
        <span>De <s>${money(offer.fullPrice)}</s></span>
      </span>
      <span class="pw-plan__price"><strong>${money(offer.price)}</strong><small>no total</small></span>
    </div>
  `;
}

function offerBlock() {
  return `
    ${planCard()}
    <div class="pw-cta"><a class="buy-link" href="${checkoutHref()}">Obter meu plano</a></div>
    <p class="pw-terms">Ao continuar, você concorda com os <a href="#" data-legal="subscription">Termos de Assinatura</a> e a <a href="#" data-legal="privacy">Política de Privacidade</a>.</p>
  `;
}

function renderSales() {
  const goal = state.path === "renda" ? goalShortRenda[pick("r_objetivo")] || "Gerar renda com IA" : goalShort[pick("mudanca")] || "Crescer no seu cargo atual";
  setScreen(
    `
    <div class="sales-top">
      <div class="timer">O desconto termina em<strong id="timer">04:14</strong></div>
      <a class="small-cta" href="#oferta1">Obter meu plano</a>
    </div>
    <section class="sales-hero">
      <p class="sales-badge">🎁 Desconto especial <span>${offPercent}%</span></p>
      <h1 class="pw-title">${withName("seu Programa Pessoal de Certificação em IA está pronto!")}</h1>
      <span class="sales-pill">Torne-se um Mestre da IA</span>
      <div class="pw-goals">
        <div class="pw-goal"><small>🎯 Seu objetivo</small><strong>${goal}</strong></div>
        <div class="pw-goal"><small>📈 Seu futuro</small><strong>Dominar as principais ferramentas de IA</strong></div>
      </div>
      <div class="tool-grid">
        ${tools.map(([name, file], index) => `<div class="tool"><img class="tool__icon" src="images/tools/${file}.webp" alt="${name}" width="160" height="160" loading="lazy" decoding="async"><b>DIA ${index + 1}</b></div>`).join("")}
      </div>
    </section>
    <p class="sales-proof">Mais de 300 pessoas se inscreveram no Programa de Certificação em IA na última hora</p>
    <div class="ticker" aria-hidden="true">
      <ul class="ticker__track">
        ${[...recentSignups, ...recentSignups].map(([name, city]) => `<li><span class="ticker__name">${name} · ${city}</span><span class="ticker__time">Plano de ${offer.weeks} semanas</span></li>`).join("")}
      </ul>
    </div>
    <section class="section plan-block" id="oferta1">
      <h2 class="pw-title">Selecionamos o melhor plano para você</h2>
      ${offerBlock()}
    </section>
    <section class="section">
      <h2>O que você recebe com o plano</h2>
      <ul class="plan-features">
        ${planFeatures.map(([title, text, icon]) => `<li><span class="plan-features__icon">${icon}</span><span><strong>${title}</strong> ${text}</span></li>`).join("")}
      </ul>
    </section>
    <section class="section">
      <p class="pw-stars">★★★★★</p>
      <h2>Pessoas que já usam IA no dia a dia</h2>
      <div class="reviews">
        ${salesReviews.map(([name, text, city, photo]) => `<blockquote class="review"><div class="review-head">${photo ? imageTag(photo, [36, 36], "", ' class="avatar" loading="lazy"') : `<span class="avatar avatar--initials">${name.split(" ").map((word) => word[0]).join("")}</span>`}<div><strong>${name}</strong><small class="review-sub">${city}</small><div class="review-stars">★★★★★</div></div></div><p>${text}</p></blockquote>`).join("")}
      </div>
    </section>
    <section class="section plan-block" id="oferta2">
      <h2 class="pw-title">${withName("seu plano está pronto")}</h2>
      ${offerBlock()}
    </section>
    <section class="section guarantee-card">
      <span class="guarantee-card__icon"><svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 5.5c3.2 0 6.3 1.2 12.4 3.4 2.7 1 3.9 1.5 4.4 2.5.6 1 .6 2.8.6 6.3v4.9c0 11.7-8.8 17.5-13.8 19.8-1.4.6-2.1 1-3.6 1s-2.2-.4-3.6-1C15.4 40.1 6.6 34.3 6.6 22.6v-4.9c0-3.5 0-5.3.6-6.3.5-1 1.7-1.5 4.4-2.5C17.7 6.7 20.8 5.5 24 5.5z"/><path d="M16.8 24.6l5 5.2 9.6-10.8"/></svg></span>
      <h2 class="guarantee-card__title">Garantia de devolução do dinheiro</h2>
      <p class="guarantee-card__text">Estamos tão confiantes em nosso serviço que oferecemos uma garantia de devolução do dinheiro. Consulte os critérios e condições da garantia antes de adquirir seu plano.</p>
      <a class="guarantee-card__link" href="#" data-legal="guarantee">Ver condições da garantia</a>
    </section>
    <section class="section">
      <h2>Perguntas frequentes</h2>
      ${faqItems.map(([q, a]) => `<details class="faq-item"><summary>${q}<span class="faq-item__icon">+</span></summary><p>${a}</p></details>`).join("")}
      <a class="buy-link pw-final-cta" href="${checkoutHref()}">Obter meu plano</a>
    </section>
    <p class="pw-footer">🔒 Pagamento seguro</p>
  `,
    { flush: true },
  );
  legalLinks(app);
  runCountdown();
}

function runCountdown() {
  let seconds = countdownSeconds;
  const target = app.querySelector("#timer");
  const paint = () => {
    target.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  };
  paint();
  const timer = setInterval(() => {
    seconds = Math.max(0, seconds - 1);
    if (!document.contains(target)) return clearInterval(timer);
    paint();
  }, 1000);
  state.timers.push(timer);
}

const checkoutHosts = ["payt.site", "checkout.payt.com.br"];
const trackingParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id", "fbclid", "gclid", "src", "sck", "xcod"];

// Clique no checkout: leva junto os parâmetros com que a pessoa chegou (UTMs, fbclid...).
// O que o link já tiver (ex.: colocado pela UTMify) não é sobrescrito.
document.addEventListener(
  "click",
  (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    let url;
    try {
      url = new URL(link.href);
    } catch {
      return;
    }
    if (!checkoutHosts.includes(url.hostname)) return;
    pmTrack("checkout", { plan: `${offer.weeks}-semanas` }, { now: true });
    landingParams.forEach((value, key) => {
      if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
    });
    link.href = url.toString();
  },
  true,
);

backButton.addEventListener("click", back);

pmTrack("landing", {
  meta: {
    utm: Object.fromEntries(trackingParams.filter((key) => landingParams.get(key)).map((key) => [key, landingParams.get(key)])),
    referrer: document.referrer.slice(0, 300),
  },
});

// Só em ambiente local: ?step=<id> abre direto numa tela. Extras: name=Ana, xp=0..3, goal=0..5, path=renda.
// Em telas de um caminho só (ex.: r_area), o caminho vem da própria tela.
if (["localhost", "127.0.0.1"].includes(window.location.hostname) && landingParams.get("step")) {
  const target = steps.findIndex((step) => step.id === landingParams.get("step"));
  if (target !== -1) state.index = target;
  state.path = steps[target]?.path || (landingParams.get("path") === "renda" ? "renda" : "trabalho");
  if (state.path === "renda" && landingParams.get("xp")) state.picks.r_conhecimento = 3 - Number(landingParams.get("xp"));
  if (state.path === "renda" && landingParams.get("goal")) state.picks.r_objetivo = Number(landingParams.get("goal"));
  if (landingParams.get("name")) state.name = landingParams.get("name");
  if (landingParams.get("xp")) state.picks.experiencia = Number(landingParams.get("xp"));
  if (landingParams.get("goal")) state.picks.mudanca = Number(landingParams.get("goal"));
}
render();
