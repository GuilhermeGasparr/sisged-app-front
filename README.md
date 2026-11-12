# SISGED — Front-end (Web App)

Sistema de Gerenciamento de Fluxo de Disciplinas. Este repositório contém o **Web App**, a interface usada por alunos e coordenadores.

## Sobre o app

O SISGED permite que **coordenadores** criem e mantenham os fluxos (grades) de disciplinas dos cursos e que **alunos** acompanhem o próprio desenvolvimento acadêmico.

**Aluno**
- Visualiza o fluxograma do curso (grafo de disciplinas, pré-requisitos e status: pendente, cursando, concluída).
- Simula rotas: melhor caminho, conclusão de uma disciplina e caminho por preferência de área.
- Usa o **Modo Matrícula**: escolhe disciplinas dentre as ofertadas, vê a grade semanal com conflitos de horário lado a lado e recebe recomendações do sistema.

**Coordenador**
- Cria, edita, duplica e remove fluxos (inclusive modelos base).
- Gerencia o período de matrícula: adiciona/remove disciplinas ofertadas, inicia o modo matrícula e pode encerrá-lo antes do prazo.

O front consome o Backend (Python/FastAPI) via REST/JSON sobre HTTPS com JWT. Login, cadastro e renovação de token passam pelo **Supabase Auth** (`supabase-js`). Todo acesso ao banco passa pela API.

## Stack

| Área | Tecnologia |
|---|---|
| Build / dev server | Vite |
| UI | React + TypeScript |
| Estilo | Tailwind CSS |
| Ícones | lucide-react |
| Roteamento | React Router |
| Dados / cache | TanStack Query + fetch |
| Fluxograma | React Flow |
| Autenticação | supabase-js (Supabase Auth) |

## Como rodar

Pré-requisitos: Node.js 18+ e npm.

```bash
# 1. instalar dependências
npm install
# 3. subir o servidor de desenvolvimento
npm run dev
```

### Outros scripts

```bash
npm run build     # build de produção (saída em dist/)
npm run preview   # serve o build localmente
npm run lint      # análise estática
```

### Setup inicial do projeto (caso ainda não exista)

```bash
npm create vite@latest sisged-web -- --template react-ts
cd sisged-web
npm install react-router-dom @tanstack/react-query @supabase/supabase-js @xyflow/react lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

Em `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Em `src/index.css`:

```css
@import "tailwindcss";
```

## Arquitetura do front

O Web App é uma SPA organizada em três grupos, conforme o diagrama de componentes (C4 nível 3):

1. **Páginas** (React Router)
   - Cadastro e Login
   - Fluxograma do Aluno (tela inicial do aluno + simulações de caminhos)
   - Matrícula do Aluno (tela separada, disponível quando o modo matrícula está ativo)
   - Editor de Fluxos (coordenador: visualizar, criar, editar, duplicar)
   - Modo Matrícula (coordenador: gerenciar ofertas, iniciar e finalizar período)
2. **Componentes de interface reutilizáveis**
   - Fluxograma (React Flow): grafo de disciplinas, status, setas, zoom e filtros
   - Grade Semanal: turnos Manhã/Tarde/Noite, horários AB/CD/EF, dias 2 a 6, conflitos lado a lado
   - Biblioteca de UI (Tailwind + lucide): cartões, modais, mensagens, botões Iniciar/Finalizar
3. **Infraestrutura do cliente**
   - Sessão e Guardas de Rota (Context + Router): carrega o perfil e bloqueia telas por papel (aluno ou coordenador)
   - Cliente da API (TanStack Query + fetch): injeta o JWT e trata erros 401/403/409/422
   - Cliente Supabase Auth (supabase-js): login, cadastro e renovação do token

### Fluxo de dependências

```
Páginas → Componentes de UI
Páginas → hooks (TanStack Query) → services (fetch + JWT) → Backend FastAPI
Páginas / Sessão → Supabase Auth (login, cadastro, refresh)
Guardas de rota → Sessão (papel: aluno | coordenador)
```

As rotas do backend consumidas espelham os routers da API: `/cursos`, `/fluxos`, `/fluxos-base`, `/me`, `/perfis/aluno`, `/perfis/coordenador`, `/simulacoes/*` e `/matriculas/*`.

