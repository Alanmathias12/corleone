/* =========================================================
   CONFIGURAÇÃO CENTRAL — edite aqui links, textos e mídias.
   ========================================================= */
window.SITE_CONFIG = {
  brand: { name: "Corleone", tagline: "Tattoo Life Style", logo: "assets/img/logo.png" },

  // WhatsApp: só números, com código do país (55) + DDD + número
  whatsapp: "5561981263069",
  instagram: "https://www.instagram.com/corleone_tattolife",
  instagramHandle: "@corleone_tattolife",

  // Deixe vazio ("") o que ainda não foi informado: a seção some do site.
  contact: { address: "", hours: "", mapEmbed: "" },

  // Foto de perfil e textos da seção "Sobre"
  about: {
    photo: "assets/img/corleone.jpg",
    title: "Corleone",
    text: [
      "Tatuador por trás do Corleone Tattoo Life. Cada projeto começa na conversa: você traz a ideia e ele transforma em arte feita para o seu corpo.",
      "Atendimento direto pelo WhatsApp, do primeiro orçamento até a data da sessão."
    ],
    highlights: ["Projeto pensado para o seu corpo", "Orçamento direto no WhatsApp", "Data confirmada pelo tatuador"]
  },

  // Estilos (cards). image = foto do portfólio usada como ilustração.
  styles: [
    { id: "Realismo", image: "assets/portfolio/joker-perna.jpg", text: "Retratos e cenas com profundidade, luz e sombra. Referências de personagens, pessoas e momentos." },
    { id: "Blackwork", image: "assets/portfolio/pescoco-blackwork-1.jpg", text: "Preto sólido, contraste forte e composições que acompanham a anatomia." },
    { id: "Realismo colorido", image: "assets/portfolio/mulher-gato-perna.jpg", text: "Realismo com cor: tons e luzes trabalhados para destacar o desenho na pele." }
  ],

  // Portfólio: para adicionar um trabalho, copie o arquivo para assets/portfolio
  // e acrescente uma linha aqui. type: "image" ou "video".
  categories: ["Realismo", "Blackwork", "Vídeos"],
  portfolio: [
    { type: "image", src: "assets/portfolio/joker-perna.jpg", title: "Perna fechada em realismo", category: "Realismo", desc: "" },
    { type: "image", src: "assets/portfolio/pescoco-blackwork-1.jpg", title: "Pescoço e rosto", category: "Blackwork", desc: "" },
    { type: "video", src: "assets/portfolio/tatuando-costas.mp4", poster: "assets/portfolio/tatuando-costas.jpg", title: "Sessão em andamento", category: "Vídeos", desc: "" },
    { type: "image", src: "assets/portfolio/mulher-gato-perna.jpg", title: "Perna em realismo", category: "Realismo", desc: "" },
    { type: "image", src: "assets/portfolio/joker-antebraco.jpg", title: "Antebraço e mão", category: "Realismo", desc: "" },
    { type: "video", src: "assets/portfolio/perna-colorida.mp4", poster: "assets/portfolio/perna-colorida.jpg", title: "Realismo colorido", category: "Vídeos", desc: "" },
    { type: "image", src: "assets/portfolio/pescoco-blackwork-2.jpg", title: "Pescoço, perfil", category: "Blackwork", desc: "" },
    { type: "video", src: "assets/portfolio/retrato-realismo.mp4", poster: "assets/portfolio/retrato-realismo.jpg", title: "Retrato sendo tatuado", category: "Vídeos", desc: "" }
  ]
};
