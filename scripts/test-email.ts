import { getPayload } from 'payload'
import config from '../src/payload.config'
import dotenv from 'dotenv'

dotenv.config()

async function testEmail() {
  const payload = await getPayload({ config })

  console.log('Mengirim email percobaan...')

  try {
    await payload.sendEmail({
      to: 'your-email@example.com', // Ganti dengan email Anda
      subject: 'Test SMTP Gaiada',
      html: '<h1>Berhasil!</h1><p>SMTP project Gaiada sudah berfungsi dengan baik.</p>',
    })
    console.log('✅ Email berhasil dikirim!')
  } catch (error) {
    console.error('❌ Gagal mengirim email:', error)
  }

  process.exit(0)
}

testEmail()
