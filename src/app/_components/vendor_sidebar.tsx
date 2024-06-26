"use client";

import {
  BanknotesIcon,
  Bars3Icon,
  ChatBubbleLeftIcon,
  ClipboardDocumentIcon,
  HomeIcon,
  RectangleGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
/* eslint-disable tailwindcss/no-custom-classname */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import UserProfile from "@/components/user_profile";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function VendorSidebar() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = [
    {
      name: "Dashboard",
      href: "/vendor/dashboard",
      icon: HomeIcon,
    },
    {
      name: "Service Listings",
      href: currentPage
        ? `/vendor/listings?page=${currentPage}`
        : "/vendor/listings?page=1",
      icon: RectangleGroupIcon,
    },
    {
      name: "Messages",
      href: "/vendor/messages",
      icon: ChatBubbleLeftIcon,
    },
    {
      name: "Orders",
      href: "/vendor/orders",
      icon: ClipboardDocumentIcon,
    },
    {
      name: "Finances",
      href: "/vendor/finances",
      icon: BanknotesIcon,
    },
  ];

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="size-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component for smaller screens, swap this element with another sidebar if you like */}
                <div className="dark:bg-foreground flex grow flex-col gap-y-5 overflow-y-auto bg-neutral-50 px-6 pb-2 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <Image
                      className="h-12 w-auto rounded-full"
                      height={48}
                      width={48}
                      src="/originotes_logo.png"
                      alt="Originotes"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={classNames(
                                  pathname.startsWith(item.href.split("?")[0] as string)
                                    ? "bg-neutral-200 text-black"
                                    : "text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                )}
                              >
                                <item.icon
                                  className="size-6 shrink-0"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="dark:bg-foreground flex grow flex-col gap-y-5 overflow-y-auto bg-neutral-50 px-6">
          <div className="flex h-16 shrink-0 items-center">
            <Image
              className="h-12 w-auto rounded-full"
              height={48}
              width={48}
              src="/originotes_logo.png"
              alt="Your Company"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          pathname.startsWith(item.href.split("?")[0] as string)
                            ? "bg-neutral-200 text-black"
                            : "text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className="size-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="-mx-6 mt-auto">
                <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-neutral-800">
                  <UserProfile />
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-neutral-100 p-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="text-foreground -m-2.5 p-2.5 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="size-6" aria-hidden="true" />
        </button>
        <div className="text-foreground flex-1 text-sm font-semibold leading-6">
          Dashboard
        </div>
        <UserProfile />
      </div>
    </>
  );
}
