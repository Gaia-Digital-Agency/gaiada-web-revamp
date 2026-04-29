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
        // Buat URL lengkap untuk halaman reset password
        const resetURL = `${serverURL}/admin/reset/${args?.token}`

        // Anda bisa menggunakan HTML bebas di sini (tambahkan inline CSS jika perlu)
        return `
           <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
             <h2>Halo ${args?.user?.name || 'Admin GaiaDa'},</h2>
             <p>Seseorang baru saja meminta untuk mereset kata sandi akun Anda di Website GaiaDa.</p>
             <p>Jika ini bukan Anda, silakan abaikan email ini.</p>
             <p>Untuk mereset kata sandi Anda, silakan klik tombol di bawah ini:</p>
             <a href="${resetURL}" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px;">Reset Kata Sandi</a>
             <p>Atau salin tautan berikut ke browser Anda:<br>
             <a href="${resetURL}">${resetURL}</a></p>
           </div>
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
