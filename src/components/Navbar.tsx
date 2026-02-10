"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-4 md:px-10"
        >
            <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
                {/* Logo */}
                <Link
                    href="#home"
                    className="h-auto w-auto flex flex-row items-center"
                >
                    <span className="font-bold ml-[10px] block text-gray-300 hover:text-white transition">
                        Ayaan Syed
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex w-[500px] h-full flex-row items-center justify-between md:mr-20">
                    <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
                        {["Home", "About", "Portfolio", "Contact"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="cursor-pointer hover:text-[#b49bff] transition-all duration-300 text-sm md:text-base hover:scale-110 hover:shadow-[0_0_15px_rgba(180,155,255,0.5)] rounded-full px-2"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Hamburger Icon */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-300 hover:text-[#b49bff] transition p-2"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        transition={{ duration: 0.3 }}
                        className="absolute top-[65px] left-0 w-full bg-[#030014] border-b border-[#7042f861] shadow-2xl py-5 md:hidden"
                    >
                        <div className="flex flex-col items-center gap-6">
                            {["Home", "About", "Portfolio", "Contact"].map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg text-gray-200 hover:text-[#b49bff] font-medium transition-colors cursor-pointer"
                                >
                                    {item}
                                </Link>
                            ))}

                            {/* Optional: Add social icons here for mobile if needed */}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Navbar;
