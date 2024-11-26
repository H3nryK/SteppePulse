import React from 'react';
import { motion } from 'framer-motion';
import { buttonTap } from './animations';

interface IconProps {
  className?: string;
  color?: string;
  size?: number;
  onClick?: () => void;
}

const baseIconStyle: React.CSSProperties = {
  display: 'inline-block',
  lineHeight: 0,
};

export const TerraPulseLogo: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <motion.path
      d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
      stroke={color}
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

export const GameIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <motion.svg
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className}
    variants={buttonTap}
    whileTap="tap"
    onClick={onClick}
    style={baseIconStyle}
  >
    <path
      d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
      fill={color}
    />
  </motion.svg>
);

export const TokenIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeWidth="2"
      fill="none"
      initial={{ scale: 0.8, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
    />
    <motion.path
      d="M12 6v12M6 12h12"
      stroke={color}
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5 }}
    />
  </svg>
);

export const MarketplaceIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <motion.path
      d="M3 3h18v2H3V3zm0 16h18v2H3v-2zm0-8h18v2H3v-2z"
      fill={color}
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  </svg>
);

export const WalletIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <motion.path
      d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
      fill={color}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    />
  </svg>
);

export const NotificationIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <motion.path
      d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
      fill={color}
      initial={{ y: -5 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    />
  </svg>
);