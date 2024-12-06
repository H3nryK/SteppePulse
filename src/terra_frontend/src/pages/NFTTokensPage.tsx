import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Info, Plus, X, Image as ImageIcon } from 'lucide-react';

const WildlifeNFTCollection = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNFTGalleryOpen, setIsNFTGalleryOpen] = useState(false);
  const [mintedNFTs, setMintedNFTs] = useState([]);

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

  const handleMintNFT = () => {
    if (mintedNFTs.length < product.images.length) {
      const newNFT = product.images[mintedNFTs.length];
      setMintedNFTs([...mintedNFTs, newNFT]);
    }
  };

  const openImageModal = (index) => {
    setSelectedImage(index);
    setIsModalOpen(true);
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
              onClick={() => openImageModal(selectedImage)}
              className="w-full rounded-xl shadow-2xl object-cover max-h-[600px] cursor-pointer"
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
            onClick={() => setIsNFTGalleryOpen(true)}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center"
          >
            <ImageIcon className="mr-2" /> My NFT Gallery
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMintNFT}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center"
          >
            <Plus className="mr-2" /> Mint NFT
          </motion.button>
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full max-h-[90vh]"
              >
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 bg-white/20 p-2 rounded-full text-white z-10"
                >
                  <X />
                </button>
                <img 
                  src={product.images[selectedImage].src}
                  alt={product.images[selectedImage].alt}
                  className="w-full h-full object-contain rounded-xl"
                />
                <div className="absolute bottom-4 left-4 bg-black/50 px-4 py-2 rounded-lg">
                  <p className="text-white font-semibold">
                    {product.images[selectedImage].species}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NFT Gallery Modal */}
        <AnimatePresence>
          {isNFTGalleryOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-gray-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">My NFT Gallery</h2>
                  <button 
                    onClick={() => setIsNFTGalleryOpen(false)}
                    className="bg-white/20 p-2 rounded-full text-white"
                  >
                    <X />
                  </button>
                </div>

                {mintedNFTs.length === 0 ? (
                  <div className="text-center py-12">
                    <ImageIcon className="mx-auto mb-4 text-gray-500" size={64} />
                    <p className="text-gray-400">No NFTs minted yet. Start minting!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {mintedNFTs.map((nft, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="rounded-lg overflow-hidden shadow-lg"
                      >
                        <img 
                          src={nft.src} 
                          alt={nft.alt} 
                          className="w-full aspect-square object-cover"
                        />
                        <div className="bg-gray-700 p-2 text-center">
                          <p className="text-sm font-semibold">{nft.species}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WildlifeNFTCollection;