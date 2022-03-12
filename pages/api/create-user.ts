import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  try {
    const { refresh_token, name, email, spreadsheet_id } = req.body
    console.log({ refresh_token, name, email, spreadsheet_id })
    const user = await prisma.user.create({
      data: {
        refresh_token,
        name,
        email,
        spreadsheet_id,
      },
    })

    return res.status(200).json({ user })
  } catch (error) {
    console.log('there was an error', error)
    console.log({ email: req.query.email })
  }
}
