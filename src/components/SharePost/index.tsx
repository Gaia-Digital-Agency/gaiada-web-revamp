'use client'

import React, { useState } from 'react'
import { FacebookShareButton, LinkedinShareButton, XShareButton } from 'react-share'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons'

export const SharePost = () => {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex items-center gap-3 mt-8 pt-8 md:mt-12 md:pt-12 border-t border-solid border-[var(--gda-brand-earth)]">
      <span className="text-sm font-medium text-gray-600 mr-2">Share:</span>

      <FacebookShareButton url={url}>
        <div className="p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition flex items-center justify-center w-10 h-10">
          <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
        </div>
      </FacebookShareButton>

      <XShareButton url={url}>
        <div className="p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition flex items-center justify-center w-10 h-10">
          <FontAwesomeIcon icon={faXTwitter} className="w-4 h-4" />
        </div>
      </XShareButton>

      <LinkedinShareButton url={url}>
        <div className="p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition flex items-center justify-center w-10 h-10">
          <FontAwesomeIcon icon={faLinkedinIn} className="w-4 h-4" />
        </div>
      </LinkedinShareButton>

      <button
        onClick={copyToClipboard}
        className="p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition relative flex items-center justify-center w-10 h-10"
        aria-label="Copy URL"
      >
        <FontAwesomeIcon
          icon={copied ? faCheck : faCopy}
          className={`w-4 h-4 ${copied ? 'text-green-600' : ''}`}
        />
      </button>
    </div>
  )
}
