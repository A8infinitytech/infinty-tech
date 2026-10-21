"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="bg-white">
      <main className="pt-40 pb-24 md:pb-32">
        <section className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-slate-600 text-lg mb-12">
              Last updated: June 20, 2026
            </p>

            <div className="prose prose-lg text-slate-700 max-w-none">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 mt-12">
                Agreement to Terms
              </h2>
              <p>
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Infinity Tech ("we," "our," or "us"), concerning your access to and use of the https://infinitytech.io website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”). You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Service. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
              </p>

              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 mt-12">
                Intellectual Property Rights
              </h2>
              <p>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions.
              </p>

              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 mt-12">
                User Representations
              </h2>
              <p>
                By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service; (4) you are not under the age of 13; (5) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Site; (6) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise; (7) you will not use the Site for any illegal or unauthorized purpose; and (8) your use of the Site will not violate any applicable law or regulation.
              </p>

              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 mt-12">
                Contact Us
              </h2>
              <p>
                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
              </p>
              <p className="font-bold">Email: a8infinitytech@gmail.com</p>
              <p className="font-bold">Phone: +92 318 1935228</p>

              <div className="mt-12">
                <Link href="/" className="px-8 py-3 bg-primary text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-primary-dark transition-all">
                  Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
