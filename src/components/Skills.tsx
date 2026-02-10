"use client";
import { motion } from "framer-motion";
import React from "react";

const SkillItem = ({ src, alt, name }: { src: string, alt: string, name: string }) => {
    return (
        <motion.div
            className="group relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-sm cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(112, 66, 248, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-300" />
            <img src={src} alt={alt} width={64} height={64} className="z-10 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-300" />
            <span className="text-gray-300 font-medium z-10 group-hover:text-white transition">{name}</span>
        </motion.div>
    );
};

const Skills = () => {
    const skills = [
        { name: "Next.js", src: "https://skillicons.dev/icons?i=nextjs&theme=dark" },
        { name: "TypeScript", src: "https://skillicons.dev/icons?i=ts&theme=dark" },
        { name: "Tailwind", src: "https://skillicons.dev/icons?i=tailwind&theme=dark" },
        { name: "MongoDB", src: "https://skillicons.dev/icons?i=mongodb&theme=dark" },
        { name: "Git", src: "https://skillicons.dev/icons?i=git&theme=dark" },
        { name: "Node.js", src: "https://skillicons.dev/icons?i=nodejs&theme=dark" },
        { name: "Express", src: "https://skillicons.dev/icons?i=express&theme=dark" },
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

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
    };

    return (
        <section id="skills" className="w-full h-full flex flex-col items-center justify-center gap-3 relative z-[20] py-20 overflow-hidden">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[30px] md:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-10"
            >
                My Tech Stack
            </motion.h1>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-row flex-wrap justify-center gap-5 md:gap-8 w-full max-w-6xl px-4"
            >
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                    >
                        <SkillItem src={skill.src} alt={skill.name} name={skill.name} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Skills;
