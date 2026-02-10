"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Mail, User, MessageSquare, Send, Github, Linkedin, Instagram, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center py-20 z-[20]" id="contact">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[30px] md:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10"
            >
                Contact Me
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 mb-10 text-center max-w-[600px] px-5"
            >
                Got a project in mind or just want to say hi? Feel free to reach out below.
            </motion.p>

            <div className="flex flex-col md:flex-row gap-10 md:gap-20 w-full max-w-6xl px-4 md:px-10">
                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 w-full bg-[#0300145e] border border-[#7042f88b] p-8 rounded-2xl shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 font-medium">Name</label>
                            <div className="relative">
                                <User className="absolute top-3 left-3 text-gray-500" size={20} />
                                <input
                                    required
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#111] border border-gray-800 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500 transition"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 font-medium">Email</label>
                            <div className="relative">
                                <Mail className="absolute top-3 left-3 text-gray-500" size={20} />
                                <input
                                    required
                                    type="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[#111] border border-gray-800 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500 transition"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 font-medium">Message</label>
                            <div className="relative">
                                <MessageSquare className="absolute top-3 left-3 text-gray-500" size={20} />
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-[#111] border border-gray-800 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500 transition"
                                ></textarea>
                            </div>
                        </div>

                        <div className="relative">
                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex items-center justify-center gap-2 text-green-500 font-medium bg-green-500/10 p-4 rounded-lg"
                                    >
                                        <CheckCircle size={20} /> Message sent successfully!
                                    </motion.div>
                                ) : status === "error" ? (
                                    <motion.div
                                        key="error"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex items-center justify-center gap-2 text-red-500 font-medium bg-red-500/10 p-4 rounded-lg"
                                    >
                                        <AlertCircle size={20} /> Failed to send message.
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        key="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {status === "loading" ? (
                                            <Loader2 className="animate-spin" size={20} />
                                        ) : (
                                            <Send size={20} />
                                        )}
                                        {status === "loading" ? "Sending..." : "Send Message"}
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>
                </motion.div>

                {/* Connect Links */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 flex flex-col gap-5 justify-center"
                >
                    <h2 className="text-2xl font-bold text-white mb-5">Connect With Me</h2>

                    {[
                        { skillId: "linkedin", label: "LinkedIn", user: "Ayaan Syed", url: "https://www.linkedin.com/in/ayaan-syed-eighteen/" },
                        { skillId: "instagram", label: "Instagram", user: "@ayaansyed018", url: "https://www.instagram.com/ayaansyed018/" },
                        { skillId: "github", label: "GitHub", user: "@MixTrak", url: "https://github.com/MixTrak" },
                    ].map((social, i) => (
                        <motion.a
                            whileHover={{ scale: 1.05, x: 10 }}
                            href={social.url}
                            target="_blank"
                            key={i}
                            className="flex items-center gap-4 p-5 rounded-xl border border-[#7042f88b] bg-[#0300145e] hover:bg-[#7042f81b] transition cursor-pointer group"
                        >
                            <div className="group-hover:scale-110 transition duration-300">
                                <img src={`https://skillicons.dev/icons?i=${social.skillId}&theme=dark`} alt={social.label} width={40} height={40} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-white group-hover:text-[#b49bff] transition">{social.label}</span>
                                <span className="text-gray-400 text-sm">{social.user}</span>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
