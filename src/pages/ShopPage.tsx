import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Search, Heart, Sparkles, Filter, Edit, Plus, X } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { formatPrice, cn } from '../lib/utils';
import { UserRole } from '../types';

const EditProductModal = ({ product, onClose, onSave }: any) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/20 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-ink/40 hover:text-ink"><X className="w-5 h-5"/></button>
        <h2 className="text-2xl font-serif mb-6">编辑商品</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink/60 mb-2 uppercase tracking-widest">名称</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full border border-border-light rounded-xl px-4 py-2 focus:ring-2 focus:ring-sage focus:outline-none" />
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
          onClick={() => onSave({ ...product, name, description, price })}
          className="mt-8 w-full bg-sage text-white rounded-xl py-3 font-bold hover:bg-[#7A8A4B] transition-colors"
        >
          保存更改
        </button>
      </div>
    </div>
  );
};

const ShopPage = ({ role }: { role: UserRole }) => {
  const { products, setProducts } = useData();
  const [filter, setFilter] = useState('全部');
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const categories = ['全部', 'books', 'merch', 'digital'];
  const catNames: Record<string, string> = {
    '全部': '全部商品',
    'books': '神学书籍',
    'merch': '品牌周边',
    'digital': '电子资源'
  };

  const filteredProducts = filter === '全部' 
    ? products 
    : products.filter(p => p.category === filter);

  const handleSave = (updated: any) => {
    setProducts(products.map(p => p.id === updated.id ? updated : p));
    setEditingProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-16 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-2xl">
          <div className="flex gap-4 items-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clay/10 text-clay text-[10px] font-bold uppercase tracking-widest border border-clay/10">
              <Sparkles className="w-3 h-3" />
              书籍与周边商店
            </div>
            {role === 'teacher' && (
              <button className="flex items-center gap-1.5 px-3 py-1 bg-sage text-white rounded-full text-xs font-bold shadow-md hover:scale-105 transition-transform" onClick={() => alert('Add product feature coming soon!')}>
                <Plus className="w-3 h-3"/>
                新增商品
              </button>
            )}
          </div>
          <h1 className="heading-serif text-6xl italic leading-tight">沙仑文创中心</h1>
          <p className="text-xl text-ink/60 font-serif italic mt-6">精选优质神学著作、研读工具以及富有信仰内涵的文创产品。</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
            <input 
              type="text" 
              placeholder="搜索商品..." 
              className="bg-white border border-border-light rounded-2xl py-3 pl-12 pr-6 w-64 focus:ring-2 focus:ring-sage focus:outline-none"
            />
          </div>
          <button className="p-3 bg-ink text-white rounded-2xl shadow-xl relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-sage text-[10px] flex items-center justify-center rounded-full border-2 border-white">0</span>
          </button>
        </div>
      </header>

      <div className="flex gap-3 overflow-x-auto pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-6 py-3 rounded-xl text-sm font-bold transition-all border",
              filter === cat 
                ? "bg-sage text-white border-sage shadow-lg shadow-sage/20" 
                : "bg-white text-ink/60 border-border-light hover:border-sage/30"
            )}
          >
            {catNames[cat]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <motion.div
            layout
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group"
          >
            <div className="bg-white rounded-3xl border border-border-light overflow-hidden shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-warm-bg/50">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute top-4 left-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-ink/20 hover:text-rose-500 transition-colors shadow-sm">
                  <Heart className="w-5 h-5" />
                </button>
                {role === 'teacher' && (
                  <button 
                    onClick={(e) => { e.preventDefault(); setEditingProduct(product); }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-ink/60 hover:text-sage shadow-sm transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-[10px] text-ink/30 font-bold uppercase tracking-widest mb-2">{catNames[product.category]}</p>
                <h3 className="text-lg font-bold mb-2 group-hover:text-sage transition-colors">{product.name}</h3>
                <p className="text-ink/60 text-xs line-clamp-2 italic mb-6 font-light">{product.description}</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-light">
                  <span className="text-xl font-serif italic text-sage">{formatPrice(product.price)}</span>
                  <button className="flex items-center justify-center w-10 h-10 bg-ink text-white rounded-xl hover:bg-sage transition-colors shadow-md">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {editingProduct && (
          <EditProductModal 
            product={editingProduct} 
            onClose={() => setEditingProduct(null)} 
            onSave={handleSave} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;
