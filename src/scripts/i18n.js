// i18n.js — 100% Thai (ภาษาไทย) & English Bilingual Translation Engine
// Khao Sok Riverside Cottages — Elite Silent Luxury Architecture

(function () {
  const STORAGE_KEY = 'ksr_lang';

  // 1. High-Precision Curated Luxury Thai UI Dictionary
  const UI_DICTIONARY = {
    // Top Bar & Controls
    'RESERVATION': 'จองห้องพัก / แพ็คเกจ',
    'Reservation': 'จองห้องพัก',
    'Menu': 'เมนู',
    'MENU': 'เมนู',
    'Close': 'ปิด',
    'CLOSE': 'ปิด',
    'Explore': 'สำรวจ',
    'EXPLORE': 'สำรวจ',
    'The Wild Spirit': 'จิตวิญญาณแห่งผืนป่า',
    'Editorial Index': 'ดัชนีเนื้อหาและบริการ',

    // Mega Menu Chapters
    'Packages': 'แพ็คเกจทัวร์',
    'Guaranteed lowest direct rates': 'รับประกันราคาจองตรงดีที่สุด',
    'Book a Package (Best Value)': 'จองแพ็คเกจทัวร์ (คุ้มค่าที่สุด)',
    'All Tour Packages': 'แพ็คเกจทัวร์ทั้งหมด',
    'Grand Jungle Tour (4D/3N)': 'แกรนด์จังเกิ้ลทัวร์ นอนแพเขื่อน (4 วัน 3 คืน)',
    'Riverside & Rafthouse (3D/2N)': 'ริเวอร์ไซด์และแพลอยน้ำ (3 วัน 2 คืน)',
    'Rainforest Adventure (3D/2N)': 'ผจญภัยป่าฝนและเดย์ทริปเขื่อน (3 วัน 2 คืน)',
    'Khao Sok Delight (3D/2N)': 'เขาสกดีไลท์ & อาบน้ำช้าง (3 วัน 2 คืน)',
    'Spirit of Khao Sok (2D/1N)': 'สปิริตออฟเขาสก (2 วัน 1 คืน)',

    'Cottages': 'ห้องพักคอทเทจ',
    'Traditional riverside architecture': 'บ้านพักไม้ธรรมชาติริมแม่น้ำศก',
    'Book a Room': 'จองห้องพักอย่างเดียว',
    'Riverside Cottages': 'คอทเทจริมแม่น้ำ',
    'Floating Bungalows': 'แพลอยน้ำเขื่อนเชี่ยวหลาน',
    'Family Rooms': 'ห้องพักสำหรับครอบครัว',
    'Room Rates': 'อัตราค่าห้องพัก',

    'Activities': 'กิจกรรมท่องเที่ยว',
    'Deep rainforest & lake adventures': 'กิจกรรมท่องไพรและล่องเรือทะเลสาบ',
    'All Activities': 'กิจกรรมทั้งหมด',
    'Cheow Lan Lake Tours': 'ทัวร์เขื่อนเชี่ยวหลาน',
    'Jungle Trekking': 'เดินป่าธรรมชาติเขาสก',
    'Night Safari': 'ไนท์ซาฟารี ส่องสัตว์กลางคืน',
    'River Tubing & Canoeing': 'ล่องห่วงยางและพายเรือแคนู',
    'Hot Springs': 'บ่อน้ำพุร้อนธรรมชาติโรมณีย์',

    'Dining': 'ห้องอาหาร',
    'Rafflesia Cafe beside the river': 'ราฟเฟลเซีย คาเฟ่ ริมสายน้ำ',
    'Rafflesia Cafe': 'ราฟเฟลเซีย คาเฟ่',
    'Thai & Western Menu': 'เมนูอาหารไทยและอาหารตะวันตก',
    'Resort Facilities': 'สิ่งอำนวยความสะดวกในรีสอร์ท',

    'The Resort': 'เกี่ยวกับรีสอร์ท',
    'Family-owned eco-sanctuary': 'รีสอร์ทอนุรักษ์ธรรมชาติของครอบครัว',
    'Our Story': 'เรื่องราวของเรา',
    'Getting Here': 'การเดินทางมาที่นี่',
    'Facilities & Grounds': 'สิ่งอำนวยความสะดวกและพื้นที่พักผ่อน',
    'Nature Trail': 'เส้นทางศึกษาธรรมชาติ',
    'Sustainability': 'การอนุรักษ์สิ่งแวดล้อม',
    'Resort FAQs': 'คำถามที่พบบ่อยเกี่ยวกับรีสอร์ท',

    'The Park': 'อุทยานแห่งชาติเขาสก',
    '160 million years of biodiversity': 'ความหลากหลายทางชีวภาพกว่า 160 ล้านปี',
    'National Park Guide': 'คู่มือท่องเที่ยวอุทยานแห่งชาติ',
    'Cheow Lan Lake Guide': 'คู่มือเขื่อนเชี่ยวหลาน',
    'Wildlife Guide': 'คู่มือสัตว์ป่าและพันธุ์พืช',
    'Thai Culture': 'วัฒนธรรมและวิถีชีวิตไทย',
    'Weather & Seasons': 'สภาพอากาศและฤดูกาล',

    'Contact': 'ติดต่อเรา',
    'Directions, FAQs & Concierge': 'เส้นทางเดินทาง และฝ่ายบริการลูกค้า',
    'Contact Us': 'ติดต่อเรา',
    'Plan Your Stay': 'วางแผนการเดินทาง',
    'Map & Directions': 'แผนที่และเส้นทาง',
    'FAQs (46 Questions)': 'คำถามที่พบบ่อย (46 ข้อ)',
    'Field Blog': 'บล็อกและเรื่องเล่าจากพื้นที่',

    // Booking Split System (2-Pillars)
    'Select Your Booking Experience': 'เลือกรูปแบบการจองที่คุณต้องการ',
    'Choose How You Wish to Stay': 'เลือกประสบการณ์การพักผ่อนของคุณ',
    'Book a Tour Package': 'จองแพ็คเกจทัวร์รวมกิจกรรม',
    'Book a Room Only': 'จองเฉพาะห้องพัก (เลือกกิจกรรมภายหลัง)',
    '★ Most Popular · Best Value': '★ ยอดนิยมสูงสุด · คุ้มค่าที่สุด',
    'Flexible Stay': 'พักผ่อนแบบยืดหยุ่น',
    'Resort cottages + Cheow Lan Lake floating house + safaris + all meals.': 'บ้านพักริมน้ำ + แพลอยน้ำเขื่อนเชี่ยวหลาน + ส่องสัตว์ + อาหารครบทุกมื้อ',
    'Handcrafted wooden cottages beside the Sok river. Choose activities upon arrival.': 'บ้านพักไม้ธรรมชาติริมแม่น้ำศก สามารถเลือกซื้อกิจกรรมทัวร์ได้ที่เคาน์เตอร์เมื่อมาถึง',
    'From ฿2,300 to ฿7,100 / person': 'ตั้งแต่ ฿2,300 ถึง ฿7,100 / ท่าน',
    'From ฿1,100 to ฿2,000 / night': 'ตั้งแต่ ฿1,100 ถึง ฿2,000 / คืน',

    // Package Form Fields
    'Select Your Desired Package *': 'เลือกแพ็คเกจทัวร์ที่ต้องการ *',
    'Preferred Start Date *': 'วันที่ต้องการเริ่มทัวร์ *',
    'Number of Adults *': 'จำนวนผู้ใหญ่ *',
    'Children (under 12)': 'เด็ก (อายุต่ำกว่า 12 ปี)',
    'Lead Guest Full Name *': 'ชื่อ-นามสกุล ผู้จองหลัก *',
    'Email Address *': 'ที่อยู่อีเมล *',
    'WhatsApp / Phone *': 'เบอร์โทรศัพท์ / WhatsApp *',
    'Transfer / Pickup Needed?': 'ต้องการบริการรถรับส่งหรือไม่?',
    'Dietary Needs or Special Requests': 'ความต้องการพิเศษหรือข้อจำกัดด้านอาหาร',
    'Zero deposit. We confirm via WhatsApp/Email within 12h.': 'ไม่ต้องจ่ายมัดจำล่วงหน้า ยืนยันการจองทาง WhatsApp/อีเมล ภายใน 12 ชม.',
    'Instant Beds24 Booking ↗': 'จองทันทีผ่านระบบ Beds24 ↗',
    'Send Package Reservation Request →': 'ส่งคำขอจองแพ็คเกจทัวร์ →',

    // Room Form Fields
    'Select Cottage Category *': 'เลือกประเภทห้องพักคอทเทจ *',
    'Check-In Date *': 'วันที่เช็คอิน *',
    'Check-Out Date *': 'วันที่เช็คเอาท์ *',
    'Adults *': 'ผู้ใหญ่ *',
    'Children': 'เด็ก',
    'Guest Full Name *': 'ชื่อ-นามสกุล *',
    'WhatsApp / Mobile *': 'เบอร์โทรศัพท์ / WhatsApp *',
    'Free Bus Stop Pickup: We are arriving by public minivan/bus at Khao Sok bus station on Highway 401 and request free pickup upon arrival.': 'บริการรับส่งฟรีจากจุดจอดรถบัส: เดินทางมาด้วยรถตู้หรือรถประจำทางที่จุดจอดเขาสก (ถนน 401) และขอรับบริการรับส่งฟรีมายังรีสอร์ท',
    'Special Requests or Estimated Arrival Time': 'คำขอพิเศษ หรือเวลาที่คาดว่าจะมาถึง',
    'No advance payment. Pay at resort check-in.': 'ไม่ต้องจ่ายเงินล่วงหน้า ชำระเงินเมื่อเช็คอินที่รีสอร์ท',
    'Live Beds24 Channel ↗': 'ตรวจสอบห้องว่างสดทาง Beds24 ↗',
    'Send Room Reservation Request →': 'ส่งคำขอจองห้องพัก →',

    // Honor System Notice
    'The Khao Sok Honor System': 'ระบบเกียรติยศแห่งเขาสก (ความไว้วางใจซึ่งกันและกัน)',
    'Book With Complete Confidence': 'จองได้อย่างมั่นใจ 100%',
    'No advance deposits or credit card pre-payments required. We rely on mutual trust — simply pay upon arrival at Khao Sok Riverside Cottages. Guaranteed lowest direct prices.': 'ไม่ต้องวางเงินมัดจำล่วงหน้า และไม่ต้องตัดบัตรเครดิต เราเชื่อมั่นในความไว้วางใจซึ่งกันและกัน — เพียงชำระเงินเมื่อเดินทางมาถึงเขาสก ริเวอร์ไซด์ คอทเทจ รับประกันราคาตรงที่ดีที่สุด',

    // Comparison Matrix
    'Comparison Matrix': 'ตารางเปรียบเทียบความแตกต่าง',
    'Packages vs. Room Only': 'เปรียบเทียบ: แพ็คเกจทัวร์ vs จองเฉพาะห้องพัก',
    'Understand what is included with each booking method before finalizing.': 'ทำความเข้าใจสิ่งที่รวมอยู่ในแต่ละรูปแบบก่อนตัดสินใจจอง',

    // Bento Packages
    'Choose Your Khao Sok Expedition': 'เลือกการผจญภัยในเขาสกของคุณ',
    'Curated Tour Packages · Guaranteed Lowest Direct Rates': 'แพ็คเกจทัวร์คัดสรรพิเศษ · รับประกันราคาตรงต่ำสุด',
    'Signature Expedition · 4D / 3N': 'แพ็คเกจซิกเนเจอร์ · 4 วัน / 3 คืน',
    'Lake Overnight · 3D / 2N': 'นอนแพริมน้ำเขื่อน · 3 วัน / 2 คืน',
    'Lake Day Explorer · 3D / 2N': 'สำรวจทะเลสาบแบบเดย์ทริป · 3 วัน / 2 คืน',
    'Wildlife & Culture · 3D / 2N': 'สัตว์ป่าและวิถีชีวิตไทย · 3 วัน / 2 คืน',
    'Quick Escape · 2D / 1N': 'พักผ่อนช่วงสั้น · 2 วัน / 1 คืน',
    'Lake Overnight Sanctuary': 'พักค้างคืนบนแพลอยน้ำเขื่อนเชี่ยวหลาน',
    'Resort Base': 'พักที่รีสอร์ทริมน้ำ',
    'Book This Package': 'จองแพ็คเกจนี้',
    'Full Itinerary': 'ดูโปรแกรมการเดินทางฉบับเต็ม',
    'Book': 'จองทันที',
    'Details': 'รายละเอียด',

    // Activities Bento
    'Choose Your Adventure': 'เลือกการผจญภัยที่คุณชื่นชอบ',
    'Four Adventure Chapters · Reserve Upon Arrival': '4 หมวดหมู่กิจกรรม · สามารถจองได้เมื่อเดินทางมาถึง',
    'Lake Tours': 'ทัวร์เขื่อนและทะเลสาบเชี่ยวหลาน',
    'Hiking & Trekking': 'เดินป่าและท่องไพรเขาสก',
    'Local Adventures': 'การผจญภัยทางสายน้ำและสัตว์ป่า',
    'Thai Culture & Spa': 'วัฒนธรรมไทย อาหาร และนวดเพื่อสุขภาพ',
    'Explore Lake Tours': 'ดูทัวร์เขื่อนทั้งหมด',
    'Explore Hiking & Trekking': 'ดูทัวร์เดินป่าทั้งหมด',
    'Explore Local Adventures': 'ดูกิจกรรมท้องถิ่นทั้งหมด',
    'Explore Culture & Spa': 'ดูวัฒนธรรมและสปาทั้งหมด',
    'CONCIERGE & RECEPTION DESK': 'เคาน์เตอร์บริการข้อมูลและกิจกรรมท่องเที่ยว',
    'You can book all your Khao Sok tours with reception when you arrive.': 'คุณสามารถเลือกและจองทัวร์เขาสกทั้งหมดได้โดยตรงที่แผนกต้อนรับเมื่อมาถึง',
    'Browse Packages': 'เลือกดูแพ็คเกจทัวร์',
    'Book Rooms Only': 'จองเฉพาะห้องพัก',

    // Reviews & Trust Bar
    'Verified Google & Global Traveler Reviews': 'รีวิวจากแขกผู้เข้าพักจริงบน Google และแพลตฟอร์มระดับโลก',
    'Thoughts from our Guests': 'ความประทับใจจากแขกผู้มาเยือน',
    '564+ Verified Google Reviews': 'กว่า 564+ รีวิวที่ได้รับการยืนยันบน Google',
    'Read All Google Reviews': 'อ่านรีวิวทั้งหมดบน Google Maps',
    'No Advance Deposit Required · Free Bus Pickup': 'ไม่ต้องจ่ายมัดจำล่วงหน้า · บริการรับส่งฟรีจากจุดจอดรถบัส',

    // Editorial & Sanctuary Signatures
    'NOWHERE ELSE': 'ที่ซึ่งไม่มีที่ใดเหมือน',
    'DISCOVER': 'ค้นพบเรื่องราว',
    'SOK RIVER CANOPY': 'ร่มเงาแห่งสายน้ำศก',
    'SURAT THANI · THAILAND': 'สุราษฎร์ธานี · ประเทศไทย',
    '01 / OVERVIEW': '01 / ภาพรวม',
    'Rainforest Living': 'วิถีชีวิตท่ามกลางป่าฝน',
    'Atmosphere': 'บรรยากาศ',
    'On the Sok River': 'ริมแม่น้ำศก',
    'Arrival': 'การเดินทางมาถึง',
    'Free Bus Pickup': 'บริการรับส่งฟรีจากจุดจอดรถบัส',
    'Heritage': 'มรดกความทรงจำ',
    'Family Owned': 'บริหารงานด้วยความอบอุ่นของครอบครัว',
    'Ethos': 'อุดมการณ์',
    'Responsible Eco-Tourism': 'การท่องเที่ยวเชิงอนุรักษ์',
    'Untouched Wilderness': 'ธรรมชาติอันบริสุทธิ์',
    'Khao Sok National Park': 'อุทยานแห่งชาติเขาสก',
    'What makes us unique?': 'อะไรทำให้เราแตกต่าง?',
    'Direct riverside beach access, gentle freshwater rapids & swimming beneath karst towers.': 'ติดชายหาดริมแม่น้ำศก สายน้ำใสสะอาด และวิวภูเขาหินปูนตระการตา',
    'Complimentary private pickup from the Khao Sok village bus stop upon your arrival.': 'บริการรถรับส่งฟรีจากจุดจอดรถประจำทางหมู่บ้านเขาสกเมื่อท่านเดินทางมาถึง',
    'Genuine Thai warmth and heartfelt personal hospitality from your first email to checkout.': 'ความอบอุ่นและไมตรีจิตแบบไทยแท้ ตั้งแต่อีเมลแรกจนถึงวันเดินทางกลับ',
    'Active giving-back through village schools, local naturalist training & rainforest conservation.': 'ร่วมสนับสนุนโรงเรียนในชุมชน อบรมมัคคุเทศก์ท้องถิ่น และอนุรักษ์ผืนป่าฝน',

    // Master Verbatim Overview & Storytelling
    'Overlooking the rainforest of the national park, our Khao Sok hotel is the perfect place to explore, swim, and relax into nature. Riverside Cottages is a Khao Sok national park hotel that sits on the river a few kilometers from the park headquarters. It is pleasantly apart from the noise of the town center. Are you wondering where to stay in Khao Sok? Our mission is to provide affordable accommodation in comfortable traditional Thai cottages.': 'โรงแรมเขาสก ริเวอร์ไซด์ คอทเทจ ตั้งอยู่ริมสายน้ำท่ามกลางผืนป่าฝนอันอุดมสมบูรณ์ของอุทยานแห่งชาติเขาสก เป็นสถานที่พักผ่อนที่สมบูรณ์แบบสำหรับการออกสำรวจ เล่นน้ำในลำธารใส และผ่อนคลายไปกับธรรมชาติอันบริสุทธิ์ รีสอร์ทตั้งอยู่ริมแม่น้ำห่างจากที่ทำการอุทยานฯ เพียงไม่กี่กิโลเมตร เงียบสงบ ปราศจากเสียงรบกวนจากตัวเมือง หากท่านกำลังมองหาที่พักในเขาสก เรามุ่งมั่นมอบประสบการณ์การพักผ่อนที่แสนสบายในบ้านพักไม้สไตล์ไทยดั้งเดิม ในราคาที่คุ้มค่า',
    '02 / HERITAGE': '02 / มรดกและความผูกพัน',
    'We are a family-owned Khao Sok National Park hotel. Our English-speaking staff will show you genuine kindness from your first email to the time you check out. Your room will be clean, and your food delicious, so you can explore the park from a comfortable base.': 'เราคือรีสอร์ทของครอบครัวท้องถิ่นในอุทยานแห่งชาติเขาสก ทีมงานของเราพร้อมต้อนรับท่านด้วยไมตรีจิตอันอบอุ่นและจริงใจ ตั้งแต่อีเมลแรกจนถึงวันเช็คเอาท์ ห้องพักสะอาด อาหารเลิศรส เพื่อให้ท่านได้ออกสำรวจธรรมชาติอันยิ่งใหญ่จากจุดพักผ่อนที่สะดวกสบาย',
    'Riverside Cottages is less than 3 hours travel from Phuket, Krabi, or Koh Samui. We\'ll pick you up for free at the local bus stop, and we can also send a private car.': 'เขาสก ริเวอร์ไซด์ คอทเทจ อยู่ห่างจากภูเก็ต กระบี่ หรือเกาะสมุย ไม่ถึง 3 ชั่วโมง เรามีบริการรับส่งฟรีจากจุดจอดรถประจำทางในหมู่บ้าน และมีบริการจัดหารถตู้ส่วนตัวรับส่งถึงที่',
    '"We love Khao Sok and support responsible tourism. For example, we love to give back by building schools, training guides, and nature education."': '"เรารักเขาสกและมุ่งมั่นส่งเสริมการท่องเที่ยวเชิงอนุรักษ์ เราตอบแทนสังคมด้วยการร่วมสร้างโรงเรียน อบรมมัคคุเทศก์ท้องถิ่น และสนับสนุนการศึกษาด้านธรรมชาติ"',
    '— The Riverside Cottages Family': '— ครอบครัวริเวอร์ไซด์ คอทเทจ',
    'Founders & Local Stewards': 'ผู้ก่อตั้งและผู้ดูแลผืนป่าท้องถิ่น',
    'Explore Thailand\'s oldest and most diverse rainforest, where elephants still roam free.': 'ออกสำรวจป่าดิบชื้นที่เก่าแก่และมีความหลากหลายทางชีวภาพที่สุดของไทย ถิ่นที่อยู่ของช้างป่าและสัตว์ป่านานาชนิด',

    // Expeditions & Bento Grid
    '03 / EXPEDITIONS & STAY': '03 / การผจญภัยและที่พัก',
    'What to do in Khao Sok?': 'มีอะไรให้ทำบ้างในเขาสก?',
    'We can book your activities when you arrive. Explore Thailand\'s oldest and most diverse rainforest, where elephants still roam free.': 'ท่านสามารถเลือกและจองกิจกรรมทั้งหมดได้โดยตรงเมื่อเดินทางมาถึง ร่วมสัมผัสผืนป่าฝนดึกดำบรรพ์ที่เก่าแก่ที่สุดของไทย',
    'All 15+ Activities': 'กิจกรรมทั้งหมดกว่า 15+ รายการ',
    '01 • Crown Jewel of Khao Sok': '01 • อัญมณีแห่งเขาสก',
    'Limestone Karst Peaks & Emerald Waters': 'ยอดเขาหินปูนตระการตาและผืนน้ำสีมรกต',
    'Day excursions and unforgettable overnight floating bungalow stays beneath cathedral limestone cliffs.': 'ทัวร์สัมผัสธรรมชาติแบบไปเช้า-เย็นกลับ และประสบการณ์นอนแพลอยน้ำสุดประทับใจท่ามกลางขุนเขาหินปูนสูงตระหง่าน',
    '02 • Ancient Paths': '02 • เส้นทางเดินป่าดึกดำบรรพ์',
    'Local Naturalist Guides': 'มัคคุเทศก์ผู้เชี่ยวชาญธรรมชาติท้องถิ่น',
    'Khao Sok Trekking': 'เดินป่าธรรมชาติเขาสก',
    'Private hikes tailored to your pace through primary evergreen forest.': 'เส้นทางเดินป่าแบบส่วนตัว ปรับตามความเหมาะสมของท่าน ผ่านผืนป่าดงดิบอันสมบูรณ์',
    '03 • Riverside Living': '03 • พักผ่อนริมสายน้ำ',
    'Authentic Wooden Architecture': 'สถาปัตยกรรมไม้ธรรมชาติแท้',
    'Handcrafted wooden cottages overlooking lush garden canopy & Sok river.': 'บ้านพักไม้ธรรมชาติที่สร้างขึ้นอย่างประณีต มองเห็นทัศนียภาพสวนป่าและแม่น้ำศก',
    '04 • Evening Magic': '04 • มนต์เสน่ห์ยามค่ำคืน',
    'Biodiversity After Dark': 'ความมหัศจรรย์ของสิ่งมีชีวิตยามราตรี',
    'Discover civets, flying squirrels, and nocturnal jungle life.': 'ออกตามหาชะมด กระรอกบิน และสัตว์ป่าหากินกลางคืนกับผู้เชี่ยวชาญ',

    // Tour Packages & Matrix
    '04 / TOUR PACKAGES': '04 / แพ็คเกจทัวร์แนะนำ',
    'Multi-Day Jungle & Lake Expeditions': 'การผจญภัยในป่าฝนและทะเลสาบเขื่อนแบบหลายวัน',
    'Curated multi-day journeys combining riverside relaxation, lake safaris, and rainforest adventures. All-inclusive value with direct booking guarantee.': 'การเดินทางหลายวันที่ออกแบบอย่างพิถีพิถัน รวมการพักผ่อนริมน้ำ ซาฟารีทะเลสาบ และการผจญภัยในป่าฝน คุ้มค่าที่สุดพร้อมรับประกันราคาตรงดีที่สุด',
    'View All 5 Packages': 'ดูแพ็คเกจทัวร์ทั้ง 5 รายการ',
    'Grand Jungle 4-Day': 'แกรนด์จังเกิ้ล 4 วัน 3 คืน',
    'Riverside & Rafthouse 3-Day': 'ริเวอร์ไซด์และแพลอยน้ำ 3 วัน 2 คืน',
    'Rainforest Adventure 3-Day': 'ผจญภัยป่าฝน 3 วัน 2 คืน',
    'Khao Sok Delight 3-Day': 'เขาสกดีไลท์ 3 วัน 2 คืน',
    'Spirit of Khao Sok 2-Day': 'สปิริตออฟเขาสก 2 วัน 1 คืน',
    'Most Comprehensive Expedition': 'การผจญภัยที่สมบูรณ์แบบที่สุด',
    'Riverside Cottage + Lake Floating House': 'พักบ้านพักริมน้ำ + แพลอยน้ำเขื่อน',
    'Best Lake & Safari Balance': 'สมดุลยอดเยี่ยมระหว่างทะเลสาบและซาฟารี',
    'Active Jungle & Cave Trekking': 'เดินป่าและสำรวจถ้ำธรรมชาติ',
    'Wildlife & Elephant Sanctuary': 'สัมผัสสัตว์ป่าและศูนย์ดูแลช้าง',
    'Compact Rainforest Escape': 'พักผ่อนสัมผัสธรรมชาติแบบกระชับ',
    'Book Package': 'จองแพ็คเกจ',
    'View Itinerary': 'ดูโปรแกรมการเดินทาง',

    // Sanctuary Amenities
    '05 / SANCTUARY AMENITIES': '05 / สิ่งอำนวยความสะดวกในรีสอร์ท',
    'Riverside Comforts': 'ความสะดวกสบายริมสายน้ำ',
    'Thoughtfully designed facilities to enhance your rainforest retreat without compromising nature.': 'สิ่งอำนวยความสะดวกที่ได้รับการออกแบบอย่างใส่ใจ เพื่อเติมเต็มการพักผ่อนโดยไม่รบกวนธรรมชาติ',
    'Rafflesia Riverside Restaurant': 'ห้องอาหารราฟเฟลเซียริมแม่น้ำ',
    'Authentic Southern Thai cuisine, fresh tropical fruits, and international favorites served open-air beside the river.': 'อาหารใต้รสชาติต้นตำรับ ผลไม้สดตามฤดูกาล และอาหารนานาชาติ เสิร์ฟท่ามกลางบรรยากาศเปิดโล่งริมแม่น้ำ',
    'Open Daily 07:00 – 21:00': 'เปิดบริการทุกวัน 07:00 – 21:00 น.',
    'Private River Beach': 'หาดทรายธรรมชาติริมแม่น้ำ',
    'Direct steps to gentle freshwater swimming spots and tranquil limestone views.': 'ทางเดินตรงสู่จุดเล่นน้ำธรรมชาติที่ปลอดภัย พร้อมวิวเขาหินปูนอันเงียบสงบ',
    'Natural Swimming · Kayak Launch': 'ว่ายน้ำธรรมชาติ · จุดลงเรือคายัค',
    'Nature Trail & Gardens': 'เส้นทางศึกษาธรรมชาติและสวนป่า',
    'Wander through native tropical flora, medicinal plants, and bird-watching zones.': 'เดินทอดน่องชมพรรณไม้ป่า พืชสมุนไพรท้องถิ่น และจุดชมนกนานาชนิด',
    'On-Site Trail · Bird Watching': 'เส้นทางศึกษาธรรมชาติในรีสอร์ท · กิจกรรมชมนก',
    'Highway 401 Pickup · On Request': 'จุดรับถนนสาย 401 · แจ้งล่วงหน้า',

    // Hospitality & Reviews
    '06 / HOSPITALITY': '06 / เสียงตอบรับและความประทับใจ',
    'Words from our Guests': 'ความประทับใจจากแขกผู้มาเยือน',
    'Real stories and verified experiences from travelers who found their sanctuary in Khao Sok.': 'เรื่องราวและประสบการณ์จริงจากนักเดินทางผู้ค้นพบความสงบสุขในเขาสก',
    'Verified TripAdvisor Rating': 'คะแนนที่ได้รับการยืนยันบน TripAdvisor',
    'Verified Booking.com Score': 'คะแนนที่ได้รับการยืนยันบน Booking.com',
    'Verified Google Reviews Score': 'คะแนนที่ได้รับการยืนยันบน Google Reviews',
    'Fabulous · 1,098+ Verified Reviews': 'ยอดเยี่ยม · กว่า 1,098+ รีวิว',
    'Top Choice · 397+ Verified Reviews': 'ยอดนิยม · กว่า 397+ รีวิว',
    '4.4 / 5 · 564+ Verified Reviews': '4.4 / 5 · กว่า 564+ รีวิว',

    // Plan Your Escape Canopy
    '07 / PLAN YOUR ESCAPE': '07 / วางแผนการเดินทางของคุณ',
    'Ready to experience the ancient rainforest?': 'พร้อมสัมผัสประสบการณ์ในผืนป่าดึกดำบรรพ์หรือยัง?',
    'Whether you wish to reserve a curated multi-day tour package or book a tranquil riverside cottage, our family is here to welcome you.': 'ไม่ว่าท่านจะต้องการจองแพ็คเกจทัวร์หลายวัน หรือพักผ่อนในบ้านพักริมน้ำอันเงียบสงบ ครอบครัวของเรายินดีต้อนรับท่านด้วยใจ',
    'Book a Tour Package →': 'จองแพ็คเกจทัวร์ →',
    'Book a Room Only →': 'จองเฉพาะห้องพัก →',
    'Contact Concierge': 'ติดต่อฝ่ายบริการลูกค้า',

    // Getting Here & Maps
    'HOW TO REACH OUR JUNGLE SANCTUARY': 'การเดินทางมายังรีสอร์ทกลางป่าของเรา',
    'Arrive with Complete Peace of Mind': 'เดินทางสะดวกสบาย ไร้ความกังวล',
    'We coordinate direct private transfers from any airport, train station, or pier in Southern Thailand, and provide free local bus-stop pickup.': 'เรามีบริการจัดหารถตู้ส่วนตัวรับส่งจากสนามบิน สถานีรถไฟ หรือท่าเรือทั่วภาคใต้ พร้อมบริการรับฟรีจากจุดจอดรถประจำทางเขาสก',
    'Interactive Transit Map': 'แผนที่เส้นทางและการเดินทาง',
    'Highway 401, Km 109 · Surat Thani, Thailand': 'ทางหลวงแผ่นดินหมายเลข 401 กม. 109 · สุราษฎร์ธานี',
    'Open in Google Maps ↗': 'เปิดใน Google Maps ↗',

    // Buttons & CTAs
    'Check Availability': 'ตรวจสอบห้องว่าง',
    'Book Your Stay': 'จองที่พักของคุณ',
    'Reserve Direct': 'จองตรงราคาดีที่สุด',
    'View All Cottages': 'ดูบ้านพักทั้งหมด',
    'View All Packages': 'ดูแพ็คเกจทั้งหมด',
    'View All Activities': 'ดูกิจกรรมทั้งหมด',
    'Guest Reviews': 'รีวิวจากแขกผู้เข้าพัก',
    'Read More': 'อ่านต่อ',
    'Show More': 'แสดงเพิ่มเติม',
    'Learn More': 'เรียนรู้เพิ่มเติม',
    'Frequently Asked Questions': 'คำถามที่พบบ่อย',
    'Contact Us': 'ติดต่อเรา',
    'Send Message': 'ส่งข้อความ',

    // Footer
    'Navigation': 'เมนูหลัก',
    'Accommodation': 'ห้องพักคอทเทจ',
    'Tours & Safaris': 'ทัวร์และซาฟารี',
    'The Destination': 'จุดหมายปลายทาง',
    'Getting There': 'การเดินทาง',
    'Sitemap': 'แผนผังเว็บไซต์',
    'Privacy Policy': 'นโยบายความเป็นส่วนตัว',
    'Terms & Conditions': 'ข้อกำหนดและเงื่อนไข',
    'Cancellation Policy': 'นโยบายการยกเลิก',
    'All rights reserved.': 'สงวนลิขสิทธิ์.'
  };

  // Helper: Get Current Language
  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  // Helper: Apply Curated Thai Dictionary to DOM
  function applyDictionary(lang) {
    const isThai = lang === 'th';
    document.documentElement.lang = isThai ? 'th' : 'en';
    if (isThai) {
      document.documentElement.classList.add('lang-th');
    } else {
      document.documentElement.classList.remove('lang-th');
    }

    // Translate all elements with matching text content or data attributes
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (!node.parentElement) return NodeFilter.FILTER_REJECT;
          const tag = node.parentElement.tagName.toLowerCase();
          if (['script', 'style', 'noscript', 'textarea'].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }
          const text = node.nodeValue.trim();
          if (!text) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    const textNodes = [];
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    textNodes.forEach((tNode) => {
      const origText = tNode.nodeValue.trim();
      if (isThai) {
        if (!tNode._origEnglish) {
          tNode._origEnglish = tNode.nodeValue;
        }
        if (UI_DICTIONARY[origText]) {
          tNode.nodeValue = tNode.nodeValue.replace(origText, UI_DICTIONARY[origText]);
        }
      } else {
        if (tNode._origEnglish) {
          tNode.nodeValue = tNode._origEnglish;
        }
      }
    });

    // Translate Inputs & Placeholders
    document.querySelectorAll('input, textarea, select').forEach((input) => {
      if (input.placeholder) {
        if (isThai) {
          if (!input._origPlaceholder) input._origPlaceholder = input.placeholder;
          if (UI_DICTIONARY[input.placeholder.trim()]) {
            input.placeholder = UI_DICTIONARY[input.placeholder.trim()];
          }
        } else if (input._origPlaceholder) {
          input.placeholder = input._origPlaceholder;
        }
      }
    });

    // Update Language Switcher UI (Highlight Active Button)
    updateSwitcherUI(lang);
  }

  // Update Visual State of Language Buttons
  function updateSwitcherUI(lang) {
    document.querySelectorAll('.lang-switch').forEach((container) => {
      const thBtn = container.querySelector('[data-lang="th"]');
      const enBtn = container.querySelector('[data-lang="en"]');
      if (thBtn && enBtn) {
        if (lang === 'th') {
          thBtn.classList.add('active', 'font-bold');
          thBtn.classList.remove('opacity-60', 'font-normal');
          thBtn.setAttribute('aria-pressed', 'true');

          enBtn.classList.remove('active', 'font-bold');
          enBtn.classList.add('opacity-60', 'font-normal');
          enBtn.setAttribute('aria-pressed', 'false');
        } else {
          enBtn.classList.add('active', 'font-bold');
          enBtn.classList.remove('opacity-60', 'font-normal');
          enBtn.setAttribute('aria-pressed', 'true');

          thBtn.classList.remove('active', 'font-bold');
          thBtn.classList.add('opacity-60', 'font-normal');
          thBtn.setAttribute('aria-pressed', 'false');
        }
      }
    });
  }

  // Wipe any Google Translate cookies or residue that Chrome might have stored
  function clearGoogleTranslateResidue() {
    const expired = '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    const host = window.location.hostname;
    document.cookie = 'googtrans' + expired;
    if (host) {
      document.cookie = 'googtrans' + expired + ' Domain=.' + host + ';';
      document.cookie = 'googtrans' + expired + ' Domain=' + host + ';';
    }
    const el = document.getElementById('google_translate_element');
    if (el) el.remove();
    document.querySelectorAll('.goog-te-banner-frame, #goog-gt-tt, .goog-te-balloon-frame').forEach((e) => e.remove());
  }

  // Master Switch Function (100% Native, zero external scripts, zero toolbar)
  function setLanguage(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    clearGoogleTranslateResidue();
    applyDictionary(lang);
  }

  // Global Binding
  window.__ksrSetLang = setLanguage;

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    clearGoogleTranslateResidue();
    const currentLang = getLang();

    // Attach click listeners to all language switcher buttons across header/footer
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.getAttribute('data-lang');
        setLanguage(target);
      });
    });

    // If user previously chose Thai, apply immediately
    if (currentLang === 'th') {
      setLanguage('th');
    } else {
      updateSwitcherUI('en');
    }
  });

})();
