export type PricingCategory = {
  id: string;
  name: string;
  services: CalculatorService[];
};

export type CalculatorService = {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  type: "Basic" | "Medium" | "Premium";
  addons: ServiceAddon[];
};

export type ServiceAddon = {
  id: string;
  name: string;
  price: number;
};

export const calculatorData: PricingCategory[] = [
  {
    id: "home-services",
    name: "Home Services",
    services: [
      {
        id: "ac-repair",
        name: "AC Repair & Servicing",
        basePrice: 499,
        description: "Professional AC maintenance and repair.",
        type: "Basic",
        addons: [
          { id: "gas-refill", name: "Gas Refill", price: 2500 },
          { id: "deep-clean", name: "Foam Jet Deep Cleaning", price: 300 }
        ]
      },
      {
        id: "plumbing",
        name: "Expert Plumbing",
        basePrice: 299,
        description: "Leakages, blockages, and new fittings.",
        type: "Basic",
        addons: [
          { id: "major-repair", name: "Major Pipe Replacement", price: 1500 }
        ]
      },
      {
        id: "deep-cleaning",
        name: "Full Home Deep Cleaning",
        basePrice: 2999,
        description: "Complete 1-BHK intensive deep clean.",
        type: "Medium",
        addons: [
          { id: "2bhk-upgrade", name: "Upgrade to 2 BHK", price: 1000 },
          { id: "3bhk-upgrade", name: "Upgrade to 3 BHK", price: 2000 },
          { id: "sofa-spa", name: "5-Seater Sofa Spa", price: 799 }
        ]
      }
    ]
  },
  {
    id: "tech-services",
    name: "Tech Services",
    services: [
      {
        id: "laptop-repair",
        name: "Laptop Repair & Diagnostics",
        basePrice: 399,
        description: "Doorstep hardware/software diagnosis.",
        type: "Basic",
        addons: [
          { id: "ssd-upgrade", name: "512GB SSD Upgrade", price: 2800 },
          { id: "screen-replacement", name: "Screen Replacement", price: 4500 }
        ]
      },
      {
        id: "cctv-setup",
        name: "CCTV Installation",
        basePrice: 1499,
        description: "Installation for 4-channel security system.",
        type: "Medium",
        addons: [
          { id: "extra-camera", name: "Add 1 Camera", price: 1200 },
          { id: "dvr-storage", name: "1TB HDD Storage", price: 3500 }
        ]
      }
    ]
  },
  {
    id: "digital-services",
    name: "Digital Services",
    services: [
      {
        id: "web-dev",
        name: "Website Development",
        basePrice: 14999,
        description: "Modern, responsive 5-page business website.",
        type: "Premium",
        addons: [
          { id: "e-commerce", name: "E-Commerce Functionality", price: 10000 },
          { id: "priority-support", name: "1 Year Premium Support", price: 4999 }
        ]
      },
      {
        id: "seo",
        name: "SEO Optimization",
        basePrice: 8000,
        description: "Monthly local and technical SEO.",
        type: "Medium",
        addons: [
          { id: "content-writing", name: "4 Blog Posts/Month", price: 4000 }
        ]
      },
      {
        id: "ai-chatbot",
        name: "AI Chatbot Integration",
        basePrice: 12000,
        description: "Custom AI agent for your website.",
        type: "Premium",
        addons: [
          { id: "whatsapp-bot", name: "WhatsApp Bot Sync", price: 5000 }
        ]
      }
    ]
  },
  {
    id: "business-services",
    name: "Business Services",
    services: [
      {
        id: "crm-setup",
        name: "CRM Setup & Automation",
        basePrice: 20000,
        description: "End-to-end CRM workflow automation.",
        type: "Premium",
        addons: [
          { id: "staff-training", name: "Staff Training Session", price: 5000 }
        ]
      },
      {
        id: "branding",
        name: "Brand Identity Design",
        basePrice: 10000,
        description: "Logo, typography, and brand guidelines.",
        type: "Medium",
        addons: [
          { id: "social-kit", name: "Social Media Kit", price: 3000 }
        ]
      }
    ]
  }
];

export const comboDiscounts = [
  {
    id: "web-seo-combo",
    name: "Digital Presence Bundle",
    requiredServices: ["web-dev", "seo"],
    discountPercentage: 15, // 15% off
    description: "Save 15% when you combine Web Development with SEO."
  },
  {
    id: "ai-crm-combo",
    name: "Business Automation Bundle",
    requiredServices: ["ai-chatbot", "crm-setup"],
    discountPercentage: 20, // 20% off
    description: "Save 20% on AI Chatbot + CRM Setup."
  }
];

export const systemSettings = {
  gstRate: 0.18, // 18% GST standard in India for IT & Professional Services
  whatsappNumber: "+919876543210"
};
