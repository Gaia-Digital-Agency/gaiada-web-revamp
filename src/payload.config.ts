import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Services } from './collections/Services/index'
import { Portfolio } from './collections/Portfolio'
import { Scopes } from './collections/Scopes'
import { Departments } from './collections/Departments'
import { Team } from './collections/Team'
import { FormUploads } from './collections/FormUploads'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { Settings } from './Settings/config'
import { PostOrdering } from './PostOrdering/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const smtpPort = Number(process.env.SMTP_PORT || 1025)
const smtpAuth =
  process.env.SMTP_USER && process.env.SMTP_PASS
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined

// Main Payload CMS configuration defining collections, globals, plugins, and database settings
export default buildConfig({
  serverURL: getServerSideURL(),
  admin: {
    meta: {
      icons: [
        { rel: 'icon', type: 'image/png', url: '/admin-favicon.png' },
      ],
    },
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // Jika environment adalah development maka akan auto-push schema changes,
    // jika tidak maka tidak akan auto-push schema changes
    push: process.env.ENVIRONMENT === 'development' ? true : false,
  }),
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Departments,
    Team,
    Services,
    Portfolio,
    Scopes,
    FormUploads,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, Settings, PostOrdering],
  plugins,
  email: nodemailerAdapter({
    defaultFromName: process.env.SMTP_FROM_NAME || 'Gaiada Local Test',
    defaultFromAddress: process.env.SMTP_FROM_ADDRESS || 'test@gaiada.local',
    skipVerify: true,
    transportOptions: {
      host: process.env.SMTP_HOST || '127.0.0.1',
      port: smtpPort,
      secure: process.env.SMTP_SECURE === 'true',
      auth: smtpAuth,
    },
  }),
  upload: {
    abortOnLimit: true,
    responseOnLimit: 'File size limit has been reached (max 25MB)',
    limits: {
      fileSize: 25 * 1024 * 1024, // 25MB
    },
  },
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
