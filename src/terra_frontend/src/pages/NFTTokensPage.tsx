import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Info } from 'lucide-react';

const WildlifeNFTCollection = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [liked, setLiked] = useState(false);

  const product = {
    name: 'Wildlife Conservation NFT Collection',
    price: 'Variable Pricing',
    description: 'By acquiring one of these exclusive Wildlife NFTs, you are not just getting a unique digital art piece, but you are also contributing to wildlife conservation efforts. Each NFT represents a specific endangered species, highlighting their beauty and vulnerability.',
    images: [
      { src: '/images/bg-7.jpg', alt: 'Endangered Species Digital Art', species: 'Sumatran Tiger' },
      { src: '/images/bg-5.avif', alt: 'Rare Animal Artwork', species: 'Amur Leopard' },
      { src: '/images/bg-6.jpg', alt: 'Majestic Wildlife Scene', species: 'Mountain Gorilla' },
      { src: '/images/bg-8.jpg', alt: 'Wildlife Conservation Representation', species: 'Black Rhino' }
    ],
    conservationImpact: [
      { metric: 'Acres Protected', value: '500+' },
      { metric: 'Species Supported', value: '12' },
      { metric: 'Funds Raised', value: '$250,000+' }
    ]
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 mt-16 text-center"
        >
          <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            {product.name}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform Digital Art into Real-World Conservation
          </p>
        </motion.div>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Main Image */}
          <motion.div 
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <img 
              src={product.images[selectedImage].src} 
              alt={product.images[selectedImage].alt}
              className="w-full rounded-xl shadow-2xl object-cover max-h-[600px]"
            />
            <div className="absolute top-4 right-4 flex space-x-4">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setLiked(!liked)}
                className={`p-2 rounded-full ${liked ? 'bg-red-500 text-white' : 'bg-white/20 text-white'}`}
              >
                <Heart fill={liked ? 'white' : 'transparent'} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/20 p-2 rounded-full text-white"
              >
                <Share2 />
              </motion.button>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/50 px-4 py-2 rounded-lg">
              <p className="text-white font-semibold">
                {product.images[selectedImage].species}
              </p>
            </div>
          </motion.div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <motion.img 
                key={index}
                src={img.src}
                alt={img.alt}
                onClick={() => setSelectedImage(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-lg cursor-pointer object-cover aspect-square 
                  ${selectedImage === index 
                    ? 'border-4 border-green-500 opacity-100' 
                    : 'opacity-60 hover:opacity-100'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Conservation Impact */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
            <Info className="mr-3 text-green-500" /> Conservation Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {product.conservationImpact.map((impact, index) => (
              <div 
                key={index} 
                className="text-center bg-gray-700 p-4 rounded-lg"
              >
                <div className="text-4xl font-extrabold text-green-500 mb-2">
                  {impact.value}
                </div>
                <div className="text-gray-300">{impact.metric}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Purchase & Learn More */}
        <div className="mt-12 flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition"
          >
            Purchase NFT
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default WildlifeNFTCollection;