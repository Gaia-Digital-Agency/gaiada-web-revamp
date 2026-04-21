import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { NonHomepageHero } from '@/heros/NonHomepageHero'
import { HomepageHero } from '@/heros/HomepageHero'
import { BlogHero } from '@/heros/BlogHero'
import { CareersHero } from '@/heros/CareersHero'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  nonHomepageHero: NonHomepageHero,
  homepageHero: HomepageHero,
  blogHero: BlogHero,
  careersHero: CareersHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...(props as any)} />
}
