'use strict';

module.exports = {
  client: {
    name: "Shaw's Pest Control",
    shortName: "Shaws Pest Control",
    phone: "(316) 251-9461",
    phoneRaw: "3162519461",
    email: "info@shawspest.com",
    address: "El Dorado, KS",
    city: "El Dorado",
    state: "KS",
    zip: "67042",
    county: "Butler",
    lat: "37.8178",
    lng: "-96.8617",
    founded: "1987",
    domain: "shawspest.com",
    tagline: "Quality Service With Integrity Since 1987",
    taglineShort: "Since 1987",
    description: "Shaw's Pest Control is a locally owned, faith-based pest control company serving Butler and Sedgwick County since 1987. Residential and commercial structural pest control, termite inspections, mosquito reduction, and more.",
    certifications: "Three State Certifications & Master Tech Certification",
    owner: "Dave Shaw",
    reviews: { rating: "5.0", count: "50" },
  },
  services: [
    {
      name: "Pest Control",
      slug: "pestcontrol",
      comboSlug: "pest-control",
      title: "Pest Control",
      h1: "Pest Control in {city}, KS",
      description: "Shaw's Pest Control eliminates spiders, ants, roaches, bed bugs, and other household pests from homes and businesses in {city}, Kansas. 35+ years of experience.",
      body: `<p>Shaw's Pest Control specializes in structural pest control for residential and commercial customers throughout {city} and surrounding {county} County communities. With 35+ years of experience and multiple state certifications, we develop customized treatment plans to eliminate pests and keep them out.</p>
<p>We treat general insects including spiders and ants, as well as specialized treatments for German roaches, bed bugs, fleas, and mosquitoes. Every plan is built around your specific pest problem and the unique conditions of your {city} property.</p>
<p>As a locally owned, faith-based company, we bring integrity to every job. Our customers don't just hire us once — they keep coming back because the work is done right the first time.</p>`,
    },
    {
      name: "Termite Control",
      slug: "termites",
      comboSlug: "termite-control",
      title: "Termite Control",
      h1: "Termite Control in {city}, KS",
      description: "Shaw's Pest Control provides termite inspections and treatment for homes and businesses in {city}, Kansas. Advance Termite Bait System, liquid treatment, and hybrid options.",
      body: `<p>Termites cause approximately $5 billion in property damage each year in the United States. In Kansas, subterranean termites are the primary threat — they forage underground and enter structures through the foundation, often going undetected until significant damage has occurred.</p>
<p>Shaw's Pest Control offers termite inspections for homeowners and prospective buyers in {city}. If active termites are found, we offer three treatment approaches: the Advance Termite Bait System (our preferred method), liquid soil treatment, or a hybrid combining both. We use the latest technology to completely treat your structure and suppress the colony.</p>
<p>Don't wait for visible damage. If you suspect termites in your {city} home or business, contact us for an inspection today.</p>`,
    },
    {
      name: "Mosquito Control",
      slug: "mosquito-control",
      comboSlug: "mosquito-control",
      title: "Mosquito Control",
      h1: "Mosquito Control in {city}, KS",
      description: "Shaw's Pest Control offers mosquito reduction services for homes and businesses in {city}, Kansas — In2Care stations, mosquito beads, and chemical treatments.",
      body: `<p>Kansas is home to two primary mosquito species: the Aedes and the Culex. Both require standing water to complete their life cycle — sometimes as little as a few ounces. During hot summer months, mosquitoes in {city} can make outdoor living uncomfortable and pose health risks.</p>
<p>Shaw's Pest Control assesses your {city} property to determine the best mosquito reduction strategy. Depending on your yard's landscape and topography, we may recommend the In2Care Mosquito Station — an eco-friendly solution that attracts, kills, and prevents larvae — or targeted chemical treatment for immediate knockdown. We also carry Mosquito Beads, a locally-made all-natural repellent, for DIY-friendly supplementation.</p>
<p>Contact us before your next outdoor event or to set up seasonal mosquito control for your {city} property.</p>`,
    },
    {
      name: "Spider Control",
      slug: "pest-control-spiders",
      comboSlug: "spider-control",
      title: "Spider Control",
      h1: "Spider Control in {city}, KS",
      description: "Shaw's Pest Control eliminates spiders from homes and businesses in {city}, Kansas. Brown Recluse, Black Widow, and general spider treatments.",
      body: `<p>Spiders are synanthropic — they live and thrive in the same environments as humans. In {city}, the two species that cause the most concern are the Brown Recluse and the Black Widow. While bites are rare, they can happen, and the venom from each species affects people differently.</p>
<p>Shaw's Pest Control has proven and effective control measures to significantly reduce the spider population in your {city} home or business. Our treatments target spiders where they hide and breed, delivering lasting results rather than surface-level sprays.</p>
<p>If you're seeing spider activity in your {city} property, contact us for a free estimate. We'll develop a plan that fits your situation.</p>`,
    },
    {
      name: "Ant Control",
      slug: "pest-control-ants",
      comboSlug: "ant-control",
      title: "Ant Control",
      h1: "Ant Control in {city}, KS",
      description: "Shaw's Pest Control eliminates ant infestations from homes and businesses in {city}, Kansas. We find all trails and treat with target-specific products.",
      body: `<p>Ants are social insects that live in colonies numbering in the thousands. Worker ants can travel great distances searching for food and water, often finding their way into {city} homes and businesses. Once a food or water source is located, they return to the colony leaving a pheromone trail — that's the "trail of ants" you see along walls and countertops.</p>
<p>Effective ant control requires identifying all active trails and treating them with target-specific products. Surface sprays alone don't solve the problem — you have to address the colony. Shaw's Pest Control specializes in this practice, and we've eliminated ant problems in hundreds of {city} and {county} County properties.</p>
<p>Contact us for a free estimate on ant control for your {city} home or business.</p>`,
    },
    {
      name: "Roach Control",
      slug: "pest-control-roaches",
      comboSlug: "roach-control",
      title: "Cockroach Control",
      h1: "Cockroach Control in {city}, KS",
      description: "Shaw's Pest Control eliminates German, Oriental, and American cockroaches from homes and businesses in {city}, Kansas. Effective treatment for all roach species.",
      body: `<p>The Midwest hosts dozens of roach species, but the three most common found in and around {city} structures are the German, Oriental, and American cockroach. All three are highly adaptable and thrive alongside humans. The German Roach is considered public enemy number one — they carry disease and pathogens on their legs and body, contaminating surfaces they touch.</p>
<p>Shaw's Pest Control has effective control measures for all types of roaches found in {city} homes and businesses. We don't just treat the visible signs — we address the biology and harborage areas that allow roach populations to sustain themselves. Our approach delivers lasting results.</p>
<p>If you're seeing roaches in your {city} property, don't wait. Contact us for a free estimate today.</p>`,
    },
    {
      name: "Bed Bug Control",
      slug: "pest-control-bedbugs",
      comboSlug: "bed-bug-control",
      title: "Bed Bug Control",
      h1: "Bed Bug Control in {city}, KS",
      description: "Shaw's Pest Control eliminates bed bug infestations from homes and businesses in {city}, Kansas. Process-based treatment with proven results.",
      body: `<p>Bed bugs were nearly eradicated in the U.S. by the 1970s, but returned to epidemic levels around 2000 and haven't let up since. If you're dealing with bed bugs in your {city} home, you're not alone — and you need a plan, not just a spray.</p>
<p>Shaw's Pest Control has partnered with hundreds of customers to eliminate bed bug problems. We treat it as a process, not a single event. That means good communication, customer cooperation on preparation, and follow-through until the problem is resolved. Sixty percent of people don't react to bites, which can make early detection difficult — but our team is trained to find and treat even hidden infestations.</p>
<p>Contact us for a free estimate on bed bug treatment for your {city} property.</p>`,
    },
  ],
  cities: [
    { name: "Wichita",       slug: "wichita",       county: "Sedgwick", population: "397,532", state: "KS", lat: "37.6872", lng: "-97.3301" },
    { name: "El Dorado",     slug: "el-dorado",     county: "Butler",   population: "12,957",  state: "KS", lat: "37.8178", lng: "-96.8617" },
    { name: "Derby",         slug: "derby",         county: "Sedgwick", population: "24,912",  state: "KS", lat: "37.5536", lng: "-97.2681" },
    { name: "Andover",       slug: "andover",       county: "Butler",   population: "15,277",  state: "KS", lat: "37.7164", lng: "-97.1395" },
    { name: "Augusta",       slug: "augusta",       county: "Butler",   population: "9,389",   state: "KS", lat: "37.6928", lng: "-96.9767" },
    { name: "Haysville",     slug: "haysville",     county: "Sedgwick", population: "11,098",  state: "KS", lat: "37.5643", lng: "-97.3520" },
    { name: "Maize",         slug: "maize",         county: "Sedgwick", population: "4,898",   state: "KS", lat: "37.7731", lng: "-97.4653" },
    { name: "Goddard",       slug: "goddard",       county: "Sedgwick", population: "5,120",   state: "KS", lat: "37.6611", lng: "-97.5700" },
  ],
  reviews: [
    { author: "Charlotte Brown", text: "Dave is great to work with! Always addresses my concerns and there when we need him. Recommend Shaw's!", rating: 5, date: "2024-09-15" },
    { author: "Jeffrey Eastman", text: "Shaw Pest Control is very professional. Always able to schedule appointments that best our time schedule. Highly recommend!", rating: 5, date: "2024-07-22" },
    { author: "Kevin Wishart",   text: "Dave does a great job and is always quick to respond to any issue. He's on time and professional each and every visit.", rating: 5, date: "2024-05-10" },
  ],
};
