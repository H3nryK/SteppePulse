import { Variants } from 'framer-motion';

// Hover animations
export const pulseHover: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, type: 'spring', stiffness: 300 }
  }
};

export const glowHover: Variants = {
  initial: { 
    boxShadow: '0 0 0 rgba(88, 216, 146, 0)' 
  },
  hover: { 
    boxShadow: '0 0 20px rgba(88, 216, 146, 0.6)',
    transition: { duration: 0.3 }
  }
};

// Page transitions
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }
  }
};

// Card animations
export const cardHover: Variants = {
  initial: { y: 0 },
  hover: { 
    y: -10,
    transition: { duration: 0.2, type: 'spring' }
  }
};

// List item animations
export const listItemAnimation: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

// Stagger children animation
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Loading animations
export const spinAnimation: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Button animations
export const buttonTap: Variants = {
  initial: { scale: 1 },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Notification animations
export const notificationSlide: Variants = {
  initial: { x: 100, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  },
  exit: { 
    x: 100, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};