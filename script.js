import React from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import { motion } from "https://esm.sh/framer-motion@11.3.19";
import htm from "https://esm.sh/htm@3.1.1";
import { Renderer, Program, Mesh, Color, Triangle } from "https://esm.sh/ogl";

const html = htm.bind(React.createElement);
const { useEffect, useRef, useCallback } = React;

const skills = [
    { icon: "fa-mobile-screen-button", title: "iOS Development", desc: "Swift, SwiftUI, UIKit, app architecture and clean code principles." },
    { icon: "fa-gears", title: "App Engineering", desc: "Networking, data persistence, performance tuning and modular development." },
    { icon: "fa-pen-ruler", title: "Product UI", desc: "Professional interfaces focused on usability and premium user experience." }
];

const resumeProjects = [
    {
        title: "FocusFlow",
        type: "AI Productivity App",
        desc: "AI-powered task management with OpenAI integration, conversational task creation, and SwiftData offline sync.",
        tags: ["SwiftUI", "MVVM", "OpenAI API", "SwiftData", "UserNotifications"]
    },
    {
        title: "FoodNinja",
        type: "Food Delivery Platform",
        desc: "Full-featured food delivery experience with Firebase auth, API networking, image caching, and live order flows.",
        tags: ["UIKit", "Firebase", "REST APIs", "Alamofire", "Kingfisher"]
    },
    {
        title: "BlockApp",
        type: "Screen Time Manager",
        desc: "Parental control app with NFC scanning, Screen Time controls, Supabase auth, and multilingual support.",
        tags: ["SwiftUI", "NFC", "ScreenTime API", "SwiftData", "Supabase"]
    },
    {
        title: "Votari",
        type: "Blockchain Voting Platform",
        desc: "Secure voter flow with passport MRZ/NFC verification and cryptographic validation for election workflows.",
        tags: ["SwiftUI", "NFC", "SwiftMRZParser", "NFCPassportReader", "MVVM"]
    },
    {
        title: "Overview",
        type: "Daily Task Manager",
        desc: "High-performance daily planning app with optimized SwiftUI state management and scalable architecture.",
        tags: ["SwiftUI", "Firebase", "REST APIs", "SwiftData", "MVVM"]
    }
];

const detailedSkills = [
    {
        title: "Languages",
        items: ["Swift", "Objective-C (familiar)"]
    },
    {
        title: "Frameworks & APIs",
        items: ["SwiftUI", "UIKit", "Combine", "CoreData", "SwiftData", "UserNotifications", "ScreenTime API", "NFC"]
    },
    {
        title: "Architecture",
        items: ["MVVM", "MVC", "Protocol-Oriented Programming", "Dependency Injection"]
    },
    {
        title: "Backend & Networking",
        items: ["Firebase", "Supabase", "RESTful APIs", "URLSession", "Alamofire", "OpenAI API"]
    },
    {
        title: "Tools",
        items: ["Xcode", "Git", "GitHub", "CocoaPods", "Swift Package Manager", "TestFlight"]
    },
    {
        title: "Specialized Libraries",
        items: ["SwiftMRZParser", "NFCPassportReader", "OpenSSL", "Kingfisher"]
    }
];

