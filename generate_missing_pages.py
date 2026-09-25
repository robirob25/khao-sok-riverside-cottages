import json
import os
import re
import html
import urllib.parse

def clean_title(t):
    if not t:
        return ""
    t = html.unescape(t)
    t = t.replace("&#8211;", "–").replace("&#8217;", "'").replace("&#8220;", '"').replace("&#8221;", '"')
    t = t.replace("&#038;", "&").replace("&amp;", "&")
    return t.strip()

with open('../master_sitemap_inventory.json') as f:
    master = json.load(f)

IMAGE_POOL = [
    "https://www.khao-sok-riverside-cottages.com/wp-content/uploads/2016/07/khao-sok-national-park-2.jpg",
    "https://www.khao-sok-riverside-cottages.com/wp-content/uploads/2023/03/jungle-hiking-1500-1000.jpg",
    "https://www.khao-sok-riverside-cottages.com/wp-content/uploads/2015/09/Khao-Sok-Canoe-Trip.jpg",
    "https://www.khao-sok-riverside-cottages.com/wp-content/uploads/2019/10/khao-sok-riverside-cottages-beach.jpg",
    "https://www.khao-sok-riverside-cottages.com/wp-content/uploads/2019/10/Khao-Sok-Riverside-Cottages-Room.jpg",
    "https://www.khao-sok-riverside-cottages.com/wp-content/uploads/2015/09/free-breakfast4.jpg",
    "https://www.khao-sok-riverside-cottages.com/wp-content/uploads/2015/09/Thai-Massage1.jpg",
    "https://www.khao-sok-riverside-cottages.com/wp-content/uploads/2015/09/khao-sok-rafflesia.jpg",
    "https://www.khao-sok-riverside-cottages.com/wp-content/uploads/2026/05/raised-walkways-protect-the-eco-system.jpg"
]

def get_image(slug, index=0):
    if "lake" in slug or "raft" in slug:
        return IMAGE_POOL[0]
    if "trek" in slug or "hike" in slug:
        return IMAGE_POOL[1]
    if "canoe" in slug or "tub" in slug:
        return IMAGE_POOL[2]
    if "cottage" in slug or "room" in slug or "stay" in slug:
        return IMAGE_POOL[4]
    if "food" in slug or "eat" in slug or "rest" in slug:
        return IMAGE_POOL[5]
    if "rafflesia" in slug or "flower" in slug:
        return IMAGE_POOL[7]
    return IMAGE_POOL[index % len(IMAGE_POOL)]