## Estrutura de pastas

```
sisged-web/
├── public/
├── src/
│   ├── main.tsx                     # entrada: providers (Query, Auth, Router)
│   ├── App.tsx                      # roteador raiz
│   ├── index.css                    # import do Tailwind
│   │
│   ├── app/
│   │   ├── router.tsx               # definição das rotas
│   │   └── providers.tsx            # QueryClientProvider, AuthProvider
│   │
│   ├── pages/                       # camada de páginas (React Router)
│   │   ├── auth/
│   │   │   └── CadastroLoginPage.tsx
│   │   ├── aluno/
│   │   │   ├── FluxogramaAlunoPage.tsx
│   │   │   └── MatriculaAlunoPage.tsx
│   │   └── coordenador/
│   │       ├── EditorFluxosPage.tsx
│   │       └── ModoMatriculaPage.tsx
│   │
│   ├── components/
│   │   ├── fluxograma/              # React Flow
│   │   │   ├── Fluxograma.tsx
│   │   │   ├── DisciplinaNode.tsx
│   │   │   └── FiltrosFluxograma.tsx
│   │   ├── grade-semanal/
│   │   │   ├── GradeSemanal.tsx
│   │   │   └── BlocoHorario.tsx
│   │   └── ui/                      # Tailwind + lucide
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       └── Toast.tsx
│   │
│   ├── features/                    # lógica por domínio (hooks + services)
│   │   ├── cursos/
│   │   │   ├── cursos.service.ts
│   │   │   └── useCursos.ts
│   │   ├── fluxos/
│   │   │   ├── fluxos.service.ts
│   │   │   └── useFluxos.ts
│   │   ├── perfil/
│   │   │   ├── perfil.service.ts
│   │   │   └── usePerfil.ts
│   │   ├── simulacoes/
│   │   │   ├── simulacoes.service.ts
│   │   │   └── useSimulacoes.ts
│   │   └── matriculas/
│   │       ├── matriculas.service.ts
│   │       └── useMatriculas.ts
│   │
│   ├── lib/
│   │   ├── apiClient.ts             # fetch + JWT + tratamento 401/403/409/422
│   │   ├── supabase.ts              # createClient (supabase-js)
│   │   └── queryClient.ts           # configuração do TanStack Query
│   │
│   ├── auth/
│   │   ├── AuthContext.tsx          # sessão + perfil do usuário
│   │   ├── useAuth.ts
│   │   └── RouteGuard.tsx           # bloqueia telas por papel
│   │
│   ├── types/                       # tipos espelhando o modelo de dados
│   │   ├── curso.ts
│   │   ├── disciplina.ts
│   │   ├── fluxo.ts
│   │   ├── matricula.ts
│   │   └── usuario.ts
│   │
│   ├── utils/
│   │   └── horarios.ts              # helpers de turno/horário/conflitos
│   │
│   └── assets/
├── .env.example
├── index.html
├── package.json
├── tailwind / vite.config.ts
└── tsconfig.json
```

### Convenções

- **pages/** só compõe telas; regra de dados fica em **features/**.
- **features/** agrupa por domínio da API: `service` faz a chamada HTTP e `use*` expõe o hook do TanStack Query.
- **components/** são reutilizáveis e sem conhecimento de rotas ou chamadas HTTP.
- **lib/** concentra clientes externos (API e Supabase); nenhuma página chama `fetch` diretamente.
- Componentes em `PascalCase`, hooks com prefixo `use`, services com sufixo `.service.ts`.

## Status do modelo de dados (referência)

Principais entidades usadas pelos tipos do front: `cursos`, `coordenadores`, `alunos`, `fluxos` (status `RASCUNHO | EM_VIGENCIA | ARQUIVADO`), `disciplinas`, `fluxo_disciplinas`, `progresso_aluno` (`CURSANDO | CONCLUIDA`; ausência de linha = pendente), `periodos_matricula`, `ofertas`, `oferta_horarios`, `matriculas` (`RASCUNHO | ENVIADA`) e `matricula_itens`.