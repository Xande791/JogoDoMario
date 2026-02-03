class Personagem {
  constructor(seletor, imagens) {
    this.el = document.querySelector(seletor);
    this.imagens = imagens;
  }

  trocarImagem(tipo) {
    this.el.src = this.imagens[tipo];
  }

  parar() {
    this.el.style.animation = "none";
  }

  esquerda() {
    return this.el.offsetLeft;
  }

  fundo() {
    return Number(getComputedStyle(this.el).bottom.replace("px", ""));
  }
}


class Mario extends Personagem {
  constructor() {
    super(".mario", {
      correr: "./imagem2/Mario.gif",
      pular: "./imagem2/Mario-jump.gif",
      perder: "./imagem2/Mario-loss.gif"
    });

    this.noAr = false;
  }

  pular() {
    if (this.noAr) return;

    this.noAr = true;
    this.el.classList.add("jump");
    this.trocarImagem("pular");

    setTimeout(() => {
      this.el.classList.remove("jump");
      this.trocarImagem("correr");
      this.noAr = false;
    }, 900);
  }

  morrer() {
    this.parar();
    this.trocarImagem("perder");
    this.el.style.width = "240px";
  }
}

class Bowser extends Personagem {
  constructor() {
    super(".bowser", {
      normal: "./imagem2/Bowser.gif"
    });
  }

  // POLIMORFISMO
  parar() {
    super.parar();
    this.el.style.left = this.esquerda() + "px";
  }
}

class Jogo {
  constructor() {
    this.mario = new Mario();
    this.bowser = new Bowser();
    this.fundo = document.querySelector(".fundo");

    document.addEventListener("click", () => this.mario.pular());
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        this.mario.pular();
      }
    });

    this.loop = setInterval(() => this.atualizar(), 10);
  }

  atualizar() {
    const colisao =
      this.bowser.esquerda() < 110 &&
      this.bowser.esquerda() > 0 &&
      this.mario.fundo() < 220;

    if (colisao) {
      this.gameOver();
    }
  }

  gameOver() {
    clearInterval(this.loop);

    this.bowser.parar();
    this.mario.morrer();

    this.fundo.style.opacity = 0;
    setTimeout(() => {
      this.fundo.src = "./imagem2/GameoverSMB-1.png";
      this.fundo.style.opacity = 1;
    }, 400);
  }
}

new Jogo();
