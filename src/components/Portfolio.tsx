"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Link2, ExternalLink } from "lucide-react";
import Skills from "./Skills";

const Projects = () => {
    const [activeTab, setActiveTab] = useState("projects");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const projects = [
        {
            title: "SkillShare Platform",
            desc: "A comprehensive skill-sharing platform built with Next.js and Tailwind CSS, featuring course management and student interactions.",
            tags: ["Next.js", "Tailwind", "TypeScript"],
            images: ["/SkillShare1.svg", "/SkillShare2.svg", "/SkillShare3.svg"],
        },
        {
            title: "Coming Soon!",
            desc: "Coming Soon!",
            tags: ["React", "Firebase", "Chart.js"],
        },
        {
            title: "Coming Soon!",
            desc: "Coming Soon!",
            tags: ["TypeScript", "Redux", "Framer"],
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-20 relative z-[20]" id="portfolio">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[30px] md:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10"
            >
                Portfolio Showcase
            </motion.h1>

            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-row gap-5 mb-10 p-1 border border-[#7042f88b] rounded-full bg-[#0300145e]"
            >
                {["projects", "certificates", "tech stack"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize relative ${activeTab === tab
                            ? "text-white"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full z-[-1]"
                            />
                        )}
                        {tab}
                    </button>
                ))}
            </motion.div>

            <AnimatePresence mode="wait">
                {activeTab === "projects" ? (
                    <motion.div
                        key="projects"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="h-full w-full flex flex-col md:flex-row gap-10 px-10 max-w-7xl flex-wrap justify-center"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.2)" }}
                                className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] bg-[#0300145e] w-full md:w-[350px] transition duration-300"
                            >
                                {/* Project Image or Carousel */}
                                {project.images ? (
                                    <div className="carousel w-full h-[200px] relative overflow-hidden">
                                        {project.images.map((img, i) => (
                                            <div
                                                key={i}
                                                className={`carousel-item relative w-full h-full transition-transform duration-300 absolute inset-0 ${i === currentImageIndex ? "translate-x-0" : i < currentImageIndex ? "-translate-x-full" : "translate-x-full"
                                                    }`}
                                                style={{ display: i === currentImageIndex ? 'block' : 'none' }}
                                            >
                                                <img
                                                    src={img}
                                                    className="w-full object-cover h-full"
                                                    alt={`${project.title} screenshot ${i + 1}`}
                                                />
                                                <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 transform justify-between pointer-events-none z-10">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setCurrentImageIndex(prev => (prev === 0 ? project.images!.length - 1 : prev - 1));
                                                        }}
                                                        className="btn btn-circle btn-xs bg-black/50 border-none text-white hover:bg-purple-600 pointer-events-auto transition-colors"
                                                    >
                                                        ❮
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setCurrentImageIndex(prev => (prev === project.images!.length - 1 ? 0 : prev + 1));
                                                        }}
                                                        className="btn btn-circle btn-xs bg-black/50 border-none text-white hover:bg-purple-600 pointer-events-auto transition-colors"
                                                    >
                                                        ❯
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full h-[200px] bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center text-gray-500">
                                        <h1>Coming Soon!</h1>
                                    </div>
                                )}

                                <div className="p-4">
                                    <h1 className="text-2xl font-semibold text-white">{project.title}</h1>
                                    <p className="mt-2 text-gray-300">{project.desc}</p>

                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs text-purple-300 border border-purple-500/30 px-2 py-1 rounded">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-[300px] h-auto w-full flex items-center justify-center text-gray-500"
                    >
                        {activeTab === "certificates" && "Coming Soon!"}
                        {activeTab === "tech stack" && <Skills />}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Projects;
