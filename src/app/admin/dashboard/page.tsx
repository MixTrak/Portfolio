"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Mail, User, Calendar, LogOut, MessageSquare, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

const AdminDashboard = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/admin/messages");
            if (res.status === 401) {
                router.push("/admin/login");
                return;
            }
            if (!res.ok) throw new Error("Failed to fetch messages");
            const data = await res.json();
            setMessages(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteMessage = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        try {
            const res = await fetch("/api/admin/messages", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (res.ok) {
                setMessages(messages.filter(m => m._id !== id));
            }
        } catch (err) {
            alert("Failed to delete message");
        }
    };

    const handleLogout = async () => {
        // Since we use HttpOnly cookies, we just need to expire it or let it expire.
        // For simplicity, we redirect and let the middleware/API handle the rest.
        // Here we can just redirect to login
        router.push("/admin/login");
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="min-h-screen bg-[#030014] text-gray-200 p-5 md:p-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                        <p className="text-gray-400">Manage your contact form messages</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-2 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500/20 transition cursor-pointer"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20">
                        <Loader2 className="animate-spin text-purple-500 mb-4" size={48} />
                        <p className="text-gray-400">Loading messages...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-6 rounded-2xl text-center">
                        {error}
                    </div>
                ) : messages.length === 0 ? (
                    <div className="bg-[#0300145e] border border-[#7042f88b] p-20 rounded-2xl text-center flex flex-col items-center">
                        <MessageSquare className="text-gray-600 mb-4" size={64} />
                        <p className="text-gray-400 text-xl font-medium">No messages yet!</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        <AnimatePresence mode="popLayout">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={msg._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[#0300145e] border border-[#7042f88b] p-6 rounded-2xl shadow-xl hover:shadow-purple-500/5 transition-all group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4">
                                        <button
                                            onClick={() => deleteMessage(msg._id)}
                                            className="p-2 text-gray-500 hover:text-red-500 bg-red-500/0 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                                        >
                                            <Trash2 size={24} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-8 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/20">
                                                <User className="text-purple-400" size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">Name</p>
                                                <p className="text-white font-semibold">{msg.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
                                                <Mail className="text-blue-400" size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                                                <p className="text-white font-semibold">{msg.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-cyan-500/10 rounded-full flex items-center justify-center border border-cyan-500/20">
                                                <Calendar className="text-cyan-400" size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">Received</p>
                                                <p className="text-white font-semibold">
                                                    {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#030014] border border-white/5 p-4 rounded-xl">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Message</p>
                                        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
