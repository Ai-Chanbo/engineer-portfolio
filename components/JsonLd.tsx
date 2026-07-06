import { site } from "@/content/site";
import { socialProfiles } from "@/content/articles";

/**
 * Person + WebSite structured data for rich search results.
 * Rendered as a script tag in the document.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: site.name,
        alternateName: site.wordmark,
        jobTitle: site.role,
        description: site.description,
        url: site.url,
        ...(site.email ? { email: `mailto:${site.email}` } : {}),
        address: {
          "@type": "PostalAddress",
          addressCountry: site.location,
        },
        ...(socialProfiles.length
          ? { sameAs: socialProfiles.map((p) => p.url) }
          : {}),
        knowsAbout: [
          "C#",
          ".NET",
          "PLC",
          "Azure",
          "Python",
          "OpenCV",
          "ONNX Runtime",
          "製造DX",
          "外観検査",
        ],
      },
      {
        "@type": "WebSite",
        name: `${site.name} — Portfolio`,
        url: site.url,
        inLanguage: "ja",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Structured data is static and trusted.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
