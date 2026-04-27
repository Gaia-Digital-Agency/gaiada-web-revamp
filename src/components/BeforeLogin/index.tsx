'use client'
import React, { useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { renderToStaticMarkup } from 'react-dom/server'

const BeforeLogin: React.FC = () => {
  useEffect(() => {
    const injectToggle = () => {
      // Target both the password field and the password confirmation field if present
      const passwordInputs = document.querySelectorAll(
        'input[type="password"]',
      ) as NodeListOf<HTMLInputElement>

      passwordInputs.forEach((passwordInput) => {
        if (passwordInput && !passwordInput.dataset.hasToggle) {
          passwordInput.dataset.hasToggle = 'true'

          // Find the container (Payload 3.0 uses a div with class 'field-type password')
          const container = (passwordInput.closest('.field-type.password') ||
            passwordInput.parentElement) as HTMLElement | null

          if (container) {
            container.style.position = 'relative'

            const toggle = document.createElement('button')
            toggle.type = 'button'
            toggle.style.position = 'absolute'
            toggle.style.right = '12px'
            // Center vertically relative to the input field
            toggle.style.top = '50%'
            toggle.style.transform = 'translateY(-50%)'
            toggle.style.marginTop = '12px' // Adjustment for Payload label space
            toggle.style.background = 'transparent'
            toggle.style.border = 'none'
            toggle.style.cursor = 'pointer'
            toggle.style.display = 'flex'
            toggle.style.alignItems = 'center'
            toggle.style.justifyContent = 'center'
            toggle.style.zIndex = '10'
            toggle.style.padding = '4px'
            toggle.style.opacity = '0.6'
            toggle.style.transition = 'opacity 0.2s'

            const eyeIcon = renderToStaticMarkup(<Eye size={20} />)
            const eyeOffIcon = renderToStaticMarkup(<EyeOff size={20} />)

            toggle.innerHTML = eyeIcon

            // Hover effect
            toggle.onmouseenter = () => (toggle.style.opacity = '1')
            toggle.onmouseleave = () => (toggle.style.opacity = '0.6')

            // Adjust for standard Payload styles
            toggle.style.color = 'var(--theme-text)'

            toggle.onclick = (e) => {
              e.preventDefault()
              e.stopPropagation()
              if (passwordInput.type === 'password') {
                passwordInput.type = 'text'
                toggle.innerHTML = eyeOffIcon
              } else {
                passwordInput.type = 'password'
                toggle.innerHTML = eyeIcon
              }
            }

            container.appendChild(toggle)
          }
        }
      })
    }

    // Run immediately and then on an interval to catch dynamically rendered fields
    injectToggle()
    const interval = setInterval(injectToggle, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <p>
        <b>Welcome to your dashboard!</b>
        {' This is where site admins will log in to manage your website.'}
      </p>
    </div>
  )
}

export default BeforeLogin
