"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-slate-600 text-lg mb-12">
              Last updated: June 20, 2026
            </p>

            <div className="prose prose-lg text-slate-700 max-w-none">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 mt-12">
                Introduction
              </h2>
              <p>
                Infinity Tech ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website https://infinitytech.io, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the “Site”). Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Site.
              </p>

              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 mt-12">
                Information We Collect
              </h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
              </p>
              <h3>Personal Data</h3>
              <p>
                Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.
              </p>
              <h3>Derivative Data</h3>
              <p>
                Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
              </p>

              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 mt-12">
                How We Use Your Information
              </h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
              </p>
              <ul>
                <li>Create and manage your account.</li>
                <li>Email you regarding your account or order.</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                <li>Generate a personal profile about you to make your visit to the Site more personalized.</li>
                <li>Increase the efficiency and operation of the Site.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              </ul>

              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 mt-12">
                Disclosure Of Your Information
              </h2>
              <p>
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
              </p>
              <h3>By Law or to Protect Rights</h3>
              <p>
                If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
              </p>

              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 mt-12">
                Contact Us
              </h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
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
