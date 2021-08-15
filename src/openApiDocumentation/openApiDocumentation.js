
module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Api',
    description: 'Safira API',
    // termsOfService: 'http://api_url/terms/',
    contact: {
      name: 'Safira Team',
      email: 'hello@wolox.co',
      url: 'https://www.wolox.com.ar/'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:3333/',
      description: 'Local server'
    },
    {
      url: 'https://api_url_testing',
      description: 'Testing server'
    },
    {
      url: 'https://api_url_production',
      description: 'Production server'
    }
  ],
  security: [
    {
      ApiKeyAuth: []
    }
  ],
  tags: [
    {
      name: 'GeneralApi'
    }
  ],
  paths: {
    '/users/register': {
      post: {
        tags: ['GeneralApi'],
        description: 'Create users',
        operationId: 'createUsers',
        parameters: [
          {
            name: 'name',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/name'
            },
            required: true,
            description: 'Nome do usuário'
          },
          {
            name: 'email',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/email'
            },
            required: true,
            description: 'Email do usuário'
          },
          {
            name: 'password',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/password'
            },
            required: true,
            description: 'Senha do usuário'
          },
          {
            name: 'repeatedPassword',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/repeatedPassword'
            },
            required: true,
            description: 'Senha do usuário novamente'
          }
        ],
        responses: {
          '200': {
            description: 'Usuário criado',
            content: { 'application/json': {
              default:'nada'
            }
            }
          },
          '500': {
            description: 'Erro no servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Erro no servidor',
                  internal_code: '500'
                }
              }
            }
          }
        }
      },
    },
    '/users/login': {
      post: {
        tags: ['GeneralApi'],
        description: 'Login user',
        operationId: 'loginUsers',
        parameters: [
          {
            name: 'email',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/email'
            },
            required: true,
            description: 'Email do usuário'
          },
          {
            name: 'password',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/password'
            },
            required: true,
            description: 'Senha do usuário'
          }
        ],
        responses: {
          '200': {
            description: 'Usuário logado',
            content: { 'application/json': {
              default:'nada'
            }
              // 'application/json': {
              //   schema: {
              //     $ref: '#/components/schemas/Users'
              //   }
              // }
            }
          },
          '500': {
            description: 'Erro no servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Erro no servidor',
                  internal_code: '500'
                }
              }
            }
          }
        }
      },
    },
    '/users/novoLancamento': {
      post: {
        tags: ['GeneralApi'],
        description: 'Cria novo lançamento',
        operationId: 'novoLancamento',
        parameters: [
          {
            name: 'lancamento_value',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/lancamento_value'
            },
            required: true,
            description: 'Valor da transação'
          },
          {
            name: 'tipo_de_transacao',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/tipo_de_transacao'
            },
            required: true,
            description: 'Tipo de transação(Entrada ou saida)'
          },
          {
            name: 'user_id',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/user_id'
            },
            required: true,
            description: 'Id do usuário'
          },
          {
            name: 'categoriaid',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/categoriaId'
            },
            required: true,
            description: 'Id da categoria'
          },
          {
            name: 'titulo_lancamento',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/tituloLancamento'
            },
            required: true,
            description: 'Titulo do lançamento'
          },
          {
            name: 'comentario',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/comentario'
            },
            required: true,
            description: 'Comentários sobre o lançamento'
          },
        ],
        responses: {
          '200': {
            description: 'Lancamento criado com sucesso',
            content: { 
              'application/json': {
                // schema: {
                //   $ref: '#components/schemas/categorias'
                // },
            }
           
            }
          },
          '500': {
            description: 'Erro no servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Erro no servidor',
                  internal_code: '500'
                }
              }
            }
          }
        }
      },
    },
    '/users/saldo': {
      get: {
        tags: ['GeneralApi'],
        description: 'Retorna saldo',
        operationId: 'saldoUsers',
        parameters: [
          {
            name: 'user_id',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/user_id'
            },
            required: true,
            description: 'ID do usuário'
          },
        ],
        responses: {
          '200': {
            description: 'Saldo retornado',
            content: { 
              'application/json': {
                schema: {
                  $ref: '#components/schemas/returnSaldo'
                },
                example: {
                  message: '45,50'
                }
            }
           
            }
          },
          '500': {
            description: 'Erro no servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Erro no servidor',
                  internal_code: '500'
                }
              }
            }
          }
        }
      },
    },
    '/categorias': {
      get: {
        tags: ['GeneralApi'],
        description: 'Retorna todas as categorias',
        operationId: 'categoria',
        parameters: [
          // {
          //   name: 'user_id',
          //   in: 'body',
          //   schema: {
          //     $ref: '#/components/schemas/user_id'
          //   },
          //   required: true,
          //   description: 'ID do usuário'
          // },
        ],
        responses: {
          '200': {
            description: 'Todas as categorias',
            content: { 
              'application/json': {
                schema: {
                  $ref: '#components/schemas/categorias'
                },
                example: {
                  message: [{'Moradia': 1, 'Supermercado': 2}]
                }
            }
           
            }
          },
          '500': {
            description: 'Erro no servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Erro no servidor',
                  internal_code: '500'
                }
              }
            }
          }
        }
      },
    },
    '/users/lancamento': {
      get: {
        tags: ['GeneralApi'],
        description: 'Recupera lançamento',
        operationId: 'recuperarLancamento',
        parameters: [
          {
            name: 'user_id',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/user_id'
            },
            required: true,
            description: 'ID do usuário'
          },
          {
            name: 'id_transacao',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/id_transacao'
            },
            required: false,
            description: 'Id da transacao'
          },
          {
            name: 'tipo_de_transacao',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/tipo_de_transacao'
            },
            required: false,
            description: 'Tipo de transação'
          },
          {
            name: 'titulo_lancamento',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/tituloLancamento'
            },
            required: false,
            description: 'Titulo do lançamento'
          },
          {
            name: 'start_date',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/start_date'
            },
            required: false,
            description: 'Data Inicial'
          },
          {
            name: 'end_date',
            in: 'body',
            schema: {
              $ref: '#/components/schemas/end_date'
            },
            required: false,
            description: 'Data Final'
          },
        ],
        responses: {
          '200': {
            description: 'Lancamento retornado com sucesso',
            content: { 
              'application/json': {
                schema: {
                  $ref: '#components/schemas/lancamentoReturn'
                },
                example: {
                  user_id: 33,
                  id: 1,
                  tipo_de_transacao: 1,
                  tituloLancamento: 'Mercado',
                  start_date: '20/02/2021',
                  end_date: '25/02/2021'
                }
            }
           
            }
          },
          '500': {
            description: 'Erro no servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Erro no servidor',
                  internal_code: '500'
                }
              }
            }
          }
        }
      },
    }
  },
  components: {
    schemas: {
      name: {
        type: 'string',
        description: 'Nome do usuário',
        example: 'Vinicius'
      },
      email: {
        type: 'string',
        description: 'Email do usuário',
        example: 'viniotacilio@gmail.com'
      },
      password: {
        type: 'string',
        description: 'Senha do usuário',
        example: 'consagrados'
      },
      repeatedPassword: {
        type: 'string',
        description: 'Senha do usuário novamente',
        example: 'consagrados'
      },
      identificationNumber: {
        type: 'integer',
        description: 'User identification number',
        example: 1234
      },
      username: {
        type: 'string',
        example: 'raparicio'
      },
      userType: {
        type: 'string',
        enum: 1,
        default: 'teste'
      },
      companyId: {
        type: 'integer',
        description: 'Company id where the user works',
        example: 15
      },
      User: {
        type: 'object',
        properties: {
          identificationNumber: {
            $ref: '#/components/schemas/identificationNumber'
        }
      },
      Users: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            default: 'teste'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          },
          internal_code: {
            type: 'string'
          }
        }
      }
    },
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key'
      }
    },
    user_id: {
      type: 'String',
      description: 'ID do usuário',
      example: 133
    },
    returnSaldo: {
      type: 'object',
      properties: {
        message: {
          type: 'string'
        }
      }
    },
    categorias: {
      type: 'object',
      properties: {
        message: {
          type: 'array'
        }
      }
    },
    lancamento_value: {
      type: 'integer',
      description: 'Valor do lançamentos',
      example: '50'
    },
    tipo_de_transacao: {
      type: 'integer',
      description: 'Tipo do lançamentos',
      example: '1'
    },
    categoriaId: {
      type: 'integer',
      description: 'Categoria do lançamentos',
      example: '3'
    },
    tituloLancamento: {
      type: 'string',
      description: 'Titulo do lançamentos',
      example: '50'
    },
    comentario: {
      type: 'string',
      description: 'Comentário sobre o lançamento',
      example: 'Divída com Marcelo'
    },
    id_transacao: {
      type: 'integer',
      description: 'Id de uma transação',
      example: 1
    },
    start_date: {
      type: 'string',
      description: 'Data inicial para fins de filtragem',
      example: '20/02/2021'
    },
    end_date: {
      type: 'string',
      description: 'Data final para fins de filtragem',
      example: '25/02/2021'
    },
    lancamentoReturn: {
      type: 'object',
      properties: {
        user_id: {
          type: 'string'
        },
        id: {
          type: 'integer'
        },
        tipo_de_transacao: {
          type: 'integer'
        },
        tituloLancamento: {
          type: 'string'
        },
        start_date: {
          type: 'string'
        },
        end_date: {
          type: 'string'
        }
      }
    },
  }
}}