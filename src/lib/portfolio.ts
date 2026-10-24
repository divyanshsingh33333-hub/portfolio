import coreImage from "@/assets/project-core.jpg";
import lunarImage from "@/assets/project-lunar.jpg";
import neuralImage from "@/assets/project-neural.jpg";

export const profile = {
  name: "Divyansh Singh",
  email: "divyanshsingh33333@gmail.com",
  resume: "",
  github: "https://github.com/divyanshsingh33333-hub",
  linkedin: "",
  location: "Earth · Open to the universe",
};

export const projects = [
  {
    id: "01",
    name: "Aether AI",
    category: "INTELLIGENCE, REIMAGINED",
    description:
      "An exploration of human-centered artificial intelligence. A conversational workspace that turns complex information into clear, actionable insight.",
    stack: ["Next.js", "Python", "OpenAI", "PostgreSQL"],
    image: coreImage,
    detail: "Concept project · AI workspace",
    github: "",
    live: "",
  },
  {
    id: "02",
    name: "Orbit",
    category: "A NEW PERSPECTIVE",
    description:
      "A spatial mission dashboard bringing real-time telemetry, live data, and beautiful visualization into one connected experience.",
    stack: ["React", "Three.js", "Node.js"],
    image: lunarImage,
    detail: "Concept project · Spatial dashboard",
    github: "",
    live: "",
  },
  {
    id: "03",
    name: "Neural Flow",
    category: "CONNECTING THE DOTS",
    description:
      "An experimental machine learning pipeline that makes data relationships visible and model experimentation more intuitive.",
    stack: ["Python", "PyTorch", "FastAPI"],
    image: neuralImage,
    detail: "Concept project · Machine learning",
    github: "",
    live: "",
  },
];

export const skills = [
  {
    name: "Python",
    symbol: "Py",
    className: "planet-python",
    type: "INTELLIGENCE",
    description: "Machine learning, data pipelines, and thoughtful backend systems.",
    tech: "Python · PyTorch · FastAPI",
    projects: "Aether AI · Neural Flow",
  },
  {
    name: "React",
    symbol: "Re",
    className: "planet-react",
    type: "INTERFACE",
    description: "Expressive, accessible interfaces built around real human interactions.",
    tech: "React · TypeScript · Tailwind",
    projects: "Aether AI · Orbit",
  },
  {
    name: "Node.js",
    symbol: "N",
    className: "planet-node",
    type: "INFRASTRUCTURE",
    description: "Connected services, real-time systems, and scalable APIs.",
    tech: "Node.js · PostgreSQL · REST",
    projects: "Orbit",
  },
  {
    name: "Three.js",
    symbol: "3D",
    className: "planet-three",
    type: "DIMENSION",
    description: "Interactive worlds, spatial storytelling, and immersive experiences.",
    tech: "Three.js · WebGL · R3F",
    projects: "Orbit",
  },
  {
    name: "TensorFlow",
    symbol: "Tf",
    className: "planet-tensor",
    type: "LEARNING",
    description: "Exploring the intersection of data, pattern recognition, and intelligence.",
    tech: "TensorFlow · NumPy · Python",
    projects: "Neural Flow",
  },
];
