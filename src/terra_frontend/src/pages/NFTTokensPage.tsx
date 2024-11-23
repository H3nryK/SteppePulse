import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Tag, Award, Heart, Share2 } from 'lucide-react';

const NFTTokensPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All NFTs' },
    { id: 'endangered', name: 'Endangered' },
    { id: 'reserves', name: 'Reserves' },
    { id: 'hotels', name: 'Eco Hotels' }
  ];

  const nftData = [
    {
      id: 1,
      name: 'Majestic Lion Pride',
      category: 'endangered',
      price: 250,
      image: '/api/placeholder/400/300',
      rarity: 'Legendary',
      conservation: 'Critical',
      location: 'Serengeti'
    },
    {
      id: 2,
      name: 'Rainforest Reserve',
      category: 'reserves',
      price: 500,
      image: '/api/placeholder/400/300',
      rarity: 'Epic',
      conservation: 'Protected',
      location: 'Amazon'
    },
    // Add more NFTs as needed
  ];

  const filteredNFTs = nftData.filter(nft => 
    (selectedCategory === 'all' || nft.category === selectedCategory) &&
    nft.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search NFTs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-green-200 focus:border-green-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full flex items-center ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-green-50'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* NFT Grid */}
      <motion.div
        layout
        className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredNFTs.map(nft => (
            <motion.div
              key={nft.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full"
                  >
                    <Heart className="w-5 h-5 text-red-500" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full"
                  >
                    <Share2 className="w-5 h-5 text-blue-500" />
                  </motion.button>
                </div>
              </motion.div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{nft.name}</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {nft.rarity}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">{nft.price} ICP</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">{nft.conservation}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition flex items-center justify-center"
                >
                  Adopt Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default NFTTokensPage;