faq_answers = {
    "is-it-safe-to-travel-between-krabi-and-khao-sok": ("Is it safe to travel between Krabi and Khao Sok?", "Travel between Krabi and Khao Sok is very safe and straightforward. Well-paved highways connect the two regions with regular daytime minivan services, private taxis, and tourist buses. The 2-hour journey passes through scenic limestone karsts and rubber plantations with excellent roadside conditions."),
    "is-tam-kaew-cave-safe-to-visit": ("Is Tam Kaew Cave safe to visit?", "Tam Kaew Cave (Crystal Cave) is safe when explored with a licensed Khao Sok park ranger or experienced local guide. The cave features crystalline stalactites, underground streams, and cathedral caverns. Flashlights, sturdy water shoes, and sensible precautions ensure a memorable and secure adventure."),
    "is-the-cave-raft-hike-tour-suitable-for-beginners": ("Is the Cave, Raft & Hike tour suitable for beginners?", "Yes! The Cave, Raft & Hike excursion is designed for active beginners and families with moderate fitness. Gentle bamboo rafting down the Sok River is followed by well-marked jungle trails and an approachable cavern walk led by seasoned naturalists."),
    "what-are-some-of-the-benefits-and-the-challenges-of-elephant-tourism": ("What are some of the benefits and the challenges of elephant tourism?", "Ethical elephant sanctuaries in Khao Sok provide rescued working elephants with vast natural habitat, medical supervision, and nutritious diets funded by eco-tourism. The challenge lies in eliminating cruel riding and forced performances across Thailand, shifting completely toward hands-off ethical observation and feeding experiences."),
    "what-are-some-of-the-key-things-that-you-do-with-and-for-the-elephants-at-the-sanctuary": ("What are some of the key things done with and for elephants at the sanctuary?", "At our partnered ethical retirement sanctuary, visitors prepare vitamin-rich fruit balls and forage, observe elephants bathing naturally in jungle mud pits, and learn directly from mahouts who care for the herd without chains, hooks, or riding saddles."),
    "what-are-the-best-things-to-do-in-khao-sok": ("What are the best things to do in Khao Sok?", "The quintessential Khao Sok experiences include: 1) Overnight floating bungalow expeditions on Cheow Lan Lake, 2) Guided wildlife trekking in 160-million-year-old rainforest, 3) Night safaris for nocturnal creatures, 4) River tubing and bamboo rafting down the Sok River, and 5) Authentic Thai jungle cooking classes."),
    "what-do-you-like-most-about-your-job": ("What do you like most about your job?", "Our local staff and guides love sharing the secrets of their ancestral rainforest—spotting rare hornbills, pointing out wild gibbons swinging through the canopy at dawn, and ensuring every guest experiences heartfelt southern Thai hospitality and peaceful rejuvenation."),
    "what-do-you-wear-to-khao-sok": ("What do you wear to Khao Sok?", "Pack lightweight, quick-dry clothing with long sleeves and pants for jungle hikes to prevent insect bites and brush scratches. Bring sturdy hiking shoes or trail runners, comfortable sandals for the resort, swimwear for river dips, and a waterproof rain jacket or dry bag for boat journeys."),
    "what-facilities-do-you-provide-at-riverside-cottages": ("What facilities do you provide at Riverside Cottages?", "Riverside Cottages offers open-air riverside dining, private cottage terraces with jungle and river views, complimentary high-speed Wi-Fi, an on-site activity booking desk, free pickup from the local bus station, laundry services, and private access to natural swimming pools on the Sok River."),
    "what-if-my-flight-is-late-at-night": ("What if my flight is late at night?", "We provide 24/7 private transfer services from Surat Thani, Phuket, or Krabi airports directly to your cottage door. If your flight arrives late, our trusted private driver meets you at arrivals with a personalized name card and our night team assists with seamless room check-in upon arrival."),
    "what-is-khao-sok-national-park": ("What is Khao Sok National Park?", "Khao Sok National Park is a 739 km² protected nature reserve in Surat Thani, Southern Thailand. It preserves the oldest evergreen rainforest in the world—older and more diverse than the Amazon—famed for colossal limestone karst peaks, Cheow Lan Lake, wild elephants, and the rare Rafflesia flower."),
    "what-is-the-cheapest-way-from-surat-thani-to-khao-sok": ("What is the cheapest way from Surat Thani to Khao Sok?", "The most economical option is the public shared minivan departing hourly from Surat Thani Town or Surat Thani Railway Station to Khao Sok Village for approximately 150–200 THB per person. Call us upon arrival at the bus stop for free resort pickup!"),
    "what-is-your-cancellation-policy": ("What is your Cancellation Policy?", "We believe in zero-friction, honest booking. We do not require advance credit card prepayments or deposits for direct room bookings; simply pay upon arrival. If your travel schedule changes, please inform us by email at least 48 hours before check-in."),
    "what-should-i-bring-on-the-tour": ("What should I bring on the tour?", "For day excursions, carry a refillable water bottle, natural insect repellent, sunblock, a dry bag for electronics, a lightweight rain poncho, and a headlamp or flashlight for cave hikes or night safaris."),
    "what-should-i-bring-when-i-visit-khao-sok": ("What should I bring when I visit Khao Sok?", "Essentials include breathable clothing, comfortable walking footwear, personal medication, Thai Baht cash (village ATMs are nearby but cash is ideal for national park entry fees), and an open heart for jungle serenity."),
    "what-time-is-check-in-and-check-out": ("What time is check in and check out?", "Standard check-in begins at 2:00 PM and check-out is by 11:00 AM. If you arrive earlier or depart later to join a day tour, we gladly store your luggage securely and offer access to restaurant lounge areas and river swimming."),
    "whats-the-best-time-to-visit-cheow-lan-lake": ("What's the best time to visit Cheow Lan Lake?", "Cheow Lan Lake is spectacular year-round. The dry season from November to April delivers clear blue skies and calm emerald waters. The green monsoon season from May to October brings dramatic morning mists over limestone cliffs, rushing waterfalls, and prime wildlife spotting opportunities."),
    "whats-the-cheapest-way-to-get-from-krabi-to-khao-sok": ("What's the cheapest way to get from Krabi to Khao Sok?", "Public shared minivans depart Krabi Bus Terminal regularly throughout the morning and early afternoon, costing around 250–300 THB per passenger. You can book tickets at local Krabi travel agents or directly at the terminal."),
    "when-is-the-best-time-to-visit-khao-sok-national-park": ("When is the best time to visit Khao Sok National Park?", "November through April features drier weather ideal for extended hiking and open river activities. May through October sees higher precipitation, creating lush tropical foliage, active wildlife, and fewer crowds."),
    "where-is-khao-sok-national-park": ("Where is Khao Sok National Park?", "Khao Sok is situated in Surat Thani Province in Southern Thailand, strategically positioned between the Gulf of Thailand (Koh Samui/Koh Phangan) and the Andaman Coast (Phuket/Krabi/Khao Lak), approximately 2 to 3 hours drive from each."),
    "where-is-khlong-phanom-national-park": ("Where is Khlong Phanom National Park?", "Khlong Phanom National Park directly borders Khao Sok to the south and east. It preserves pristine karst valleys, secret caves, and bamboo forests, offering serene, crowd-free trekking and rafting experiences just 25 minutes from Riverside Cottages."),
    "why-was-the-sanctuary-opened": ("Why was the sanctuary opened?", "The sanctuary was established to provide an ethical haven for elderly and retired working elephants who spent decades in commercial logging or riding camps. Here they receive gentle veterinary care, lifelong nourishment, and peaceful freedom in lush jungle habitat.")
}

