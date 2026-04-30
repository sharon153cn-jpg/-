import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Clock, User, ArrowRight, Edit, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserRole } from '../types';
import { useData } from '../contexts/DataContext';
import { formatPrice } from '../lib/utils';

const CourseCard = ({ course, role, onEdit }: { course: any, role: UserRole, onEdit: () => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.4 }}
    className="group bg-white rounded-3xl border border-border-light shadow-sm overflow-hidden flex flex-col h-full"
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <img 
        src={course.thumbnail} 
        alt={course.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
          {course.category}
        </span>
      </div>
      {role === 'teacher' && (
        <button 
          onClick={(e) => { e.preventDefault(); onEdit(); }}
          className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-ink/60 hover:text-sage shadow-sm transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
      )}
    </div>
    
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-2 text-ink/40 text-xs mb-3">
        <User className="w-3 h-3" />
        <span>{course.instructor} 指导</span>
      </div>
      <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-sage transition-colors">
        {course.title}
      </h3>
      <p className="text-ink/60 text-sm line-clamp-2 mb-6 flex-grow">
        {course.description}
      </p>
      
      <div className="pt-6 border-t border-border-light flex items-center justify-between">
        <div className="text-lg font-bold text-sage">
          {formatPrice(course.price)}
        </div>
        <Link 
          to={`/course/${course.id}`}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink hover:text-sage transition-colors"
        >
          查看课程
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  </motion.div>
);

const EditCourseModal = ({ course, onClose, onSave }: any) => {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/20 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-ink/40 hover:text-ink"><X className="w-5 h-5"/></button>
        <h2 className="text-2xl font-serif mb-6">编辑课程</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink/60 mb-2 uppercase tracking-widest">名称</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-border-light rounded-xl px-4 py-2 focus:ring-2 focus:ring-sage focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-ink/60 mb-2 uppercase tracking-widest">简介</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-border-light rounded-xl px-4 py-2 min-h-[100px] focus:ring-2 focus:ring-sage focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-ink/60 mb-2 uppercase tracking-widest">价格 (¥)</label>
            <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full border border-border-light rounded-xl px-4 py-2 focus:ring-2 focus:ring-sage focus:outline-none" />
          </div>
        </div>
        <button 
          onClick={() => onSave({ ...course, title, description, price })}
          className="mt-8 w-full bg-sage text-white rounded-xl py-3 font-bold hover:bg-[#7A8A4B] transition-colors"
        >
          保存更改
        </button>
      </div>
    </div>
  );
};

const CoursesPage = ({ role }: { role: UserRole }) => {
  const { courses, setCourses } = useData();
  const [filter, setFilter] = useState('全部');
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const categories = ['全部', '核心课题', '圣经研究', '生命成长'];

  const filteredCourses = filter === '全部' 
    ? courses 
    : courses.filter(c => c.category === filter);

  const handleSave = (updated: any) => {
    setCourses(courses.map(c => c.id === updated.id ? updated : c));
    setEditingCourse(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-16">
      <header className="flex flex-col gap-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="heading-serif text-6xl mb-6 italic">所有神学课程</h1>
            <p className="text-xl text-ink/60 font-serif italic mb-10">发现为您预备的深度学术与灵性资源。</p>
          </div>
          {role === 'teacher' && (
             <button className="flex items-center gap-2 px-6 py-3 bg-sage text-white rounded-2xl font-bold shadow-lg shadow-sage/20 hover:scale-105 transition-transform" onClick={() => alert('Add course feature coming soon!')}>
               <Plus className="w-5 h-5"/>
               新增课程
             </button>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
            <input 
              type="text" 
              placeholder="搜索课程、讲师或主题..." 
              className="w-full bg-white border border-border-light rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-sage focus:outline-none transition-shadow"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-4 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap border",
                  filter === cat 
                    ? "bg-sage text-white border-sage shadow-lg shadow-sage/20" 
                    : "bg-white text-ink/60 border-border-light hover:border-sage/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} role={role} onEdit={() => setEditingCourse(course)} />
        ))}
      </div>

      <AnimatePresence>
        {editingCourse && (
          <EditCourseModal 
            course={editingCourse} 
            onClose={() => setEditingCourse(null)} 
            onSave={handleSave} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursesPage;

// Helper to use cn in this file since it's defined in lib/utils
function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ');
}
