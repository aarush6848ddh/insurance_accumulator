"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Building2, 
  DollarSign, 
  Users, 
  FileText, 
  Shield, 
  TrendingUp, 
  Activity, 
  ArrowRight,
  HeartPulse,
  UserCheck,
  ClipboardCheck,
  Briefcase,
  PieChart,
  Wallet,
  Zap,
  ShieldCheck,
  Calculator,
  Stethoscope,
  Receipt,
  BarChart3,
  CreditCard
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroButtonRef = useRef<HTMLButtonElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsTitleRef = useRef<HTMLHeadingElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const conceptsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statNumbersRef = useRef<HTMLDivElement[]>([]);
  const backgroundShapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure GSAP is available
    if (typeof window === 'undefined' || !gsap) return;

    // Animated background shapes
    if (backgroundShapesRef.current) {
      const shapes = backgroundShapesRef.current.querySelectorAll('.bg-shape');
      shapes.forEach((shape, index) => {
        gsap.to(shape, {
          x: `+=${(index % 2 === 0 ? 1 : -1) * 50}`,
          y: `+=${(index % 2 === 0 ? -1 : 1) * 30}`,
          rotation: `+=${(index % 2 === 0 ? 1 : -1) * 15}`,
          duration: 20 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });
    }

    // Hero section - sophisticated entrance animation
    if (heroRef.current && heroTitleRef.current && heroSubtitleRef.current && heroButtonRef.current) {
      // Split text animation for title
      const titleText = heroTitleRef.current.textContent || '';
      heroTitleRef.current.innerHTML = titleText
        .split(' ')
        .map(word => `<span class="inline-block">${word}</span>`)
        .join(' ');
      
      const titleWords = heroTitleRef.current.querySelectorAll('span');
      
      // Set initial states
      gsap.set([titleWords, heroSubtitleRef.current, heroButtonRef.current], { opacity: 1 });
      gsap.set(titleWords, { y: 100, opacity: 0, rotationX: -90 });
      gsap.set(heroSubtitleRef.current, { y: 30, opacity: 0 });
      gsap.set(heroButtonRef.current, { scale: 0, opacity: 0, rotation: -180 });

      // Create master timeline
      const masterTL = gsap.timeline();
      
      // Animate title words with 3D effect
      masterTL.to(titleWords, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: {
          amount: 0.8,
          from: 'start'
        },
        ease: 'power4.out'
      })
      .to(heroSubtitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.4')
      .to(heroButtonRef.current, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(2)'
      }, '-=0.3');

      // Continuous subtle animation for hero elements
      gsap.to(heroTitleRef.current, {
        y: -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
      });
    }

    // Features section - 3D card flip effect
    if (featuresRef.current) {
      const cards = featuresRef.current.querySelectorAll('.feature-card');
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 1, y: 0, rotationY: 0 });
        
        cards.forEach((card, index) => {
          // Initial state
          gsap.set(card, { 
            opacity: 0, 
            y: 100, 
            rotationY: -15,
            transformPerspective: 1000
          });

          // Scroll animation
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1.2,
            delay: index * 0.15,
            ease: 'power3.out'
          });

          // Hover effect
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              rotationY: 5,
              scale: 1.02,
              duration: 0.4,
              ease: 'power2.out'
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              rotationY: 0,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out'
            });
          });
        });
      }
    }

    // Stats section - impressive counter animation with reveal
    if (statsRef.current && statsTitleRef.current) {
      // Title animation
      gsap.from(statsTitleRef.current, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 1,
        ease: 'power3.out'
      });

      // Stats counter animation
      statNumbersRef.current.forEach((statEl, index) => {
        if (statEl) {
          const targetValue = parseInt(statEl.getAttribute('data-value') || '0');
          const suffix = statEl.getAttribute('data-suffix') || '';
          const card = statEl.closest('.stat-card');
          
          // Set initial state
          const obj = { value: 0 };
          statEl.textContent = '0' + suffix;
          if (card) {
            gsap.set(card, { scale: 0.8, opacity: 0, y: 30 });
          }

          ScrollTrigger.create({
            trigger: statEl,
            start: 'top 90%',
            once: true,
            onEnter: () => {
              // Card reveal
              if (card) {
                gsap.to(card, {
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: 'back.out(1.5)',
                  delay: index * 0.1
                });
              }

              // Number counter with elastic effect
              gsap.to(obj, {
                value: targetValue,
                duration: 2.5,
                ease: 'elastic.out(1, 0.5)',
                delay: index * 0.1 + 0.3,
                onUpdate: () => {
                  if (statEl) {
                    statEl.textContent = Math.floor(obj.value) + suffix;
                    // Pulse effect during counting
                    gsap.to(statEl, {
                      scale: 1.1,
                      duration: 0.1,
                      yoyo: true,
                      repeat: 1,
                      ease: 'power2.inOut'
                    });
                  }
                },
                onComplete: () => {
                  // Final pulse
                  gsap.to(statEl, {
                    scale: 1.05,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                  });
                }
              });
            }
          });
        }
      });
    }

    // How It Works - sequential reveal with connecting line effect
    if (howItWorksRef.current) {
      const steps = howItWorksRef.current.querySelectorAll('.step-item');
      if (steps.length > 0) {
        gsap.set(steps, { opacity: 1, x: 0 });
        
        steps.forEach((step, index) => {
          const number = step.querySelector('.step-number');
          const content = step.querySelector('.step-content');
          
          gsap.set([number, content], { opacity: 0 });
          gsap.set(number, { scale: 0, rotation: -180 });
          gsap.set(content, { x: -50, opacity: 0 });

          gsap.to(step, {
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none none'
            },
            opacity: 1,
            duration: 0.1,
            onComplete: () => {
              // Animate number
              gsap.to(number, {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'back.out(2)'
              });
              
              // Animate content
              gsap.to(content, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                ease: 'power3.out'
              });
            }
          });
        });
      }
    }

    // Concepts - morphing card animation
    if (conceptsRef.current) {
      const concepts = conceptsRef.current.querySelectorAll('.concept-card');
      if (concepts.length > 0) {
        gsap.set(concepts, { opacity: 1, y: 0, scale: 1 });
        
        concepts.forEach((card, index) => {
          gsap.set(card, { 
            opacity: 0, 
            y: 60, 
            scale: 0.8,
            rotation: -5
          });

          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.08,
            ease: 'back.out(1.4)'
          });

          // Hover effect with glow
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -8,
              scale: 1.03,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        });
      }
    }

    // CTA section - dramatic reveal
    if (ctaRef.current) {
      const ctaContent = ctaRef.current.querySelector('.cta-content');
      const ctaButton = ctaRef.current.querySelector('button');
      
      if (ctaContent && ctaButton) {
        gsap.set([ctaContent, ctaButton], { opacity: 1 });
        gsap.set(ctaContent, { y: 50, opacity: 0 });
        gsap.set(ctaButton, { scale: 0, rotation: 180, opacity: 0 });

        gsap.to(ctaRef.current, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          duration: 0.1,
          onComplete: () => {
            gsap.to(ctaContent, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out'
            });
            
            gsap.to(ctaButton, {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.3,
              ease: 'back.out(2)'
            });
          }
        });
      }

      // Animated gradient background
      gsap.to(ctaRef.current, {
        backgroundPosition: '200% 50%',
        duration: 10,
        repeat: -1,
        ease: 'none'
      });
    }

    // Parallax effect for hero
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 150,
        opacity: 0.2,
        scale: 0.95
      });
    }

    // Refresh ScrollTrigger
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const stats = [
    { label: 'Health Plans', value: 8, suffix: '', icon: HeartPulse, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Active Members', value: 20, suffix: '', icon: UserCheck, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Benefit Types', value: 20, suffix: '', icon: ClipboardCheck, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'Insurance Plans', value: 8, suffix: '', icon: Briefcase, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { label: 'Deductible Configs', value: 12, suffix: '', icon: PieChart, color: 'text-teal-600', bgColor: 'bg-teal-50' },
    { label: 'Cost Share Options', value: 50, suffix: '+', icon: Wallet, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div ref={backgroundShapesRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="bg-shape absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="bg-shape absolute top-40 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="bg-shape absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="bg-shape absolute bottom-40 right-1/3 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 space-y-24 md:space-y-32">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center text-center px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <h1 
              ref={heroTitleRef}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Insurance Accumulator
            </h1>
            <p 
              ref={heroSubtitleRef}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              A comprehensive platform for exploring healthcare accumulator models and understanding how insurance companies manage member healthcare costs.
            </p>
            <div className="pt-6">
              <Link href="/demo">
                <button 
                  ref={heroButtonRef}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 
                ref={statsTitleRef}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Platform Statistics
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive database of insurance plans, members, and benefits
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="stat-card card p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <IconComponent className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <div
                      ref={(el) => {
                        if (el) statNumbersRef.current[index] = el;
                      }}
                      className="relative text-4xl md:text-5xl font-bold text-gray-900 mb-3"
                      data-value={stat.value}
                      data-suffix={stat.suffix}
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      {stat.value}{stat.suffix}
                    </div>
                    <p className="relative text-sm text-gray-600 font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                Key Features
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Real-Time Lookup",
                  description: "Instantly retrieve benefit plan details, cost shares, and coverage information for any member.",
                  icon: Zap,
                  color: "text-blue-600",
                  bgColor: "bg-blue-50",
                  gradient: "from-blue-500 to-blue-600"
                },
                {
                  title: "HIPAA Code Support",
                  description: "Filter benefits by HIPAA codes to understand how different services are categorized and covered.",
                  icon: ShieldCheck,
                  color: "text-green-600",
                  bgColor: "bg-green-50",
                  gradient: "from-green-500 to-green-600"
                },
                {
                  title: "Cost Share Analysis",
                  description: "View detailed breakdowns of deductibles, copays, coinsurance, and out-of-pocket maximums.",
                  icon: Calculator,
                  color: "text-purple-600",
                  bgColor: "bg-purple-50",
                  gradient: "from-purple-500 to-purple-600"
                },
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="feature-card card p-8 text-center transform transition-all duration-300 hover:shadow-2xl relative overflow-hidden group"
                  >
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                    <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl ${feature.bgColor} mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <IconComponent className={`w-10 h-10 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section ref={howItWorksRef} className="relative py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="card p-12 md:p-16 bg-gradient-to-br from-white to-gray-50">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16" style={{ fontFamily: 'var(--font-poppins)' }}>
                How It Works
              </h2>
              <div className="space-y-12">
                {[
                  {
                    step: "1",
                    title: "Enter Member Information",
                    description: "Provide the member ID and coverage period dates to begin your search.",
                  },
                  {
                    step: "2",
                    title: "Add HIPAA Codes (Optional)",
                    description: "Filter results by specific HIPAA service codes to see how different services are covered.",
                  },
                  {
                    step: "3",
                    title: "View Comprehensive Results",
                    description: "Review detailed plan information including cost shares, benefits, and coverage details.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="step-item flex gap-6 items-start transform transition-all duration-300 hover:translate-x-4 group"
                  >
                    <div className="step-number flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-2xl shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {item.step}
                    </div>
                    <div className="step-content flex-1 pt-2">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'var(--font-poppins)' }}>{item.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What is Health Insurance Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="max-w-6xl mx-auto">
            <div className="card p-12 md:p-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8" style={{ fontFamily: 'var(--font-poppins)' }}>
                What is Health Insurance?
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  Health insurance is a financial arrangement that provides protection against high medical costs by transferring risk from individuals to insurance companies. In exchange for regular premium payments, insurance companies agree to cover a portion of your healthcare expenses, helping to make medical care more affordable and accessible.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  According to <a href="https://www.healthcare.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">HealthCare.gov</a>, health insurance helps protect you from high, unexpected medical costs. When you have insurance, you pay a premium each month, and in return, the insurance company helps pay for covered medical services.
                </p>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 mt-10" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Types of Health Insurance Plans
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>HMO (Health Maintenance Organization)</h4>
                    <p className="text-gray-700">
                      Requires members to use a network of doctors and obtain referrals for specialists. Typically offers lower premiums but less flexibility in choosing providers.
                    </p>
                  </div>
                  <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>PPO (Preferred Provider Organization)</h4>
                    <p className="text-gray-700">
                      Offers more flexibility in choosing healthcare providers and doesn't require referrals. You can see out-of-network doctors, but at a higher cost.
                    </p>
                  </div>
                  <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>EPO (Exclusive Provider Organization)</h4>
                    <p className="text-gray-700">
                      Covers services only if you use doctors, specialists, or hospitals in the plan's network, except in emergencies. No referrals needed.
                    </p>
                  </div>
                  <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>POS (Point of Service)</h4>
                    <p className="text-gray-700">
                      Combines features of HMOs and PPOs. Requires referrals for specialists but allows out-of-network visits at a higher cost.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 italic">
                  Source: <a href="https://www.healthcare.gov/choose-a-plan/plan-types/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">HealthCare.gov - Plan Types</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Understanding Accumulators Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="card p-12 md:p-16 bg-gradient-to-br from-white to-gray-50">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8" style={{ fontFamily: 'var(--font-poppins)' }}>
                Understanding Insurance Accumulators
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  An <strong>insurance accumulator</strong> is a tracking system that monitors how much a member has spent toward their deductible, out-of-pocket maximum, and other cost-sharing requirements throughout the plan year.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Accumulators are essential tools that help both insurance companies and members understand:
                </p>
                <ul className="space-y-4 mb-8 text-lg text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>How much of the annual deductible has been met</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Progress toward the out-of-pocket maximum</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Which services count toward cost-sharing requirements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 font-bold">•</span>
                    <span>Remaining balance before insurance covers 100% of costs</span>
                  </li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
                  <p className="text-gray-800 leading-relaxed">
                    <strong>Example:</strong> If your plan has a $1,500 deductible and you've already paid $800 in medical expenses this year, your accumulator shows you have $700 remaining before your deductible is met. Once met, your insurance begins covering a larger portion of your medical costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Concepts Section */}
        <section ref={conceptsRef} className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Understanding Healthcare Cost-Sharing
            </h2>
            <p className="text-center text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
              Cost-sharing is the portion of healthcare costs that you pay out of pocket. Understanding these terms helps you make informed decisions about your healthcare.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Deductibles",
                  description: "The amount you pay before insurance starts covering costs. Accumulators track your progress toward meeting this threshold.",
                  color: "border-green-200 bg-green-50",
                  gradient: "from-green-400 to-green-500"
                },
                {
                  title: "Copays",
                  description: "Fixed amounts you pay for specific services (like $25 for a doctor visit). These may or may not count toward your deductible.",
                  color: "border-blue-200 bg-blue-50",
                  gradient: "from-blue-400 to-blue-500"
                },
                {
                  title: "Coinsurance",
                  description: "A percentage of costs you pay after meeting your deductible (like 20% of a hospital bill).",
                  color: "border-purple-200 bg-purple-50",
                  gradient: "from-purple-400 to-purple-500"
                },
                {
                  title: "Out-of-Pocket Maximum",
                  description: "The most you'll pay in a year. Once reached, insurance covers 100% of remaining costs.",
                  color: "border-orange-200 bg-orange-50",
                  gradient: "from-orange-400 to-orange-500"
                },
                {
                  title: "HIPAA Codes",
                  description: "Standardized codes that determine which services count toward your deductible and how they're categorized.",
                  color: "border-teal-200 bg-teal-50",
                  gradient: "from-teal-400 to-teal-500"
                },
                {
                  title: "Family vs Individual",
                  description: "Family plans have separate individual and family deductibles, with complex rules for how costs accumulate.",
                  color: "border-indigo-200 bg-indigo-50",
                  gradient: "from-indigo-400 to-indigo-500"
                },
              ].map((concept, index) => (
                <div
                  key={index}
                  className={`concept-card card p-8 border-2 ${concept.color} transform transition-all duration-300 hover:shadow-2xl relative overflow-hidden group`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${concept.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 relative z-10 group-hover:text-gray-800 transition-colors" style={{ fontFamily: 'var(--font-poppins)' }}>{concept.title}</h3>
                  <p className="text-gray-700 leading-relaxed relative z-10">{concept.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HIPAA Codes Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="max-w-6xl mx-auto">
            <div className="card p-12 md:p-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8" style={{ fontFamily: 'var(--font-poppins)' }}>
                Understanding HIPAA Codes
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  <strong>HIPAA codes</strong> (Health Insurance Portability and Accountability Act codes) are standardized codes used to categorize and classify healthcare services for billing and insurance purposes.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  These codes help insurance companies determine:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-indigo-50 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>Service Classification</h4>
                    <p className="text-gray-700">
                      Each medical service is assigned a specific code (e.g., Code 30 for Primary Care, Code 35 for Specialist visits) that identifies the type of care provided.
                    </p>
                  </div>
                  <div className="p-6 bg-purple-50 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>Coverage Determination</h4>
                    <p className="text-gray-700">
                      Insurance companies use these codes to determine which services are covered, what cost-sharing applies, and whether services count toward deductibles.
                    </p>
                  </div>
                  <div className="p-6 bg-blue-50 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>Accumulator Tracking</h4>
                    <p className="text-gray-700">
                      Accumulators use HIPAA codes to track which services contribute to your deductible and out-of-pocket maximum calculations.
                    </p>
                  </div>
                  <div className="p-6 bg-teal-50 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>Billing Accuracy</h4>
                    <p className="text-gray-700">
                      Standardized coding ensures consistent billing and helps prevent errors in claims processing and cost calculations.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 mb-4">
                    <strong>HIPAA Codes in Our Database:</strong>
                  </p>
                  <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-gray-600">
                    <li>• Code 30: Primary Care Visit</li>
                    <li>• Code 32: Urgent Care</li>
                    <li>• Code 33: Preventive Care</li>
                    <li>• Code 35: Specialist Visit</li>
                    <li>• Code 36: Chiropractic</li>
                    <li>• Code 40: Prescription Drugs</li>
                    <li>• Code 45: Emergency Room</li>
                    <li>• Code 46: Ambulance</li>
                    <li>• Code 50: Inpatient Hospital</li>
                    <li>• Code 51: Maternity Care</li>
                    <li>• Code 55: Outpatient Surgery</li>
                    <li>• Code 60: Lab Services</li>
                    <li>• Code 65: Radiology</li>
                    <li>• Code 70: Mental Health</li>
                    <li>• Code 75: Physical Therapy</li>
                    <li>• Code 76: Rehabilitation</li>
                    <li>• Code 80: Durable Medical Equipment</li>
                    <li>• Code 85: Home Health</li>
                    <li>• Code 90: Skilled Nursing</li>
                    <li>• Code 91: Hospice Care</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-4 italic">
                    These are the HIPAA codes currently available in our platform's database for benefit tracking and accumulator calculations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="card p-12 md:p-16 bg-gradient-to-br from-white to-blue-50">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8" style={{ fontFamily: 'var(--font-poppins)' }}>
                Why Understanding Your Insurance Matters
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  Having a clear understanding of your health insurance plan, including how accumulators work and what cost-sharing applies, empowers you to:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wallet className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>Plan Your Budget</h4>
                    <p className="text-gray-600">
                      Understand your potential out-of-pocket costs and plan for medical expenses throughout the year.
                    </p>
                  </div>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ClipboardCheck className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>Make Informed Decisions</h4>
                    <p className="text-gray-600">
                      Choose the right plan for your needs and understand which services are covered and at what cost.
                    </p>
                  </div>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>Track Your Progress</h4>
                    <p className="text-gray-600">
                      Monitor your spending toward deductibles and out-of-pocket maximums to maximize your benefits.
                    </p>
                  </div>
                </div>
                <div className="mt-10 p-6 bg-blue-600 text-white rounded-xl">
                  <p className="text-lg leading-relaxed">
                    <strong>Remember:</strong> Health insurance is designed to protect you from high, unexpected medical costs. By understanding how your plan works, you can make the most of your coverage and avoid surprise bills.
                  </p>
                </div>
                <p className="text-sm text-gray-500 italic mt-6 text-center">
                  Information based on guidance from <a href="https://www.healthcare.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">HealthCare.gov</a> and industry standards
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={ctaRef}
          className="relative py-24 px-4 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white text-center overflow-hidden"
          style={{
            backgroundSize: '200% 200%',
            backgroundPosition: '0% 50%'
          }}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          </div>
          <div className="cta-content relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
              Ready to Explore Benefits?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Start searching for member benefits and understand how accumulator models work in practice.
            </p>
            <Link href="/demo">
              <button className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold bg-white text-blue-600 rounded-xl shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-110 overflow-hidden">
                <span className="relative z-10">Try Benefits Lookup</span>
                <ArrowRight className="w-6 h-6 relative z-10 transform group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
