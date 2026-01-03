"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Github, Linkedin, MessageSquare, Terminal, Signal } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type FormState = {
  name: string;
  email: string;
  project: string;
  budget: number;
  message: string;
  website: string; // honeypot
};

const budgetLabels = ["< $5k", "$5k - $15k", "$15k - $50k", "> $50k"];

export function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    project: "",
    budget: 0,
    message: "",
    website: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return; // honeypot
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.ok) {
        setSuccess(true);
        setForm({
          name: "",
          email: "",
          project: "",
          budget: 0,
          message: "",
          website: "",
        });
      } else {
        alert("Error: " + (data.error || "Failed to send message"));
      }
    } catch (error) {
      console.error(error);
      alert("Network error, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionContainer id="contact" className="relative py-24 bg-background overflow-hidden">
      {/* Neo-Grid Background */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-[0.02]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="mb-16 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-primary/80 font-mono text-xs tracking-[0.2em] uppercase mb-4 border border-primary/20 px-3 py-1 rounded-full bg-primary/5">
            <Signal className="w-3 h-3 animate-pulse" />
            <span>Secure_Uplink_Established</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 uppercase">
            Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Protocol</span>
          </h2>

          <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
            Ready to deploy your vision? Establish a direct line for project collaboration and architecture planning.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">

          {/* Left Panel: Contact Intel */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Identity Card */}
            <div className="p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-white/10 relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <Terminal className="w-24 h-24 text-primary" />
              </div>

              <h3 className="text-xl font-display font-medium text-white mb-6 uppercase tracking-wide">
                Access_Credentials
              </h3>

              <div className="space-y-6 relative z-10">
                <a href="mailto:pascal@pascal.dev" className="flex items-center gap-4 text-zinc-400 hover:text-primary transition-colors group/link">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover/link:bg-primary/10 group-hover/link:border-primary/20 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase text-zinc-500 mb-1">Direct_Mail_Feed</span>
                    <span className="text-lg font-medium">pascal@pascal.dev</span>
                  </div>
                </a>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <SocialButton href="https://github.com/pascal1010100" icon={Github} label="GitHub" />
                  <SocialButton href="https://linkedin.com/in/josema-aguilar-dev" icon={Linkedin} label="LinkedIn" />
                </div>
              </div>
            </div>

            {/* Status Panel */}
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <h4 className="text-sm font-mono font-bold text-primary mb-1">STATUS: OPEN FOR WORK</h4>
                  <p className="text-xs text-primary/70 leading-relaxed">
                    Available for new contracts. Priority access for SaaS and AI-integration projects.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Transmission Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    label="User_ID"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })}
                  />
                  <InputField
                    label="Comms_Channel"
                    placeholder="name@company.com"
                    type="email"
                    value={form.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <InputField
                  label="Objective_Brief"
                  placeholder="e.g. AI-Powered SaaS Platform"
                  value={form.project}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, project: e.target.value })}
                />

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-3 tracking-wider">
                    Resource_Allocation
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {budgetLabels.map((label, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setForm({ ...form, budget: idx })}
                        className={cn(
                          "px-3 py-2 text-xs font-mono rounded-lg border transition-all",
                          form.budget === idx
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-3 tracking-wider">
                    Transmission_Data
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Describe project parameters..."
                    value={form.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || success}
                  className="group relative w-full overflow-hidden rounded-lg bg-white/5 p-[1px] transition-all hover:bg-white/10 active:scale-[0.99]"
                >
                  <div className="relative flex items-center justify-center gap-2 rounded-lg bg-zinc-950/50 px-8 py-4 transition-all group-hover:bg-zinc-900/50">
                    {/* Geometric Accents */}
                    <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-white/20 transition-all group-hover:border-primary/50" />
                    <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-white/20 transition-all group-hover:border-primary/50" />

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 -translate-x-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />

                    {submitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin border-2 border-zinc-500 border-t-white rounded-full" />
                        <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">Processing...</span>
                      </>
                    ) : success ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="font-mono text-xs uppercase tracking-widest text-primary">Transmitted</span>
                      </>
                    ) : (
                      <>
                        <span className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-300 transition-colors group-hover:text-white">Initialize_Uplink</span>
                        <Send className="w-4 h-4 text-zinc-500 transition-all group-hover:translate-x-1 group-hover:text-primary" />
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </SectionContainer>
  );
}

function InputField({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-mono uppercase text-zinc-500 tracking-wider">
        {label}
      </label>
      <input
        className="w-full bg-black/20 border-b border-white/10 p-3 text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-primary transition-colors"
        {...props}
      />
    </div>
  )
}

function SocialButton({ href, icon: Icon, label }: any) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
    >
      <Icon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
      <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">{label}</span>
    </a>
  )
}
