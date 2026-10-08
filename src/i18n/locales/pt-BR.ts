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
      today: {
        title: 'Hoje',
        confirmed: 'Presença confirmada.',
        pending: 'Ainda sem registro de presença.',
      },
      actions: {
        viewAttendance: 'Ver presença de hoje',
      },
      stats: {
        streak: 'Sequência atual',
        week: 'Nesta semana',
        days: '{{count}} dias',
        presences: '{{count}} presenças',
      },
      recent: {
        title: 'Últimos sete dias',
        present: 'Presença confirmada',
        noRecord: 'Sem registro',
      },
      errors: {
        load: 'Não foi possível carregar suas presenças.',
        retry: 'Tentar novamente',
      },
      empty: {
        title: 'Nenhuma presença registrada',
        description: 'Suas idas à academia aparecerão aqui.',
      },
    },
    attendance: {
      question: 'Você foi à academia hoje?',
      questionDescription: 'Confirme sua ida. Isso não registra um treino.',
      actions: {
        confirm: 'Confirmar presença de hoje',
        confirming: 'Confirmando',
        remove: 'Desfazer presença de hoje',
        removing: 'Removendo',
        retry: 'Tentar novamente',
        cancel: 'Cancelar',
      },
      status: {
        confirmed: 'Presença de hoje confirmada',
        confirmedDescription: 'Sua ida à academia foi registrada.',
      },
      confirmation: {
        title: 'Desfazer presença?',
        description: 'A confirmação de hoje será removida.',
        confirm: 'Desfazer',
      },
      historyTitle: 'Histórico de presença',
      historyDescription: 'Presença é ida à academia, não plano de treino.',
      emptyHistory: 'Ainda não há presenças registradas.',
      present: 'Presença confirmada',
      noRecord: 'Sem registro',
      today: 'Hoje',
      errors: {
        load: 'Não foi possível carregar suas presenças.',
        action: 'Não foi possível atualizar a presença agora.',
      },
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
