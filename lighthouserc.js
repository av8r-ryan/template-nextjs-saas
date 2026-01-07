/** @type {import('@lhci/cli').LighthouseConfig} */
module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start",
      startServerReadyPattern: "Ready in",
      startServerReadyTimeout: 30000,
      url: ["http://localhost:3000/"],
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        // Also test mobile
        // formFactor: 'mobile',
        // screenEmulation: { mobile: true, width: 375, height: 667, deviceScaleFactor: 2, disabled: false },
      },
    },
    assert: {
      assertions: {
        // Performance
        "categories:performance": ["error", { minScore: 0.9 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["warn", { maxNumericValue: 300 }],

        // Accessibility
        "categories:accessibility": ["error", { minScore: 0.9 }],

        // Best Practices
        "categories:best-practices": ["error", { minScore: 0.9 }],

        // SEO
        "categories:seo": ["error", { minScore: 0.9 }],

        // PWA (optional)
        // 'categories:pwa': ['warn', { minScore: 0.5 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
      // For persistent storage, use Lighthouse CI Server
      // target: 'lhci',
      // serverBaseUrl: 'https://your-lhci-server.example.com',
    },
  },
};
