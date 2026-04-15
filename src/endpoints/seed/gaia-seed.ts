import type { Payload, PayloadRequest } from 'payload'

// Helper to create properly versioned Lexical rich text
const richText = (children: any[]) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

const paragraph = (text: string) => ({
  type: 'paragraph',
  children: [
    { type: 'text', text, version: 1, detail: 0, format: 0, mode: 'normal' as const, style: '' },
  ],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  version: 1,
})

const heading = (text: string, tag: 'h1' | 'h2' | 'h3' = 'h1') => ({
  type: 'heading',
  tag,
  children: [
    { type: 'text', text, version: 1, detail: 0, format: 0, mode: 'normal' as const, style: '' },
  ],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

export const seedGaia = async ({ payload, req }: { payload: Payload; req: PayloadRequest }) => {
  payload.logger.info('Seeding Gaia Digital Agency data...')

  // 1. Create Media
  const media = await payload.find({
    collection: 'media',
    limit: 1,
  })
  const mediaId = media.docs[0]?.id

  // 2. Create Departments
  const deptNames = [
    'Branding',
    'Design',
    'Marketing',
    'Ad & SEO',
    'Website',
    'Social Media',
    'Content Creation',
    'Consultation',
    'Administration',
  ]
  const depts = []
  for (const name of deptNames) {
    const dept = await payload.create({
      collection: 'departments',
      context: { disableRevalidate: true },
      data: {
        name,
        image: mediaId || 1, // Fallback to 1 if no media found, or handle as needed
        description: `Our ${name} department specializes in premium digital solutions.`,
      },
    })
    depts.push(dept)
  }

  // 3. Create Services (with individual page content)
  const serviceData = [
    {
      title: 'Branding',
      slug: 'branding',
      description: 'Professional branding services to define and elevate your brand identity.',
      pageContent:
        'We create cohesive brand identities that resonate with your target audience. From logo design to brand guidelines, our team ensures every touchpoint communicates your unique value proposition.',
    },
    {
      title: 'Design',
      slug: 'design',
      description: 'Creative design solutions that bring your vision to life across all media.',
      pageContent:
        'Our design team crafts stunning visuals for digital and print media. We blend aesthetics with functionality to create designs that captivate audiences and drive results.',
    },
    {
      title: 'Marketing',
      slug: 'marketing',
      description: 'Strategic marketing campaigns that drive growth and engagement.',
      pageContent:
        'We develop data-driven marketing strategies that connect with your audience at every stage of the customer journey. From market research to campaign execution, we deliver measurable results.',
    },
    {
      title: 'Ad & SEO',
      slug: 'ad-seo',
      description: 'Performance advertising and SEO to maximize your online visibility.',
      pageContent:
        'Our advertising and SEO experts optimize your digital presence for maximum visibility and conversions. We combine paid media strategies with organic search optimization for sustainable growth.',
    },
    {
      title: 'Website',
      slug: 'website',
      description: 'Custom website development built for performance and user experience.',
      pageContent:
        'We build modern, responsive websites that deliver exceptional user experiences. From e-commerce platforms to corporate sites, our development team creates solutions that scale with your business.',
    },
    {
      title: 'Social Media',
      slug: 'social-media',
      description: 'Social media management and strategy to grow your online community.',
      pageContent:
        'We manage and grow your social media presence across all major platforms. Our strategies focus on community building, content creation, and engagement to strengthen your brand online.',
    },
    {
      title: 'Content Creation',
      slug: 'content-creation',
      description: 'High-quality content that tells your story and engages your audience.',
      pageContent:
        'From video production to copywriting, we create compelling content that tells your brand story. Our content team produces materials that educate, entertain, and inspire action.',
    },
    {
      title: 'Consultation',
      slug: 'consultation',
      description: 'Expert digital consultation to guide your business transformation.',
      pageContent:
        'Our consultants bring years of industry experience to help you navigate the digital landscape. We provide actionable insights and strategic roadmaps tailored to your business goals.',
    },
    {
      title: 'Strategy',
      slug: 'strategy',
      description: 'Comprehensive digital strategy to align your business goals with execution.',
      pageContent:
        'We develop holistic digital strategies that align your business objectives with market opportunities. Our strategic planning process ensures every initiative contributes to your long-term success.',
    },
  ]
  for (const svc of serviceData) {
    await payload.create({
      collection: 'services',
      draft: false,
      context: { disableRevalidate: true },
      data: {
        title: svc.title,
        slug: svc.slug,
        _status: 'published',
        hero: {
          type: 'mediumImpact',
          richText: richText([heading(svc.title)]),
          media: mediaId || 1,
        },
        layout: [
          {
            blockType: 'servicesDetail',
            intro: {
              title: svc.title,
              description: svc.pageContent,
              image: mediaId || 1,
            },
            subServices: [],
          },
        ],
      },
    })
  }

  // 4. Create Scopes (Scope of Work)
  const scopeNames = [
    'UI/UX Design',
    'Web Development',
    'Mobile Development',
    'SEO Optimization',
    'Content Writing',
    'Social Media Management',
  ]
  const scopes = []
  for (const name of scopeNames) {
    const scope = await payload.create({
      collection: 'scopes',
      draft: false,
      context: { disableRevalidate: true },
      data: {
        title: name,
        slug: name
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, ''),
      },
    })
    scopes.push(scope)
  }

  for (let i = 1; i <= 5; i++) {
    await payload.create({
      collection: 'portfolio',
      draft: false,
      context: { disableRevalidate: true },
      data: {
        title: `Project ${i}`,
        slug: `project-${i}`,
        featuredImage: mediaId || 1,
        description: richText([
          paragraph(
            `A showcase of our premium work for Client ${i}, focused on digital excellence.`,
          ),
        ]),
        _status: 'published',
        hero: {
          type: 'mediumImpact',
          richText: richText([heading(`Project ${i}`)]),
          media: mediaId || 1,
        },
        scopes: [scopes[i % scopes.length].id, scopes[(i + 1) % scopes.length].id],
      },
    })
  }

  // 6. Create Team Members
  const roles = ['CEO', 'Creative Director', 'Lead Developer', 'Marketing Head', 'Content Manager']
  for (let i = 0; i < 5; i++) {
    await payload.create({
      collection: 'team',
      context: { disableRevalidate: true },
      data: {
        name: `Team Member ${i + 1}`,
        role: roles[i],
        image: mediaId || 1,
        department: depts[i % depts.length].id,
      },
    })
  }

  // 7. Create Forms
  const consultationForm = await payload.create({
    collection: 'forms',
    context: { disableRevalidate: true },
    data: {
      title: 'Consultation Form',
      fields: [
        { name: 'name', label: 'Name', required: true, blockType: 'text' as const },
        { name: 'email', label: 'Email', required: true, blockType: 'email' as const },
        { name: 'message', label: 'Message', required: true, blockType: 'textarea' as const },
        {
          siteKey: '10000000-ffff-ffff-ffff-000000000001',
          secretKey: '0x0000000000000000000000000000000000000000',
          blockType: 'hCaptcha' as const,
        },
      ],
      confirmationType: 'message' as const,
      confirmationMessage: richText([paragraph('Thank you for your inquiry!')]),
      submitButtonLabel: 'Submit',
    },
  })

  const careerForm = await payload.create({
    collection: 'forms',
    context: { disableRevalidate: true },
    data: {
      title: 'Career Application Form',
      fields: [
        { name: 'name', label: 'Name', required: true, blockType: 'text' as const },
        { name: 'email', label: 'Email', required: true, blockType: 'email' as const },
        {
          name: 'department',
          label: 'Department',
          required: true,
          blockType: 'select' as const,
          options: deptNames.map((name) => ({ label: name, value: name.toLowerCase() })),
        },
        { name: 'resume', label: 'Resume (PDF)', required: true, blockType: 'file' as const },
        { name: 'message', label: 'Message', required: true, blockType: 'textarea' as const },
      ],
      confirmationType: 'message' as const,
      confirmationMessage: richText([paragraph('Application received! We will contact you soon.')]),
      submitButtonLabel: 'Apply Now',
    },
  })

  // 8. Create Pages
  await payload.create({
    collection: 'pages',
    draft: false,
    context: { disableRevalidate: true },
    data: {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      hero: {
        type: 'highImpact',
        richText: richText([heading('Elevate Your Digital Brand')]),
        media: mediaId || 1,
      },
      layout: [
        {
          blockType: 'contentMedia',
          mediaPosition: 'right',
          richText: richText([
            paragraph(
              'Welcome to Gaia Digital Agency. We transform digital ideas into premium experiences.',
            ),
          ]),
          media: mediaId || 1,
        },
        {
          blockType: 'contentMedia',
          mediaPosition: 'left',
          richText: richText([
            paragraph(
              'Our features include cutting-edge design and strategic marketing solutions.',
            ),
          ]),
          media: mediaId || 1,
        },
        {
          blockType: 'contentMedia',
          mediaPosition: 'right',
          richText: richText([
            paragraph(
              'Our writing team produces high-quality content that resonates with your audience and drives engagement.',
            ),
          ]),
          media: mediaId || 1,
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    draft: false,
    context: { disableRevalidate: true },
    data: {
      title: 'Services',
      slug: 'services',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: richText([heading('Our Services')]),
        media: mediaId || 1,
      },
      layout: [
        {
          blockType: 'portfolioBlock',
          title: 'Premium Solutions',
          description: 'We provide a wide range of digital services to help your business grow.',
        },
        {
          blockType: 'formBlock',
          enableIntro: true,
          introContent: richText([heading('Free Consultation', 'h2')]),
          form: consultationForm.id,
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    draft: false,
    context: { disableRevalidate: true },
    data: {
      title: 'Portfolio',
      slug: 'portfolio',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: richText([heading('Our Portfolio')]),
        media: mediaId || 1,
      },
      layout: [
        {
          blockType: 'portfolioBlock',
          title: 'Featured Projects',
          description: 'Take a look at some of our latest work.',
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    draft: false,
    context: { disableRevalidate: true },
    data: {
      title: 'About Us',
      slug: 'about',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: richText([heading('About Gaia')]),
        media: mediaId || 1,
      },
      layout: [
        {
          blockType: 'aboutBlock',
          title: 'Who We Are',
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    draft: false,
    context: { disableRevalidate: true },
    data: {
      title: 'Careers',
      slug: 'careers',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: richText([heading('Join Our Team')]),
        media: mediaId || 1,
      },
      layout: [
        {
          blockType: 'careerBlock',
          title: 'Departments',
          description: 'We are always looking for talented individuals to join our growing team.',
          form: careerForm.id,
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    draft: false,
    context: { disableRevalidate: true },
    data: {
      title: 'Contact Us',
      slug: 'contact',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: richText([heading('Get in Touch')]),
      },
      layout: [
        {
          blockType: 'formBlock',
          enableIntro: true,
          introContent: richText([heading('Contact Form', 'h2')]),
          form: consultationForm.id,
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    draft: false,
    context: { disableRevalidate: true },
    data: {
      title: 'Blog',
      slug: 'blog',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        richText: richText([heading('Our Blog')]),
        media: mediaId || 1,
      },
      layout: [
        {
          blockType: 'archive',
          populateBy: 'collection',
          limit: 10,
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    draft: false,
    context: { disableRevalidate: true },
    data: {
      title: 'Coming Soon',
      slug: 'placeholder',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: richText([heading('Placeholder Page')]),
      },
      layout: [
        {
          blockType: 'content',
          columns: [
            {
              size: 'full',
              richText: richText([paragraph('This page is a placeholder for future content.')]),
            },
          ],
        },
      ],
    },
  })

  // 9. Update Globals
  await payload.updateGlobal({
    slug: 'settings',
    context: { disableRevalidate: true },
    data: {
      whatsappNumber: '+628123894471',
      contactEmail: 'info@gaiada.com',
      address: 'Jl. Raya Mas No.111, Mas, Kecamatan Ubud, Kabupaten Gianyar, Bali 80571',
      googleMapsEmbed:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7891.02588149395!2d115.26729852580397!3d-8.546573089513863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23d4965bc26ad%3A0x7980cb2827360637!2sGaia%20Digital%20Agency!5e0!3m2!1sen!2sid!4v1775714212493!5m2!1sen!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      socialLinks: [
        { platform: 'facebook', url: 'https://www.facebook.com/gaiadigitalagency' },
        { platform: 'instagram', url: 'https://www.instagram.com/gaiadigitalagency/' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/company/gaia-digital-agency/' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: {
      navItems: [
        {
          link: { type: 'custom', url: '/services', label: 'Services' },
          subItems: serviceData.map((svc) => ({
            link: { type: 'custom' as const, url: `/services/${svc.slug}`, label: svc.title },
          })),
        },
        { link: { type: 'custom', url: '/portfolio', label: 'Portfolio' } },
        { link: { type: 'custom', url: '/about', label: 'About' } },
        { link: { type: 'custom', url: '/careers', label: 'Careers' } },
        { link: { type: 'custom', url: '/blog', label: 'Blog' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: {
      copyright: 'Copyright @2026',
      developedBy: 'Developed by Gaia Digital Agency',
      navItems: [
        { link: { type: 'custom', url: '/services', label: 'Services' } },
        { link: { type: 'custom', url: '/portfolio', label: 'Portfolio' } },
        { link: { type: 'custom', url: '/about', label: 'About' } },
        { link: { type: 'custom', url: '/careers', label: 'Careers' } },
        { link: { type: 'custom', url: '/blog', label: 'Blog' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    },
  })

  payload.logger.info('Gaia Digital Agency seeding completed successfully!')
}
