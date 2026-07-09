/**
 * Portfolio projects. ALL of these are AI-generated placeholder shoots —
 * swap for real listings before launch (see MEDIA.md). Slugs are stable;
 * both the home Featured Work grid and /work consume this file.
 */

export type ProjectCategory = "Luxury Estate" | "Standard Listing" | "Land & Aerial";

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  image: string; // cover, 4:3 unless noted
  featured?: boolean; // shown in the home grid
  caseStudy?: {
    intro: string; // one-paragraph story of the shoot
    stills: string[]; // supporting stills
    clips?: string[]; // mp4 paths, muted loops
    stats?: { label: string; value: string }[];
  };
};

export const PROJECTS: Project[] = [
  {
    slug: "canyon-rim-estate",
    title: "Canyon Rim Estate",
    location: "Kayenta area, Ivins",
    category: "Luxury Estate",
    image: "/images/fly-w3-greatroom.jpg", // 16:9 — hero flight's house; grid cover kept distinct from the hero's opening frame
    featured: true,
    caseStudy: {
      intro:
        "A desert-modern estate perched on the canyon edge, the kind of listing that lives or dies on its opening seconds of footage. We flew the approach at golden hour, moved inside for a continuous glide through the great room and kitchen, and closed on a twilight pullback as the house lit up against the mesas. One property, one afternoon, a full film and stills package.",
      stills: [
        "/images/fly-w2-pool.jpg",
        "/images/fly-w4-kitchen.jpg",
        "/images/fly-w5-suite.jpg",
        "/images/fly-w6-twilight.jpg",
      ],
      clips: [
        "/video/fly-c1-pool.mp4",
        "/video/fly-c2-greatroom.mp4",
        "/video/fly-c5-twilight.mp4",
      ],
      // TODO(hunter): confirm real turnaround + deliverable counts before launch.
      stats: [
        { label: "Shoot time", value: "One afternoon" },
        { label: "Deliverables", value: "Film + 30 stills" },
        { label: "Turnaround", value: "2 to 3 business days" },
      ],
    },
  },
  {
    slug: "kayenta-twilight-modern",
    title: "Kayenta Twilight Modern",
    location: "Kayenta, Ivins",
    category: "Luxury Estate",
    image: "/images/work-01.jpg",
    featured: true,
    caseStudy: {
      intro:
        "Twilight is the luxury listing's best friend: warm interior light against a deep blue desert sky. We scheduled this shoot around dusk and captured the house at the exact moment the lights inside matched the sky outside.",
      stills: ["/images/work-02.jpg"],
      // TODO(hunter): confirm real turnaround before launch.
      stats: [
        { label: "Shoot window", value: "Golden hour + dusk" },
        { label: "Deliverables", value: "Twilight set + aerials" },
        { label: "Turnaround", value: "2 to 3 business days" },
      ],
    },
  },
  {
    slug: "snow-canyon-overlook",
    title: "Snow Canyon Overlook",
    location: "Snow Canyon area, St. George",
    category: "Land & Aerial",
    image: "/images/work-05.jpg",
    featured: true,
    caseStudy: {
      intro:
        "Raw land and view lots sell on context. Buyers need to feel the terrain, the access, and the sightlines. A tight aerial set that shows exactly what the parcel offers, boundary to boundary.",
      stills: ["/images/work-07.jpg", "/images/work-08.jpg"],
      // TODO(hunter): confirm real turnaround before launch.
      stats: [
        { label: "Coverage", value: "Full parcel + views" },
        { label: "Deliverables", value: "Aerial stills + flyover" },
        { label: "Turnaround", value: "2 to 3 business days" },
      ],
    },
  },
  {
    slug: "entrada-courtyard-home",
    title: "Entrada Courtyard Home",
    location: "Entrada, St. George",
    category: "Standard Listing",
    image: "/images/work-03.jpg",
    featured: true,
  },
  {
    slug: "red-cliffs-mesa-estate",
    title: "Red Cliffs Mesa Estate",
    location: "Red Cliffs Desert Reserve edge",
    category: "Luxury Estate",
    image: "/images/work-06.jpg",
    featured: true,
  },
  {
    slug: "coral-canyon-family-home",
    title: "Coral Canyon Family Home",
    location: "Coral Canyon, Washington",
    category: "Standard Listing",
    image: "/images/work-04.jpg",
    featured: true,
  },
];

export const CATEGORIES: ProjectCategory[] = [
  "Luxury Estate",
  "Standard Listing",
  "Land & Aerial",
];
