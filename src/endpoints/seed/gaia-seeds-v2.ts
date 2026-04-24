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

  // A. Contact Form
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

  // B. Career Form
  const careerForm = await payload.create({
    collection: 'forms',
    context: { disableRevalidate: true },
    data: {
      title: 'Career Form',
      fields: [
        { name: 'name', label: 'Name', required: true, blockType: 'text' as const },
        { name: 'email', label: 'Email', required: true, blockType: 'email' as const },
        { name: 'phone', label: 'Phone', required: true, blockType: 'text' as const },
        {
          name: 'resume',
          label: 'Resume',
          required: true,
          blockType: 'file' as const,
        },
        { name: 'message', label: 'Message', required: true, blockType: 'textarea' as const },
        {
          siteKey: '10000000-ffff-ffff-ffff-000000000001',
          secretKey: '0x0000000000000000000000000000000000000000',
          blockType: 'hCaptcha' as const,
        },
      ],
      confirmationType: 'message' as const,
      confirmationMessage: richText([paragraph('Thank you for your application!')]),
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
  const serviceData_old = [
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

  const serviceData = [
    {
      title: 'Branding',
      slug: 'branding',
      pageContent:
        'We define the essence of your brand, creating a strategic foundation that guides every interaction and ensures long-term market relevance.',
      introTitle: 'We’ve helped great brands reach new heights.',
      introDesc:
        "At the heart of our approach to brand development lies a deep understanding of your brand's mission. We immerse ourselves in your brand's story, getting to know your customers, competitors, and unique selling proposition. Our team takes creativity seriously, constantly pushing the boundaries to deliver an innovative and effective brand marketing strategy. Whether launching a new product or rebranding an existing one, we're committed to helping you achieve your goals and grow your brand.",
      subServices: [
        {
          title: 'Branding Identity',
          description:
            'Your brand identity plays a key role in obtaining and maintaining recognition, standing out, and providing engaging and meaningful experiences for audiences. With our team of strategists and designers, we build new brands to meet emerging needs and help reinvent existing brands to meet today’s expectations and to thrive on today’s platforms.',
          image: mediaId,
        },
        {
          title: 'Visual Identity',
          description:
            'The visual brand identity is made up of everything that you can see, which includes logos, colours, typography and icons. A visual identity for your brand is crucial to successful engagement with your audience.',
          image: mediaId,
        },
      ],
    },
    {
      title: 'Design',
      slug: 'design',
      pageContent:
        'Like it or not, people’s opinion of your company is often made in the first few seconds, and during that time nothing has a greater impact than the appearance of your marketing materials.',
      introTitle: 'This is where you need the services of a professional graphic designer.',
      introDesc:
        "At the heart of our approach to brand development lies a deep understanding of your brand's mission. We immerse ourselves in your brand's story, getting to know your customers, competitors, and unique selling proposition. Our team takes creativity seriously, constantly pushing the boundaries to deliver an innovative and effective brand marketing strategy. Whether launching a new product or rebranding an existing one, we're committed to helping you achieve your goals and grow your brand.",
      subServices: [
        {
          title: 'Graphic Design',
          description:
            'Graphic design is a complicated and complex affair. Choosing colours, fonts and images can often seem simple but there are subtle nuances to the layout of a marketing piece that can have tremendous impact on effectiveness. True graphic design is about creating something that will elicit the required response, whether it be to convey a message or to persuade a potential buyer. We offer a complete range of graphic design services, from print media (brochures, posters and signage), to logo design, as well as everything in between.',
          image: mediaId,
        },
        {
          title: 'Graphic & Motion',
          description:
            'We have a team of talented graphic designers who understand the visual overload people are faced with on a daily basis, and it’s their job to make designs that really stand out amongst the sea of grey – to sculpt quality images out of your vision.',
          image: mediaId,
        },
        {
          title: 'Collaterals',
          description:
            'Creating marketing materials that support a company’s salesefforts. Collateral design is an important part of the marketingmix because it helps companies communicate their messageto potential customers in a clear and concise manner.',
          image: mediaId,
        },
        {
          title: 'Marketing Materials',
          description:
            'Creating visual and textual content that promotes a product, service, or brand.',
          image: mediaId,
        },
      ],
    },
    {
      title: 'Marketing',
      slug: 'marketing',
      pageContent:
        'Like it or not, people’s opinion of your company is often made in the first few seconds, and during that time nothing has a greater impact than the appearance of your marketing materials.',
      introTitle: 'Sometimes the best advertising solution isn’t advertising at all.',
      introDesc: `We view Public Relations as the magical ingredient to transform a business from a mere entity into a memorable and influential brand. It's not just about creating awareness and managing reputation, but rather a fusion of art and science that results in remarkable growth and impact. In the words of the great Bill Gates, "If I was down to my last dollar, I would spend it on Public Relations," and we couldn't agree more.`,
      subServices: [
        {
          title: 'Public Relations',
          description:
            'In a world where perception is everything, Public Relations is key. At GAIA Digital Agency, we know that effective PR is about more than just spin, it’s about building meaningful relationships with your audience and crafting a compelling narrative that resonates with them. Whether you’re looking to build your brand, manage a crisis or get your message out to the world, our expert team is here to help.',
          image: mediaId,
        },
        {
          title: 'Marketing Communications',
          description:
            'Marketing communications is the art of telling stories that captivate and connect. With a touch of creativity and a pinch of strategy, we carefully craft messages that resonate and inspire action. In a world where attention is scarce, we help brands stand out and make a lasting impression.',
          image: mediaId,
        },
      ],
    },

    {
      title: 'Ads & SEO',
      slug: 'ads-seo',
      pageContent:
        'Like it or not, people’s opinion of your company is often made in the first few seconds, and during that time nothing has a greater impact than the appearance of your marketing materials.',
      introTitle: 'Drive your online growth with creative and innovative strategies!',
      introDesc: `Our innovative digital marketing solutions, including expert SEO services and targeted online advertising campaigns, will launch your brand's visibility and help your sales growth skyrocket. With a data-driven approach and cutting-edge email marketing tactics, we ensure your business dominates the digital landscape. Our team of seasoned professionals specialize in crafting comprehensive digital advertising strategies that deliver results, so you can focus on what you do best: running your business. Let us elevate your online presence with the power of SEO, digital advertising, and email marketing.`,
      subServices: [
        {
          title: 'SEO',
          description:
            'Using an industry-renowned SEO methodology and years of collective experience, our SEO team will grow your organic traffic from Google and other prominent search engines.',
          image: mediaId,
        },
        {
          title: 'Online Advertising',
          description:
            'While much of media buying is related to math and data read rates, the art of the buy lies in growing personal relationships with representatives and partners. Our team excels at both. We highly value the relationships we have with our partners and work hard to fine-tune each media plan to optimise every dollar spent.',
          image: mediaId,
        },
        {
          title: 'Email Marketing',
          description:
            'Email marketing is a cost-effective tool for keeping clients engaged with your service offerings. An email newsletter is a critical component of any content marketing strategy to distribute content to current and prospective clients. Our team helps you design an email marketing campaign that will reach your clients with the right message at the right time in order to generate new opportunities.',
          image: mediaId,
        },
      ],
    },
    {
      title: 'Website',
      slug: 'website',
      pageContent:
        'Like it or not, people’s opinion of your company is often made in the first few seconds, and during that time nothing has a greater impact than the appearance of your marketing materials.',
      introTitle: 'Your Brand Deserves a Website that Stands Out!',
      introDesc: `We specialize in crafting high-performance digital user experiences that are both effective and purpose driven. By blending your brand culture with UX/UI best practices, we can connect visitors to loyal customers. Our website design, development and maintenance expertise will help businesses like yours stand out in a crowded digital space.`,
      subServices: [
        {
          title: 'Hotel & Restaurants',
          description:
            'Our focus: Increased online reservations, enhanced online ordering, improved local search visibility, and engaging visual presentation In today’s competitive hospitality sector, a visually stunning and user-friendly website is your digital welcome. Our high-performing websites are designed to captivate potential guests and diners with high-resolution imagery, immersive virtual tours, and seamless navigation. We implement intuitive booking and reservation systems that encourage direct engagement, reducing reliance on costly third-party platforms. Our focus on responsive design ensures a flawless experience on all devices, from smartphones to desktops. Furthermore, our SEO optimisation will increase your online visibility, driving more organic traffic and increasing both bookings and reservations.',
          image: mediaId,
        },
        {
          title: 'Real Estate Listing',
          description:
            'Our focus: Enhanced property presentation, improved lead generation, streamlined property search, mobile-friendly design, and increased SEO. In the fast-paced property market, a visually compelling and informative website is essential. Our high-performing websites provide immersive property listings with high-quality photos, virtual tours, and detailed descriptions. We integrate advanced search filters, interactive maps, and lead capture forms to streamline the property search and lead generation process. Our websites are optimised for fast loading speeds and mobile responsiveness, ensuring a seamless experience for potential buyers and sellers on any device. We will also implement SEO strategies to ensure your listings are easy to find.',
          image: mediaId,
        },
        {
          title: 'E-commerce',
          description:
            'Our focus: Increased online sales, improved conversion rates, enhanced user experience, secure payment processing, and product management In the competitive world of e-commerce, a high-performing website is your online shopfront. Our websites are built for speed, security, and scalability, ensuring a seamless shopping experience for your customers. We integrate secure payment gateways, intuitive product catalogues, and advanced search filters to enhance conversions. Our focus on user experience and mobile responsiveness ensures customers can shop with ease on any device. We optimise for SEO to drive organic traffic and implement analytics to track performance and optimise for conversions. We also ensure that your website is easy to manage, so you can easily update products, and sales.',
          image: mediaId,
        },
        {
          title: 'Small Businesses',
          description:
            'Our focus: Enhanced local visibility, increased user engagement, website management, and high return on investment Small businesses are the heart of our communities, and a strong online presence is essential for their success. Our websites for small businesses are designed to be affordable, effective, and tailored to your unique needs. We focus on creating user-friendly designs that showcase your products or services, build trust with your customers, and drive local traffic. We implement essential features like contact forms, online booking or ordering, and social media integration. Our focus on local SEO helps you get found by customers in your area. We provide websites that are easy to maintain, and update, allowing you to focus on your business. We understand that every pound counts, and build websites that provide a high return on investment.',
          image: mediaId,
        },
        {
          title: 'Complex Projects',
          description:
            'Our focus: Comprehensive website audits, strategic rebranding initiatives, sales funnel optimisation, advanced functionality, and tailored digital solutions For businesses with intricate digital needs, we offer bespoke solutions that go beyond standard website development. ‘Complex Projects’ encompasses a range of specialised services, including comprehensive website audits to identify areas for improvement and maximise performance. We expertly craft and implement strategic rebranding initiatives to revitalise your online image and align it with your evolving business goals. Our team excels in sales funnel optimisation, ensuring a seamless customer journey that drives conversions and boosts revenue. We specialise in integrating advanced functionalities, from e-commerce platforms to custom APIs, to create websites that are both powerful and user-friendly. We focus on creating a website that is not only visually pleasing, but that also drives business results.',
          image: mediaId,
        },
      ],
    },
    {
      title: 'Social Media',
      slug: 'social-media',
      pageContent:
        'Like it or not, people’s opinion of your company is often made in the first few seconds, and during that time nothing has a greater impact than the appearance of your marketing materials.',
      introTitle: 'Unlock the power of social media for your brand.',
      introDesc: `We believe that social media is more than just a tool for marketing; it's a place to connect, engage and create. Our fingers are always on the pulse of the latest social media trends, so we ensure that your social media strategy is always fresh, relevant and effective. With GAIA Digital Agency, your social media can be more than just a platform; it's a vibrant and exciting world where your brand can shine.`,
      subServices: [
        {
          title: 'Strategy',
          description:
            'We have a specific tailored social media strategy aimed at reaching your target audience and driving remarkable results. We look at all marketing channels to ensure your brand’s social media is seamlessly integrated into supporting your overall business and communications objectives.',
          image: mediaId,
        },
        {
          title: 'Guideline Concept',
          description:
            'Our social media experts will also provide you with recommendations to build awareness, generate consideration, drive sales and help you develop customer loyalty.',
          image: mediaId,
        },
        {
          title: 'Management',
          description:
            'Our social media team are experts in social trends, innovation, and strategies. Our full-service offering includes everything from community management to creative production. We’re here to help you to raise brand awareness, increase brand relevance, and drive growth for your business.',
          image: mediaId,
        },
      ],
    },
    {
      title: 'Content Creation',
      slug: 'content-creation',
      pageContent:
        'Like it or not, people’s opinion of your company is often made in the first few seconds, and during that time nothing has a greater impact than the appearance of your marketing materials.',
      introTitle: 'Content is king... and we’ve got the whole royal court!',
      introDesc: `We don't just focus on creating sharp and visually appealing content - that's only the beginning. We take things to the next level by implementing a powerful content marketing strategy that includes SEO optimization, research and more. We pride ourselves on creating content that isn't simply seen but also has a lasting impact on your audience.`,
      subServices: [
        {
          title: 'Copywriting',
          description:
            'At our core, we are wordsmiths; we craft language that communicates, inspires and motivates. Our copywriting services are engineered to capture the essence of your brand and effectively convey your message to your audience.',
          image: mediaId,
        },
        {
          title: 'Videography',
          description:
            'Video is a powerful storytelling tool that can generate excitement, curiosity and a lasting connection with your audience. At our agency, we specialize in crafting video advertisements optimized for Facebook, Instagram, YouTube and more that communicate your brand’s concept with maximum impact.',
          image: mediaId,
        },
        {
          title: 'Photography',
          description:
            'In a sea of content, standing out is crucial for any business. With our expert product photography, we’ll help your brand create a unique and professional appearance. We work to your specifications, ensuring that your needs and expectations are met with stunning visuals to capture the essence of your brand.',
          image: mediaId,
        },
        {
          title: 'VR 360 Photography',
          description:
            'We specialize in creating stunning 360° high-definition virtual tours for various industries. These interactive tours add visual appeal to your website and serve as a powerful marketing tool to showcase your property, services and facilities. Whether your clients are browsing from their iPads, tablets or laptops, our virtual tours will transport them to your business and leave a lasting impression.',
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
    { name: 'Anthony Syrowatka', role: 'Founder & CEO', dept: 'Owner' },
    { name: 'Simon Maclean', role: 'General  Manager', dept: 'Management' },
    { name: 'Edward Kurnia', role: 'Operations Manager', dept: 'Management' },
    { name: 'Azlan Abbas', role: 'Lead Web Developer', dept: 'Website Development' },
    { name: 'Reza F Budiono', role: 'Senior Web Developer', dept: 'Website Development' },
    { name: 'Rizal Chris', role: 'Senior Web Developer', dept: 'Website Development' },
    { name: 'Reva Atallah Rizky', role: 'Web Developer', dept: 'Website Development' },
    { name: 'Dede Sudede', role: 'Senior Web Developer', dept: 'Website Development' },
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
  const portfolioEntries_old = [
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

  const portfolioEntries = [
    {
      title: 'Akoya Spa',
      serviceIndex: 0,
      paragraph:
        "Akoya Spa is considered one of Bali's most tranquil settings, the perfect location for the pursuit of health and wellbeing. Akoya is at its heart with unique traditions in health and healing that have given Ubud a reputation amongst spa practitioners worldwide. As a proud partner of GAIA Digital Agency, Akoya Spa's digital presence is crafted with the same level of care and attention to detail that goes into every aspect of their massage therapies.",
      scopes: [
        'Website Development',
        'Website Optimisation',
        'Website Maintenance',
        'Google Ads',
        'Social Ads',
        'SEO',
        'Strategy',
        'Guideline Concept',
        'Social Media Management',
        'Design',
      ],
    },
    {
      title: 'Apéritif Restaurant',
      serviceIndex: 0,
      paragraph:
        "Apéritif Restaurant and Bar offers a unique dining experience designed to be savoured. Drawing on the European tradition of pre-dinner drinks and canapés, the restaurant invites you to explore a degustation menu of modern global cuisine. As a valued client of GAIA Digital Agency, we've worked tirelessly to capture the essence of Apéritif's unique concept and bring it to life through their digital presence, ensuring that every aspect of their brand reflects the sophistication, elegance and charm that Apéritif is now known for.",
      scopes: [
        'Website Development',
        'Website Optimisation',
        'Website Maintenance',
        'Google Ads',
        'Social Ads',
        'SEO',
        'Strategy',
        'Guideline Concept',
        'Social Media Management',
        'Design',
        'Photography',
        'Videography',
        'Public Relations & Marketing Communications',
      ],
    },
    {
      title: 'Aquatir Caviar',
      serviceIndex: 0,
      paragraph:
        "Aquatir, the modern sturgeon breeding enterprise, located in Indonesia's tropical paradise, Bali. Aquatir's innovative approach utilizes cutting-edge technology to ensure a perfect and environmentally friendly practice. Aquatir Caviar is committed to producing high-quality products that meet international standards, whilst also prioritizing the health and productivity of our sturgeon fish. The fishes are raised on a diet of high-quality feed, free from hormones, antibiotics and GMOs, containing all the necessary micro nutrients and vitamins for them to flourish.",
      scopes: ['Website Development', 'Website Optimization', 'Website Maintenance', 'SEO'],
    },
    {
      title: 'AYR Water',
      serviceIndex: 0,
      paragraph:
        'AYR Water is a premier provider of premium sparkling and still water solutions, allowing ythe ability to serve fresh, clean water on-site and on demand. Designed with environmental impact in mind, their systems provide top-quality hydration and reduce plastic waste. AYR systems support businesses in providing water efficiently, profitably, and sustainably.',
      scopes: ['Website Development', 'Website Optimisation', 'Website Maintenance'],
    },
    {
      title: 'Blossom Steakhouse',
      serviceIndex: 0,
      paragraph:
        "‘Blossom' blossomed from the vision of its owners, Dewi and Anthony Syrowatka, who bring over 20 years of culinary passion and expertise. With this wealth of experience, their hearts brimmed with a desire to create a space where families and friends could weave memories as rich and flavourful as the steaks and seafood sizzling on our grills.",
      scopes: [
        'Design',
        'Content Creation',
        'Website Development',
        'Website Optimization',
        'Website Maintenance',
        'SEO',
      ],
    },
    {
      title: 'BRCA',
      serviceIndex: 0,
      paragraph:
        "The Bali Restaurant and Cafe Association (BRCA) is a newly formed association that seeks to unite Bali restaurateurs and represent Bali's burgeoning F&B industry by promoting the island as a world-class culinary destination while providing a platform for Bali restaurants and cafés to have access to the latest information and services about sustainable practices.",
      scopes: [
        'Website Development',
        'Website Optimisation',
        'Website Maintenance',
        'SEO',
        'Social Media Management',
      ],
    },
    {
      title: 'CasCades Restaurant',
      serviceIndex: 0,
      paragraph:
        "CasCades is a culinary gem nestled in the lush Valley of the Kings, just a 5-minute drive from the center of Ubud. As one of the original Ubud dining destinations, CasCades has been delighting guests with genuine cuisine and breath-taking jungle views since 2000. Boasting an impressive wine list and bold gourmet dishes, it's the perfect spot for a long lunch or a special dinner. At GAIA Digital Agency, we're very proud to partner with CasCades and provide them with website development, Google Ads, social ads, SEO, design, photography and other services to showcase their exceptional offerings and stunning location to the world.",
      scopes: [
        'Website Development',
        'Website Optimisation',
        'Website Maintenance',
        'Google Ads',
        'Social Ads',
        'SEO',
        'Strategy',
        'Guideline Concept',
        'Social Media Management',
        'Design',
        'Photography',
        'Videography',
        'Public Relations & Marketing Communications',
      ],
    },
    {
      title: 'Cloud Kitchen',
      serviceIndex: 0,
      paragraph:
        "Cloud Kitchen Bali located in Ubud offering 24-hour delivery every day have become a game-changer for food lovers seeking convenience and variety. With an extensive menu that caters to late-night cravings and early morning breakfasts alike, these kitchens ensure that delicious meals are just a few clicks away at any hour. Whether you're in the mood for international favorites, or healthy options, you can find something to satisfy your appetite. This round-the-clock service not only meets the needs of locals and tourists but also enhances Bali's vibrant food scene, making it easier than ever to enjoy a culinary adventure at any time of day or night.",
      scopes: ['Website Development', 'Website Optimization', 'Website Maintenance', 'SEO'],
    },
    {
      title: 'Dapur Raja',
      serviceIndex: 0,
      paragraph:
        'Dapur Raja “the kings kitchen” is a Balinese themed restaurant located in central Ubud serving a Balinese rijsttafel. Dapur Raja is located on Goutama Selatan street, next to the Golden Monkey Chinese Restaurant Ubud Bali. Vegetarians and non vegetarian are well catered to here. GAIA Digital Agency has provided a range of services, including Website Development, Google Ads, Social Ads, SEO, Design, Photography, and Marketing Communications, to help Dapur Raja build a distinctive personality that captures the essence of their craft.',
      scopes: [
        'Website Development',
        'Website Optimisation',
        'Website Maintenance',
        'Google Ads',
        'Social Ads',
        'SEO',
        'Strategy',
        'Guideline Concept',
        'Social Media Management',
        'Design',
      ],
    },
    {
      title: 'Ginger Moon Bali',
      serviceIndex: 0,
      paragraph:
        "Ginger Moon Canteen, a Bali icon since 2012, has become a beloved destination for locals and visitors alike. Located on Seminyak's famous “Eat Street,” our modern Asian canteen offers a welcoming, casual oasis in the heart of Bali's vibrant dining and shopping scene. For many, Ginger Moon is a must-visit, a place that feels like home.",
      scopes: ['Website Development', 'Website Optimisation', 'Website Maintenance', 'SEO'],
    },
    {
      title: 'Golden Monkey',
      serviceIndex: 0,
      paragraph:
        'Golden Monkey Chinese Restaurant is the ultimate destination for those seeking an authentic Chinese culinary experience in either Ubud or Canggu. From delicious Chinese BBQ, Dim Sum to traditional Cantonese dishes, every bite is crafted with passion and precision, creating a culinary masterpiece. As a strategic partner of GAIA Digital Agency, we have enjoyed working with Golden Monkey to create a digital platform that showcases their brand and menu. From a visually stunning website to a comprehensive social media strategy, our team has helped them build a loyal following of customers. Our expertise in marketing communications and events has allowed us to put Golden Monkey in the spotlight, hosting unforgettable dinners and securing top-tier media coverage.',
      scopes: [
        'Website Development',
        'Website Optimisation',
        'Website Maintenance',
        'Google Ads',
        'Social Ads',
        'SEO',
        'Strategy',
        'Guideline Concept',
        'Social Media Management',
        'Design',
        'Photography',
        'Videography',
        'Public Relations & Marketing Communications',
      ],
    },
    {
      title: 'Hunter Motorcycles',
      serviceIndex: 0,
      paragraph:
        "Hunter Motorcycles is more than just a business – it's a way of life driven by passion. Built with cutting-edge engineering and only the finest components, each motorcycle is meticulously hand-assembled by skilled Indonesian technicians. Hunter's unwavering dedication to customer satisfaction ensures an unparalleled riding experience, from showroom to service. With a full inventory of spare parts and a trusted partnership with GAIA Digital Agency, Hunter Motorcycles has put itself in the best possible position to capture the hearts of the Indonesian motorcycle market.",
      scopes: ['Website Development', 'Website Optimisation', 'Website Maintenance'],
    },
    {
      title: 'Institute Escoffier',
      serviceIndex: 0,
      paragraph:
        "Institut Disciples Escoffier (IDE) is a professional culinary school accredited by the French Ministry of Education and supported by Disciples Escoffier International, the world's largest chefs' association. IDE offers programmes in cuisine, pastry, and bakery, ranging from dual bachelor's degrees and professional certifications to masterclasses and workshops. With a high teacher-to-student ratio and practical training in state-of-the-art facilities, IDE equips students for careers in international fine dining and luxury hospitality.",
      scopes: ['SEO', 'Website Maintenance'],
    },
    {
      title: 'Lacalita',
      serviceIndex: 0,
      paragraph:
        "Lacalita is all about bringing people together over great food and drinks in a vibrant setting, combining Mexican tradition with a modern, local twist, creating a space that's warm, welcoming, and full of life. From the colourful interiors to the buzzing atmosphere, every detail is designed to make guests feel at home while they enjoy something a little out of the ordinary.",
      scopes: ['Website Maintenance', 'Google Ads', 'Social Ads', 'Social Media Management'],
    },
    {
      title: 'NOW! Magazine',
      serviceIndex: 0,
      paragraph:
        "Since its inception in 2009 as a printed magazine, NOW! Bali has been dedicated to promoting and cherishing the unique culture that sets the island apart. At GAIA Digital Agency, we've helped them to reach an even wider audience by providing exceptional UI/UX design, website optimization and SEO services. Through our partnership, NOW! Bali has continued sharing the island's rich cultural heritage while staying at the forefront of Bali's thriving tourism industry. From hotels and hostels to food and drink, from adventures and events to travel and tourism, we've helped them to promote all the industries that make Bali such a vibrant and exciting destination.",
      scopes: ['UI/UX Design', 'Website Optimisation', 'SEO'],
    },
    {
      title: 'Pegasus Media Logistic',
      serviceIndex: 0,
      paragraph:
        "Pegasus Media & Logistics, established in July 2022, is a leading full-service production, sourcing, and distribution company based in Sydney. Operating from two strategic locations, Pegasus is among Australia's largest and most versatile print production and logistics companies. With an unparalleled commitment to quality, innovation, and efficiency, Pegasus delivers a seamless range of services tailored to meet the diverse needs of its clients across various industries.",
      scopes: [
        'Logo Creation',
        'Website Development',
        'Website Optimisation',
        'Website Maintenance',
      ],
    },
    {
      title: 'Pinstripe Bar Ubud',
      serviceIndex: 0,
      paragraph:
        "Evoking the grandeur and exhilarating vibes of the 1930s, the elegant colonial-style building housing Pinstripe Cocktail Bar immediately leaves a lasting impression. Overlooking lush paddy fields and jungle valley the tone is set for a unique, sophisticated dining and cocktail sojourn that is opulently decorated in marble, dark woods, and bronze elements that summons the convivial and grand atmosphere of a bygone era. The renowned European tradition of enjoying an aperitif — pre-dinner drink and snack to stimulate the appetite — has been seamlessly integrated into the dining experience. Pinstripe's gastronomic approach recognises fine global haute cuisine, with a hint of Indonesian influence, drawing on flavours of the old Spice Islands. The Bar is a celebration of the rich traditions of the 1930s when the world began to learn about the secret island of Bali and the exotic nature of Ubud and its sublime beauty.",
      scopes: [
        'Website Development',
        'Website Optimization',
        'Website Maintenance',
        'SEO',
        'Strategy',
        'Guideline Concept',
        'Social Media Management',
      ],
    },
    {
      title: 'SGI',
      serviceIndex: 0,
      paragraph:
        "SGI is an Indonesian & Australian owned, and incorporated company, with experience in helicopter and fixed wing operations throughout Indonesia and Asia Pacific. Sayap Garuda Indah (SGi) is an Indonesian based, and incorporated company whose primary activity is the provision of Rotary and Fixed Wing aviation services to the Mining, Tourism and Corporate VIP sectors. At GAIA Digital Agency, we're very proud to partner with SGi and provide them with website development, SEO, social ads and other services to showcase their exceptional services to the world.",
      scopes: [
        'Website Development',
        'Website Optimisation',
        'Website Maintenance',
        'SEO',
        'Strategy',
        'Guideline Concept',
        'Social Media Management',
      ],
    },
    {
      title: 'SGI Air Bali',
      serviceIndex: 0,
      paragraph:
        "Air Bali Helicopter is the first dedicated and longest running helicopter tours company in Bali and the region. With over 20 years of experience, we take pride in maintaining a 100% safety record and the company has been with the flight safety foundation BARS Program since April 2013 and it's GOLD rating operator.",
      scopes: [
        'Website Development',
        'Website Optimization',
        'Website Maintenance',
        'SEO',
        'Social Media Management',
      ],
    },
    {
      title: 'SōHA Yoga',
      serviceIndex: 0,
      paragraph:
        'SoHA Yoga, School of Healing Arts. Experience your true self to become a skillful, certified yoga teacher and find your unique expression through the yoga universe, to Empower your purpose and access tools to share it with the world and to revive your inner wisdom and create a happy, healthy, and wealthy life for you and your loved ones. GAIA provide various services from website optimization, website maintenance, google ads, social ads, SEO, strategy, guideline concept, social media management and design.',
      scopes: [
        'Website Development',
        'Website Optimization',
        'Website Maintenance',
        'Google Ads',
        'Social Ads',
        'SEO',
        'Strategy',
        'Guideline Concept',
        'Social Media Management',
        'Design',
      ],
    },
    {
      title: 'Suri Residence',
      serviceIndex: 0,
      paragraph:
        "Suri Residence, with its five unique bamboo houses designed by IBUKU, is more than just a place to live. It's a celebration of Balinese culture and sustainable living. It's an embodiment of harmony, balance, and respect for the natural world, principles deeply rooted in Balinese philosophy.",
      scopes: ['Website Development', 'Website Optimisation', 'Website Maintenance', 'Design'],
    },
    {
      title: 'Talasi',
      serviceIndex: 0,
      paragraph:
        'Talasi is about exploring and discovering the potential in obscurity. Talasi is about setting up and operating at the Origin. Talasi is about working with the community, providing them with knowledge, skills, and tools. Investing at the grassroots level and connecting the chain to sustain and maintain nature while enhancing livelihoods. With the end game of empowerment to the people of the land.',
      scopes: ['Strategy', 'Guideline Concept', 'Social Media Management'],
    },
    {
      title: 'The Fillup Club',
      serviceIndex: 0,
      paragraph:
        "The Fillup Club, the world's first luxury inflatable furniture brand based in Belgium, offers a delightful selection of furniture that brings comfort and style to their clients' outdoor living space. Each inflatable item is made with Sunbrella fabrics, ensuring they are beautiful and functional. As proud partners of GAIA Digital Agency, we've worked closely with The Fillup Club to showcase their unique brand story and product offerings to the right audience.",
      scopes: [
        'Website Development',
        'Website Optimisation',
        'Website Maintenance',
        'Google Ads',
        'Social Ads',
        'SEO',
        'Strategy',
        'Guideline Concept',
        'Social Media Management',
        'Design',
        'Photography',
        'Videography',
        'Public Relations & Marketing Communications',
      ],
    },
    {
      title: 'Ubud Beauty Centre',
      serviceIndex: 0,
      paragraph:
        'Ubud Beauty Centre offers a wide range of hair and beauty excellent services for men and women like hair cutting, hair coloring, blow-drying, hair styling, and many more. They provide waxing for you to remove permanently unwanted hair, and nail care for manicure-painted nails. Enjoy other beauty treatments like massage, makeup, and facials. Besides paying attention to your hair, we understand that your body needs delicate care too! GAIA Digital Agency is proud to be their strategic partner, we have enjoyed working with UBC to create a digital platform that showcases their brand and treatments. From a visually stunning website to a comprehensive social media strategy, our team has helped them build a loyal following of customers.',
      scopes: [
        'Website Development',
        'Website Optimization',
        'Website Maintenance',
        'SEO',
        'Strategy',
        'Guideline Concept',
        'Social Media Management',
      ],
    },
    {
      title: 'Unreal',
      serviceIndex: 0,
      paragraph:
        "Unreal Bali isn't just your average property agency – it's a game-changer revolutionizing the industry. As a proud partner of GAIA Digital Agency, we've helped Unreal Bali amplify their message and connect with their target audience through cutting-edge digital strategies that showcase its unique value proposition. We've provided them with an efficient interface that's easy to navigate, in turn helping Unreal Bali to provide a seamless experience that's second to none. But what sets them apart is their unparalleled knowledge of Bali's latest lifestyle trends, assisted by GAIA's digital data collection team, they are able to stay ahead of the curve.",
      scopes: [
        'UI/UX Design',
        'Website Optimisation',
        'Social Ads',
        'SEO',
        'Marketing Communication',
      ],
    },
    {
      title: 'Viceroy Bali',
      serviceIndex: 0,
      paragraph:
        "Viceroy Bali isn't just a 5-star resort – it's a luxurious tropical haven that offers an extraordinary expression of world-class luxury. From the moment their clients step onto the grounds, they're transported to a world of elegance and opulence, where their every need is anticipated, and their every desire fulfilled. As a proud partner of GAIA Digital Agency, we've worked closely with Viceroy Bali to ensure their digital presence reflects the resort's commitment to luxury, privacy and exceptional service.",
      scopes: [
        'Website Development',
        'Website Optimisation',
        'Website Maintenance',
        'Google Ads',
        'Social Ads',
        'SEO',
        'Strategy',
        'Guideline Concept',
        'Social Media Management',
        'Design',
        'Photography',
        'Videography',
        '360 VR Photography',
        'Public Relations & Marketing Communications',
      ],
    },
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
        description: richText([paragraph(`${entry.paragraph}`)]),
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
                'Clear, measurable and attainable digital marketing plan objectives help you define exactly what you want to achieve and measure.',
            },
            {
              title: 'Audience & Buyer Personas',
              description:
                'For any digital marketing campaign to be successful, you need to know who you’re targeting. Segmenting your audience and then building buyer personas for each of those segments is key.',
            },
            {
              title: 'Competitive Analysis',
              description:
                'A competitive analysis allows you to identify your competitors, calculate your market share, and determine the marketing strategies they employ.',
            },
            {
              title: 'Market Share',
              description:
                'A thorough competitive landscape analysis and marketing share identification will give you insights into how you can use online marketing to surpass your competitors.',
            },
            {
              title: 'SWOT Analysis',
              description:
                'A SWOT analysis is the other side from a competitive landscape analysis. we provide you with a framework for analysing your business in the overall framework of your market.',
            },
            {
              title: 'Plan a Digital Budget',
              description:
                'The next step in creating the best digital marketing plan for your brand is to calculate your budget. The budget will define how much you have available to spend on digital marketing activities, as well as guide you toward specific channels, strategies and tactics.',
            },
            {
              title: 'Digital Channels',
              description:
                'define your when defining your digital channels, we will consider where your audience spends most of their time.',
            },
            {
              title: 'Develop Strategies and Tactics',
              description:
                'After defining your channels, you need to develop the digital marketing tactics and strategies you’ll use within those channels.',
            },
            {
              title: 'Creating a Marketing Calendar',
              description:
                'A marketing calendar allows you to map out exactly when we implement your digital marketing campaigns. it also creates accountability, ensuring that you hit deadlines and effectively execute the plan.',
            },
            {
              title: 'Measure the result and KPIs',
              description:
                'The final step in creating a digital marketing plan and strategy is to measure your results through the definition of metrics and key performance indicators (KPIs).',
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
        { link: { type: 'custom', url: '/career', label: 'Career' } },
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

  // 12. Career Page
  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: {
      title: 'Career Page',
      slug: 'career',
      _status: 'published',
      hero: {
        type: 'nonHomepageHero',
        title: 'Careers',
        giantTitleColor: 'white',
        gradientColor: 'yellow',
        media: mediaId,
      },
      layout: [
        {
          blockType: 'hiringProcess',
          title: 'Hiring Process',
          items: [
            {
              number: '1',
              title: 'Technical Test',
              description: `Each division has its own way of testing each candidate. All that's needed is mental preparation and experience.`,
            },
            {
              number: '2',
              title: 'Interview',
              description:
                'Candidates who pass the online technical test will be invited for interviews with senior staff and management. Confidence and being yourself are essential.',
            },
            {
              number: '3',
              title: 'Final Decision',
              description: `Candidates who successfully pass the hiring process will receive a job offer. Don't hesitate to accept!`,
            },
          ],
        },
        {
          blockType: 'careerFormBlock',
          title: 'Join Our Team',
          form: careerForm.id,
        },
      ],
    },
  })

  payload.logger.info('Gaia Digital Agency V2 seeding completed successfully!')
}
