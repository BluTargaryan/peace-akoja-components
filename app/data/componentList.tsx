import { SpringButton } from "../components/atoms/SpringButton";
import { Accordion } from "../components/atoms/Accordion";
import { StaggeredList } from "../components/atoms/StaggeredList";

export const componentList = [
    {
      id: "1",
      name: "Spring Button",
      component: SpringButton,
      description: "A button that compresses on press and springs back on release. Uses a mass-spring-damper simulation — stiffness controls snap speed, damping controls bounce, mass controls sluggishness. Unlike a CSS transition, the spring carries momentum so the button overshoots and settles like a real physical object. Structural styles like cursor and focus ring are hardcoded as a base; visual styling is passed as a Tailwind string via className, merged with tailwind-merge so consumer classes always win. Requires framer-motion and tailwind-merge."
    },
    {
      id: "2",
      name: "Smooth Accordion",
      component: Accordion,
      description: "An accordion that smoothly animates panels open and closed. The height animation works by reading the panel's natural content height via Radix's --radix-accordion-content-height CSS variable and transitioning to it — avoiding the height: auto limitation that breaks CSS transitions. Radix handles aria-expanded, aria-controls, keyboard navigation, and open/closed state. The chevron rotates 180° on open using a group-data-[state=open] Tailwind selector. type='single' allows only one open item at a time; type='multiple' lets each item toggle independently. Requires @radix-ui/react-accordion and tailwind-merge."
    },
    {
      id: "3",
      name: "Staggered List",
      component: StaggeredList,
      description: "A list where each item fades in and slides up in sequence, one after the other. Framer Motion's staggerChildren staggers the start time of each child's animation by a fixed delay — so item 0 starts immediately, item 1 starts after one delay, item 2 after two delays, and so on. useInView triggers the animation only when the list scrolls into the viewport, with an 80px margin so it fires just before the user reaches it. once=true means it only plays on first entry; set it to false to replay on every scroll-in. The component is generic over T so it works with any data shape via the renderItem render prop. Requires framer-motion and tailwind-merge."
    },
];