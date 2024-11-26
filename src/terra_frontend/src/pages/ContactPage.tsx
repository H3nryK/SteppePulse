import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  User, 
  MessageSquare, 
  FileText,
  MapPin,
  Phone,
  HelpCircle,
  ChevronDown,
  Clock,
  Globe
} from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do your NFTs support wildlife conservation?",
      answer: "Each NFT purchase directly contributes to our conservation fund. We partner with local organizations to protect endangered species, support habitat restoration, and empower local communities through sustainable development projects."
    },
    {
      question: "What blockchain technology do you use?",
      answer: "We utilize Ethereum blockchain for our NFT minting process, ensuring transparency, security, and verifiable impact tracking for our conservation efforts."
    },
    {
      question: "How can I get involved beyond purchasing NFTs?",
      answer: "We offer volunteer programs, community engagement workshops, and collaborative research opportunities. Join our community platform to learn more about active conservation initiatives."
    },
    {
      question: "Are my contributions tax-deductible?",
      answer: "We are a registered non-profit organization. Donations and NFT purchases may qualify for tax deductions. Please consult with your local tax advisor for specific details."
    }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      description: "123 Conservation Way, Nairobi, Kenya"
    },
    {
      icon: Phone,
      title: "Phone",
      description: "+254 (0)20 123 4567"
    },
    {
      icon: Mail,
      title: "Email",
      description: "info@terrapulse.org"
    },
    {
      icon: Clock,
      title: "Hours",
      description: "Monday-Friday: 9am-5pm EAT"
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', subject: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, background: 'rgba(0,0,0,0)' },
    animate: { 
      opacity: 1, 
      background: 'linear-gradient(135deg, rgba(16,22,58,1) 0%, rgba(32,44,96,1) 100%)',
      transition: { duration: 1 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100 
      } 
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="min-h-screen text-gray-100 py-16"
    >
      <div className="container mx-auto px-4 mt-12 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 mb-8"
          >
            Have questions about our conservation efforts or NFT initiatives? 
            Send us a message and our team will respond promptly.
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div className="space-y-6">
            <motion.div 
              variants={itemVariants}
              className={`relative ${
                focusedField === 'name' 
                  ? 'border-green-400' 
                  : 'border-gray-700'
              } border rounded-lg transition-all duration-300`}
            >
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <User className={`w-5 h-5 ${
                  focusedField === 'name' 
                    ? 'text-green-400' 
                    : 'text-gray-500'
                } transition-colors`} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Your Name"
                required
                className="w-full bg-transparent pl-10 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none"
              />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className={`relative ${
                focusedField === 'email' 
                  ? 'border-green-400' 
                  : 'border-gray-700'
              } border rounded-lg transition-all duration-300`}
            >
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Mail className={`w-5 h-5 ${
                  focusedField === 'email' 
                    ? 'text-green-400' 
                    : 'text-gray-500'
                } transition-colors`} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="Your Email"
                required
                className="w-full bg-transparent pl-10 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none"
              />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className={`relative ${
                focusedField === 'subject' 
                  ? 'border-green-400' 
                  : 'border-gray-700'
              } border rounded-lg transition-all duration-300`}
            >
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <MessageSquare className={`w-5 h-5 ${
                  focusedField === 'subject' 
                    ? 'text-green-400' 
                    : 'text-gray-500'
                } transition-colors`} />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                placeholder="Subject"
                required
                className="w-full bg-transparent pl-10 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none"
              />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className={`relative ${
                focusedField === 'message' 
                  ? 'border-green-400' 
                  : 'border-gray-700'
              } border rounded-lg transition-all duration-300`}
            >
              <div className="absolute left-3 top-3">
                <FileText className={`w-5 h-5 ${
                  focusedField === 'message' 
                    ? 'text-green-400' 
                    : 'text-gray-500'
                } transition-colors`} />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                placeholder="Your Message"
                required
                rows={4}
                className="w-full bg-transparent pl-10 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none resize-none"
              />
            </motion.div>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center text-green-400 space-x-2 mb-4"
              >
                <CheckCircle className="w-6 h-6" />
                <span>Message sent successfully!</span>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center text-red-400 space-x-2 mb-4"
              >
                <AlertCircle className="w-6 h-6" />
                <span>Failed to send message. Please try again.</span>
              </motion.div>
            )}
          </motion.div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-lg"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info & FAQs */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Contact Information */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30"
          >
            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Contact Information
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="flex items-center space-x-4 text-gray-300"
                >
                  <info.icon className="w-6 h-6 text-green-400" />
                  <div>
                    <h4 className="font-semibold text-white">{info.title}</h4>
                    <p className="text-sm text-gray-400">{info.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQs Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30"
          >
            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 flex items-center">
              <HelpCircle className="mr-3 text-green-400" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="border-b border-gray-700 pb-4"
                >
                  <motion.button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <span className="font-medium text-white">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="text-green-400" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {expandedFAQ === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: 1, 
                          height: 'auto',
                          transition: { duration: 0.3 }
                        }}
                        exit={{ 
                          opacity: 0, 
                          height: 0,
                          transition: { duration: 0.2 }
                        }}
                        className="text-gray-400 mt-2 text-sm"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;