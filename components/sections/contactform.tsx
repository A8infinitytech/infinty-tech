"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Phone, Mail } from 'lucide-react';

type WebsiteType = 'business' | 'portfolio' | 'landing_page' | 'e_commerce' | 'web_application' | 'other';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  websiteType: WebsiteType;
  message: string;
}

function mapServiceToWebsiteType(service: string): WebsiteType {
  const serviceMap: Record<string, WebsiteType> = {
    'Scalable Development': 'web_application',
    'AI & Chatbot Integration': 'web_application',
    'Premium UI/UX': 'business',
    'Optimized Code': 'business',
  };
  return serviceMap[service] || 'business';
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');
  
  const initialWebsiteType = serviceParam ? mapServiceToWebsiteType(serviceParam) : 'business';

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    websiteType: initialWebsiteType,
    message: ''
  });

  useEffect(() => {
    if (serviceParam) {
      setFormData(prev => ({ ...prev, websiteType: mapServiceToWebsiteType(serviceParam) }));
    }
  }, [serviceParam]);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (
      !formData.fullName.trim() || 
      !formData.email.trim() || 
      !formData.phoneNumber.trim() || 
      !formData.websiteType || 
      !formData.message.trim()
    ) {
      setErrorMessage('Please fill in all required fields marked with (*).');
      setStatus('error');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ 
          fullName: '', 
          email: '', 
          phoneNumber: '', 
          websiteType: 'business', 
          message: '' 
        });
      } else {
        setErrorMessage(data.message || 'Something went wrong on the server.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Failed to connect to the server. Please check your connection.');
      setStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-slate-100 shadow-2xl shadow-slate-100/50 bg-white">
        
        {/* Left Column: Premium Vibrant Blue Brand Sidebar */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0026ff] via-[#001eff] to-[#0015b3] p-8 md:p-14 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Subtle Inner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-10 backdrop-blur-sm">
              <Sparkles size={12} className="text-white" /> Partner With Us
            </div>
            
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-white">
              Have an idea? <br />
              <span>Let’s build it.</span>
            </h3>
            
            <p className="text-blue-100 text-sm md:text-base leading-relaxed max-w-sm font-normal opacity-90">
              Accelerate your digital transformation. Infinity Tech delivers premium engineering, scalable architectures, and high-performance digital products tailored to your goals.
            </p>

            {/* Corporate Interactive Contact Info */}
            <div className="mt-12 space-y-5">
              {/* Email Link */}
              <a 
                href="mailto:a8infinitytech@gmail.com" 
                className="flex items-center gap-4 p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-[#001eff] transition-all">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-blue-200">Drop us a line</p>
                  <p className="text-xs font-semibold text-white">a8infinitytech@gmail.com</p>
                </div>
              </a>

              {/* Phone Link */}
              <a 
                href="tel:+923181935228" 
                className="flex items-center gap-4 p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-[#001eff] transition-all">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-blue-200">Call Support</p>
                  <p className="text-xs font-semibold text-white">+92 318 1935228</p>
                </div>
              </a>
            </div>
          </div>

          {/* Sidebar Footer */}
          {/* <div className="mt-12 space-y-2 border-t border-white/20 pt-6 relative z-10">
            <div className="flex items-center gap-2 text-white font-medium text-xs">
              <span className="w-2 h-2 rounded-full bg-white shadow-lg shadow-white animate-pulse"></span>
              <p className="text-blue-100 font-semibold opacity-90">Our Engineering Team is Online</p>
            </div>
          </div> */}
        </div>

        {/* Right Column: Clean Interactive Form */}
        <div className="lg:col-span-7 p-8 md:p-14 bg-white relative">
          
          {/* Professional Success Overlay */}
          {status === 'success' && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-20 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-100/50">
                <CheckCircle2 size={38} className="stroke-[2.5]" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Thank You! Your Message is Received</h4>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed font-medium">
                We have received your project details. One of our technical experts will review your request and get back to you shortly.
              </p>
              <button 
                onClick={() => setStatus('idle')} 
                className="mt-8 px-6 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold transition-all"
              >
                Go Back to Form
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Alert Box */}
            {status === 'error' && (
              <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs font-semibold animate-in fade-in duration-200">
                <AlertCircle size={16} className="text-rose-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Full Name <span className="text-[#001eff]">*</span>
                </label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name" 
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:border-[#001eff] focus:bg-white focus:ring-4 focus:ring-[#001eff]/5 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Email Address <span className="text-[#001eff]">*</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address" 
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:border-[#001eff] focus:bg-white focus:ring-4 focus:ring-[#001eff]/5 transition-all duration-200"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Phone Number <span className="text-[#001eff]">*</span>
              </label>
              <input 
                type="tel" 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                placeholder="Enter your phone number" 
                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:border-[#001eff] focus:bg-white focus:ring-4 focus:ring-[#001eff]/5 transition-all duration-200"
              />
            </div>

            {/* Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Website Type <span className="text-[#001eff]">*</span>
              </label>
              <div className="relative">
                <select 
                  name="websiteType"
                  value={formData.websiteType}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-sm focus:outline-none focus:border-[#001eff] focus:bg-white focus:ring-4 focus:ring-[#001eff]/5 transition-all duration-200 appearance-none cursor-pointer font-semibold text-slate-700"
                >
                  <option value="business">Corporate Business Website</option>
                  <option value="portfolio">Professional Portfolio</option>
                  <option value="landing_page">High-Converting Landing Page</option>
                  <option value="e_commerce">E-Commerce Solution</option>
                  <option value="web_application">Custom Web Application</option>
                  <option value="other">Other Digital Product</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Your Message <span className="text-[#001eff]">*</span>
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Enter your project details or requirements..." 
                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:border-[#001eff] focus:bg-white focus:ring-4 focus:ring-[#001eff]/5 transition-all duration-200 resize-none min-h-[120px]"
              />
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#001eff] to-[#001bcc] hover:from-[#001bcc] hover:to-[#001599] disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-xl shadow-[#001eff]/10 active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed tracking-wide"
              >
                {status === 'loading' ? (
                  <>
                    <span>Sending Message...</span>
                    <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}