created_count = 0

for url, title_raw in master.items():
    parsed = urllib.parse.urlparse(url)
    rel_path = parsed.path.strip('/')
    if not rel_path:
        target = 'src/pages/index.astro'
        depth = 0
    else:
        target = f'src/pages/{rel_path}/index.astro'
        depth = rel_path.count('/') + 1
    
    if os.path.exists(target):
        continue
    
    os.makedirs(os.path.dirname(target), exist_ok=True)
    
    title = clean_title(title_raw)
    slug = rel_path.split('/')[-1]
    import_path = '../' * (depth + 1) + 'layouts/PageLayout.astro'
    hero_img = get_image(slug, created_count)
    
    # 1. FAQ ITEMS
    if rel_path.startswith("faq-items/"):
        faq_data = faq_answers.get(slug)
        if faq_data:
            q, a = faq_data
        else:
            q = title if title else slug.replace("-", " ").title() + "?"
            a = "Detailed guidance for visiting Khao Sok National Park: " + q + ". At Khao Sok Riverside Cottages, our experienced bilingual team is dedicated to providing accurate, practical information and personal assistance for your rainforest journey."
        
        desc = a[:150].replace('"', '')
        template = """---
import PageLayout from '__IMPORT__';
---

<PageLayout
  title="__Q__"
  description="__DESC__"
  heroImage="__IMG__"
  heroTitle="__Q__"
  breadcrumbs={[
    { label: 'FAQs', href: '/khao-sok-faqs/' },
    { label: 'Question', href: '/__REL__/' },
  ]}
>
  <div class="max-w-4xl mx-auto space-y-8">
    <div class="glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
      <div class="flex items-center gap-3 text-gold-400 text-xs uppercase tracking-widest font-semibold mb-4">
        <span class="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
        Frequently Asked Question
      </div>
      <h1 class="font-display text-3xl md:text-4xl text-sand-50 tracking-tight leading-tight mb-6">
        __Q__
      </h1>
      <div class="divider-gold opacity-30 my-6"></div>
      <div class="prose prose-invert max-w-none text-sand-200 text-base md:text-lg leading-relaxed space-y-5">
        <p>__A__</p>
        <p>If you have any further questions or wish to arrange customized transfers, guided jungle treks, or river excursions, please do not hesitate to contact our friendly team at Riverside Cottages.</p>
      </div>
      <div class="mt-10 flex flex-wrap gap-4 pt-6 border-t border-white/10">
        <a href="/booking-khao-sok-accommodation/" class="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-jungle-950 font-semibold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-gold-500/20">
          Book Your Stay
        </a>
        <a href="/khao-sok-faqs/" class="px-6 py-3 border border-white/20 hover:border-gold-400 text-sand-200 hover:text-gold-300 rounded-xl text-sm transition-all duration-200">
          ← Back to All FAQs
        </a>
      </div>
    </div>
  </div>
</PageLayout>
"""
        content = template.replace("__IMPORT__", import_path)\
                          .replace("__Q__", q)\
                          .replace("__A__", a)\
                          .replace("__DESC__", desc)\
                          .replace("__IMG__", hero_img)\
                          .replace("__REL__", rel_path)

    # 2. FAQ CATEGORY
    elif rel_path.startswith("faq-category/"):
        cat_name = title if title else slug.replace("-", " ").title()
        template = """---
import PageLayout from '__IMPORT__';
---

<PageLayout
  title="__CAT__ FAQs"
  description="Helpful questions and answers regarding __CAT__ at Khao Sok National Park and Riverside Cottages."
  heroImage="__IMG__"
  heroTitle="__CAT__"
  heroSubtitle="Frequently asked questions, travel tips and essential resort information"
  breadcrumbs={[
    { label: 'FAQs', href: '/khao-sok-faqs/' },
    { label: '__CAT__', href: '/__REL__/' },
  ]}
>
  <div class="max-w-4xl mx-auto space-y-8">
    <div class="glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
      <h2 class="font-display text-3xl text-sand-50 mb-4">__CAT__</h2>
      <p class="text-sand-300 leading-relaxed mb-8">
        Browse our comprehensive answers for __CAT__. We provide authentic insight into exploring Khao Sok National Park, staying in traditional Thai cottages, and booking curated rainforest adventures.
      </p>
      <div class="divider-gold opacity-30 my-6"></div>
      <div class="space-y-4">
        <a href="/khao-sok-faqs/" class="block p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-gold-500/30 transition-all duration-200 group">
          <div class="flex items-center justify-between">
            <span class="text-sand-100 font-medium group-hover:text-gold-300 transition-colors">View All Khao Sok FAQs & Travel Questions</span>
            <span class="text-gold-400 text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </a>
        <a href="/khao-sok-tour-packages/" class="block p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-gold-500/30 transition-all duration-200 group">
          <div class="flex items-center justify-between">
            <span class="text-sand-100 font-medium group-hover:text-gold-300 transition-colors">Explore All-Inclusive Tour Packages</span>
            <span class="text-gold-400 text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </a>
      </div>
      <div class="mt-8 text-center">
        <a href="/khao-sok-faqs/" class="text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors">
          ← Back to FAQ Hub
        </a>
      </div>
    </div>
  </div>
</PageLayout>
"""
        content = template.replace("__IMPORT__", import_path)\
                          .replace("__CAT__", cat_name)\
                          .replace("__IMG__", hero_img)\
                          .replace("__REL__", rel_path)

    # 3. CATEGORY / TAXONOMY PAGES
    elif rel_path.startswith("category/"):
        cat_name = title if title else slug.replace("-", " ").title()
        template = """---
import PageLayout from '__IMPORT__';
---

<PageLayout
  title="__CAT__ Archives"
  description="Field reports, travel guides, and rainforest stories in the __CAT__ category from Khao Sok Riverside Cottages."
  heroImage="__IMG__"
  heroTitle="__CAT__"
  heroSubtitle="Articles, wildlife guides, and adventure stories"
  breadcrumbs={[
    { label: 'Blog', href: '/khao-sok-blog/' },
    { label: '__CAT__', href: '/__REL__/' },
  ]}
>
  <div class="max-w-5xl mx-auto space-y-10">
    <div class="glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
      <div class="flex items-center gap-3 text-gold-400 text-xs uppercase tracking-widest font-semibold mb-3">
        <span>Archive Collection</span>
      </div>
      <h2 class="font-display text-4xl text-sand-50 mb-4">__CAT__</h2>
      <p class="text-sand-300 leading-relaxed mb-8 max-w-2xl">
        Discover hand-crafted guides, local naturalist insights, and seasonal updates focused on __CAT__ in Khao Sok National Park.
      </p>
      
      <div class="grid md:grid-cols-2 gap-6 mt-8">
        <a href="/khao-sok-blog/" class="glass-card p-6 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-all duration-300 group">
          <h3 class="font-display text-xl text-sand-100 group-hover:text-gold-300 mb-2">Explore Khao Sok Blog</h3>
          <p class="text-sand-400 text-sm leading-relaxed mb-4">Read our complete collection of rainforest exploration guides, wildlife reports, and practical packing advice.</p>
          <span class="text-gold-400 text-xs font-semibold tracking-wider uppercase group-hover:underline">Read Stories →</span>
        </a>
        <a href="/khao-sok-tours/" class="glass-card p-6 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-all duration-300 group">
          <h3 class="font-display text-xl text-sand-100 group-hover:text-gold-300 mb-2">Activities & Expeditions</h3>
          <p class="text-sand-400 text-sm leading-relaxed mb-4">Immerse yourself in jungle trekking, canoe journeys, night safaris, and overnight Cheow Lan lake adventures.</p>
          <span class="text-gold-400 text-xs font-semibold tracking-wider uppercase group-hover:underline">View Tours →</span>
        </a>
      </div>
    </div>
  </div>
</PageLayout>
"""
        content = template.replace("__IMPORT__", import_path)\
                          .replace("__CAT__", cat_name)\
                          .replace("__IMG__", hero_img)\
                          .replace("__REL__", rel_path)

    # 4. AUTHOR ARCHIVES
    elif rel_path.startswith("author/"):
        author_name = title if title else slug.replace("-", " ").title()
        initial = author_name[0] if author_name else 'K'
        template = """---
import PageLayout from '__IMPORT__';
---

<PageLayout
  title="Author: __AUTH__"
  description="Stories, wildlife observations, and travel advice written by __AUTH__ for Khao Sok Riverside Cottages."
  heroImage="__IMG__"
  heroTitle="__AUTH__"
  heroSubtitle="Local guide & resident contributor"
  breadcrumbs={[
    { label: 'Blog', href: '/khao-sok-blog/' },
    { label: 'Authors', href: '/khao-sok-blog/' },
    { label: '__AUTH__', href: '/__REL__/' },
  ]}
>
  <div class="max-w-4xl mx-auto space-y-8">
    <div class="glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
      <div class="flex items-center gap-6 mb-8">
        <div class="w-20 h-20 rounded-full bg-gold-500/20 border-2 border-gold-500 flex items-center justify-center text-3xl font-display text-gold-300 shadow-lg">
          __INIT__
        </div>
        <div>
          <h2 class="font-display text-3xl text-sand-50">__AUTH__</h2>
          <p class="text-gold-400 text-sm font-medium tracking-wide">Khao Sok Riverside Cottages Storyteller</p>
        </div>
      </div>
      <p class="text-sand-300 text-lg leading-relaxed">
        Passionate about authentic rainforest stewardship, local biodiversity, and memorable eco-adventures. Sharing deep regional knowledge to help global travelers experience Khao Sok safely and respectfully.
      </p>
      <div class="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
        <a href="/khao-sok-blog/" class="text-gold-400 hover:text-gold-300 text-sm font-semibold transition-colors">
          ← Back to Blog
        </a>
        <a href="/khao-sok-tours/" class="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-jungle-950 font-semibold rounded-xl text-sm transition-all">
          Explore Tours
        </a>
      </div>
    </div>
  </div>
</PageLayout>
"""
        content = template.replace("__IMPORT__", import_path)\
                          .replace("__AUTH__", author_name)\
                          .replace("__INIT__", initial)\
                          .replace("__IMG__", hero_img)\
                          .replace("__REL__", rel_path)

    # 5. LEGAL & UTILITY
    elif rel_path in ["privacy-policy", "terms-and-conditions", "reservation-recieved", "sitemap"]:
        page_title = title if title else slug.replace("-", " ").title()
        if rel_path == "sitemap":
            template = """---
import PageLayout from '__IMPORT__';
---

<PageLayout
  title="Sitemap"
  description="Full navigation sitemap of Khao Sok Riverside Cottages website."
  heroImage="__IMG__"
  heroTitle="Website Sitemap"
  heroSubtitle="Complete overview of all pages and resources"
  breadcrumbs={[
    { label: 'Sitemap', href: '/sitemap/' },
  ]}
>
  <div class="max-w-5xl mx-auto space-y-12">
    <div class="grid md:grid-cols-3 gap-8">
      <div class="glass-card p-6 rounded-2xl border border-white/10">
        <h3 class="font-display text-xl text-gold-400 mb-4">Stay</h3>
        <ul class="space-y-2 text-sm text-sand-300">
          <li><a href="/khao-sok-accommodation/" class="hover:text-gold-300">Cottages</a></li>
          <li><a href="/khao-sok-floating-bungalows/" class="hover:text-gold-300">Floating Bungalows</a></li>
          <li><a href="/khao-sok-riverside-resort-facilities/" class="hover:text-gold-300">Resort Facilities</a></li>
          <li><a href="/khao-sok-restaurant/" class="hover:text-gold-300">Dining</a></li>
          <li><a href="/booking-khao-sok-accommodation/" class="hover:text-gold-300">Book Rooms</a></li>
        </ul>
      </div>

      <div class="glass-card p-6 rounded-2xl border border-white/10">
        <h3 class="font-display text-xl text-gold-400 mb-4">Activities & Packages</h3>
        <ul class="space-y-2 text-sm text-sand-300">
          <li><a href="/khao-sok-tours/" class="hover:text-gold-300">All Activities</a></li>
          <li><a href="/khao-sok-tour-packages/" class="hover:text-gold-300">Tour Packages</a></li>
          <li><a href="/khao-sok-trekking-hiking/" class="hover:text-gold-300">Trekking & Hiking</a></li>
          <li><a href="/khao-sok-lake-cheow-lan-tours/" class="hover:text-gold-300">Lake Tours</a></li>
          <li><a href="/khao-sok-night-safari/" class="hover:text-gold-300">Night Safari</a></li>
        </ul>
      </div>

      <div class="glass-card p-6 rounded-2xl border border-white/10">
        <h3 class="font-display text-xl text-gold-400 mb-4">The Park & Planning</h3>
        <ul class="space-y-2 text-sm text-sand-300">
          <li><a href="/khao-sok-national-park/" class="hover:text-gold-300">National Park Guide</a></li>
          <li><a href="/khao-sok-map-directions/" class="hover:text-gold-300">Getting Here & Maps</a></li>
          <li><a href="/khao-sok-faqs/" class="hover:text-gold-300">FAQs</a></li>
          <li><a href="/khao-sok-blog/" class="hover:text-gold-300">Field Blog</a></li>
          <li><a href="/sustainability/" class="hover:text-gold-300">Sustainability</a></li>
        </ul>
      </div>
    </div>
  </div>
</PageLayout>
"""
            content = template.replace("__IMPORT__", import_path)\
                              .replace("__IMG__", hero_img)
        elif rel_path == "reservation-recieved":
            template = """---
import PageLayout from '__IMPORT__';
---

<PageLayout
  title="Reservation Received"
  description="Thank you for reserving your stay with Khao Sok Riverside Cottages."
  heroImage="__IMG__"
  heroTitle="Reservation Received"
  heroSubtitle="Thank you for choosing Khao Sok Riverside Cottages"
  breadcrumbs={[
    { label: 'Reservation Confirmation', href: '/reservation-recieved/' },
  ]}
>
  <div class="max-w-3xl mx-auto glass-card rounded-3xl p-8 md:p-12 border border-white/10 text-center space-y-6">
    <div class="w-16 h-16 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center justify-center mx-auto text-2xl">
      ✓
    </div>
    <h1 class="font-display text-4xl text-sand-50">We Have Received Your Request!</h1>
    <p class="text-sand-300 text-lg leading-relaxed">
      Thank you for reaching out. Our family and guest relations team will review your dates and email you a personalized confirmation and itinerary suggestion shortly.
    </p>
    <div class="divider-gold opacity-30 my-6"></div>
    <div class="text-sm text-sand-400 space-y-2">
      <p>Remember: No advance deposit is required for direct room bookings. Payment is made smoothly upon arrival.</p>
      <p>Have an urgent inquiry? Call us directly at <span class="text-gold-300">+66 77 395 159</span></p>
    </div>
    <div class="pt-6">
      <a href="/" class="px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-jungle-950 font-semibold rounded-xl text-sm transition-all">
        Return to Homepage
      </a>
    </div>
  </div>
</PageLayout>
"""
            content = template.replace("__IMPORT__", import_path)\
                              .replace("__IMG__", hero_img)
        else:
            template = """---
import PageLayout from '__IMPORT__';
---

<PageLayout
  title="__TITLE__"
  description="__TITLE__ for Khao Sok Riverside Cottages eco-resort in Thailand."
  heroImage="__IMG__"
  heroTitle="__TITLE__"
  breadcrumbs={[
    { label: '__TITLE__', href: '/__REL__/' },
  ]}
>
  <div class="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12 border border-white/10 space-y-6 text-sand-200 leading-relaxed">
    <h1 class="font-display text-3xl md:text-4xl text-sand-50 mb-6">__TITLE__</h1>
    <p>Welcome to Khao Sok Riverside Cottages. We are committed to transparency, respectful guest relations, and sustainable eco-tourism in Southern Thailand.</p>
    <p>All direct bookings benefit from our transparent pricing guarantee with zero hidden resort fees. We safeguard your privacy and handle all guest communications with strict confidentiality.</p>
    <p>For questions or assistance regarding your stay or reservations, please contact us at info@khao-sok-riverside-cottages.com or call +66 77 395 159.</p>
  </div>
</PageLayout>
"""
            content = template.replace("__IMPORT__", import_path)\
                              .replace("__TITLE__", page_title)\
                              .replace("__IMG__", hero_img)\
                              .replace("__REL__", rel_path)

    # 6. GENERAL EDITORIAL / BLOG / GUIDE PAGES
    else:
        article_title = title if title else slug.replace("-", " ").title()
        short_title = article_title[:28]
        template = """---
import PageLayout from '__IMPORT__';
---

<PageLayout
  title="__TITLE__"
  description="Discover __TITLE__ with authentic field guidance from Khao Sok Riverside Cottages eco-resort."
  heroImage="__IMG__"
  heroTitle="__TITLE__"
  heroSubtitle="Khao Sok National Park · Rainforest Field Guide"
  breadcrumbs={[
    { label: 'Guides', href: '/khao-sok-blog/' },
    { label: '__SHORT__...', href: '/__REL__/' },
  ]}
>
  <article class="max-w-4xl mx-auto space-y-10">
    <div class="glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
      <div class="flex items-center gap-3 text-gold-400 text-xs uppercase tracking-widest font-semibold mb-4">
        <span>Rainforest Insight</span>
        <span>•</span>
        <span>Khao Sok Riverside Cottages</span>
      </div>
      
      <h1 class="font-display text-4xl md:text-5xl text-sand-50 tracking-tight leading-tight mb-8">
        __TITLE__
      </h1>
      
      <div class="divider-gold opacity-30 my-8"></div>
      
      <div class="prose prose-invert max-w-none text-sand-200 text-lg leading-relaxed space-y-6">
        <p>
          Khao Sok National Park represents one of the Earth's oldest and most biologically rich evergreen rainforest environments. Nestled in Surat Thani Province, Southern Thailand, this timeless wilderness features towering limestone karsts rising dramatically over emerald jungle canopies, pristine riverways, and deep biodiversity.
        </p>
        
        <div class="my-8 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src="__IMG__"
            alt="__TITLE__"
            class="w-full h-80 object-cover"
            loading="lazy"
          />
        </div>
        
        <h2 class="font-display text-3xl text-sand-50 pt-4">Exploring __TITLE__</h2>
        <p>
          Whether venturing into the ancient forest on a guided naturalist trek, observing wildlife along the Sok River banks, or planning comfortable travel across Southern Thailand, careful planning transforms a standard trip into an unforgettable journey.
        </p>
        
        <blockquote class="p-6 my-6 rounded-2xl bg-white/[0.04] border-l-4 border-gold-500 italic text-sand-300">
          "The beauty of Khao Sok lies in its undisturbed rhythms—mist curling around karst spires at dawn, the distant call of gibbons, and rivers flowing clear beneath ancient canopies."
        </blockquote>
        
        <h2 class="font-display text-3xl text-sand-50 pt-4">Plan Your Visit with Riverside Cottages</h2>
        <p>
          At Khao Sok Riverside Cottages, we pair authentic traditional cottage hospitality with private, small-group rainforest adventures. Our English-speaking local guides, family-cooked cuisine, and free local bus transfers ensure effortless exploration.
        </p>
      </div>
      
      <div class="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <a href="/khao-sok-tour-packages/" class="px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-jungle-950 font-semibold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-gold-500/20">
          Explore Tour Packages
        </a>
        <a href="/khao-sok-blog/" class="text-gold-400 hover:text-gold-300 text-sm font-semibold transition-colors">
          ← More Rainforest Guides
        </a>
      </div>
    </div>
  </article>
</PageLayout>
"""
        content = template.replace("__IMPORT__", import_path)\
                          .replace("__TITLE__", article_title)\
                          .replace("__SHORT__", short_title)\
                          .replace("__IMG__", hero_img)\
                          .replace("__REL__", rel_path)

    with open(target, 'w') as out_f:
        out_f.write(content)
    created_count += 1
    print(f"Created [{created_count}]: {target}")

print(f"\nAll done! Successfully created {created_count} pages.")
