export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  CONTINUE: '/continue',
  EDIT: '/edit',
  PREVIEW: '/preview',
  SETTINGS: '/settings',
  API: {
    AUTH: {
      SIGN_UP: '/api/auth/sign-up',
    },
    INTEGRATIONS: {
      WEBHOOK: {
        GET_URLS: '/api/integrations/webhook/get-urls',
        UPDATE_URLS: '/api/integrations/webhook/update-urls',
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
