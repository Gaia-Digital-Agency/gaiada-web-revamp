import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { FormBlock } from '../Form/Component'
import { Media } from '@/components/Media'

// Type definition for the CareerBlock component properties
export type CareerBlockType = {
  blockType: 'careerBlock'
  title?: string
  description?: string
  form: any
}

// Component that renders the Career section with departments, team members, and an inquiry form
export const CareerBlock: React.FC<CareerBlockType> = async ({
  title,
  description,
  form,
}) => {
  const payload = await getPayload({ config: configPromise })
  const departments = await payload.find({
    collection: 'departments',
    limit: 100,
    sort: 'name',
  })

  const teamMembers = await payload.find({
    collection: 'team',
    limit: 100,
    depth: 1,
  })

  return (
    <div className="container">
      <div className="max-w-2xl mb-12">
        {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
        {description && <p className="text-lg text-muted-foreground">{description}</p>}
      </div>

      <div className="flex flex-col gap-16 mb-20">
        {departments.docs.map((dept: any, i: number) => {
          const deptTeam = teamMembers.docs.filter((member: any) => 
            (typeof member.department === 'object' ? member.department.id : member.department) === dept.id
          )

          return (
            <div key={i} className="flex flex-col gap-8">
              <div className="border-b border-border pb-4">
                <h3 className="text-2xl font-bold">{dept.name}</h3>
                {dept.description && <p className="text-muted-foreground mt-2">{dept.description}</p>}
              </div>
              
              {deptTeam.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {deptTeam.map((member: any, j: number) => (
                    <div key={j} className="flex flex-col gap-3">
                      <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                        <Media resource={member.image} fill className="object-cover" />
                      </div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No team members in this department yet.</p>
              )}
            </div>
          )
        })}
      </div>

      <div className="max-w-2xl mx-auto border border-border p-8 rounded-xl bg-card">
        <h3 className="text-2xl font-semibold mb-6 text-center">Inquire / Apply for a Role</h3>
        <FormBlock
          enableIntro={false}
          form={form}
        />
      </div>
    </div>
  )
}
