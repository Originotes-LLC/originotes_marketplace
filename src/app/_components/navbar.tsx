"use client";

import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Disclosure, Menu } from "@headlessui/react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex px-2 lg:px-0">
                <div className="flex shrink-0 items-center">
                  <Image
                    width={48}
                    height={48}
                    className="h-12 w-auto rounded-full"
                    src="/originotes_logo.png"
                    alt="Originotes LLC"
                  />
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {/* Current: "border-fuchsia-500 text-neutral-900", Default: "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700" */}
                  <a
                    href="#"
                    className="inline-flex items-center border-b-2 border-fuchsia-500 px-1 pt-1 text-sm font-medium text-neutral-900"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
                  >
                    Team
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
                  >
                    Calendar
                  </a>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="size-5 text-neutral-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-fuchsia-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block size-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block size-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                <button
                  type="button"
                  className="relative shrink-0 rounded-full bg-white p-1 text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="size-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-4 shrink-0">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                </Menu>
              </div>
            </div>
          </div>
          {/* Something here for mobile ? */}
          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-fuchsia-50 border-fuchsia-500 text-fuchsia-700", Default: "border-transparent text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-800" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-fuchsia-500 bg-fuchsia-50 py-2 pl-3 pr-4 text-base font-medium text-fuchsia-700"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-800"
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-800"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-800"
              >
                Calendar
              </Disclosure.Button>
            </div>
            <div className="border-t border-neutral-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="shrink-0">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-neutral-800">Tom Cook</div>
                  <div className="text-sm font-medium text-neutral-500">tom@example.com</div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-white p-1 text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="size-6" aria-hidden="true" />
                </button>
              </div>

            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
