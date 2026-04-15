aku ingin membenahi isi seeds dari gaia-seeds, agar sesuai dengan kondisi saat ini.
sebelum kamu membuat file seeds, pelajari terlebih dahulu file seeds yang sudah ada, lalu pelajari blocks, collections, component, header, footer, atau file-file yang diperlukan di dalam project ini.
bikin file seed baru , agar tidak merusak file seed yang sudah ada. sehingga file yang ada tetap bisa menjadi patokan.

kurang lebih ini kebutuhanku di dalam file seeds nya yang harus disesuaikan: 

mulai dari header nav items.
1. Service memiliki sub menu, yaitu:
  - Semua data di Collection Service mengarah ke sana.

Untuk melengkapi data Service mari aku jelaskan untuk seed data Service
  - Hero menggunakan "Non Homepage Hero"
    - Title Hero menggunakan title yang sama dengan Title Service
    - Giant Title Color : WHite
    - Gradient Color : Yellow
    - Button : tidak ada
    - Media : default
  - Page Content
    - Menggunakan Block Service Detail Block
      - Introduction Section 
        - Title : Tolong buatkan, contoh -> We’ve helped great brands reach new heights.
        - Description : Tolong buatkan, contoh -> At the heart of our approach to brand development lies a deep understanding of your brand's mission. We immerse ourselves in your brand's story, getting to know your customers, competitors, and unique selling proposition. Our team takes creativity seriously, constantly pushing the boundaries to deliver an innovative and effective brand marketing strategy. Whether launching a new product or rebranding an existing one, we're committed to helping you achieve your goals and grow your brand.
        - Image : default

      - Sub Service [array]
        - Sub 1
          - Title : Tolong buatkan, contoh (untuk service "Branding") -> Branding Identity
          - Description : Tolong buatkan, contoh (untuk service "Branding") -> Your brand identity plays a key role in obtaining and maintaining recognition, standing out, and providing engaging and meaningful experiences for audiences. With our team of strategists and designers, we build new brands to meet emerging needs and help reinvent existing brands to meet today’s expectations and to thrive on today’s platforms.
        
        - Sub 2
          - Title : Tolong buatkan, contoh (untuk service "Branding") -> Visual Identity
          - Description : Tolong buatkan, contoh (untuk service "Branding") -> The visual brand identity is made up of everything that you can see, which includes logos, colours, typography and icons. A visual identity for your brand is crucial to successful engagement with your audience.

2. Lalu navbar ke 2 adalah Portfolio (tanpa sub menu), mengarah ke "Page Portfolio"
  - Detail page portfolio 
    - Hero menggunakan "Non Homepage Hero"
      - Title : Our Work
      - Giant title color : white
      - gradient color : yellow
      - button : tidak ada
      - Media : default
    - Content
      - Layout 1 : Portfolio Insight Block
        - Main Title : Kosong
        - Insight [array]
          - Insight 1
            - Title : contoh -> insight #1
            - Insight Description : contoh -> As a proud partner of GAIA Digital Agency, Akoya Spa’s digital presence is crafted with the same level of care and attention to detail that goes into every aspect of their massage therapies.
            - Insight Image : default
          - Insight 2
            - Title : contoh -> insight #2
            - Insight Description : contoh -> As a proud partner of GAIA Digital Agency, Akoya Spa’s digital presence is crafted with the same level of care and attention to detail that goes into every aspect of their massage therapies.
            - Insight Image : default
      - Layout 2 : Portfolio Image Banner Block
        - Image : default


3. Lalu navbar ke 3 adalah "About Us" tanpa sub menu, mengarah ke "Page About Us"
  - Detail page "About Us"
    - Hero menggunakan "Non Homepage Hero"
      - Title : About Us
      - giant title color : white
      - gradient color : yellow
      - button : Kosong
      - Media : default
    - Content 
      - Block pertama menggunakan "About block"
        - Image : default
        - title : We live for thelove of innovation.
        - Description : Discover the power of digital marketing with Gaia Digital Agency, your full-service partner based in Bali. Our experienced global team offers a wide range of services to help businesses around the world achieve their goals.Contact us today to learn more about our services and take the first step toward digital marketing success.
        - Commitment / Vision/ mission list [array]
          - item 1 
            - title : Our Commitment
            - Description : We enable our clients to grow, becoming productive and profitable by sharing with them our industry expertise, our strong business acumen and our technological insight.
          - item 2
            - title : Our Vision
            - Description : Our vision is to help our clients develop, grow and thrive in order to meet the challenges of an ever-changing digital world.   
          - item 3
            - title : Our mission
            - Description : To provide exquisite design, technology and marketing solutions thereby increasing our clients’ business by improving their image, reach and engagement.
      - Block kedua menggunakan "Team Block"
        -  title : Our Team
        - Intro text : Meet the creative minds behind your brand’s exciting next chapter.


4. Lalu navbar ke 4 adalah  "Blog" tanpa sub menu, mengarah ke "Page Blog"
  - Detail page "Blog"
    - Hero menggunakan "Blog Hero"
      - Title : Gaia Stories
    - Content 
      - Block pertama menggunakan "Featured Blog Block"
        - Featured Post : Bebas
      - Block kedua menggunakan "Listing Post Block"
        - Section title : kosong

Untuk teams. buatkan lebih dari 10 data, dengan nama dan jabatan yang berbeda-beda, sesuaikan role dan department nya. masing-masing department minimal 2 orang (team)

Untuk portfolio buatkan masing-masing services minimal 3 portfolio, dan masing-masing memiliki SOW yang disesuaikan.

