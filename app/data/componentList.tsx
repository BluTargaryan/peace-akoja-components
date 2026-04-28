import { SpringButton } from "../components/atoms/SpringButton";

export const componentList = [
  {
    componentId: "1",
    name: "Spring Button",
    component: SpringButton,
    description: "A button that compresses on press and springs back on release. Uses a mass-spring-damper simulation — stiffness controls snap speed, damping controls bounce, mass controls sluggishness. Unlike a CSS transition, the spring carries momentum so the button overshoots and settles like a real physical object. Structural styles like cursor and focus ring are hardcoded as a base; visual styling is passed as a Tailwind string via className, merged with tailwind-merge so consumer classes always win. Requires framer-motion and tailwind-merge."
  }
];