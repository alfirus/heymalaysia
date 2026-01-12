'use client';

import { useState } from 'react';
import {
  Navbar as AceternityNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from '@/components/ui/resizable-navbar';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Malaysia', link: '/malaysia' },
    { name: 'Search', link: '/search' },
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigate = (link: string) => {
    setMobileMenuOpen(false);
    router.push(link);
  };

  return (
			<AceternityNavbar className="top-2 fixed">
				<NavBody>
					<div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
						{/* Replace with your logo image if available, using text for now */}
						<span className="font-bold text-xl text-emerald-900 border-2 border-emerald-900 rounded-md px-1 dark:text-white dark:border-white">HM</span>
						<span className="font-bold text-lg hidden sm:block">Hey Malaysia</span>
					</div>
					<NavItems items={navItems} onItemClick={() => {}} />
					<div className="flex items-center space-x-2">
						<NavbarButton onClick={() => console.log('Login clicked')}>Login</NavbarButton>
					</div>
				</NavBody>

				<MobileNav visible={true} className="px-4">
					<MobileNavHeader>
						<div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
							<span className="font-bold text-xl text-emerald-900 border-2 border-emerald-900 rounded-md px-1 dark:text-white dark:border-white">HM</span>
							<span className="font-bold text-lg">Hey Malaysia</span>
						</div>
						<MobileNavToggle isOpen={mobileMenuOpen} onClick={handleMobileMenuToggle} />
					</MobileNavHeader>
					<MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
						{navItems.map((item, idx) => (
							<div key={idx} className="w-full text-lg font-medium p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors" onClick={() => handleNavigate(item.link)}>
								{item.name}
							</div>
						))}
						<div className="w-full h-px bg-gray-200 my-2" />
						<NavbarButton className="w-full mb-2" onClick={() => console.log('Login clicked')}>
							Login
						</NavbarButton>
					</MobileNavMenu>
				</MobileNav>
			</AceternityNavbar>
		);
}
