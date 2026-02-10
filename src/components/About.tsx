"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Download, BookOpen } from "lucide-react";

const About = () => {
    return (
        <section
            id="about"
            className="flex flex-col items-center justify-center gap-10 overflow-hidden pb-20 relative z-[20] px-4 md:px-10 mt-20"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-[30px] md:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20"
            >
                About Me
            </motion.div>

            <div className="flex flex-col md:flex-row gap-10 items-start w-full max-w-6xl">
                {/* Bio */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex-1 flex flex-col gap-5"
                >
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Hello! I&apos;m <span className="text-purple-400 font-bold">Ayaan Syed</span>. I am a full-stack developer with a passion for building user-friendly web applications. I started my journey 3 years ago with python then moved on to web development and recently i have achieved the title of full-stack developer.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Fast-forward to today, where I plan on launching my own start-up in march of 2026. Stay Tuned!
                    </p>

                    <div className="flex flex-row gap-4 mt-5">
                        <Link href="#portfolio">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#7042f88b] text-white font-medium hover:bg-[#7042f81b] transition"
                            >
                                <BookOpen size={20} /> View Projects
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex-1 flex flex-col gap-5 w-full"
                >
                    {[
                        { count: "15+", label: "TOTAL PROJECTS", desc: "Completed" },
                        { count: "03+", label: "YEARS EXP", desc: "Work Experience" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02, x: 10 }}
                            className="w-full flex items-center justify-between p-6 rounded-xl border border-[#7042f88b] bg-[#0300145e] hover:bg-[#7042f81b] transition cursor-pointer group"
                        >
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white group-hover:text-[#b49bff] transition">{stat.count}</span>
                                <span className="text-gray-400 text-sm mt-1">{stat.label}</span>
                            </div>
                            <span className="text-gray-500 text-sm">{stat.desc}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default About;
