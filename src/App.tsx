/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ShoppingBag, 
  LayoutDashboard, 
  User, 
  GraduationCap, 
  Menu, 
  X,
  ShieldCheck,
  Search
} from 'lucide-react';
import { UserRole } from './types';
import LandingPage from './pages/LandingPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ShopPage from './pages/ShopPage';
import Dashboard from './pages/Dashboard';
import { DataProvider } from './contexts/DataContext';
import { cn } from './lib/utils';

const Navbar = ({ role, setRole }: { role: UserRole, setRole: (role: UserRole) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: '首页', path: '/', icon: <BookOpen className="w-4 h-4" /> },
    { name: '课程目录', path: '/courses', icon: <GraduationCap className="w-4 h-4" /> },
    { name: '书房/商店', path: '/shop', icon: <ShoppingBag className="w-4 h-4" /> },
    { name: '个人中心', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/70 backdrop-blur-md border border-border-light rounded-2xl px-6 py-3 shadow-sm pointer-events-auto">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="沙仑企业创意中心 Logo" className="h-12 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden') }} />
          <span className="font-serif text-xl font-medium tracking-tight h-min hidden">沙仑企业创意中心</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-sage flex items-center gap-1.5",
                location.pathname === link.path ? "text-sage" : "text-ink/60"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4 border-l border-border-light pl-6 ml-2">
          <button 
            onClick={() => setRole(role === 'student' ? 'teacher' : 'student')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage/10 text-sage text-xs font-semibold hover:bg-sage/20 transition-all border border-sage/20"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            切换至{role === 'student' ? '老师' : '学生'}模式
          </button>
          <div className="w-8 h-8 rounded-full bg-clay/20 flex items-center justify-center border border-clay/20">
            <User className="w-4 h-4 text-clay" />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-2 bg-white rounded-2xl shadow-xl border border-border-light p-4 pointer-events-auto"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-base font-medium text-ink/70 hover:bg-border-light rounded-xl flex items-center gap-3"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border-light">
                <button 
                  onClick={() => {
                    setRole(role === 'student' ? 'teacher' : 'student');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sage text-white text-sm font-bold shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" />
                  切换至{role === 'student' ? '老师' : '学生'}模式
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [role, setRole] = useState<UserRole>('student');

  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen selection:bg-sage/30">
          <Navbar role={role} setRole={setRole} />
          <main className="pt-24 pb-12">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/courses" element={<CoursesPage role={role} />} />
              <Route path="/course/:id" element={<CourseDetailPage role={role} />} />
              <Route path="/shop" element={<ShopPage role={role} />} />
              <Route path="/dashboard" element={<Dashboard role={role} />} />
            </Routes>
          </main>

        <footer className="bg-sage text-white/90 py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-serif text-3xl mb-6">沙仑企业创意中心</h3>
              <p className="max-w-md text-white/70 leading-relaxed font-light">
                让文化卓越。恩赐的价值不在于恩赐的本身，而是在于它在爱中运用所造就的生命。
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">导航</h4>
              <ul className="space-y-4 text-white/60 text-sm">
                <li><Link to="/courses">所有课程</Link></li>
                <li><Link to="/shop">卓越文创</Link></li>
                <li><Link to="/dashboard">学员入口</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">联系我们</h4>
              <p className="text-white/60 text-sm mb-4">上海市静安区</p>
              <p className="text-white/60 text-sm">contact@sharon.center</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
            <p>© 2026 沙仑企业创意中心 | Sharon Center For Creative Enterprises. 保留所有权利。</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#">隐私政策</a>
              <a href="#">使用条款</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  </DataProvider>
  );
}
