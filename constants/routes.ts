export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  CONTINUE: '/continue',
  LOGIN: '/login',
  EDIT: '/edit',
  PREVIEW: '/preview',
  AUTHENTICATION: '/authentication',
  API: {
    AUTH: {
      SIGN_UP: '/api/auth/sign-up',
    },
    INTEGRATIONS: {
      WEBHOOK: {
        INDEX: '/api/integrations/webhook',
        REDIRECT_URL: '/api/integrations/webhook/redirect-url',
      },
    },
    GET_FORM: '/api/get-form',
    PUBLISH_FORM: '/api/publish-form',
    GET_FORMS: '/api/get-forms',
    CREATE_FORM: '/api/create-form',
    CREATE_RESPONSE: '/api/create-response',
    UPDATE_FORM_TITLE: '/api/update-form-title',
  },
}
