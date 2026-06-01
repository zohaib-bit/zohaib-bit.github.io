import React from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import htm from "https://esm.sh/htm@3.1.1";

const html = htm.bind(React.createElement);
const { useEffect } = React;

const services = [
    {
        title: "IOS APP DEVELOPMENT",
        desc: "Design and development of high-performance iOS applications with scalable architecture and polished user experiences.",
        stack: "SwiftUI · UIKit · Swift"
    },
    {
        title: "PRODUCT ENGINEERING",
        desc: "End-to-end product development from architecture to shipping, focused on maintainability and growth.",
        stack: "MVVM · APIs · Modular Code"
    },
    {
        title: "AI INTEGRATIONS",
        desc: "Practical AI features for iOS products including assistants, recommendations, and workflow automation.",
        stack: "OpenAI · RAG · Automation"
    }
];

const phases = [
    ["01", "Clarity & Product Thinking", "I define product goals, user flows, and architecture scope before writing code."],
    ["02", "Architecture Design", "I design a clean system structure for performance, scaling, and easy iteration."],
    ["03", "Product Development", "I build production-ready iOS features with clean code and reusable components."],
    ["04", "Testing & Optimization", "I test flows, polish UX details, and optimize app responsiveness before release."],
    ["05", "Launch & Improvement", "After launch, I improve features and app quality based on user feedback."]
];

const projects = [
    {
        title: "FoodNinja",
        tagline: "A full-featured food delivery experience built for speed and clarity.",
        desc: "FoodNinja is a native iOS food delivery app built with UIKit, featuring dynamic order number generation, real-time food listing, and a smooth browsing experience. Designed with clean architecture and a user-first interface that mirrors production-grade delivery apps.",
        tech: ["UIKit", "Dynamic Order Generation", "Food Listing UI", "MVC Architecture"],
        color: "#22c55e",
        image: "projects/foodninja.png"
    },
    {
        title: "FocusFlow Mini",
        tagline: "Write a thought. AI turns it into a task — instantly.",
        desc: "FocusFlow Mini is an AI-powered productivity app built with SwiftUI and the OpenAI API. Users simply write a thought in natural language and the app automatically structures it into an actionable task — no manual input needed. Paired with fluid animations that make the experience feel effortless and responsive.",
        tech: ["SwiftUI", "OpenAI API", "Auto Task Generation", "Custom Animations"],
        color: "#0d9488",
        image: "projects/focusflow-mini.png"
    },
    {
        title: "Overview",
        tagline: "A minimal task and reminder app that keeps you on track.",
        desc: "Overview is a clean, distraction-free task management app built in SwiftUI. Focused entirely on helping users capture, organize, and get reminded of what matters most. Built with simplicity as a feature — no clutter, just clarity.",
        tech: ["SwiftUI", "Local Notifications", "Task Management", "Reminders"],
        color: "#b45309",
        image: "projects/overview.png"
    },
    {
        title: "BlockApp",
        tagline: "Real device-level blocking — with streaks to keep you honest.",
        desc: "BlockApp is a Screen Time management app built with SwiftUI and Apple's ScreenTime API that enforces actual device-level app blocking. Features NFC-based functionality, full German localization, and a streak system that gamifies consistency. Built for users who want digital discipline that actually sticks.",
        tech: ["SwiftUI", "ScreenTime API", "NFC", "German Localization", "Streak System"],
        color: "#dc2626",
        image: "projects/blockapp.png"
    },
    {
        title: "Votari",
        tagline: "Secure, verifiable elections on the blockchain — powered by NFC.",
        desc: "Votari is a blockchain-based e-election iOS app built with SwiftUI. Voters authenticate by scanning their passport via NFC, ensuring identity verification at the hardware level. Election results are processed through a Merkle root structure, making every vote cryptographically tamper-proof and transparent.",
        tech: ["SwiftUI", "Blockchain", "NFC Passport Reading", "Merkle Root", "Election Infrastructure"],
        color: "#1d4ed8",
        image: "projects/votari.png"
    },
    {
        title: "AppBlocker",
        tagline: "Block apps. Track habits. Own your screen time.",
        desc: "AppBlocker is a production-grade Screen Time management app built with SwiftUI and Apple's ScreenTime API. It goes beyond basic blocking — users can restrict apps based on time schedules, usage limits, location, and open count limits. The app also surfaces detailed insights into daily, weekly, and monthly usage patterns, giving users real data to build healthier digital habits.",
        tech: ["SwiftUI", "ScreenTime API", "FamilyControls", "DeviceActivity", "Schedule Blocking", "Usage Insights", "Location-Based Blocking"],
        color: "#3b82f6",
        image: "projects/appblocker.png"
    }
];

