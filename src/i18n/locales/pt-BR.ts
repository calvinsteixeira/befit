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
      insights: {
        streak: 'Sequência atual',
        streakValue: '{{count}} dias seguidos',
        streakEmpty: 'Marque uma presença para começar.',
        month: 'Neste mês',
        monthValue: '{{count}} presenças neste mês',
        monthEmpty: 'Nenhuma presença neste mês.',
      },
      errors: {
        load: 'Não foi possível carregar suas presenças.',
        retry: 'Tentar novamente',
      },
    },
    attendance: {
      question: 'Marque suas idas à academia',
      questionDescription: 'Toque em um dia para marcar ou remover a presença. Isso não registra um treino.',
      actions: {
        retry: 'Tentar novamente',
      },
      errors: {
        monthLoad: 'Não foi possível carregar este mês.',
        action: 'Não foi possível atualizar a presença agora.',
      },
      calendar: {
        previousMonth: 'Mês anterior',
        nextMonth: 'Próximo mês',
        monthNavigationHint: 'Navega entre os meses disponíveis.',
        weekdaysShort: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        weekdaysLong: [
          'segunda-feira',
          'terça-feira',
          'quarta-feira',
          'quinta-feira',
          'sexta-feira',
          'sábado',
          'domingo',
        ],
        weekdayLabel: '{{day}}',
        today: 'hoje',
        markedStatus: 'presença marcada',
        unmarkedStatus: 'sem presença registrada',
        futureStatus: 'dia futuro',
        markHint: 'Toque para marcar presença.',
        removeHint: 'Toque para remover presença.',
        futureHint: 'Dia futuro indisponível.',
        dayAccessibility: '{{date}}, {{status}}. {{action}}',
        loading: 'Carregando calendário',
        actionErrorHint: 'Tente tocar no dia novamente.',
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
