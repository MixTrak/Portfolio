"use client";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Github, Linkedin, Instagram } from "lucide-react";
import TextType from './TextType';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" as const }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut" as const
            }
        },
        floating: {
            y: [0, -15, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut" as const
            }
        }
    };

    return (
        <div className="relative flex flex-col h-full w-full overflow-hidden" id="home">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col md:flex-row items-center justify-center px-5 md:px-20 mt-24 md:mt-40 w-full z-[20]"
            >
                <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">

                    <motion.div variants={itemVariants} className="flex flex-col gap-6 mt-6 text-4xl md:text-6xl font-bold text-white max-w-[600px] w-auto h-auto">
                        <span>
                            Full Stack
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                                {" "}
                                Developer
                            </span>
                        </span>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <TextType
                            text={["Ai Enthusiast", "Web Developer"]}
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor
                            cursorCharacter="|"
                            deletingSpeed={50}
                            cursorBlinkDuration={0.5}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-gray-400">
                        <h2>Helping Improve Businesses Through Technology</h2>
                    </motion.div>

                    {/* Tech Stack Pills */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-5">
                        {["Next.js", "TypeScript", "Tailwind", "MongoDB"].map((tech) => (
                            <motion.span
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(112, 66, 248, 0.2)" }}
                                key={tech}
                                className="px-4 py-2 border border-[#7042f88b] rounded-full text-gray-300 text-sm bg-[#0300145e] transition duration-300 cursor-pointer"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-row gap-5">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#portfolio"
                            className="py-3 px-6 border border-[#7042f88b] text-center text-white cursor-pointer rounded-lg max-w-[200px] hover:bg-[#7042f81b] transition duration-300"
                        >
                            Projects
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#contact"
                            className="py-3 px-6 border border-[#7042f88b] text-center text-white cursor-pointer rounded-lg max-w-[200px] hover:bg-[#7042f81b] transition duration-300"
                        >
                            Contact Me
                        </motion.a>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-row gap-5 mt-5">
                        {[
                            { href: "https://github.com/MixTrak", icon: "github", alt: "Github" },
                            { href: "https://www.linkedin.com/in/ayaan-syed-eighteen/", icon: "linkedin", alt: "Linkedin" },
                            { href: "https://www.instagram.com/ayaansyed018/", icon: "instagram", alt: "Instagram" }
                        ].map((social) => (
                            <motion.a
                                key={social.icon}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                href={social.href}
                                target="blank"
                                className="cursor-pointer"
                            >
                                <img src={`https://skillicons.dev/icons?i=${social.icon}&theme=dark`} alt={social.alt} width={40} height={40} />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                <div className="w-full h-full hidden md:flex justify-center items-center mt-10 md:mt-0">
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate={["visible", "floating"]}
                        className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center cursor-pointer"
                    >
                        <img src="/hero.jpg" alt="Hero" className="w-full h-full object-cover rounded-full z-10 shadow-[0_0_50px_rgba(112,66,248,0.3)]" />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
