const ptBR = {
  translation: {
    auth: {
      login: {
        tagline: 'Seu treino. No seu ritmo.',
        description: 'Consistência começa com o próximo passo.',
        title: 'Entrar para treinar',
        formDescription: 'Acesse sua conta para continuar.',
      },
      fields: {
        email: {
          label: 'E-mail',
          hint: 'Digite o e-mail da sua conta',
        },
        password: {
          label: 'Senha',
          hint: 'Digite sua senha',
        },
      },
      actions: {
        signIn: 'Entrar',
        showPassword: 'Mostrar senha',
        hidePassword: 'Ocultar senha',
        passwordVisibilityHint: 'Alterna a visibilidade da senha',
      },
      status: {
        signingIn: 'Entrando',
      },
      errors: {
        invalidCredentials: 'E-mail ou senha inválidos.',
        unexpected: 'Não foi possível entrar agora. Verifique sua conexão e tente novamente.',
      },
      validation: {
        invalidEmail: 'Digite um e-mail válido.',
        passwordRequired: 'Digite sua senha.',
      },
    },
    tabs: {
      home: 'Início',
      attendance: 'Presença',
      profile: 'Perfil',
    },
    home: {
      greeting: 'Vamos manter o ritmo?',
      title: 'Seu treino começa com consistência.',
      description: 'Acompanhe sua rotina e evolua no seu próprio ritmo.',
      empty: {
        title: 'Seu resumo de presença aparecerá aqui',
        description: 'Quando houver registros reais, você verá suas idas à academia neste espaço.',
      },
    },
    attendance: {
      title: 'Presença',
      description: 'Acompanhe suas idas à academia, sem confundir presença com plano de treino.',
      historyTitle: 'Histórico de presença',
      emptyDescription: 'Seu histórico aparecerá aqui quando houver registros reais de presença.',
    },
    profile: {
      title: 'Perfil',
      description: 'Veja os dados básicos da sua conta.',
      accountTitle: 'Dados da conta',
      emailLabel: 'E-mail',
      emailUnavailable: 'E-mail não disponível',
      actions: {
        signOut: 'Sair',
      },
      status: {
        signingOut: 'Saindo',
      },
      errors: {
        signOut: 'Não foi possível sair agora. Tente novamente.',
      },
    },
  },
} as const

export default ptBR
