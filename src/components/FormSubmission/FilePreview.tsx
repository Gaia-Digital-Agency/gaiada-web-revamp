'use client'
import React from 'react'
import { useField } from '@payloadcms/ui'
import { Button } from '@payloadcms/ui'

const FilePreview: React.FC<{ path?: string }> = ({ path }) => {
  const { value } = useField<string>({ path })

  if (typeof value !== 'string' || (!value.includes('/api/form-uploads/') && !value.includes('/form-uploads/'))) {
    return null
  }

  return (
    <div style={{ marginTop: '8px' }}>
      <Button
        buttonStyle="secondary"
        el="link"
        newTab
        size="small"
        to={value}
      >
        View Uploaded File
      </Button>
    </div>
  )
}

export default FilePreview
