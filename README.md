# PLACAR — site oficial

Site estático (HTML, CSS e JavaScript puro) para apresentar e distribuir a PLACAR. Sem backend, sem analytics, sem cookies.

## Estrutura

```
placar-website/
├── index.html          página principal (funcionalidades, galeria, FAQ em HTML)
├── 404.html            página de erro (funciona em subcaminhos do GitHub Pages)
├── config/downloads.js configuração dos downloads  ← editar aqui
├── js/main.js          menu, galeria e ano do rodapé
├── js/downloads.js     gera os cartões de download a partir da configuração
├── css/styles.css
├── assets/screenshots/ capturas da app (.webp, 1600 px e 800 px)
├── assets/icons/       ícones da app
├── favicon.svg  robots.txt  sitemap.xml
```

Todos os caminhos do site são relativos. Única exceção: `404.html` usa caminhos absolutos (`/css/...`), corretos para o site na raiz `https://akvt90.github.io/`. Se o mudares para um subcaminho, altera-os.

## Executar localmente

```
cd placar-website
python3 -m http.server 8000
```
Abre http://localhost:8000. (Não abras o `index.html` por duplo clique em alguns navegadores: usa sempre um servidor local.)

## Substituir os screenshots

As capturas incluídas são **reais**, tiradas à app com jogadores e jogos de demonstração (Miguel, Sofia, Rui…). Para usar as tuas:

1. Exporta cada captura em 1600×1000 (`nome.webp`) e 800×500 (`nome-800.webp`) para `assets/screenshots/`, com os mesmos nomes (`jogo`, `menu`, `jogadores`, `historico`, `minijogos`).
2. Para acrescentar uma imagem, copia um bloco `<li>…</li>` na secção `#galeria` do `index.html` e altera `data-full`, `data-caption`, `src` e `alt`.
3. Se mudares a legenda «dados de demonstração», faz-o também no hero.

## Estado atual (atualização)
- Site em **inglês**, com tema escuro igual ao da app.
- **FAQ** em accordion com botões reais (`aria-expanded`/`aria-controls`), um item aberto de cada vez, teclado (Enter, Espaço, ↑ ↓, Home, End). Edita as perguntas/respostas em `index.html`, secção `#faq`.
- **Todos os botões de download** (cabeçalho, hero e cartões) abrem `https://akvt90.github.io/Ping-Pong-Scoreboard/`. O endereço está em `config/downloads.js` (`PLACAR_WEB_APP_URL`); o botão do cabeçalho e do hero estão em `index.html`.
- A app não tem modo de pares; a FAQ di-lo.
- Para publicar em `akvt90.github.io`, o repositório tem de se chamar `akvt90.github.io` e os ficheiros ficam na raiz.

## Triângulo do GitHub, Discord e Support me
- **Triângulo** no canto superior direito da página inicial: abre `https://github.com/AKVT90/Ping-Pong-Scoreboard/releases` (secção `.corner` do `index.html`).
- **Discord** no cabeçalho: `https://discord.gg/2xwZXc3Myj`.
- **Support me**: ligação no cabeçalho que leva à secção `#support` (GIF, Buy me a coffee `buymeacoffee.com/akvt90` e PayPal `paypal.me/AKVT777`). Funciona mesmo sem JavaScript.
- **GIF:** é carregado do Giphy. Se o pedido falhar (por exemplo, bloqueado por uma extensão no computador), o site tenta `assets/images/support.gif` (atributo `data-fallback`) e, se também não existir, mostra um cartão com ☕ em vez de esconder a secção. Para o GIF funcionar em todos os navegadores, guarda-o em `assets/images/support.gif`; para o usar como fonte principal, troca o `src` do `<img>` na secção `#support`.
- **Cache:** os ficheiros CSS/JS têm `?v=5` no `index.html`. Se alterares o CSS ou o JS, aumenta o número para forçar os navegadores a descarregar a versão nova.

## Configurar os downloads

Edita `config/downloads.js`. Cada plataforma tem `name`, `version`, `releaseDate`, `fileSize`, `requirements`, `downloadUrl` e `status`:

| status | comportamento do botão |
|---|---|
| `available` | abre `downloadUrl` (num novo separador, com `noopener noreferrer`, se for externo) |
| `coming-soon` | mostra «estará disponível em breve», sem descarregar nada |
| `unavailable` | botão cinzento que explica que ainda não existe |

Campos vazios não aparecem. Um `available` com `downloadUrl` vazio ou inválido passa automaticamente a `unavailable`.

**Estado atual:** Windows e macOS `unavailable` (não existe instalador nativo); iOS e Android `available`, a abrir a versão web (PWA) em `https://akvt90.github.io/Ping-Pong-Scoreboard/`.

### Publicar um instalador (exemplo Windows)
1. No repositório da app, cria uma **Release** no GitHub e anexa o ficheiro.
2. Copia o endereço do ativo (clica com o botão direito no ficheiro › copiar endereço).
3. Em `config/downloads.js`: `status: "available"`, `downloadUrl: "<endereço>"`, e preenche `version`, `releaseDate` e `fileSize`.
4. Para iOS, usa a App Store ou o TestFlight (nunca um link direto para um `.ipa`).

## Atualizar versões
Altera `version` e `releaseDate` (e `fileSize`) em `config/downloads.js` a cada nova release.

## Campos que tens de preencher
- `index.html`: substitui `SEU-UTILIZADOR/NOME-DO-REPOSITORIO` (canonical, `og:image`) pelo endereço real.
- `robots.txt` e `sitemap.xml`: o mesmo endereço.
- FAQ («A aplicação é gratuita?» e «Como posso obter ajuda?»): procura os comentários `CONFIGURAR`.
- Contacto e política de privacidade: não incluídos por não existirem; acrescenta ao rodapé se os tiveres.
- Confirma que o link do GitHub no rodapé e na FAQ (`github.com/akvt90/Ping-Pong-Scoreboard`) é o repositório correto.

## Publicar no GitHub Pages
1. Cria um repositório (ex.: `placar-website`) e envia estes ficheiros para a raiz.
2. Em **Settings › Pages**, escolhe **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Aguarda um minuto: o site fica em `https://utilizador.github.io/placar-website/`.
4. Atualiza o endereço nos ficheiros indicados acima e volta a enviar.

## Testar antes de divulgar
- [ ] O site abre no endereço do GitHub Pages, com estilos e imagens.
- [ ] Todos os links do cabeçalho e do rodapé levam à secção certa.
- [ ] Cada botão de download faz o que o `status` indica; os links externos abrem noutro separador.
- [ ] A galeria abre, navega com ← →, e fecha com ✕, Escape e clique fora.
- [ ] Navegação só com teclado (Tab): foco sempre visível, menu móvel acessível.
- [ ] Telemóvel (≈390 px), tablet e computador: sem scroll horizontal.
- [ ] Com «reduzir movimento» ativo no sistema, não há animações.
- [ ] Abre `/qualquer-coisa` e confirma a página 404.
- [ ] Partilha o link (WhatsApp, etc.) e verifica a pré-visualização Open Graph.
- [ ] Instala a app no Android (Chrome) e no iPhone/iPad (Safari) seguindo as instruções do site.

## Notas
- Os screenshots foram gerados num navegador sem acesso às fontes online da app, por isso a tipografia da app pode diferir ligeiramente do que vês no teu dispositivo. Se preferires, substitui-os por capturas feitas no tablet.
- Funcionalidades como controlos físicos não foram encontradas no código da app e **não** são apresentadas.
