import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { revalidateSettings } from './hooks/revalidateSettings'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateSettings],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'whatsappNumber',
              type: 'text',
              label: 'WhatsApp Number',
              admin: {
                description: 'Enter the site-wide WhatsApp number (e.g., +1234567890)',
              },
            },
            {
              name: 'contactEmail',
              type: 'text',
              label: 'Contact Email',
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Media Links',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'YouTube', value: 'youtube' },
                  ],
                  required: true,
                },
                {
                  name: 'placeholder',
                  type: 'text',
                  label: 'Placeholder Text',
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Icon',
                },
              ],
            },
          ],
        },
        {
          label: 'SMTP Configuration',
          fields: [
            {
              name: 'smtpHost',
              type: 'text',
              label: 'SMTP Host',
              admin: {
                placeholder: 'smtp.gmail.com',
              },
            },
            {
              name: 'smtpPort',
              type: 'number',
              label: 'SMTP Port',
              admin: {
                placeholder: '587',
              },
            },
            {
              name: 'smtpUser',
              type: 'text',
              label: 'SMTP User (Email)',
            },
            {
              name: 'smtpPass',
              type: 'password',
              label: 'SMTP Password',
            },
            {
              name: 'smtpSecure',
              type: 'checkbox',
              label: 'Use TLS/SSL',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'Sender Details',
          fields: [
            {
              name: 'fromName',
              type: 'text',
              label: 'Sender Name',
              admin: {
                placeholder: 'Gaiada Admin',
              },
            },
            {
              name: 'fromEmail',
              type: 'text',
              label: 'Sender Email Address',
              admin: {
                placeholder: 'no-reply@gaiada.com',
              },
            },
          ],
        },
      ],
    },
  ],
}
