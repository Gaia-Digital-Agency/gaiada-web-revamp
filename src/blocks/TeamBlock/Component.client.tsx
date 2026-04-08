'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Media } from '@/components/Media'
import type { Department, Team } from '@/payload-types'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { AppButton } from '@/components/common/AppButton'
import { useGSAPSplitTextReveal } from '@/hooks/useGSAPSplitTextReveal'

type Props = {
  departments: (Department & { members: Team[] })[]
  title?: string
  introText?: string
}

const PER_PAGE = 6

export const TeamBlockClient: React.FC<Props> = ({ departments, title, introText }) => {
  const [activeDept, setActiveDept] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState<Record<number, number>>({})
  const trackRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const introTextRef = useRef<HTMLParagraphElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useGSAPSplitTextReveal(titleRef, {}, [title])
  useGSAPSplitTextReveal(introTextRef, {}, [introText])

  // Initialize current pages
  useEffect(() => {
    const initialPages: Record<number, number> = {}
    departments.forEach((_, i) => {
      initialPages[i] = 0
    })
    setCurrentPage(initialPages)
  }, [departments])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    isDragging.current = true
    startX.current = e.pageX - trackRef.current.offsetLeft
    scrollLeft.current = trackRef.current.scrollLeft
    trackRef.current.style.cursor = 'grabbing'
  }

  const handleMouseUp = () => {
    isDragging.current = false
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab'
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }

  const goToPage = (deptIdx: number, newPage: number, totalPages: number) => {
    if (newPage < 0 || newPage >= totalPages) return
    setCurrentPage((prev) => ({ ...prev, [deptIdx]: newPage }))
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 overflow-hidden">
      <div className="flex flex-col mb-[48px]">
        <h1 className="text-center" ref={titleRef}>
          {title}
        </h1>
        <div className="flex items-center w-[419px] h-[36px] mx-auto justify-center">
          <p ref={introTextRef} className="font-brand font-normal text-center">
            {introText}
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex gap-4 overflow-x-auto overflow-y-visible cursor-grab select-none no-scrollbar"
        style={{
          width: 'calc(100% + 48px)',
          marginRight: '-24px',
          paddingRight: '48px',
        }}
      >
        {departments.map((dept, i) => {
          const members = dept.members || []
          const totalPages = Math.ceil(members.length / PER_PAGE) || 1
          const currPage = currentPage[i] || 0
          const isActive = activeDept === i
          const currentMembers = members.slice(currPage * PER_PAGE, (currPage + 1) * PER_PAGE)

          return (
            <div
              key={dept.id}
              onMouseEnter={() => setActiveDept(i)}
              onMouseLeave={() => {
                setActiveDept(null)
                setCurrentPage((prev) => ({ ...prev, [i]: 0 }))
              }}
              className={`relative shrink-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)]
                ${isActive ? 'w-[800px]' : 'w-[227px]'}
                ${activeDept !== null && !isActive ? 'w-[118px]' : ''}
              `}
            >
              {/* Card Shell */}
              <div
                className={`relative h-[420px] overflow-hidden transition-all duration-300 outline outline-1
                  ${isActive ? 'shadow-[0_24px_64px_rgba(255,194,44,0.15)] outline-[#ffc22c]/20' : 'outline-white/10'}
                `}
              >
                {/* Face A - Dept Info */}
                <div
                  className={`absolute inset-0 transition-all duration-300 ${isActive ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'}`}
                >
                  {dept.image && typeof dept.image !== 'string' && (
                    <div className="absolute inset-0">
                      <Media
                        resource={dept.image}
                        fill
                        imgClassName="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ffc22c] via-[#ffc22c]/80 via-20% to-transparent to-60%" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-brand text-[30px] font-bold leading-[110%] tracking-[-1%] text-white capitalize">
                      {dept.name}
                    </p>
                  </div>
                </div>

                {/* Face B - Member Grid */}
                <div
                  id={`dept-${dept.id}`}
                  className={`absolute inset-0 bg-[#111] flex flex-col transition-opacity duration-300 delay-75 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                >
                  <div className="flex-1 relative overflow-hidden">
                    {currentMembers.length === 1 ? (
                      <div className="h-full bg-[#111]">
                        {currentMembers.map((member) => (
                          <div
                            key={member.id}
                            className="relative w-full h-full group overflow-hidden bg-[#1a1a1a]"
                          >
                            {member.image && typeof member.image !== 'string' && (
                              <Media
                                resource={member.image}
                                fill
                                imgClassName="object-cover transition-transform duration-500 group-hover:scale-110 object-center"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                              <p className="font-brand text-[32px] font-bold leading-[120%] tracking-[1%] text-center text-white capitalize drop-shadow-lg">
                                {member.name}
                              </p>
                              <p className="font-brand text-[18px] font-normal leading-[120%] tracking-[1%] text-center text-white/80 capitalize">
                                {member.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        className="absolute inset-0 grid gap-px transition-all duration-300"
                        style={{
                          gridTemplateColumns: `repeat(${currentMembers.length <= 4 ? currentMembers.length : 3}, 1fr)`,
                          gridTemplateRows: `repeat(${currentMembers.length <= 4 ? 1 : 2}, 1fr)`,
                        }}
                      >
                        {currentMembers.map((member) => (
                          <div
                            key={member.id}
                            className="relative group overflow-hidden bg-[#1a1a1a]"
                          >
                            {member.image && typeof member.image !== 'string' && (
                              <Media
                                resource={member.image}
                                fill
                                imgClassName="object-cover transition-transform duration-500 group-hover:scale-110 object-top"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <p className="font-brand text-[16px] font-bold leading-[160%] tracking-[1%] text-center text-white">
                                {member.name}
                              </p>
                              <p className="font-brand text-[12px] font-normal leading-[120%] tracking-[1%] text-center text-white">
                                {member.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {totalPages > 1 && (
                    <div className="h-9 shrink-0 flex items-center justify-between px-3 bg-black/45 border-t border-white/10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          goToPage(i, currPage - 1, totalPages)
                        }}
                        disabled={currPage === 0}
                        className="p-1 text-white/50 hover:text-[#ffc22c] disabled:opacity-20 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="flex gap-1.5 items-center">
                        {Array.from({ length: totalPages }).map((_, p) => (
                          <div
                            key={p}
                            className={`h-1 transition-all duration-300 ${p === currPage ? 'w-4 bg-[#ffc22c]' : 'w-1.5 bg-white/20'}`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          goToPage(i, currPage + 1, totalPages)
                        }}
                        disabled={currPage === totalPages - 1}
                        className="p-1 text-white/50 hover:text-[#ffc22c] disabled:opacity-20 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Description Below Card */}
              <div
                className={`transition-all duration-500 grid mb-4 ${
                  isActive ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="font-brand text-[24px] font-semibold leading-[140%] tracking-[0%] text-[#1A1A1B] capitalize">
                    {dept.name}
                  </p>
                  {dept.description && (
                    <p className="font-brand text-[16px] font-normal leading-[160%] tracking-[1%] text-[#1A1A1B]">
                      {dept.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-center mt-[48px]">
        <AppButton label="Join Our Team" href="/careers" variant="default" icon="arrow" />
      </div>
    </div>
  )
}
