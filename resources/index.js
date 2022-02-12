const genericTables = [
  {
    name: 'infos',
    display_name: 'Irregularité',
    sort_by: { createdAt: -1 },
    data_base_columns: {
      question: { type: String },
      answer: { type: String },
    },
    admin_table_column: {question: 'Question', answer: 'Réponse', createdAt: 'Date de creation'},
    admin_table_actions: ['create', 'show', 'filters', 'index', 'update', 'delete'],
    admin_table_search: {name: '', code: ''},
    admin_table_filters: [
      {
        name: 'name',
        placeholder: 'Nom',
        type: 'text'
      },
      {
        name: 'code',
        placeholder: 'Code',
        type: 'text'
      }
    ],
    admin_fields_values: {question: '', answer: ''},
    admin_fields: [
      {
        name: 'question',
        type: 'text',
        title: 'Question',
        required: true
      },
      {
        name: 'answer',
        type: 'textarea',
        title: 'Réponse',
        required: true
      },
    ]
  },
  {
    name: 'quizs',
    actions: ['create', 'show', 'index', 'update', 'delete'],
  }
]

const menu = [
  'General',
  [
    {
      to: '/admin/dashboard',
      icon: 'desktop-mac',
      label: 'Dashboard',
    },
  ],
  'Menu',
  [
    {
      to: '/admin/infos',
      label: 'Infos',
      icon: 'table',
    },
    {
      to: '/admin/profile',
      label: 'Profile',
      icon: 'account-circle',
    },
    {
      label: 'Paramètres',
      subLabel: 'Paramètres',
      icon: 'view-list',
      menu: [
        {
          to: '/admin/users',
          label: 'Utilisateurs',
        },
        {
          href: '#void',
          label: 'Sub-item Two',
        },
      ],
    },
  ]
]

const users = [
  {
    name: 'users',
    display_name: 'Utilisateur',
    sort_by: { createdAt: -1 },
    admin_table_column: {username: 'Nom d\'utilisateur'},
    admin_table_actions: ['create', 'show', 'filters', 'index', 'update', 'delete'],
    admin_table_search: {username: ''},
    admin_table_filters: [
      {
        name: 'username',
        placeholder: 'Nom d\'utilisateur',
        type: 'text'
      }
    ],
    admin_fields_values: {username: '', password: ''},
    admin_fields: [
      {
        name: 'username',
        type: 'text',
        title: 'Nom d\'utilisateur',
        required: true
      },
      {
        name: 'password',
        type: 'password',
        title: 'Mot de passe',
        required: true
      },
    ]
  },
]

exports.genericTables = genericTables;
exports.users = users;
exports.menu = menu;