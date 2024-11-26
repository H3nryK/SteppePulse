import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, User, MessageSquare, FileText } from 'lucide-react';
import { buttonTap, pageTransition } from '../utils/animations';

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
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFieldVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-gray-50 to-blue-50 py-16"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          className="bg-white shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm bg-opacity-90"
        >
          <div className="p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-extrabold text-emerald-800 mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Contact TerraPulse
              </motion.h1>
              <motion.p 
                className="text-gray-600 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Have a question about conservation, our NFTs, or how you can make a difference? 
                Reach out to our team!
              </motion.p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={formFieldVariants}>
                <label 
                  htmlFor="name" 
                  className="flex items-center text-sm font-medium text-gray-700 mb-2"
                >
                  <User className="w-4 h-4 mr-2 text-emerald-600" />
                  Your Name
                </label>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                    focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300"
                  />
                  {focusedField === 'name' && (
                    <motion.div
                      layoutId="focus-indicator"
                      className="absolute inset-0 border-2 border-emerald-500 rounded-lg pointer-events-none"
                      initial={false}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              </motion.div>

              <motion.div variants={formFieldVariants}>
                <label 
                  htmlFor="email" 
                  className="flex items-center text-sm font-medium text-gray-700 mb-2"
                >
                  <Mail className="w-4 h-4 mr-2 text-emerald-600" />
                  Email Address
                </label>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                    focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300"
                  />
                  {focusedField === 'email' && (
                    <motion.div
                      layoutId="focus-indicator"
                      className="absolute inset-0 border-2 border-emerald-500 rounded-lg pointer-events-none"
                      initial={false}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              </motion.div>

              <motion.div variants={formFieldVariants}>
                <label 
                  htmlFor="subject" 
                  className="flex items-center text-sm font-medium text-gray-700 mb-2"
                >
                  <FileText className="w-4 h-4 mr-2 text-emerald-600" />
                  Subject
                </label>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                    focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300"
                  />
                  {focusedField === 'subject' && (
                    <motion.div
                      layoutId="focus-indicator"
                      className="absolute inset-0 border-2 border-emerald-500 rounded-lg pointer-events-none"
                      initial={false}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              </motion.div>

              <motion.div variants={formFieldVariants}>
                <label 
                  htmlFor="message" 
                  className="flex items-center text-sm font-medium text-gray-700 mb-2"
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-emerald-600" />
                  Message
                </label>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                    focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300"
                  />
                  {focusedField === 'message' && (
                    <motion.div
                      layoutId="focus-indicator"
                      className="absolute inset-0 border-2 border-emerald-500 rounded-lg pointer-events-none"
                      initial={false}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                variants={buttonTap}
                whileHover={{ scale: 1.02 }}
                whileTap="tap"
                className={`w-full bg-emerald-600 text-white py-4 px-6 rounded-lg 
                font-semibold hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center
                ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span className="ml-2">Sending...</span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </span>
                )}
              </motion.button>
            </form>

            <AnimatePresence mode="wait">
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Thank you for your message! We'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center"
                >
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Something went wrong. Please try again later.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;