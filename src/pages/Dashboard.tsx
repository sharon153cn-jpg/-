import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  TrendingUp, 
  PlusCircle, 
  GraduationCap, 
  ClipboardList, 
  Bell,
  MoreHorizontal,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  FileText,
  LayoutDashboard,
  Play
} from 'lucide-react';
import { UserRole } from '../types';
import { useData } from '../contexts/DataContext';
import { formatPrice, cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const TeacherDashboard = ({ courses }: { courses: any[] }) => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        { label: '总学术收入', value: '¥128,400', icon: <TrendingUp className="w-5 h-5" />, trend: '+12%' },
        { label: '在校学员', value: '2,480', icon: <Users className="w-5 h-5" />, trend: '+5%' },
        { label: '在营课程', value: '12', icon: <BookOpen className="w-5 h-5" />, trend: '稳定' },
        { label: '待批阅作业', value: '45', icon: <ClipboardList className="w-5 h-5" />, trend: '紧急' },
      ].map((stat, i) => (
        <div key={i} className="p-8 rounded-3xl bg-white border border-border-light shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center text-sage">
              {stat.icon}
            </div>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase">
              {stat.trend}
            </span>
          </div>
          <p className="text-sm text-ink/40 font-bold uppercase tracking-widest">{stat.label}</p>
          <p className="text-3xl font-serif italic mt-2">{stat.value}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="heading-serif text-3xl">课程管理</h3>
          <button className="flex items-center gap-2 px-6 py-2 bg-sage text-white rounded-full text-sm font-bold shadow-lg shadow-sage/30">
            <PlusCircle className="w-4 h-4" />
            创建新课程
          </button>
        </div>
        
        <div className="bg-white rounded-3xl border border-border-light shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ink/[0.02] text-[10px] font-bold uppercase tracking-widest text-ink/40">
                <th className="px-8 py-4">课程名称</th>
                <th className="px-8 py-4">学员数</th>
                <th className="px-8 py-4">收入</th>
                <th className="px-8 py-4">状态</th>
                <th className="px-8 py-4 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {courses.slice(0, 3).map((course) => (
                <tr key={course.id} className="hover:bg-border-light/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img src={course.thumbnail} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-bold text-sm">{course.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-ink/60">420</td>
                  <td className="px-8 py-6 text-sm text-ink/60">¥45,000</td>
                  <td className="px-8 py-6">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md">
                      已发布
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-2">
                       <button className="p-2 bg-border-light/50 rounded-lg hover:bg-ink hover:text-white transition-colors">
                         <MoreHorizontal className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="heading-serif text-3xl">最近动态</h3>
        <div className="space-y-4">
          {[
            { user: '约书亚', action: '购买了', target: '你的天生气质类型可以改变', time: '2小时前' },
            { user: '马利亚', action: '提交了作业', target: '论圣灵降临', time: '4小时前' },
            { user: '利未', action: '咨询了', target: '课程退费政策', time: '1天前' },
          ].map((activity, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-border-light shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-clay/10 flex-shrink-0 flex items-center justify-center font-bold text-clay italic">
                {activity.user[0]}
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-bold">{activity.user}</span>
                  <span className="mx-1 text-ink/60">{activity.action}</span>
                  <span className="font-bold text-sage">{activity.target}</span>
                </p>
                <p className="text-[10px] text-ink/30 font-bold uppercase mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const StudentDashboard = ({ courses }: { courses: any[] }) => (
  <div className="space-y-12">
    <div className="bg-sage text-white rounded-[40px] p-12 overflow-hidden relative">
      <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-2xl">
        <h2 className="heading-serif text-5xl italic mb-6">平安，弟兄</h2>
        <p className="text-white/70 text-lg font-light leading-relaxed mb-8">
          本周您已完成 4 节课程的学习，您的灵命成长进度超过了同期 85% 的学员。继续保持这颗渴慕的心。
        </p>
        <div className="flex gap-4">
          <Link to="/courses" className="px-8 py-3 bg-white text-sage rounded-2xl font-bold hover:-translate-y-1 transition-transform">
            继续学习
          </Link>
          <div className="flex items-center gap-2 text-sm font-bold opacity-80 cursor-pointer hover:opacity-100 transition-opacity">
            <TrendingUp className="w-4 h-4" />
            查看学习成就
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="heading-serif text-3xl">正在学习的课程</h3>
          <Link to="/courses" className="text-sm font-bold text-sage flex items-center gap-1 hover:underline">
            浏览更多 <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.slice(0, 2).map((course) => (
            <Link 
              to={`/course/${course.id}`} 
              key={course.id} 
              className="p-6 rounded-3xl bg-white border border-border-light shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="relative aspect-[16/6] rounded-2xl overflow-hidden mb-6">
                <img src={course.thumbnail} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-ink/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-ink shadow-lg">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                   </div>
                </div>
              </div>
              <h4 className="font-bold mb-2 group-hover:text-sage transition-colors">{course.title}</h4>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-ink/40">
                <span>进度: 65%</span>
                <span>已学 8/12 课时</span>
              </div>
              <div className="mt-4 w-full h-1.5 bg-border-light rounded-full overflow-hidden">
                <div className="h-full bg-sage w-[65%]" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="heading-serif text-3xl">作业与通知</h3>
        <div className="space-y-4">
          <div className="p-6 bg-white border border-border-light rounded-3xl shadow-sm space-y-6">
            <div className="flex items-center gap-4 border-b border-border-light pb-4">
               <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-sm font-bold">待提交：反射练习</p>
                 <p className="text-[10px] text-amber-600 font-bold uppercase">明天截止</p>
               </div>
            </div>
            <div className="flex items-center gap-4 border-b border-border-light pb-4">
               <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-sm font-bold">作业已批改：论神的公义</p>
                 <p className="text-[10px] text-emerald-600 font-bold uppercase">得分: A+</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-border-light/50 text-ink/40 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-sm font-bold">新资料库：希伯来书讲章</p>
                 <p className="text-[10px] text-ink/30 font-bold uppercase">刚刚更新</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = ({ role }: { role: UserRole }) => {
  const { courses } = useData();

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <header className="mb-12">
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-ink/40 mb-2">
           <LayoutDashboard className="w-3 h-3" />
           控制面板 / {role === 'teacher' ? '讲师中心' : '学员入口'}
        </div>
        <h1 className="heading-serif text-6xl italic">沙仑学习中心</h1>
      </header>

      {role === 'teacher' ? <TeacherDashboard courses={courses} /> : <StudentDashboard courses={courses} />}
    </div>
  );
};

export default Dashboard;
