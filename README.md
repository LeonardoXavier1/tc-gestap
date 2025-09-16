# Sistema de Gestão de TC (Trabalho de Conclusão)

Sistema web completo para gestão de Trabalhos de Conclusão desenvolvido com Vue 3 + Vite + Pinia + Vue Router + TailwindCSS.

## 🚀 Funcionalidades

### Para Coordenadores
- **Gestão de Alunos**: Cadastro e gerenciamento de alunos matriculados
- **Gestão de Professores**: Cadastro e gerenciamento de professores
- **Cronograma**: Definição de prazos para todas as fases do TC
- **Banca Avaliadora**: Definição dos professores que compõem a banca
- **Visualização Geral**: Dashboard com estatísticas e atividades recentes

### Para Professores
- **Gestão de Alunos**: Visualização dos alunos orientandos
- **Lançamento de Notas**: Avaliação por critérios (relevância, metodologia, estrutura, linguagem, bibliografia)
- **Reuniões de Orientação**: Agendamento e registro de reuniões com upload de documentos
- **Acompanhamento**: Visualização do progresso dos alunos

### Para Alunos
- **Meu TC**: Visualização das informações do próprio TC
- **Cronograma**: Acompanhamento dos prazos e fases
- **Notas**: Visualização das notas recebidas
- **Reuniões**: Histórico de reuniões de orientação

## 🛠️ Tecnologias Utilizadas

- **Vue 3** - Framework JavaScript reativo
- **Vite** - Build tool e servidor de desenvolvimento
- **Pinia** - Gerenciamento de estado
- **Vue Router** - Roteamento
- **TailwindCSS** - Framework CSS utilitário
- **PostCSS** - Processamento de CSS

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd tc-gestao
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse o sistema em: `http://localhost:5173`

## 🔐 Credenciais de Teste

### Coordenador
- **Email**: `coordenador@tc.com`
- **Senha**: `123456`

### Professor
- **Email**: `professor@tc.com`
- **Senha**: `123456`

### Aluno
- **Email**: `aluno@tc.com`
- **Senha**: `123456`

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface
│   ├── forms/          # Componentes de formulário
│   ├── tables/         # Componentes de tabela
│   ├── modals/         # Componentes de modal
│   └── alerts/         # Componentes de alerta
├── layouts/            # Layouts da aplicação
├── router/             # Configuração de rotas
├── stores/              # Stores do Pinia
│   ├── auth.js         # Autenticação
│   ├── students.js     # Gestão de alunos
│   ├── professors.js   # Gestão de professores
│   ├── schedule.js     # Cronograma e banca
│   ├── grades.js       # Notas
│   └── meetings.js     # Reuniões
├── views/              # Páginas da aplicação
│   ├── Login.vue       # Página de login
│   ├── Dashboard.vue   # Dashboard principal
│   ├── Students.vue    # Gestão de alunos
│   ├── Professors.vue  # Gestão de professores
│   ├── Schedule.vue    # Cronograma
│   ├── Committee.vue   # Banca avaliadora
│   ├── Grades.vue      # Notas
│   ├── Meetings.vue    # Reuniões
│   ├── MyTC.vue        # TC do aluno
│   └── NotFound.vue    # Página 404
├── App.vue             # Componente principal
├── main.js             # Ponto de entrada
└── style.css           # Estilos globais
```

## 🎨 Design System

O sistema utiliza um design system consistente com:

- **Cores Primárias**: Azul (#3b82f6) para ações principais
- **Cores Secundárias**: Cinza para elementos neutros
- **Componentes Reutilizáveis**: Botões, formulários, modais, alertas
- **Layout Responsivo**: Adaptável a diferentes tamanhos de tela
- **Efeitos Hover**: Interações visuais em botões e links

## 🔄 Estados e Dados

O sistema utiliza dados mockados inicialmente armazenados nos stores do Pinia:

- **Dados Persistentes**: Login mantido no localStorage
- **Estado Reativo**: Atualizações em tempo real
- **Estrutura Escalável**: Preparado para integração com backend

## 🚀 Próximos Passos

Para produção, considere implementar:

1. **Backend API**: Integração com servidor Node.js/Python/Java
2. **Banco de Dados**: PostgreSQL/MySQL/MongoDB
3. **Autenticação Real**: JWT, OAuth, etc.
4. **Upload de Arquivos**: Sistema de upload de documentos
5. **Notificações**: Email, push notifications
6. **Relatórios**: Geração de relatórios em PDF
7. **Testes**: Testes unitários e de integração

## 📝 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build de produção

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte ou dúvidas, entre em contato através dos issues do GitHub.