"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowRight, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        // Auto focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`pin-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            const prevInput = document.getElementById(`pin-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const fullCode = code.join("");
        if (fullCode.length !== 6) return;

        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: fullCode }),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
            } else {
                const data = await res.json();
                setError(data.error || "Invalid passcode");
                setCode(["", "", "", "", "", ""]);
                document.getElementById("pin-0")?.focus();
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (code.every(digit => digit !== "")) {
            handleSubmit();
        }
    }, [code]);

    return (
        <div className="min-h-screen bg-[#030014] flex items-center justify-center p-5 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-[#0300145e] border border-[#7042f88b] p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative z-10"
            >
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/30">
                        <Lock className="text-purple-400" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
                    <p className="text-gray-400 mb-8">Enter the 6-digit security code to continue</p>

                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex justify-between gap-2 mb-8">
                            {code.map((digit, i) => (
                                <input
                                    key={i}
                                    id={`pin-${i}`}
                                    type="text"
                                    inputMode="numeric"
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    className="w-12 h-14 md:w-14 md:h-16 bg-[#030014] border border-[#7042f88b] rounded-xl text-center text-2xl font-bold text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                                    maxLength={1}
                                    autoComplete="off"
                                />
                            ))}
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg mb-6 justify-center"
                                >
                                    <ShieldAlert size={18} />
                                    <span className="text-sm font-medium">{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading || code.join("").length !== 6}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Verify & Access <ArrowRight size={20} /></>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
