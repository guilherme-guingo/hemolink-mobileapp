
<div align="center">

# 🩸 HemoLink

### *Conectando doadores de sangue a hospitais que precisam de você*

<br/>

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0.35-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<br/>

> Projeto acadêmico em grupo desenvolvido com **React Native + Expo**, criado para incentivar a cultura de doação de sangue e facilitar a gestão de hemocentros.

</div>

---

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Telas e Funcionalidades](#-telas-e-funcionalidades)
- [Stack de Tecnologias](#-stack-de-tecnologias)
- [Arquitetura e Estrutura](#-arquitetura-e-estrutura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Executando o Projeto](#-executando-o-projeto)
- [Autenticação](#-autenticação)
- [Notificações Push](#-notificações-push)
- [Navegação](#-navegação)
- [Como Contribuir](#-como-contribuir)

---

## 💡 Sobre o Projeto

O **HemoLink** é um aplicativo mobile multiplataforma (Android, iOS e Web) que nasceu de um problema real: a dificuldade de conectar doadores voluntários de sangue com os hospitais e hemocentros que precisam de doações urgentes.

Por meio do app, um usuário pode:

- Encontrar hemocentros próximos e visualizar o **estoque de sangue em tempo real**
- Acompanhar seu **histórico de doações** e o impacto gerado (vidas salvas)
- Gerenciar seu **perfil de doador** com informações médicas e carteirinha virtual
- Receber **notificações** sobre campanhas e lembretes de doação
- Administradores podem **gerenciar hospitais** diretamente pelo app

---

## 📱 Telas e Funcionalidades

### 🏠 Home
A tela inicial apresenta uma experiência personalizada para o doador:
- **Saudação animada** com emoji de mão que acena ao entrar na tela (usando `Animated API`)
- **Card de Impacto** com número de vidas salvas e doações realizadas no ano
- **Próximo Agendamento** com data, local e botão de acesso rápido
- **Atalhos rápidos** para Agendar, Histórico, Carteirinha e Indicar
- **Dicas de Saúde** em carrossel horizontal (hidratação, alimentação, repouso, documentos)
- **Seção de Apoio** com modal de doação financeira à plataforma

### 🏥 Catálogo de Hospitais
Lista todos os hospitais e hemocentros cadastrados com:
- **Busca em tempo real** por nome ou cidade
- **Filtros inteligentes:** Todos | Urgência Crítica | Mais Próximos | Favoritos
- **Indicador de estoque** (percentual de sangue disponível por tipo sanguíneo)
- **Tipos sanguíneos críticos** em destaque no card do hospital
- Estado de **lista vazia** com EmptyState animado

### 🏨 Detalhe do Hospital
Tela completa com informações detalhadas:
- Nome, endereço, cidade, estado, CEP
- Telefone, e-mail e website com links clicáveis
- Horário de funcionamento
- **Estoque visual** de todos os tipos sanguíneos (A+, A-, B+, B-, AB+, AB-, O+, O-)

### 👤 Perfil do Doador
Área pessoal com:
- **Foto de perfil** editável (câmera ou galeria via `expo-image-picker`)
- Badge de tipo sanguíneo e status de doador
- **Estatísticas:** vidas salvas e pontos acumulados
- **Dados pessoais:** nome, e-mail, telefone (editável via modal)
- **Informações médicas:** status de aptidão, data da última doação e alertas de saúde
- Dados persistidos localmente com `AsyncStorage`

### ⚙️ Painel Administrativo
Exclusivo para administradores:
- **Dashboard com estatísticas:** total de hospitais, doadores cadastrados, doações em aberto e recebidas
- **Busca e filtragem** de hospitais por nome, emergência ou alto estoque
- **CRUD completo** de hospitais (listar, cadastrar, editar, excluir)
- Indicação visual de hospitais em situação crítica de estoque

### 🔐 Login e Cadastro
Tela de autenticação moderna com:
- Login por **e-mail e senha** com validação via `react-hook-form` + `zod`
- Login social com **Google OAuth** (via `expo-auth-session`)
- Toggle para mostrar/ocultar senha
- Feedback de erros e loading states
- Toasts de sucesso e erro via `react-native-toast-message`

---

## 🛠️ Stack de Tecnologias

### Core

| Tecnologia | Versão | Descrição |
|---|---|---|
| [React Native](https://reactnative.dev/) | `0.81.5` | Base do app mobile |
| [Expo](https://expo.dev/) | `~54.0.35` | Plataforma de desenvolvimento |
| [TypeScript](https://www.typescriptlang.org/) | `~5.9.2` | Tipagem estática |
| [React](https://react.dev/) | `19.1.0` | Biblioteca de interfaces |

### Navegação

| Pacote | Versão | Uso |
|---|---|---|
| `@react-navigation/native` | `^7.3.3` | Core de navegação |
| `@react-navigation/native-stack` | `^7.17.5` | Navegação em pilha (stack) |
| `@react-navigation/bottom-tabs` | `^7.18.2` | Bottom Tab Bar |
| `@react-navigation/drawer` | `^7.12.2` | Menu lateral (drawer) |

### UI e Estilização

| Pacote | Versão | Uso |
|---|---|---|
| `styled-components` | `^6.4.2` | Estilização com CSS-in-JS |
| `expo-linear-gradient` | `~15.0.8` | Gradientes nos cards |
| `@expo/vector-icons` | `^15.0.3` | Ícones (Ionicons, FontAwesome5, etc.) |
| `lottie-react-native` | `~7.3.1` | Animações Lottie |
| `react-native-reanimated` | `~4.1.1` | Animações de alta performance |
| `react-native-toast-message` | `^2.3.3` | Notificações in-app |
| `react-native-qrcode-svg` | `^6.3.21` | Geração de QR Code |

### Formulários e Validação

| Pacote | Versão | Uso |
|---|---|---|
| `react-hook-form` | `^7.79.0` | Gerenciamento de formulários |
| `zod` | `^4.4.3` | Validação de schema |
| `@hookform/resolvers` | `^5.4.0` | Integração RHF + Zod |

### Dados e Armazenamento

| Pacote | Versão | Uso |
|---|---|---|
| `axios` | `^1.18.0` | Requisições HTTP para a API |
| `@react-native-async-storage/async-storage` | `2.2.0` | Persistência de dados local |
| `expo-secure-store` | `~15.0.8` | Armazenamento seguro de tokens |

### Serviços Nativos

| Pacote | Versão | Uso |
|---|---|---|
| `expo-notifications` | `~0.32.17` | Notificações push |
| `expo-image-picker` | `~17.0.11` | Câmera e galeria |
| `expo-auth-session` | `~7.0.11` | OAuth 2.0 (Google Login) |
| `expo-web-browser` | `~15.0.11` | Abertura de links externos |
| `expo-device` | `~8.0.10` | Detecção de dispositivo físico |

---

## 🗂️ Arquitetura e Estrutura

O projeto segue uma arquitetura **feature-based** organizada por responsabilidade:

```
hemolink-mobileapp/
├── assets/                    # Ícones e splash screen do app
├── src/
│   ├── @types/                # Declarações de tipos globais TypeScript
│   ├── assets/                # Imagens e recursos internos (ex: admHero.webp)
│   │
│   ├── components/            # Componentes reutilizáveis
│   │   ├── AuthFormWrapper/   # Layout padrão para telas de autenticação
│   │   ├── BackButton/        # Botão de voltar estilizado
│   │   ├── BotaoAtalho/       # Atalhos rápidos da Home
│   │   ├── Button/            # Botão genérico e configurável
│   │   ├── CardBase/          # Card base genérico
│   │   ├── CardBaseCatalogo/  # Card de hospital no catálogo
│   │   ├── CardBasePerfil/    # Card de seção do perfil
│   │   ├── EmptyState/        # Tela de lista vazia
│   │   ├── Header/            # Cabeçalho global
│   │   ├── InfoPerfil/        # Linha de informação no perfil
│   │   ├── Input/             # Input de formulário com ícone
│   │   ├── ModalDoacao/       # Modal de doação financeira
│   │   ├── TabBarIcon/        # Ícone customizado da Tab Bar
│   │   └── loading/           # Indicador de carregamento
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx    # Contexto global de autenticação (signIn, signOut, Google OAuth)
│   │   └── FavoritosContext.tsx # Contexto de hospitais favoritos
│   │
│   ├── hooks/                 # Custom hooks reutilizáveis
│   │
│   ├── pages/                 # Telas da aplicação
│   │   ├── Administrador/     # Painel administrativo (dashboard + CRUD hospitais)
│   │   ├── Cadastro/          # Tela de cadastro de usuário
│   │   ├── Catalogo/          # Catálogo de hospitais com filtros
│   │   ├── DetalheHospital/   # Detalhes e estoque de um hospital
│   │   ├── Home/              # Tela inicial do doador
│   │   ├── Login/             # Tela de login (e-mail + Google)
│   │   └── Perfil/            # Perfil e dados médicos do doador
│   │
│   ├── routers/
│   │   ├── index.tsx          # Roteador raiz (decide autenticado ou não)
│   │   ├── auth.routes.tsx    # Rotas públicas (Login, Cadastro)
│   │   ├── app.routes.tsx     # Rotas protegidas
│   │   ├── tabs.tsx           # Navegação em abas (Home, Catálogo, Perfil, Admin)
│   │   ├── drawer.tsx         # Menu lateral
│   │   └── navigation.ts      # Tipagens das rotas com TypeScript
│   │
│   ├── services/
│   │   ├── api/               # Configuração das instâncias do Axios
│   │   ├── auth.ts            # Funções e tipos de autenticação
│   │   ├── HospitalService.ts # CRUD completo de hospitais (listar, buscar, criar, atualizar, excluir)
│   │   ├── DoadorService.ts   # Serviço de doadores
│   │   └── notifications.ts   # Configuração e envio de notificações push
│   │
│   ├── theme/                 # Design tokens (cores, tipografia, espaçamentos)
│   │
│   └── util/                  # Funções utilitárias
│       ├── obterBloodStock     # Calcula percentual do estoque de sangue
│       ├── obterTiposSanguineosCriticos # Identifica tipos críticos
│       ├── fotoStorage         # Leitura e gravação da foto de perfil
│       └── dadosEditaveis      # Persistência de dados editáveis do perfil
│
├── App.tsx                    # Componente raiz (providers e configurações globais)
├── index.ts                   # Entry point da aplicação
├── app.json                   # Configurações do Expo (ícone, splash, permissões, bundle ID)
├── tsconfig.json              # Configuração do TypeScript
└── package.json
```

---

## ✅ Pré-requisitos

Antes de começar, verifique se você possui:

- [Node.js](https://nodejs.org/) **v18 ou superior**
- [npm](https://www.npmjs.com/) (incluso no Node.js)
- [Git](https://git-scm.com/)
- **Para rodar no celular:** Aplicativo [Expo Go](https://expo.dev/go) instalado
- **Para Android:** [Android Studio](https://developer.android.com/studio) com emulador configurado *(opcional)*
- **Para iOS:** [Xcode](https://developer.apple.com/xcode/) em um Mac *(opcional)*

---

## ⚙️ Instalação

**1. Clone o repositório**

```bash
git clone https://github.com/guilherme-guingo/hemolink-mobileapp.git
```

**2. Acesse a pasta do projeto**

```bash
cd hemolink-mobileapp
```

**3. Instale as dependências**

```bash
npm install
```

> ⚠️ Se você usar **npm v7+**, pode ser necessário adicionar `--legacy-peer-deps` caso apareça algum conflito de versão:
> ```bash
> npm install --legacy-peer-deps
> ```

---

## ▶️ Executando o Projeto

**Inicie o servidor de desenvolvimento:**

```bash
npx expo start
```

O terminal exibirá um **QR Code** e as seguintes opções:

| Tecla | Ação |
|---|---|
| `a` | Abre no emulador Android |
| `i` | Abre no simulador iOS (apenas macOS) |
| `w` | Abre no navegador (versão web) |
| `r` | Recarrega o app |

**Via Expo Go (dispositivo físico):**
Abra o app **Expo Go** no seu celular e escaneie o QR Code exibido no terminal.

**Comandos alternativos:**

```bash
# Apenas Android
npm run android

# Apenas iOS
npm run ios

# Apenas Web
npm run web
```

---

## 🔐 Autenticação

O sistema de autenticação é gerenciado pelo `AuthContext` e suporta dois fluxos:

### Login por E-mail e Senha
- Validação de formulário com `react-hook-form` + `zod`
- Campos obrigatórios: e-mail (formato válido) e senha (mínimo 6 caracteres)
- Sessão persistida no `AsyncStorage` sob a chave `@hemolink:user`

### Login com Google OAuth
- Implementado com `expo-auth-session` + `expo-web-browser`
- Usa o fluxo **Implicit Grant** (ResponseType.Token) com PKCE desativado
- Busca as informações do usuário na API do Google com o access token
- Cria um novo usuário na base se ainda não existir
- **Não requer SDKs nativos** do Google — funciona 100% via Expo

### Fluxo de Sessão
```
App inicia
  └─> Lê AsyncStorage
       ├─> Usuário encontrado → Redireciona para Home
       └─> Sem usuário → Redireciona para Login
```

---

## 🔔 Notificações Push

O app utiliza `expo-notifications` para notificações locais agendadas:

| Função | Quando é disparada | Conteúdo |
|---|---|---|
| `enviarNotificacaoBoasVindas()` | Após o primeiro login | *"Bem-vindo ao HemoLink! 🩸"* |
| `enviarNotificacaoPromo()` | Após o login | *"Ei...😉 Já está sabendo? Agora você pode trocar doações por pontos"* |

> ⚠️ **Importante:** Notificações só funcionam em **dispositivos físicos**. Em emuladores/simuladores será exibido um alerta informativo.

A permissão de notificação é solicitada ao usuário na primeira execução. No Android, um canal de notificação `"default"` é criado com importância máxima e padrão de vibração.

---

## 🗺️ Navegação

O app possui uma estrutura de navegação em camadas:

```
NavigationContainer
└── Roteador Raiz (index.tsx)
     ├── [Não autenticado] AuthRoutes (Stack)
     │    ├── Login
     │    └── Cadastro
     │
     └── [Autenticado] AppRoutes (Stack)
          ├── Drawer
          │    └── TabsRouters (Bottom Tabs)
          │         ├── Home
          │         ├── Catálogo
          │         ├── Perfil
          │         └── Administrador
          │
          └── DetalheHospital (tela sem tab)
          └── CadastroHospital (tela sem tab)
```

---

## 🤝 Como Contribuir

Contribuições são bem-vindas! Siga o fluxo abaixo:

1. Faça um **fork** do projeto
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b feature/nome-da-feature
   ```
3. Realize suas alterações e faça o **commit** seguindo o padrão:
   ```bash
   git commit -m "feat: descrição da feature"
   # ou
   git commit -m "fix: descrição do bug corrigido"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin feature/nome-da-feature
   ```
5. Abra um **Pull Request** descrevendo suas mudanças

### Convenção de Commits

| Prefixo | Quando usar |
|---|---|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `style:` | Mudanças de estilo/formatação |
| `refactor:` | Refatoração de código |
| `docs:` | Atualização de documentação |
| `chore:` | Tarefas de manutenção |

---

<div align="center">

Feito com ❤️ e 🩸 pela equipe HemoLink

*Cada doação pode salvar até 4 vidas. Doe sangue.*

</div>
