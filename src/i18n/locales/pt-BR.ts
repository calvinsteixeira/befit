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
      greeting: {
        morning: 'Bom dia.',
        afternoon: 'Boa tarde.',
        evening: 'Boa noite.',
      },
      title: 'Evolua no seu ritmo.',
      empty: {
        title: 'Nenhuma presença registrada',
        description: 'Suas idas à academia aparecerão aqui.',
      },
    },
    attendance: {
      heading: 'Idas à academia',
      historyTitle: 'Histórico de presença',
      emptyDescription: 'Seu histórico aparecerá aqui. Presença é ida à academia, não plano de treino.',
    },
    profile: {
      accountContext: 'Conta autenticada',
      emailUnavailable: 'E-mail não disponível',
      actions: {
        signOut: 'Sair da conta',
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
