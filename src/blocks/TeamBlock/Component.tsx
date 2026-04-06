import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { TeamBlockClient } from './Component.client'
import type { TeamBlock as TeamBlockProps, Department, Team } from '@/payload-types'

export const TeamBlock: React.FC<
  TeamBlockProps & {
    disableInnerContainer?: boolean
  }
> = async (props) => {
  const { title, introText } = props
  const payload = await getPayload({ config: configPromise })

  // Fetch departments
  const departmentsRes = await payload.find({
    collection: 'departments',
    limit: 100,
    sort: 'id',
  })

  // Fetch team members
  const teamRes = await payload.find({
    collection: 'team',
    limit: 1000,
    sort: 'id',
  })

  // Group members by department
  const departmentsWithMembers = departmentsRes.docs.map((dept) => {
    const members = teamRes.docs.filter((member) => {
      if (typeof member.department === 'object' && member.department !== null) {
        return member.department.id === dept.id
      }
      return member.department === dept.id
    })

    return {
      ...dept,
      description: dept.description,
      members,
    }
  })

  return (
    <div className="bg-[#C6C6C633] pt-20 pb-30 gap-12">
      <TeamBlockClient
        departments={departmentsWithMembers as any}
        title={title || undefined}
        introText={introText || undefined}
      />
    </div>
  )
}
