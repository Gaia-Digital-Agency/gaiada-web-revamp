import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 1. Muat .env secara sinkron
dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function testEmail() {
  console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? 'Ditemukan' : 'TIDAK DITEMUKAN')

  if (!process.env.PAYLOAD_SECRET) {
    console.error('❌ Error: PAYLOAD_SECRET tidak ditemukan di .env')
    process.exit(1)
  }

  try {
    // 2. Import payload & config secara dinamis SETELAH dotenv dimuat
    const { getPayload } = await import('payload')
    const configModule = await import('../src/payload.config')
    const config = configModule.default

    console.log('Menginisialisasi Payload...')
    const payload = await getPayload({ config })

    console.log('Mengirim email percobaan ke:', process.env.SMTP_FROM_ADDRESS)

    await payload.sendEmail({
      to: process.env.SMTP_FROM_ADDRESS || 'test@example.com',
      subject: 'Test SMTP Gaiada - ' + new Date().toLocaleTimeString(),
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h1 style="color: #2ecc71;">Koneksi SMTP Berhasil!</h1>
          <p>Halo,</p>
          <p>Ini adalah email percobaan dari project <strong>Gaiada Web Revamp</strong>.</p>
          <p>Jika Anda menerima email ini, berarti konfigurasi SMTP Anda sudah benar.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">Waktu kirim: ${new Date().toLocaleString('id-ID')}</p>
        </div>
      `,
    })

    console.log('✅ Email berhasil dikirim!')
  } catch (error: any) {
    console.error('❌ Gagal:', error)
  }
  process.exit(0)
}

testEmail()
