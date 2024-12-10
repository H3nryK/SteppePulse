import React from 'react';
import { motion } from 'framer-motion';
import { buttonTap } from '../utils/animations';


import { FaWhatsapp, FaTelegram, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";


interface SocialLinksProps {
  className?: string;
}

const socialLinks = [
  {
    name: 'X (Twitter)',
    url: 'https://x.com/steppepulse',
    icon: RiTwitterXFill,
  },
  {
    name: 'Whatsapp Channel',
    url: 'https://whatsapp.com/channel/0029VasrR7A35fLvuli9qG0m',
    icon: FaWhatsapp,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/steppe_pulse',
    icon: FaInstagram,
  },
  {
    name: 'Telegram',
    url: 'https://t.me/steppepulse',
    icon: FaTelegram,
  }
];

export const SocialLinks: React.FC<SocialLinksProps> = ({ className }) => {
  return (
    <div className={className}>
      {socialLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={buttonTap}
          whileHover="hover"
          whileTap="tap"
          className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        >
          <link.icon  />
          <span>{link.name}</span>
        </motion.a>
      ))}
    </div>
  );
};