const faqs = [
    ["How do you start a new iOS project?", "I begin with clarity: problem definition, app flow mapping, and architecture planning before coding."],
    ["Do you work with early-stage startups?", "Yes, I work with both early-stage founders and established teams needing product improvement."],
    ["How long does it take to build an MVP?", "Most MVPs take 3-6 weeks depending on scope, integrations, and product complexity."],
    ["Can you integrate AI into existing apps?", "Yes, I can add practical AI features where they create real user value."],
    ["What stack do you usually use?", "Swift, SwiftUI, UIKit, Firebase/Supabase, REST APIs, and scalable iOS architecture patterns."]
];

function Footer() {
    return html`
        <footer className="site-footer">
            <div className="footer-inner">
            <div className="footer-grid">
                <div className="footer-brand footer-col">
                    <h3>Zohaib Faisal</h3>
                    <p>SaaS • AI Systems • Scalable Products</p>
                </div>
                <div className="footer-col">
                    <h4>CONTACT</h4>
                    <p>Lahore, Pakistan</p>
                    <p>Working globally with founders</p>
                    <p>zohaibfaisal836@gmail.com</p>
                    <p className="accent-line">Start a project →</p>
                    <p className="accent-line">Book a call →</p>
                </div>
                <div className="footer-col">
                    <h4>AVAILABILITY</h4>
                    <p><span className="green-dot"></span>Available for new projects</p>
                    <p>Response time</p>
                    <p>Within 24 hours</p>
                    <p>Timezone</p>
                    <p>PKT (GMT+5)</p>
                </div>
                <div className="footer-col">
                    <h4>EXPLORE</h4>
                    <p>Projects</p>
                    <p>Services</p>
                    <p>Process</p>
                    <p>FAQ</p>
                    <p>Contact</p>
                </div>
                <div className="footer-col">
                    <h4>CONNECT</h4>
                    <p><a href="#">LinkedIn</a></p>
                    <p><a href="https://github.com/zohaib-bit" target="_blank" rel="noreferrer">GitHub</a></p>
                    <p><a href="#">Upwork</a></p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© ${new Date().getFullYear()} Zohaib Faisal — Building production-ready iOS experiences.</p>
                <div className="footer-bottom-links">
                    <a href="#">LINKEDIN</a>
                    <a href="https://github.com/zohaib-bit" target="_blank" rel="noreferrer">GITHUB</a>
                    <a href="#">UPWORK</a>
                </div>
            </div>
            </div>
        </footer>
    `;
}

function FAQItem({ q, a, open, onToggle }) {
    return html`
        <article className="faq-item">
            <button className="faq-trigger" onClick=${onToggle}>
                <span>${q}</span>
                <span>${open ? "−" : "+"}</span>
            </button>
            <div className=${`faq-answer ${open ? "open" : ""}`}>
                <p>${a}</p>
            </div>
        </article>
    `;
}