const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: 0.6, ease: "easeOut" }
};

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) { \
  int index = 0; \
  for (int i = 0; i < 2; i++) { \
     ColorStop currentColor = colors[i]; \
     bool isInBetween = currentColor.position <= factor; \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  } \
  ColorStop currentColor = colors[index]; \
  ColorStop nextColor = colors[index + 1]; \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = intensity * rampColor;

  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

function Aurora(props) {
    const { colorStops = ["#7cff67", "#B497CF", "#5227FF"], amplitude = 1.0, blend = 0.5 } = props;
    const propsRef = useRef(props);
    propsRef.current = props;
    const ctnDom = useRef(null);

    useEffect(() => {
        const ctn = ctnDom.current;
        if (!ctn) return undefined;

        const renderer = new Renderer({
            alpha: true,
            premultipliedAlpha: true,
            antialias: true
        });
        const gl = renderer.gl;
        if (!gl) return undefined;

        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.canvas.style.backgroundColor = "transparent";

        let program;

        function resize() {
            const width = ctn.offsetWidth;
            const height = ctn.offsetHeight;
            renderer.setSize(width, height);
            if (program) {
                program.uniforms.uResolution.value = [width, height];
            }
        }
        window.addEventListener("resize", resize);

        const geometry = new Triangle(gl);
        if (geometry.attributes.uv) delete geometry.attributes.uv;

        const colorStopsArray = colorStops.map((hex) => {
            const c = new Color(hex);
            return [c.r, c.g, c.b];
        });

        program = new Program(gl, {
            vertex: VERT,
            fragment: FRAG,
            uniforms: {
                uTime: { value: 0 },
                uAmplitude: { value: amplitude },
                uColorStops: { value: colorStopsArray },
                uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
                uBlend: { value: blend }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });
        ctn.appendChild(gl.canvas);

        let animateId = 0;
        const update = (t) => {
            animateId = requestAnimationFrame(update);
            const { time = t * 0.01, speed = 1.0 } = propsRef.current;
            program.uniforms.uTime.value = time * speed * 0.1;
            program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;
            program.uniforms.uBlend.value = propsRef.current.blend ?? blend;
            const stops = propsRef.current.colorStops ?? colorStops;
            program.uniforms.uColorStops.value = stops.map((hex) => {
                const c = new Color(hex);
                return [c.r, c.g, c.b];
            });
            renderer.render({ scene: mesh });
        };
        animateId = requestAnimationFrame(update);

        resize();

        return () => {
            cancelAnimationFrame(animateId);
            window.removeEventListener("resize", resize);
            if (ctn && gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
    }, [amplitude, blend, colorStops]);

    return html`<div ref=${ctnDom} className="aurora-container"></div>`;
}

function ElectricBorder({
    children,
    color = "#5227FF",
    speed = 1,
    chaos = 0.12,
    borderRadius = 24,
    className,
    style
}) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const timeRef = useRef(0);
    const lastFrameTimeRef = useRef(0);

    const random = useCallback((x) => ((Math.sin(x * 12.9898) * 43758.5453) % 1), []);

    const noise2D = useCallback((x, y) => {
        const i = Math.floor(x);
        const j = Math.floor(y);
        const fx = x - i;
        const fy = y - j;

        const a = random(i + j * 57);
        const b = random(i + 1 + j * 57);
        const c = random(i + (j + 1) * 57);
        const d = random(i + 1 + (j + 1) * 57);

        const ux = fx * fx * (3.0 - 2.0 * fx);
        const uy = fy * fy * (3.0 - 2.0 * fy);

        return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    }, [random]);

    const octavedNoise = useCallback((x, octaves, lacunarity, gain, baseAmplitude, baseFrequency, time, seed, baseFlatness) => {
        let y = 0;
        let amplitude = baseAmplitude;
        let frequency = baseFrequency;

        for (let i = 0; i < octaves; i += 1) {
            let octaveAmplitude = amplitude;
            if (i === 0) octaveAmplitude *= baseFlatness;
            y += octaveAmplitude * noise2D(frequency * x + seed * 100, time * frequency * 0.3);
            frequency *= lacunarity;
            amplitude *= gain;
        }

        return y;
    }, [noise2D]);

    const getCornerPoint = useCallback((centerX, centerY, radius, startAngle, arcLength, progress) => {
        const angle = startAngle + progress * arcLength;
        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    }, []);

    const getRoundedRectPoint = useCallback((t, left, top, width, height, radius) => {
        const straightWidth = width - 2 * radius;
        const straightHeight = height - 2 * radius;
        const cornerArc = (Math.PI * radius) / 2;
        const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
        const distance = t * totalPerimeter;

        let accumulated = 0;

        if (distance <= accumulated + straightWidth) {
            const progress = (distance - accumulated) / straightWidth;
            return { x: left + radius + progress * straightWidth, y: top };
        }
        accumulated += straightWidth;

        if (distance <= accumulated + cornerArc) {
            const progress = (distance - accumulated) / cornerArc;
            return getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
        }
        accumulated += cornerArc;

        if (distance <= accumulated + straightHeight) {
            const progress = (distance - accumulated) / straightHeight;
            return { x: left + width, y: top + radius + progress * straightHeight };
        }
        accumulated += straightHeight;

        if (distance <= accumulated + cornerArc) {
            const progress = (distance - accumulated) / cornerArc;
            return getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress);
        }
        accumulated += cornerArc;

        if (distance <= accumulated + straightWidth) {
            const progress = (distance - accumulated) / straightWidth;
            return { x: left + width - radius - progress * straightWidth, y: top + height };
        }
        accumulated += straightWidth;

        if (distance <= accumulated + cornerArc) {
            const progress = (distance - accumulated) / cornerArc;
            return getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress);
        }
        accumulated += cornerArc;

        if (distance <= accumulated + straightHeight) {
            const progress = (distance - accumulated) / straightHeight;
            return { x: left, y: top + height - radius - progress * straightHeight };
        }
        accumulated += straightHeight;

        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
    }, [getCornerPoint]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return undefined;

        const ctx = canvas.getContext("2d");
        if (!ctx) return undefined;

        const octaves = 10;
        const lacunarity = 1.6;
        const gain = 0.7;
        const amplitude = chaos;
        const frequency = 10;
        const baseFlatness = 0;
        const displacement = 60;
        const borderOffset = 60;

        const updateSize = () => {
            const rect = container.getBoundingClientRect();
            const width = rect.width + borderOffset * 2;
            const height = rect.height + borderOffset * 2;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
            return { width, height };
        };

        let { width, height } = updateSize();

        const drawElectricBorder = (currentTime) => {
            const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
            timeRef.current += deltaTime * speed;
            lastFrameTimeRef.current = currentTime;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.scale(dpr, dpr);

            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            const left = borderOffset;
            const top = borderOffset;
            const borderWidth = width - 2 * borderOffset;
            const borderHeight = height - 2 * borderOffset;
            const maxRadius = Math.min(borderWidth, borderHeight) / 2;
            const radius = Math.min(borderRadius, maxRadius);

            const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
            const sampleCount = Math.floor(approximatePerimeter / 2);

            ctx.beginPath();
            for (let i = 0; i <= sampleCount; i += 1) {
                const progress = i / sampleCount;
                const point = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);

                const xNoise = octavedNoise(progress * 8, octaves, lacunarity, gain, amplitude, frequency, timeRef.current, 0, baseFlatness);
                const yNoise = octavedNoise(progress * 8, octaves, lacunarity, gain, amplitude, frequency, timeRef.current, 1, baseFlatness);
                const displacedX = point.x + xNoise * displacement;
                const displacedY = point.y + yNoise * displacement;

                if (i === 0) ctx.moveTo(displacedX, displacedY);
                else ctx.lineTo(displacedX, displacedY);
            }

            ctx.closePath();
            ctx.stroke();
            animationRef.current = requestAnimationFrame(drawElectricBorder);
        };

        const resizeObserver = new ResizeObserver(() => {
            const newSize = updateSize();
            width = newSize.width;
            height = newSize.height;
        });
        resizeObserver.observe(container);

        animationRef.current = requestAnimationFrame(drawElectricBorder);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            resizeObserver.disconnect();
        };
    }, [color, speed, chaos, borderRadius, octavedNoise, getRoundedRectPoint]);

    const vars = {
        "--electric-border-color": color,
        borderRadius
    };

    return html`
        <div ref=${containerRef} className=${`electric-border ${className ?? ""}`} style=${{ ...vars, ...style }}>
            <div className="eb-canvas-container">
                <canvas ref=${canvasRef} className="eb-canvas"></canvas>
            </div>
            <div className="eb-layers">
                <div className="eb-glow-1"></div>
                <div className="eb-glow-2"></div>
                <div className="eb-background-glow"></div>
            </div>
            <div className="eb-content">${children}</div>
        </div>
    `;
}

