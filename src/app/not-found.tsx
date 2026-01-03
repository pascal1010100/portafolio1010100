"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, AlertTriangle } from "lucide-react"

export default function NotFound() {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-background overflow-hidden text-center px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                {/* Iconic 404 Glitch */}
                <div className="relative">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[150px] sm:text-[200px] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary/80 to-transparent font-display opacity-20 select-none"
                    >
                        404
                    </motion.h1>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                        <div className="flex items-center gap-3 mb-4 text-red-500 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="font-mono text-sm tracking-widest uppercase">System Error // Lost Signal</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Page Not Found
                        </h2>

                        <p className="text-muted-foreground text-lg max-w-md mx-auto">
                            The requested coordinates do not exist in the current sector. The resource may have been moved or deleted.
                        </p>
                    </motion.div>
                </div>

                {/* Action Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 group bg-primary text-primary-foreground px-8 py-4 rounded-none border border-primary/20 font-mono tracking-wider uppercase hover:bg-primary/90 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Return_To_Base
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Footer */}
            <div className="absolute bottom-8 left-0 right-0 text-center opacity-30">
                <p className="font-mono text-xs uppercase tracking-[0.3em]">System_Halted // 0xFF_ERR</p>
            </div>
        </div>
    )
}
