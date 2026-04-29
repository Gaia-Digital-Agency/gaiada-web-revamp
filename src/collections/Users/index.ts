import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: (args) => {
        const serverURL =
          args?.req?.payload.config.serverURL ||
          process.env.NEXT_PUBLIC_SERVER_URL ||
          'http://localhost:3000'
        const resetURL = `${serverURL}/admin/reset/${args?.token}`

        return `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>Reset Password GaiaDa</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f2f2f2; font-family: 'Roboto', Arial, sans-serif;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 40px 0 40px 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #f9f9f9; border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                      <!-- Header -->
                      <tr>
                        <td align="center" style="background-color: #1a1a1b; padding: 40px 0 40px 0;">
                          <h1 style="color: #ffc22c; font-family: 'Avenir Next', Arial, sans-serif; font-size: 32px; font-weight: 700; letter-spacing: -0.56px; margin: 0; text-transform: uppercase;">GaiaDa</h1>
                        </td>
                      </tr>
                      <!-- Content -->
                      <tr>
                        <td style="padding: 48px 40px 48px 40px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="color: #1a1a1b; font-family: 'Avenir Next', Arial, sans-serif; font-size: 28px; font-weight: 700; line-height: 1.1em; letter-spacing: -0.56px;">
                                Halo ${args?.user?.name || 'Admin GaiaDa'},
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 24px 0 0 0; color: #1a1a1b; font-size: 16px; line-height: 1.6em;">
                                Kami menerima permintaan untuk mereset kata sandi akun Anda di Website GaiaDa. Jika Anda tidak merasa melakukan permintaan ini, silakan abaikan email ini.
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 24px 0 0 0; color: #1a1a1b; font-size: 16px; line-height: 1.6em;">
                                Untuk mereset kata sandi Anda, silakan klik tombol di bawah ini:
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="padding: 20px 0 20px 0;">
                                <a href="${resetURL}" style="background-color: #1a1a1b; color: #f9f9f9; display: inline-block; padding: 20px 32px; text-decoration: none; border-radius: 4px; font-family: 'Avenir Next', Arial, sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">Reset Kata Sandi</a>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 40px 0 0 0; border-top: 1px solid #c6c6c6; color: #78716c; font-size: 13px; line-height: 1.5em;">
                                Jika tombol di atas tidak berfungsi, silakan salin dan tempel tautan berikut ke browser Anda:<br/>
                                <a href="${resetURL}" style="color: #1a1a1b; text-decoration: underline;">${resetURL}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #f2f2f2; padding: 30px 40px 30px 40px; text-align: center; color: #78716c; font-size: 12px; font-family: 'Roboto', Arial, sans-serif;">
                          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Gaia Digital Agency. All rights reserved.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `
      },
      generateEmailSubject: () => {
        return 'Permintaan Reset Kata Sandi - GaiaDa Web Admin'
      },
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: true,
}
