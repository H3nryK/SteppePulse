import { Link } from "react-router-dom";

export default function Example() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Adopt and Earn Tokens
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Support wildlife conservation by adopting animals digitally and earning tokens as you make a difference.
            </p>
          </div>

          {/* Top Left Image */}
          <div className="absolute top-16 left-4">
            <img
              alt="Wildlife"
              src="/images/top-left-image.jpg"
              className="h-32 w-32 rounded-lg object-cover"
            />
          </div>

          <div className="mt-10">
            {/* Decorative image grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
            >
              <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <div className="flex items-center space-x-6 lg:space-x-8">
                  {/* Left side images */}
                  <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="relative h-64 w-44 overflow-hidden rounded-lg group">
                      <img
                        alt="Adopt a Koala"
                        src="/images/bg-7.jpg"
                        className="h-full w-full object-cover group-hover:animate-shake"
                      />
                      {/* Use Link to navigate to the animal adoption page */}
                      <Link
                        to="/adopt/koala"
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-md border border-transparent bg-green-500 px-18 py-0.09 text-center text-sm font-medium text-white transition-all duration-200 group-hover:scale-75"
                      >
                        Adopt Now
                      </Link>
                    </div>
                    <div className="relative h-64 w-44 overflow-hidden rounded-lg group">
                      <img
                        alt="Adopt a Tiger"
                        src="/images/bg-7.jpg"
                        className="h-full w-full object-cover group-hover:animate-shake"
                      />
                      {/* Use Link to navigate to the animal adoption page */}
                      <Link
                        to="/adopt/tiger"
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-md border border-transparent bg-green-500 px-18 py-0.09 text-center text-sm font-medium text-white transition-all duration-200 group-hover:scale-75"
                      >
                        Adopt Now
                      </Link>
                    </div>
                  </div>

                  {/* Center images */}
                  <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="relative h-64 w-44 overflow-hidden rounded-lg group">
                      <img
                        alt="Adopt a Lion"
                        src="/images/bg-6.jpg"
                        className="h-full w-full object-cover group-hover:animate-shake"
                      />
                      {/* Use Link to navigate to the animal adoption page */}
                      <Link
                        to="/adopt/lion"
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-md border border-transparent bg-green-500 px-18 py-0.09 text-center text-sm font-medium text-white transition-all duration-200 group-hover:scale-75"
                      >
                        Adopt Now
                      </Link>
                    </div>
                    <div className="relative h-64 w-44 overflow-hidden rounded-lg group">
                      <img
                        alt="Adopt an Elephant"
                        src="/images/bg-8.jpg"
                        className="h-full w-full object-cover group-hover:animate-shake"
                      />
                      {/* Use Link to navigate to the animal adoption page */}
                      <Link
                        to="/adopt/elephant"
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-md border border-transparent bg-green-500 px-18 py-0.09 text-center text-sm font-medium text-white transition-all duration-200 group-hover:scale-75"
                      >
                        Adopt Now
                      </Link>
                    </div>
                    <div className="relative h-64 w-44 overflow-hidden rounded-lg group">
                      <img
                        alt="Adopt a Giraffe"
                        src="/images/bg-7.jpg"
                        className="h-full w-full object-cover group-hover:animate-shake"
                      />
                      {/* Use Link to navigate to the animal adoption page */}
                      <Link
                        to="/adopt/giraffe"
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-md border border-transparent bg-green-500 px-18 py-0.09 text-center text-sm font-medium text-white transition-all duration-200 group-hover:scale-75"
                      >
                        Adopt Now
                      </Link>
                    </div>
                  </div>

                  {/* Right side images */}
                  <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="relative h-64 w-44 overflow-hidden rounded-lg group">
                      <img
                        alt="Adopt a Panda"
                        src="/images/bg-6.jpg"
                        className="h-full w-full object-cover group-hover:animate-shake"
                      />
                      {/* Use Link to navigate to the animal adoption page */}
                      <Link
                        to="/adopt/panda"
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-md border border-transparent bg-green-500 px-18 py-0.09 text-center text-sm font-medium text-white transition-all duration-200 group-hover:scale-75"
                      >
                        Adopt Now
                      </Link>
                    </div>
                    <div className="relative h-64 w-44 overflow-hidden rounded-lg group">
                      <img
                        alt="Adopt a Zebra"
                        src="/images/bg-8.jpg"
                        className="h-full w-full object-cover group-hover:animate-shake"
                      />
                      {/* Use Link to navigate to the animal adoption page */}
                      <Link
                        to="/adopt/zebra"
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-md border border-transparent bg-green-500 px-18 py-0.09 text-center text-sm font-medium text-white transition-all duration-200 group-hover:scale-75"
                      >
                        Adopt Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Adopting Button */}
            <Link
              to="/category"
              className="mt-8 inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
            >
              Start Adopting
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
