import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';
import { ArrowRight, Lock, Mail } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { role },
          },
        });
        if (signUpError) throw signUpError;
        alert('Check your email to verify your account!');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        navigate('/dashboard');
      }
    } catch (err: any) {
      let errorMessage = err.message || 'An error occurred during authentication.';
      if (errorMessage.includes('Invalid API key') || errorMessage.includes('Failed to fetch')) {
        errorMessage = '连接数据库失败 ⚠️: 系统检测到您当前使用了无效的或默认的 API 密钥。如果要在您自己的域名（如 sharonecc.com）或本系统正常使用登录/注册功能，请在项目左侧或本地的 .env 文件中填入您真实的 Supabase URL 和 Anon Key。';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-sand/30">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
        
        <h2 className="text-4xl font-serif italic mb-2 text-center">
          {isSignUp ? '注册账号' : '欢迎回来'}
        </h2>
        <p className="text-ink/50 text-center mb-8">
          {isSignUp ? '加入沙仑创意中心' : '登录以访问您的课程'}
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-bold text-ink/60 mb-2 uppercase tracking-widest">
              电子邮箱
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-border-light rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-sage focus:outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink/60 mb-2 uppercase tracking-widest">
              密码
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border-light rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-sage focus:outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-ink/60 mb-2 uppercase tracking-widest">
                注册身份
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-all ${
                    role === 'student'
                      ? 'border-sage bg-sage/5 text-sage'
                      : 'border-border-light text-ink/60 hover:border-sage/50'
                  }`}
                >
                  学生
                </button>
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-all ${
                    role === 'teacher'
                      ? 'border-sage bg-sage/5 text-sage'
                      : 'border-border-light text-ink/60 hover:border-sage/50'
                  }`}
                >
                  老师
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sage text-white rounded-xl py-3.5 font-bold hover:bg-[#7A8A4B] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sage/20 disabled:opacity-70"
          >
            {loading ? '处理中...' : isSignUp ? '创建账号' : '登录'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
               setIsSignUp(!isSignUp);
               setError('');
            }}
            className="text-sm text-ink/60 hover:text-sage transition-colors"
          >
            {isSignUp ? '已有账号？返回登录' : '没有账号？立即注册'}
          </button>
        </div>
      </div>
    </div>
  );
};
