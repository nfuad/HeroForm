import { ROUTES } from '@constants/routes'

type Params = {
  isNewUser: boolean
  uid: string
  accessToken?: string
}
export const saveUser = async ({ isNewUser, uid, accessToken }: Params) => {
  // signing up for the first time ever
  if (isNewUser) {
    const response = await fetch(ROUTES.API.AUTH.SIGN_UP, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid,
        accessToken,
      }),
    })

    if (!response.ok) {
      console.log(await response.json())
      // handle error here
      throw new Error('Auth error')
    }
  }
}
