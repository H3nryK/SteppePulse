'use client'

import { Fragment, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'

const categories = [
  { name: 'Women', href: '#' },
  { name: 'Men', href: '#' },
  { name: 'Kids', href: '#' },
  { name: 'Sale', href: '#' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div>
            {/* Desktop Navbar */}
            <div className="relative z-10 flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-gray-700 focus:outline-none"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 text-white font-bold text-xl">Brand Logo</div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {categories.map((category) => (
                      <a
                        key={category.name}
                        href={category.href}
                        className="text-white hover:bg-gray-700 hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {category.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="text-white hover:text-gray-200 focus:outline-none"
                >
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  className="text-white hover:text-gray-200 focus:outline-none"
                >
                  <ShoppingBagIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <Dialog as="div" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
              <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
              <DialogPanel className="fixed inset-0 overflow-y-auto bg-gray-900 p-6 sm:hidden">
                <div className="flex justify-between items-center">
                  <div className="text-white text-xl font-bold">Brand Logo</div>
                  <button
                    type="button"
                    className="text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6">
                  <div className="space-y-4">
                    {categories.map((category) => (
                      <a
                        key={category.name}
                        href={category.href}
                        className="block text-white hover:bg-gray-700 hover:text-gray-200 px-3 py-2 rounded-md text-base font-medium"
                      >
                        {category.name}
                      </a>
                    ))}
                    <div className="mt-6 flex justify-between items-center">
                      <button
                        type="button"
                        className="text-white hover:text-gray-200 focus:outline-none"
                      >
                        <MagnifyingGlassIcon className="h-6 w-6" />
                      </button>
                      <button
                        type="button"
                        className="text-white hover:text-gray-200 focus:outline-none"
                      >
                        <ShoppingBagIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  )
}
