import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Play, 
  FileText, 
  ClipboardCheck, 
  ChevronRight, 
  Download, 
  Upload,
  Calendar,
  Clock,
  User,
  Star,
  Download as DownloadIcon
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { UserRole } from '../types';
import { cn, formatPrice } from '../lib/utils';

const CourseDetailPage = ({ role }: { role: UserRole }) => {
  const { id } = useParams();
  const { courses } = useData();
  const course = courses.find(c => c.id === id);
  const [activeTab, setActiveTab] = useState<'content' | 'resources' | 'homework'>('content');
  const [selectedLesson, setSelectedLesson] = useState(course?.lessons[0]);

  if (!course) {
    return <div className="max-w-7xl mx-auto px-6 py-20">课程未找到</div>;
  }

  const tabs = [
    { id: 'content', label: '课程内容', icon: <Play className="w-4 h-4" /> },
    { id: 'resources', label: '学习资料', icon: <FileText className="w-4 h-4" /> },
    { id: 'homework', label: '课程作业', icon: <ClipboardCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-12 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Player and Tabs */}
        <div className="lg:col-span-2 space-y-8">
          <div className="aspect-video bg-ink rounded-3xl overflow-hidden shadow-2xl relative group">
            {selectedLesson ? (
              <video 
                src={selectedLesson.videoUrl} 
                controls 
                className="w-full h-full object-contain"
              />
            ) : (
              <img 
                src={course.thumbnail} 
                className="w-full h-full object-cover opacity-50"
                alt="Course cover"
                referrerPolicy="no-referrer"
              />
            )}
            {!selectedLesson && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-sage rounded-full flex items-center justify-center text-white shadow-xl shadow-sage/40">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
              </div>
            )}
          </div>

          <div className="flex border-b border-border-light">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest relative transition-colors",
                  activeTab === tab.id ? "text-sage" : "text-ink/40 hover:text-ink/60"
                )}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-sage"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            {activeTab === 'content' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h3 className="text-2xl font-serif italic mb-6">课程目录</h3>
                {course.lessons.map((lesson, i) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={cn(
                      "w-full flex items-center justify-between p-6 rounded-2xl border transition-all text-left",
                      selectedLesson?.id === lesson.id 
                        ? "bg-border-light/50 border-sage/20" 
                        : "bg-white border-border-light hover:border-sage/30 shadow-sm"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-serif italic",
                        selectedLesson?.id === lesson.id ? "bg-sage text-white" : "bg-ink/5 text-ink/40"
                      )}>
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold">{lesson.title}</h4>
                        <p className="text-xs text-ink/40 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {lesson.duration}
                        </p>
                      </div>
                    </div>
                    {selectedLesson?.id === lesson.id ? (
                      <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center text-sage">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-ink/20" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}

            {activeTab === 'resources' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.resources.length > 0 ? (
                  course.resources.map((res) => (
                    <div key={res.id} className="p-6 rounded-2xl border border-border-light bg-white shadow-sm flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-clay/10 rounded-xl flex items-center justify-center text-clay">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{res.name}</h4>
                          <p className="text-[10px] text-ink/40 uppercase tracking-widest mt-0.5 font-bold">{res.type}</p>
                        </div>
                      </div>
                      <a 
                        href={res.url} 
                        className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center text-ink/40 group-hover:bg-ink group-hover:text-white transition-all shadow-sm"
                      >
                        <DownloadIcon className="w-4 h-4" />
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-20 text-center text-ink/30 italic">暂无资料</div>
                )}
              </motion.div>
            )}

            {activeTab === 'homework' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {course.assignments.length > 0 ? (
                  course.assignments.map((asm) => (
                    <div key={asm.id} className="p-8 rounded-3xl border border-border-light bg-white shadow-sm">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                          <h4 className="text-xl font-bold mb-2">{asm.title}</h4>
                          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-ink/40">
                             <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> 截止日期: {asm.dueDate}</span>
                             <span className={cn(
                               "px-2 py-0.5 rounded-md border",
                               asm.status === 'pending' ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"
                             )}>
                               {asm.status === 'pending' ? '未提交' : '已完成'}
                             </span>
                          </div>
                        </div>
                        {role === 'teacher' ? (
                          <button className="px-6 py-2 bg-sage text-white rounded-full text-sm font-bold shadow-lg shadow-sage/20">
                            查看学生提交情况
                          </button>
                        ) : (
                          <button className="flex items-center gap-2 px-6 py-2 bg-sage/10 text-sage rounded-full text-sm font-bold border border-sage/20 hover:bg-sage/20 transition-all">
                            <Upload className="w-4 h-4" />
                            提交作业
                          </button>
                        )}
                      </div>
                      <p className="text-ink/60 leading-relaxed text-sm bg-warm-bg/50 p-6 rounded-2xl italic font-serif">
                        {asm.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center text-ink/30 italic">暂无作业安排</div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Column: Course Info */}
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-white border border-border-light shadow-xl sticky top-24">
            <h1 className="text-3xl font-serif italic mb-4 leading-tight">{course.title}</h1>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                <User className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="text-xs text-ink/40 font-bold uppercase tracking-widest">讲师</p>
                <p className="font-bold">{course.instructor}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-ink/40">课程价格</span>
                <span className="text-2xl font-serif italic text-sage">{formatPrice(course.price)}</span>
              </div>
              <p className="text-sm text-ink/60 leading-relaxed font-light">
                {course.longDescription}
              </p>
            </div>

            <button className="w-full py-4 bg-sage text-white rounded-2xl font-bold shadow-xl shadow-sage/30 hover:bg-[#7A8A4B] transition-colors mb-4">
              立即报名参与
            </button>
            <p className="text-[10px] text-center text-ink/30 uppercase tracking-widest font-bold">
              永久有效 • 终身观看优质内容
            </p>

            <div className="mt-8 pt-8 border-t border-border-light grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xl font-serif italic">{course.lessons.length}</p>
                <p className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">小节内容</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-serif italic">1.2K+</p>
                <p className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">在读学员</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
