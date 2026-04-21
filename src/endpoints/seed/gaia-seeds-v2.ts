import type { Payload, PayloadRequest } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Department, Scope, Service, Post } from '@/payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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

export const seedGaiaV2 = async ({ payload, req }: { payload: Payload; req: PayloadRequest }) => {
  payload.logger.info('Seeding Gaia Digital Agency V2 data...')

  // 12. Contact Form
  const contactUsForm = await payload.create({
    collection: 'forms',
    context: { disableRevalidate: true },
    data: {
      title: 'Contact Us',
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

  // 1. Create/Ensure Media exists
  let mediaId: string | number
  const existingMedia = await payload.find({
    collection: 'media',
    limit: 1,
  })

  if (existingMedia.docs.length > 0) {
    mediaId = existingMedia.docs[0].id
  } else {
    payload.logger.info('No media found, creating a placeholder image...')
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
      )
      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: 'Gaia Placeholder',
        },
        file: {
          name: 'placeholder.webp',
          data: buffer,
          mimetype: 'image/webp',
          size: buffer.byteLength,
        },
      })
      mediaId = mediaDoc.id
    } catch (error) {
      payload.logger.error('Failed to create placeholder media. Seeding might fail.')
      throw error
    }
  }

  // 2. Create Departments
  const departmentData = [
    {
      name: 'Website Development',
      description: 'Building high-performance and scalable web solutions.',
    },
    {
      name: 'Website Maintenance',
      description: 'Ensuring your website remains secure, up-to-date, and running smoothly.',
    },
    { name: 'Management', description: 'Overseeing operations and ensuring project excellence.' },
    { name: 'Owner', description: 'Visionary leadership driving the agency forward.' },
    { name: 'HR', description: 'Nurturing talent and building a strong company culture.' },
    {
      name: 'Social Media Specialist',
      description: 'Engaging audiences and building brand presence across social platforms.',
    },
    {
      name: 'Graphic Design',
      description: 'Creating visually compelling designs that communicate your brand story.',
    },
    {
      name: 'Video Editor',
      description: 'Crafting engaging video content through expert editing and storytelling.',
    },
    {
      name: 'Videographer',
      description: 'Capturing high-quality visual content to bring your brand to life.',
    },
  ]

  const departments: Department[] = []
  for (const dept of departmentData) {
    const createdDept = await payload.create({
      collection: 'departments',
      data: {
        name: dept.name,
        description: dept.description,
        image: mediaId,
      },
    })
    departments.push(createdDept)
  }

  // 3. Create Scopes (Scope of Work)
  const scopeData = [
    'Brand Identity',
    'Market Research',
    'UX Strategy',
    'UI Design',
    'Graphic Design',
    'Motion Graphics',
    'SEO',
    'Social Media Management',
    'Paid Advertising',
    'Web Development',
    'Mobile App Development',
    'E-commerce Solutions',
  ]
  const scopes: Scope[] = []
  for (const title of scopeData) {
    const scope = await payload.create({
      collection: 'scopes',
      data: {
        title,
        slug: title
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]/g, ''),
      },
    })
    scopes.push(scope)
  }

  // 4. Create Services
  const serviceData = [
    {
      title: 'Branding',
      slug: 'branding',
      pageContent:
        'We define the essence of your brand, creating a strategic foundation that guides every interaction and ensures long-term market relevance.',
      introTitle: 'Transforming Identities into Legacies',
      introDesc:
        "Our strategic approach blends deep market analysis with creative intuition to build brands that don't just exist, but lead. We uncover your unique value proposition and translate it into a compelling narrative.",
      subServices: [
        {
          title: 'Brand Audit',
          description:
            'Exhaustive analysis of your current brand positioning and market perception.',
          image: mediaId,
        },
        {
          title: 'Visual Identity',
          description:
            'Comprehensive design systems including logos, typography, and color palettes.',
          image: mediaId,
        },
      ],
    },
    {
      title: 'Design',
      slug: 'design',
      pageContent:
        'Our creative studio pushes the boundaries of design to deliver experiences that are both beautiful and functional, ensuring your brand stands out.',
      introTitle: 'Designing for Impact and Emotion',
      introDesc:
        "We believe design is more than just aesthetics; it's a powerful tool for communication and conversion. Our team crafts bespoke visual solutions that resonate deeply with your target audience.",
      subServices: [
        {
          title: 'UI/UX Design',
          description:
            'User-centric interfaces designed for seamless navigation and maximum engagement.',
          image: mediaId,
        },
        {
          title: 'Creative Direction',
          description: "Holistic vision for your brand's visual storytelling across all platforms.",
          image: mediaId,
        },
      ],
    },
    {
      title: 'Marketing',
      slug: 'marketing',
      pageContent:
        "We amplify your brand's voice through targeted digital strategies that drive traffic, engagement, and measurable business growth.",
      introTitle: 'Growth-Driven Marketing Solutions',
      introDesc:
        "In an ever-evolving digital landscape, we stay ahead of the curve with data-backed marketing strategies. We don't just reach audiences; we build lasting connections that convert.",
      subServices: [
        {
          title: 'Market Research',
          description: 'Deep dives into consumer behavior and market trends to inform strategy.',
          image: mediaId,
        },
        {
          title: 'Content Strategy',
          description:
            'Compelling storytelling that educates, entertains, and inspires your audience.',
          image: mediaId,
        },
      ],
    },
    {
      title: 'Ads & SEO',
      slug: 'ads-seo',
      pageContent:
        'We maximize your online visibility and ROI through performance-driven advertising and search engine optimization.',
      introTitle: 'Visibility That Drives Results',
      introDesc:
        'Our performance marketing team uses data-driven insights to place your brand in front of the right audience at the right time, ensuring maximum impact and conversion.',
      subServices: [
        {
          title: 'SEO Optimization',
          description:
            'Data-driven techniques to boost your visibility and rank higher in search results.',
          image: mediaId,
        },
        {
          title: 'Paid Advertising',
          description:
            'Targeted campaigns across search engines and social platforms for immediate ROI.',
          image: mediaId,
        },
      ],
    },
    {
      title: 'Website',
      slug: 'website',
      pageContent:
        'We build high-performance, scalable digital products using the latest technologies, ensuring a flawless experience on every device.',
      introTitle: 'Engineering the Future of Digital',
      introDesc:
        'Our development team combines technical excellence with a focus on user experience. We build robust solutions that are fast, secure, and ready to scale with your business.',
      subServices: [
        {
          title: 'Custom Web Apps',
          description: 'Tailor-made web solutions built for performance and security.',
          image: mediaId,
        },
        {
          title: 'E-commerce Solutions',
          description: 'Seamless shopping experiences designed for conversion and reliability.',
          image: mediaId,
        },
      ],
    },
    {
      title: 'Social Media',
      slug: 'social-media',
      pageContent:
        'We engage your community and build brand loyalty through strategic social media management and creative storytelling.',
      introTitle: 'Connecting Brands with Communities',
      introDesc:
        'We turn followers into fans. Our social media strategies focus on building authentic connections through engaging content and proactive community management.',
      subServices: [
        {
          title: 'Community Management',
          description: 'Proactive engagement and relationship building with your online audience.',
          image: mediaId,
        },
        {
          title: 'Social Strategy',
          description: 'Comprehensive roadmaps for multi-platform social media success.',
          image: mediaId,
        },
      ],
    },
    {
      title: 'Content Creation',
      slug: 'content-creation',
      pageContent:
        'We produce high-quality, impactful content that tells your brand story and captivates your audience across all platforms.',
      introTitle: 'Stories That Inspire Action',
      introDesc:
        'From stunning visuals to compelling copy, our creative team produces content that resonates with your audience and drives engagement across every channel.',
      subServices: [
        {
          title: 'Video Production',
          description: 'High-quality video content from concept to final edit.',
          image: mediaId,
        },
        {
          title: 'Copywriting',
          description: "Persuasive and engaging copy that speaks your brand's voice.",
          image: mediaId,
        },
      ],
    },
  ]

  const services: Service[] = []
  for (const svc of serviceData) {
    const createdSvc = await payload.create({
      collection: 'services',
      data: {
        title: svc.title,
        slug: svc.slug,
        _status: 'published',
        hero: {
          type: 'nonHomepageHero',
          title: svc.title,
          giantTitleColor: 'white',
          gradientColor: 'yellow',
          media: mediaId,
        },
        layout: [
          {
            blockType: 'servicesDetail',
            intro: {
              title: svc.introTitle,
              description: svc.introDesc,
              image: mediaId,
            },
            subServices: svc.subServices,
          },
        ],
      },
    })
    services.push(createdSvc)
  }

  // 5. Create Team Data (>10 members)
  const teamMembers = [
    { name: 'Alex Rivera', role: 'Founder & CEO', dept: 'Owner' },
    { name: 'Sarah Chen', role: 'Operations Manager', dept: 'Management' },
    { name: 'Azlan Abbas', role: 'Lead Web Developer', dept: 'Website Development' },
    { name: 'Reza F Budiono', role: 'Senior Web Developer', dept: 'Website Development' },
    { name: 'Rizal Chris', role: 'Senior Web Developer', dept: 'Website Development' },
    { name: 'Liam Smith', role: 'Support Specialist', dept: 'Website Maintenance' },
    { name: 'Elena Petrova', role: 'Senior Graphic Designer', dept: 'Graphic Design' },
    { name: 'Michael Kross', role: 'Visual Designer', dept: 'Graphic Design' },
    { name: 'Sofia Garcia', role: 'Social Media Manager', dept: 'Social Media Specialist' },
    { name: 'Ryan Thompson', role: 'Content Creator', dept: 'Social Media Specialist' },
    { name: 'David Miller', role: 'Senior Video Editor', dept: 'Video Editor' },
    { name: 'Jessica Wang', role: 'Head Videographer', dept: 'Videographer' },
    { name: 'Maya Gupta', role: 'HR Manager', dept: 'HR' },
  ]

  for (const member of teamMembers) {
    const dept = departments.find((d) => d.name === member.dept)
    if (dept) {
      await payload.create({
        collection: 'team',
        data: {
          name: member.name,
          role: member.role,
          image: mediaId,
          department: dept.id,
        },
      })
    }
  }

  // 6. Create Portfolio Data (min 3 per service)
  const portfolioEntries = [
    // Branding
    {
      title: 'Lumina Tech Identity',
      serviceIndex: 0,
      scopes: ['Brand Identity', 'Market Research'],
    },
    { title: 'Aura Wellness Rebranding', serviceIndex: 0, scopes: ['Brand Identity', 'UI Design'] },
    {
      title: 'Nexus Global Strategy',
      serviceIndex: 0,
      scopes: ['Brand Identity', 'Market Research'],
    },
    // Design
    { title: 'Echo App Experience', serviceIndex: 1, scopes: ['UI Design', 'UX Strategy'] },
    {
      title: 'Skyline Creative Campaign',
      serviceIndex: 1,
      scopes: ['Graphic Design', 'Motion Graphics'],
    },
    { title: 'Visionary Art Direction', serviceIndex: 1, scopes: ['UI Design', 'Graphic Design'] },
    // Marketing
    { title: 'Organic Growth for Flow', serviceIndex: 2, scopes: ['Market Research', 'SEO'] },
    {
      title: 'Summit Retail Launch',
      serviceIndex: 2,
      scopes: ['Paid Advertising', 'Social Media Management'],
    },
    { title: 'Velocity Growth Hack', serviceIndex: 2, scopes: ['SEO', 'Paid Advertising'] },
    // Ads & SEO
    { title: 'Global Reach SEO', serviceIndex: 3, scopes: ['SEO'] },
    { title: 'Direct Convert Ads', serviceIndex: 3, scopes: ['Paid Advertising'] },
    { title: 'Search Dominance Project', serviceIndex: 3, scopes: ['SEO', 'Paid Advertising'] },
    // Website
    {
      title: 'Stellar E-commerce Portal',
      serviceIndex: 4,
      scopes: ['Web Development', 'E-commerce Solutions'],
    },
    { title: 'Zenith Corporate Site', serviceIndex: 4, scopes: ['Web Development', 'UX Strategy'] },
    { title: 'Pinnacle SaaS Dashboard', serviceIndex: 4, scopes: ['Web Development'] },
    // Social Media
    { title: 'InstaVibe Community', serviceIndex: 5, scopes: ['Social Media Management'] },
    { title: 'Engagement Drive 2024', serviceIndex: 5, scopes: ['Social Media Management'] },
    { title: 'Brand Story Socials', serviceIndex: 5, scopes: ['Social Media Management'] },
    // Content Creation
    { title: 'Cinematic Brand Story', serviceIndex: 6, scopes: ['Motion Graphics'] },
    { title: 'Epic Product Launch Video', serviceIndex: 6, scopes: ['Motion Graphics'] },
    { title: 'The Voice of Innovation Blog', serviceIndex: 6, scopes: ['SEO'] },
  ]

  for (const entry of portfolioEntries) {
    const svcId = services[entry.serviceIndex].id
    const scopeIds = entry.scopes
      .map((sName) => scopes.find((s) => s.title === sName)?.id)
      .filter((id): id is number => typeof id === 'number')

    await payload.create({
      collection: 'portfolio',
      data: {
        title: entry.title,
        slug: entry.title
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]/g, ''),
        _status: 'published',
        featuredImage: mediaId,
        description: richText([
          paragraph(
            `A comprehensive case study for ${entry.title}, showcasing our strategic approach and innovative solutions.`,
          ),
        ]),
        services: [svcId],
        scopes: scopeIds,
        hero: {
          type: 'nonHomepageHero',
          title: entry.title,
          giantTitleColor: 'white',
          gradientColor: 'yellow',
          media: mediaId,
        },
        layout: [
          {
            blockType: 'portfolioInsight',
            insights: [
              {
                title: 'The Challenge',
                description: richText([
                  paragraph(
                    'Navigating complex market dynamics to establish a unique brand presence.',
                  ),
                ]),
                image: mediaId,
              },
              {
                title: 'The Solution',
                description: richText([
                  paragraph(
                    'Implementing a multi-faceted digital strategy focused on user engagement and conversion.',
                  ),
                ]),
                image: mediaId,
              },
            ],
          },
          {
            blockType: 'portfolioImageBanner',
            image: mediaId,
          },
        ],
      },
    })
  }

  // 7. Create Blog Data (Posts)
  const posts: Post[] = []
  for (let i = 1; i <= 3; i++) {
    const post = await payload.create({
      collection: 'posts',
      context: { disableRevalidate: true },
      data: {
        title: `Gaia Insights #${i}: Navigating the Digital Future`,
        slug: `gaia-insights-${i}`,
        _status: 'published',
        meta: {
          title: `Gaia Insights #${i}`,
          description:
            'Expert perspectives on the latest trends in digital innovation and agency growth.',
        },
        authors: [],
        content: richText([
          paragraph(
            'The digital landscape is shifting faster than ever. Agencies that thrive are those that embrace innovation as a core value...',
          ),
        ]),
      },
    })
    posts.push(post)
  }

  // 8. Create Pages
  // Portfolio Page
  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Portfolio Page',
      slug: 'portfolio',
      _status: 'published',
      hero: {
        type: 'nonHomepageHero',
        title: 'Our Work',
        giantTitleColor: 'white',
        gradientColor: 'yellow',
        media: mediaId,
      },
      layout: [
        {
          blockType: 'portfolioBlock',
          title: '',
          description: '',
        },
      ],
    },
  })

  // About Us Page
  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'About Us',
      slug: 'about',
      _status: 'published',
      hero: {
        type: 'nonHomepageHero',
        title: 'About Us',
        giantTitleColor: 'white',
        gradientColor: 'yellow',
        media: mediaId,
      },
      layout: [
        {
          blockType: 'aboutBlock',
          image: mediaId,
          title: 'We live for the love of innovation.',
          description: richText([
            paragraph(
              'We are a dynamic team of designers, developers, and strategists passionate about building digital products that make a difference. Our approach is rooted in collaboration and a relentless pursuit of perfection.',
            ),
          ]),
          items: [
            {
              title: 'Our Commitment',
              description:
                'To deliver exceptional value through every line of code and every pixel of design.',
            },
            {
              title: 'Our Vision',
              description:
                'To be the global benchmark for creative excellence and technical innovation in the digital agency space.',
            },
            {
              title: 'Our Mission',
              description:
                'To empower brands by crafting bespoke digital experiences that inspire, engage, and drive sustainable growth.',
            },
          ],
        },
        {
          blockType: 'teamBlock',
          title: 'Our Team',
          introText: "Meet the creative minds behind your brand's exciting next chapter.",
        },
      ],
    },
  })

  // Blog Page
  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Blog Page',
      slug: 'blog',
      _status: 'published',
      hero: {
        type: 'blogHero',
        title: 'Gaia Stories',
      },
      layout: [
        {
          blockType: 'featuredBlogBlock',
          featuredPost: posts[0].id,
        },
        {
          blockType: 'listingPostBlock',
          title: '',
        },
      ],
    },
  })

  //Home Page
  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Home Page',
      slug: 'home',
      _status: 'published',
      hero: {
        type: 'homepageHero',
        title: 'Designed to grow. Rooted to lead.',
        richText: richText([
          paragraph(
            'Before a brand reaches for the sky, it must find its footing. At Gaia we believe at Marketing as the foundational work—understanding your heart and your audience—to ensure your digital growth is sustainable.',
          ),
        ]),
        buttons: [
          {
            label: 'Grow With Us',
            url: '/',
            icon: 'arrow',
            iconPosition: 'right',
            variant: 'default',
            newTab: false,
          },
        ],
      },
      layout: [
        {
          blockType: 'ourWorksBlock',
          title: 'Our Works',
        },
        {
          blockType: 'ourProcessBlock',
          title: 'Our Process',
          steps: [
            {
              title: 'Goal and Objective',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut tincidunt eros, sagittis elementum ex.',
            },
            {
              title: 'Audience & Buyer Personas',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut tincidunt eros, sagittis elementum ex.',
            },
            {
              title: 'Competitive Analysis',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut tincidunt eros, sagittis elementum ex.',
            },
            {
              title: 'Market Share',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut tincidunt eros, sagittis elementum ex.',
            },
            {
              title: 'SWOT Analysis',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut tincidunt eros, sagittis elementum ex.',
            },
            {
              title: 'Plan a Digital Budget',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut tincidunt eros, sagittis elementum ex.',
            },
            {
              title: 'Digital Channels',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut tincidunt eros, sagittis elementum ex.',
            },
            {
              title: 'Develop Strategies and Tactics',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut tincidunt eros, sagittis elementum ex.',
            },
            {
              title: 'Creating a Marketing Calendar',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut tincidunt eros, sagittis elementum ex.',
            },
            {
              title: 'Measure the result and KPIs',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut tincidunt eros, sagittis elementum ex.',
            },
          ],
        },
      ],
    },
  })

  // 9. Update Header Global
  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: {
      navItems: [
        {
          link: { type: 'custom', url: '/', label: 'Services' },
          subItems: services.map((svc) => ({
            link: { type: 'custom' as const, url: `/services/${svc.slug}`, label: svc.title },
          })),
        },
        { link: { type: 'custom', url: '/portfolio', label: 'Portfolio' } },
        { link: { type: 'custom', url: '/about', label: 'About Us' } },
        { link: { type: 'custom', url: '/blog', label: 'Blog' } },
      ],
    },
  })

  // 10. Footer
  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: {
      formId: contactUsForm.id,
      heading: 'Start a project with Gaia',
      copyright: '',
      developedBy: '© 2026 Gaia Digital Agency',
      navItems: [
        { link: { type: 'custom', url: '/', label: 'Terms and Conditions' } },
        { link: { type: 'custom', url: '/', label: 'Privacy Policy' } },
      ],
      navItemsWithIcon: [
        {
          link: {
            url: 'mailto:info@gaiada.com',
            label: 'info@gaiada.com',
            icon: 'email',
          },
        },
        {
          link: {
            url: 'https://maps.app.goo.gl/TGxwmpZGCDMhvi418',
            label: 'Jl. Raya Mas, Ubud',
            icon: 'map',
          },
        },
      ],
    },
  })

  // 11. Settings
  await payload.updateGlobal({
    slug: 'settings',
    context: { disableRevalidate: true },
    data: {
      address: 'Jl. Raya Mas, Ubud',
      contactEmail: 'info@gaiada.com',
      whatsappNumber: '6281337568977',
      googleMapsEmbed:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.5130163225626!2d115.26977377697892!3d-8.546565786643544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23d4965bc26ad%3A0x7980cb2827360637!2sGaia%20Digital%20Agency!5e0!3m2!1sen!2sid!4v1776307154955!5m2!1sen!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      siteTitle: 'Gaia Digital Agency',
      tagline: '',
      socialLinks: [
        {
          platform: 'facebook',
          url: 'https://www.facebook.com/gaiadigitalagency',
        },
        {
          platform: 'instagram',
          url: 'https://www.instagram.com/gaiadigitalagency/',
        },
        {
          platform: 'linkedin',
          url: 'https://www.linkedin.com/company/gaia-digital-agency/',
        },
      ],
    },
  })

  payload.logger.info('Gaia Digital Agency V2 seeding completed successfully!')
}
