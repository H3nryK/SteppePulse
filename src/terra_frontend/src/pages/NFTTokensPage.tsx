'use client'


const product = {
  name: 'Wildlife NFT Collection',
  price: 'Variable',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Wildlife', href: '#' },
    { id: 2, name: 'NFTs', href: '#' },
  ],
  images: [
    {
      src: '/images/bg-7.jpg', // Replace with your image
      alt: 'A digital artwork of an endangered species in its natural habitat.',
    },
    {
      src: '/images/bg-5.avif', // Replace with your image
      alt: 'A beautiful depiction of a rare animal in the wild.',
    },
    {
      src: '/images/bg-6.jpg', // Replace with your image
      alt: 'A mesmerizing scene showing a majestic wildlife animal.',
    },
    {
      src: '/images/bg-8.jpg', // Replace with your image
      alt: 'A breathtaking representation of wildlife conservation.',
    },
  ],
  description:
    'By acquiring one of these exclusive Wildlife NFTs, you are not just getting a unique digital art piece, but you are also contributing to wildlife conservation efforts. Each NFT represents a specific endangered species, highlighting their beauty and vulnerability. Your purchase helps raise awareness and supports projects aimed at preserving these majestic creatures and their habitats for future generations. These NFTs serve as a token of your commitment to protecting wildlife and making a positive impact on the planet.',
  highlights: [
    'Unique, one-of-a-kind digital wildlife artwork',
    'Each NFT represents a specific endangered species',
    'Part of the proceeds go towards wildlife conservation efforts',
    'Limited edition series with rare species depictions',
  ],
  details:
    'This Wildlife NFT Collection includes a series of limited edition digital artworks depicting various endangered species from across the globe. By owning one of these NFTs, you become part of a global community dedicated to wildlife preservation. Your NFT serves as a symbolic gesture of support for the conservation of these animals and their habitats.',
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <div className="bg-gray-800"> {/* Darker background for overall page */}
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-400">
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery with darker overlay */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="relative group">
            <img
              alt={product.images[0].alt}
              src={product.images[0].src}
              className="hidden aspect-[3/4] size-full rounded-lg object-cover lg:block"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg transform hover:scale-110 transition-transform duration-300">
                Shop Now
              </button>
            </div>
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="relative group">
              <img
                alt={product.images[1].alt}
                src={product.images[1].src}
                className="aspect-[3/2] size-full rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg transform hover:scale-110 transition-transform duration-300">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative group">
              <img
                alt={product.images[2].alt}
                src={product.images[2].src}
                className="aspect-[3/2] size-full rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg transform hover:scale-110 transition-transform duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt={product.images[3].alt}
              src={product.images[3].src}
              className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg transform hover:scale-110 transition-transform duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-300 sm:text-3xl">{product.name}</h1>

            {/* Product description */}
            <p className="mt-4 text-base text-gray-400">{product.description}</p>
          </div>

          {/* Learn More About NFTs button */}
          <div className="mt-10 lg:row-span-3 lg:mt-0">
            <button
              type="button"
              className="inline-block w-full rounded-lg bg-green-600 py-3 text-base font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Learn More About NFTs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
