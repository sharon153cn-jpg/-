import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Book, Heart, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-6">
    <div className="absolute inset-0 z-0">
      <img 
        src="/hero-bg.png"
        className="w-full h-full object-cover opacity-30"
        alt="文化卓越"
        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2000&auto=format&fit=crop' }}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-warm-bg/50 via-warm-bg to-warm-bg" />
    </div>

    <div className="relative z-10 max-w-5xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage/10 text-sage text-xs font-bold uppercase tracking-widest mb-8 border border-sage/10">
          <Sparkles className="w-3 h-3" />
          沙仑企业创意中心
        </div>
        <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-[1.1] tracking-tight">
          文化 <br />
          <span className="text-sage">卓越</span>
        </h1>
        <p className="text-xl md:text-2xl text-ink/60 font-light max-w-2xl mx-auto mb-10 leading-relaxed font-serif">
          恩赐的价值不在于恩赐的本身，而是在于它在爱中运用所造就的生命。
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link 
            to="/courses" 
            className="group px-8 py-4 bg-sage text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-sage/20 hover:bg-[#7A8A4B] transition-colors"
          >
            开始探索
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="flex items-center gap-3 px-6 py-4 text-ink font-semibold hover:text-sage transition-colors">
            <div className="w-12 h-12 rounded-full border border-border-light flex items-center justify-center">
              <Play className="w-4 h-4 fill-current ml-1" />
            </div>
            了解更多
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const Feature = ({ icon, title, desc, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="p-8 rounded-3xl bg-white border border-border-light shadow-sm hover:shadow-lg transition-all"
  >
    <div className="w-14 h-14 bg-border-light/50 rounded-2xl flex items-center justify-center text-sage mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-ink/60 leading-relaxed">{desc}</p>
  </motion.div>
);

const LandingPage = () => {
  return (
    <div className="space-y-24">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-serif text-5xl mb-6">专业的教学体系</h2>
          <p className="text-ink/60 max-w-xl mx-auto">我们提供从基础神学到深入课题的全面覆盖，由富有经验的牧者与学者授课。</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature 
            delay={0.1}
            icon={<Book className="w-6 h-6" />}
            title="精研圣经"
            desc="通过严谨的释经学方法，深入挖掘圣经原意，理解永恒真理。"
          />
          <Feature 
            delay={0.2}
            icon={<Heart className="w-6 h-6" />}
            title="生命塑造"
            desc="课程不仅是知识的传递，更是心灵的重塑，培养基督化的品格。"
          />
          <Feature 
            delay={0.3}
            icon={<Star className="w-6 h-6" />}
            title="时代见证"
            desc="探讨神学在现代社会的应用，让基督徒在各领域成为时代的先知。"
          />
        </div>
      </div>

      <section className="bg-ink py-24 px-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-sage)_0%,_transparent_70%)] blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-serif text-5xl italic mb-8">为什么要选择我们？</h2>
            <ul className="space-y-8">
              {[
                { title: '多端学习体验', desc: '随时随地，在手机、平板或电脑上无缝切换学习进度。' },
                { title: '即时反馈系统', desc: '作业提交后可获得课程导师的专业点评与指导。' },
                { title: '校友社区支持', desc: '加入共同追求的学者群体，建立持久的代祷与学术团契。' }
              ].map((item, i) => (
                <li key={i} className="flex gap-6">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-sage flex items-center justify-center font-serif text-xs italic">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-white/60 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-sage/20 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale opacity-60 mix-blend-overlay"
                alt="Digital Learning"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-xs text-center">
                  <p className="font-serif italic text-2xl mb-4">"学问不仅是脑子里的，更是生命里的。"</p>
                  <p className="text-white/60 text-sm">— 德摩斯主教</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
