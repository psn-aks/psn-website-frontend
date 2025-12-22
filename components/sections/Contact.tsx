"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { endpoints } from "@/lib/serverApi";

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        const form = e.currentTarget;

        const formData = new FormData(form);


        try {
            const res = await fetch(`${endpoints.contact}/send-mail`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errText = await res.text();
                console.error("Backend error:", errText);
                throw new Error("Failed to send message");
            }

            setSuccess("✅ Your message has been sent successfully!");
            form.reset();
        } catch (err) {
            console.error("❌ Error sending message:", err);
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-gray-100">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
                    Get in Touch
                </h2>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Info Section */}
                    <div className="space-y-6">
                        <p className="text-lg text-gray-600">
                            Have a question, feedback, or partnership inquiry? We'd love to hear from you.
                        </p>

                        <div className="flex items-center gap-3 text-gray-700">
                            <Mail className="text-blue-600" /> psnaks@gmail.com
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <Phone className="text-blue-600" /> +234 11 1111 111
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <MapPin className="text-blue-600" /> 123 Pharma Street, Uyo
                        </div>
                        <br />
                        <div className="inline-flex flex-col gap-1 p-1">
                            <div className="text-left">
                                Follow us on social media
                            </div>
                            <div className="flex justify-center gap-4">
                                <FaFacebook size={25} className="text-blue-600" />
                                <FaXTwitter size={25} className="text-black" />
                                <FaInstagram size={25} className="text-red-600" />
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl shadow-md p-6 space-y-4"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label htmlFor="name" className="block text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="address"
                                name="address"
                                type="email"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white transition ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                                }`}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </Button>

                        {success && (
                            <p className="text-green-600 text-center font-medium mt-2">
                                {success}
                            </p>
                        )}
                        {error && (
                            <p className="text-red-600 text-center font-medium mt-2">
                                {error}
                            </p>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