function App() {
    const handleContactSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = (formData.get("name") || "").toString().trim();
        const email = (formData.get("email") || "").toString().trim();
        const subject = (formData.get("subject") || "Portfolio Inquiry").toString().trim();
        const message = (formData.get("message") || "").toString().trim();

        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailto = `mailto:zohaibfaisal836@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
    };

    return html`
        <div>
            <nav className="nav">
                <div className="nav-inner">
                    <a className="brand" href="#home">
                        <i className="fa-solid fa-code"></i>
                        <span>Zohaib Bits</span>
                    </a>
                    <div className="nav-links nav-links-main">
                        <a href="#home">Home</a>
                        <a href="#skills">Skills</a>
                        <a href="#projects">Projects</a>
                        <a href="#resume">Resume</a>
                        <a href="#about">About</a>
                    </div>
                    <div className="nav-links nav-links-actions">
                        <a href="#contact" className="pill pill-brand">Hire Me</a>
                        <a href="#projects" className="pill">Projects</a>
                        <a href="https://github.com/zohaib-bit" target="_blank" rel="noreferrer" className="pill pill-icon">
                            <i className="fa-brands fa-github"></i>
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </nav>

            <section id="home" className="hero">
                <div className="hero-inner">
                    <${Aurora}
                        colorStops=${["#7cff67", "#B497CF", "#5227FF"]}
                        blend=${0.5}
                        amplitude=${1.0}
                        speed=${1}
                    />
                    <${motion.div} ...${reveal}>
                        <div className="eyebrow">iOS Developer Portfolio</div>
                        <h1>Building <span>high-quality</span> digital products for modern mobile users.</h1>
                        <p>
                            I design and develop iOS applications with a focus on performance, clarity, and
                            polished user experiences that feel premium from first tap.
                        </p>
                        <div className="hero-cta">
                            <a className="btn btn-primary" href="#projects">View Projects</a>
                            <a className="btn btn-ghost" href="#contact">Work With Me</a>
                        </div>
                    </${motion.div}>

                    <${motion.div} ...${reveal} transition=${{ ...reveal.transition, delay: 0.15 }}>
                        <div className="hero-card">
                            <img src="profile-photo.png" alt="Zohaib Faisal" className="hero-profile-image" />
                            <div className="hero-card-meta">
                                <span>Based in Lahore, Pakistan</span>
                                <span>Open to opportunities</span>
                            </div>
                        </div>
                    </${motion.div}>
                </div>
            </section>

            <main className="site">
                <section id="skills" className="section">
                    <${motion.h2} className="section-title" ...${reveal}>Core Capabilities</${motion.h2}>
                    <${motion.p} className="section-intro" ...${reveal}>
                        A focused skill set for shipping production-ready iOS products with modern standards.
                    </${motion.p}>
                    <div className="grid-3">
                        ${skills.map((item, i) => html`
                            <${motion.article}
                                key=${item.title}
                                className="panel-shell"
                                ...${reveal}
                                transition=${{ ...reveal.transition, delay: i * 0.08 }}
                            >
                                <div className="panel">
                                    <div className="icon-wrap"><i className=${`fa-solid ${item.icon}`}></i></div>
                                    <h3>${item.title}</h3>
                                    <p>${item.desc}</p>
                                </div>
                            </${motion.article}>
                        `)}
                    </div>
                </section>

                <section id="about" className="section">
                    <${motion.h2} className="section-title" ...${reveal}>About Me</${motion.h2}>
                    <div className="about-grid">
                        <${motion.div} className="panel" ...${reveal}>
                            <p className="section-intro">
                                I am an iOS developer who enjoys turning ideas into practical, scalable products.
                                I care about clean architecture, thoughtful interaction design, and long-term code quality.
                            </p>
                            <p className="section-intro">
                                My work style is collaborative, detail-oriented, and delivery-focused from planning to release.
                            </p>
                        </${motion.div}>
                        <div className="stats">
                            <${motion.div} className="stat-shell" ...${reveal}>
                                <div className="stat"><strong>5</strong><span>Total Projects</span></div>
                            </${motion.div}>
                            <${motion.div} className="stat-shell" ...${reveal}>
                                <div className="stat"><strong>1+ Year</strong><span>Professional Experience</span></div>
                            </${motion.div}>
                            <${motion.div} className="stat-shell" ...${reveal}>
                                <div className="stat"><strong>100%</strong><span>Commitment to Quality</span></div>
                            </${motion.div}>
                        </div>
                    </div>
                </section>

                <section id="resume" className="section">
                    <${motion.h2} className="section-title" ...${reveal}>Resume Snapshot</${motion.h2}>
                    <${motion.p} className="section-intro" ...${reveal}>
                        Junior iOS Developer at o9tech with 1 year of hands-on experience building and shipping production-ready apps.
                    </${motion.p}>
                    <div className="resume-grid">
                        <${motion.div} ...${reveal}>
                            <div className="resume-card">
                                <h3><i className="fa-solid fa-briefcase"></i> Experience</h3>
                                <p><strong>Junior iOS Developer</strong> — o9tech</p>
                                <p>06/2025 - Present</p>
                            </div>
                        </${motion.div}>
                        <${motion.div} ...${reveal} transition=${{ ...reveal.transition, delay: 0.08 }}>
                            <div className="resume-card">
                                <h3><i className="fa-solid fa-graduation-cap"></i> Education</h3>
                                <p><strong>BS Computer Science</strong></p>
                                <p>Virtual University of Pakistan</p>
                            </div>
                        </${motion.div}>
                        <${motion.div} ...${reveal} transition=${{ ...reveal.transition, delay: 0.16 }}>
                            <div className="resume-card">
                                <h3><i className="fa-solid fa-certificate"></i> Certification</h3>
                                <p><strong>100 Days of Swift</strong> — Hacking with Swift</p>
                                <p>UIKit, SwiftUI, APIs, and iOS best practices</p>
                            </div>
                        </${motion.div}>
                    </div>
                    <${motion.div} ...${reveal} transition=${{ ...reveal.transition, delay: 0.2 }}>
                        <a href="Zohaib-Faisal-Resume.pdf" download className="btn btn-primary resume-download">
                            <i className="fa-solid fa-file-arrow-down"></i>
                            Download Resume
                        </a>
                    </${motion.div}>
                </section>

                <section id="skills-expanded" className="section">
                    <${motion.h2} className="section-title" ...${reveal}>Technical Skills</${motion.h2}>
                    <${motion.p} className="section-intro" ...${reveal}>
                        Full stack of iOS technologies and development tools mentioned in your resume.
                    </${motion.p}>
                    <div className="skills-expanded-grid">
                        ${detailedSkills.map((group, i) => html`
                            <${motion.article}
                                key=${group.title}
                                ...${reveal}
                                transition=${{ ...reveal.transition, delay: i * 0.06 }}
                            >
                                <div className="resume-card">
                                    <h3>${group.title}</h3>
                                    <div className="tags">
                                        ${group.items.map((item) => html`<b key=${item}>${item}</b>`)}
                                    </div>
                                </div>
                            </${motion.article}>
                        `)}
                    </div>
                </section>

                <section id="projects" className="section">
                    <${motion.h2} className="section-title" ...${reveal}>Projects</${motion.h2}>
                    <${motion.p} className="section-intro" ...${reveal}>
                        Projects and apps from your resume.
                    </${motion.p}>
                    <div className="projects">
                        ${resumeProjects.map((project, i) => html`
                            <${motion.article}
                                key=${project.title}
                                className="project-shell"
                                ...${reveal}
                                transition=${{ ...reveal.transition, delay: i * 0.08 }}
                                whileHover=${{ y: -6 }}
                            >
                                <${ElectricBorder} color="#7df9ff" speed=${1} chaos=${0.1} borderRadius=${16}>
                                    <div className="project">
                                        <div className="project-top"><span>${project.type}</span></div>
                                        <div className="project-body">
                                            <h3>${project.title}</h3>
                                            <p>${project.desc}</p>
                                            <div className="tags">
                                                ${project.tags.map((tag) => html`<b key=${tag}>${tag}</b>`)}
                                            </div>
                                        </div>
                                    </div>
                                </${ElectricBorder}>
                            </${motion.article}>
                        `)}
                    </div>
                </section>

                <section id="contact" className="section">
                    <${motion.h2} className="section-title" ...${reveal}>Let's Connect</${motion.h2}>
                    <${motion.div} ...${reveal}>
                        <div className="contact-card">
                            <p className="section-intro">
                                Send a query and it opens your email app addressed to me.
                            </p>
                            <form className="contact-form" onSubmit=${handleContactSubmit}>
                                <input type="text" name="name" placeholder="Your Name" required />
                                <input type="email" name="email" placeholder="Your Email" required />
                                <input type="text" name="subject" placeholder="Subject" required />
                                <textarea name="message" rows="5" placeholder="Message" required></textarea>
                                <button type="submit" className="btn btn-primary contact-submit">Send Message</button>
                            </form>
                            <div className="contact-list">
                                <a href="mailto:zohaibfaisal836@gmail.com"><i className="fa-solid fa-envelope"></i> zohaibfaisal836@gmail.com</a>
                                <a href="tel:+923224672015"><i className="fa-solid fa-phone"></i> +92 322 4672015</a>
                                <div><i className="fa-solid fa-location-dot"></i> Lahore, Pakistan</div>
                            </div>
                            <div className="availability">
                                <h3>Availability</h3>
                                <div className="availability-grid">
                                    <div className="day active">Mon</div>
                                    <div className="day active">Tue</div>
                                    <div className="day active">Wed</div>
                                    <div className="day active">Thu</div>
                                    <div className="day active">Fri</div>
                                    <div className="day off">Sat</div>
                                    <div className="day off">Sun</div>
                                </div>
                            </div>
                        </div>
                    </${motion.div}>
                </section>

                <footer className="footer">
                    <span>© ${new Date().getFullYear()} Zohaib Faisal</span>
                    <span>Made by Zohaib</span>
                </footer>
            </main>
        </div>
    `;
}

const rootElement = document.getElementById("root");
if (rootElement) createRoot(rootElement).render(html`<${App} />`);