function App() {
    const [openFAQ, setOpenFAQ] = React.useState(1);

    useEffect(() => {
        const animatedItems = document.querySelectorAll("[data-reveal]");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    entry.target.classList.remove("is-visible");
                }
            });
        }, { threshold: 0.18, rootMargin: "0px 0px -5% 0px" });

        animatedItems.forEach((item) => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    return html`
        <div className="page">
            <header className="topbar">
                <div className="container topbar-inner">
                    <a className="brand brand-logo" href="#home">Z.</a>
                    <button className="menu-icon" aria-label="menu">
                        <span></span><span></span>
                    </button>
                </div>
            </header>

            <section id="home" className="hero">
                <div className="hero-image-wrap">
                    <img src="profile-photo.png" alt="Zohaib Faisal" className="hero-image" />
                </div>
            </section>

            <main className="white-surface">
                <section className="section intro">
                    <div className="container intro-grid">
                        <div className="mosaic reveal" data-reveal>
                            <span></span><span></span><span></span>
                            <span></span><span></span><span></span>
                            <span></span><span></span><span></span>
                        </div>
                        <div className="reveal" data-reveal>
                            <p className="section-label dark">(01)</p>
                            <p className="mini-label">HOW I HELP FOUNDERS</p>
                            <h1 className="dark-title">
                                I’m Zohaib Faisal — an iOS engineer helping founders turn early ideas into
                                clear, scalable products.
                            </h1>
                            <a className="inline-link" href="#services">START WITH CLARITY</a>
                        </div>
                    </div>
                </section>

                <section id="services" className="section">
                    <div className="container">
                        <div className="section-head reveal" data-reveal>
                            <p className="mini-label">SERVICES</p>
                            <p className="section-label dark">(02)</p>
                        </div>
                        <div className="services-head reveal" data-reveal>
                            <h2 className="dark-h2">Engineering Scalable Digital Products</h2>
                            <p>I design and build scalable software systems from mobile apps to AI-assisted features and production architecture.</p>
                        </div>
                        <div className="services-stack">
                            ${services.map((service, index) => html`
                                <article className="service-card reveal" data-reveal style=${{ transitionDelay: `${index * 0.08}s` }} key=${service.title}>
                                    <p className="service-kicker">Services</p>
                                    <h3>${service.title}</h3>
                                    <p>${service.desc}</p>
                                    <span>${service.stack}</span>
                                </article>
                            `)}
                        </div>
                    </div>
                </section>

                <section id="process" className="section process-bg">
                    <div className="container">
                        <div className="process-list">
                            ${phases.map(([num, title, desc], index) => html`
                                <article className="phase-row reveal" data-reveal style=${{ transitionDelay: `${index * 0.05}s` }} key=${num}>
                                    <div className="phase-text">
                                        <p className="phase-num">PHASE ${num}</p>
                                        <h3>${title}</h3>
                                        <p>${desc}</p>
                                        <ul>
                                            <li>System planning</li>
                                            <li>Execution with quality</li>
                                            <li>Scalable architecture</li>
                                        </ul>
                                    </div>
                                    <div className="phase-image"></div>
                                </article>
                            `)}
                        </div>
                    </div>
                </section>

                <section id="projects" className="section">
                    <div className="container">
                        <div className="section-head reveal" data-reveal>
                            <p className="mini-label">SELECTED WORK</p>
                            <p className="section-label dark">(04)</p>
                        </div>
                        <h2 className="dark-h2 reveal" data-reveal>Apps shipped with production-grade execution.</h2>
                        <p className="projects-sub reveal" data-reveal>
                            Native iOS products — from food delivery and AI productivity to screen time and blockchain voting.
                        </p>
                        <div className="projects-grid">
                            ${projects.map((project, index) => html`
                                <article
                                    className="project-card reveal"
                                    data-reveal
                                    style=${{
                                        transitionDelay: `${index * 0.06}s`,
                                        "--project-accent": project.color
                                    }}
                                    key=${project.title}
                                >
                                    <div className="project-card-image">
                                        <img src=${project.image} alt=${`${project.title} app showcase`} loading="lazy" />
                                    </div>
                                    <div className="project-card-body">
                                        <p className="project-index" style=${{ color: project.color }}>0${index + 1}</p>
                                        <h3>${project.title}</h3>
                                        <p className="project-tagline">${project.tagline}</p>
                                        <p className="project-desc">${project.desc}</p>
                                        <div className="project-tech">
                                            ${project.tech.map((item) => html`
                                                <span className="project-tech-tag" key=${item}>${item}</span>
                                            `)}
                                        </div>
                                    </div>
                                </article>
                            `)}
                        </div>
                    </div>
                </section>

                <section className="testimonials-block">
                    <div className="container">
                        <p className="mini-label center-light">REAL WORDS. REAL RESULTS.</p>
                        <h2 className="faq-title reveal" data-reveal>What founders say after we ship</h2>
                        <p className="testimonials-sub reveal" data-reveal>
                            Clear communication, on-time delivery, clean execution without drama.
                        </p>
                        <article className="testimonial-card reveal" data-reveal>
                            <div className="testimonial-image"></div>
                            <div className="testimonial-content">
                                <p>
                                    "Zohaib delivers exactly what he promises — on time, high quality, and without
                                    errors. A rare find. Will rehire and recommend without hesitation."
                                </p>
                                <div className="testimonial-meta">
                                    <span>Upwork Client</span>
                                    <span>Founder · iOS Product</span>
                                </div>
                            </div>
                        </article>
                        <div className="testimonial-dots">
                            <span className="active"></span><span></span><span></span>
                        </div>
                    </div>
                </section>

                <section className="faq-block">
                    <div className="container">
                        <h2 className="faq-title reveal" data-reveal>Questions founders usually ask</h2>
                        <div className="faq-list reveal" data-reveal>
                            ${faqs.map(([q, a], i) => html`
                                <${FAQItem}
                                    q=${q}
                                    a=${a}
                                    open=${openFAQ === i}
                                    onToggle=${() => setOpenFAQ(openFAQ === i ? -1 : i)}
                                />
                            `)}
                        </div>
                    </div>
                </section>

                <section id="contact" className="cta-block">
                    <div className="container cta-inner reveal" data-reveal>
                        <p className="mini-label center-light">READY TO BUILD?</p>
                        <h2>Have an idea you want to turn into a real product?</h2>
                        <p>Let's talk. I'll review your concept and outline the cleanest path forward.</p>
                        <a className="cta-btn" href="mailto:zohaibfaisal836@gmail.com">Start a conversation ↗</a>
                    </div>
                </section>
            </main>

            <div className="footer-shell">
                <${Footer} />
            </div>
        </div>
    `;
}

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(html`<${App} />`);
}
