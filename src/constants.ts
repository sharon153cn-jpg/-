/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, Product } from './types';



import preacherThumb from './assets/preacher-thumbnail.jpg';

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: '你的天生气质类型可以改变',
    instructor: '牧哥Paulweh',
    description: '深入探讨基督教核心教义，建立坚固的信仰根基。',
    longDescription: '本课程旨在通过对圣经的系统性研究，帮助学员理解神、人、罪、基督、救恩、教会、末世等核心教义。适合所有渴慕真理的信徒。',
    thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
    price: 299,
    category: '核心课题',
    lessons: [
      { id: 'l1', title: '什么是系统神学？', videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', duration: '15:20' },
      { id: 'l2', title: '上帝论：神的本性与属性', videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', duration: '22:45' },
    ],
    resources: [
      { id: 'r1', name: '课程课件(PDF)', type: 'pdf', url: '#' },
      { id: 'r2', name: '推荐书目清单', type: 'doc', url: '#' },
    ],
    assignments: [
      { id: 'a1', title: '反射练习：论神的公义', description: '请结合圣经经文，简述你对神公义属性的理解。', dueDate: '2024-05-15', status: 'pending' },
    ],
  },
  {
    id: 'c2',
    title: '7堂圣经创业力',
    instructor: '牧哥Paulweh',
    description: '跨越千年的圣经救赎历史，探索上帝在以色列中的奇妙作为。',
    longDescription: '本课程将带领大家全面回顾旧约三十九卷书，探讨各书卷的背景、主题及其在整本圣经救赎计划中的地位。',
    thumbnail: 'https://images.unsplash.com/photo-1504052434139-aaa9d643878b?q=80&w=800&auto=format&fit=crop',
    price: 350,
    category: '职场领导力',
    lessons: [
      { id: 'l3', title: '创世记：起初的故事', videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', duration: '18:10' },
    ],
    resources: [],
    assignments: [],
  },
  {
    id: 'c3',
    title: '回归真理挥别十大教养迷思',
    instructor: '牧哥Paulweh',
    description: '如何将信仰融入日常生活与工作模式。',
    longDescription: '信仰不应只在教堂内。本课程专注探讨信徒如何在世俗职场中活出基督的样式，应对各种道德挑战，成为光和盐。',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
    price: 199,
    category: '生命成长',
    lessons: [
      { id: 'l4', title: '呼召与工作的关系', videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', duration: '12:30' },
    ],
    resources: [],
    assignments: [],
  },
  {
    id: 'c4',
    title: '如何做一个讲道者',
    instructor: '牧哥Paulweh',
    description: '深入探讨如何准备与传递充满能力的信息。',
    longDescription: '本课程旨在帮助服事者掌握如何从圣经中提取信息，并以清晰、有力的方式传递给会众，成为神话语忠心的出口。',
    thumbnail: preacherThumb,
    price: 199,
    category: '核心课题',
    lessons: [
      { id: 'l4_1', title: '第一章', videoUrl: 'https://www.youtube.com/watch?v=BOIRILQlR_I&list=PLUFdZanGVbXnHB-CIvyhX0OtDq2G2xGwz&index=6', duration: '50:47' },
      { id: 'l4_2', title: '第二章', videoUrl: 'https://www.youtube.com/watch?v=TIsyDZ2aUuE&list=PLUFdZanGVbXnHB-CIvyhX0OtDq2G2xGwz&index=5', duration: '28:16' },
      { id: 'l4_3', title: '第三章', videoUrl: 'https://www.youtube.com/watch?v=6Y5ANEmztBE&list=PLUFdZanGVbXnHB-CIvyhX0OtDq2G2xGwz&index=4', duration: '51:17' },
      { id: 'l4_4', title: '第四章', videoUrl: 'https://www.youtube.com/watch?v=I4ZKowO-VAQ&list=PLUFdZanGVbXnHB-CIvyhX0OtDq2G2xGwz&index=3', duration: '27:11' },
      { id: 'l4_5', title: '第五章', videoUrl: 'https://www.youtube.com/watch?v=hF37yQjv3jA&list=PLUFdZanGVbXnHB-CIvyhX0OtDq2G2xGwz&index=2', duration: '54:33' },
      { id: 'l4_6', title: '第六章', videoUrl: 'https://www.youtube.com/watch?v=LJB83ZB7oJQ&list=PLUFdZanGVbXnHB-CIvyhX0OtDq2G2xGwz&index=1', duration: '1:03:00' },
    ],
    resources: [],
    assignments: [],
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '精装研读版圣经',
    description: '包含详细的注释、地图和跨考，是深入查经的必备良伴。',
    price: 158,
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=800&auto=format&fit=crop',
    category: 'books',
  },
  {
    id: 'p2',
    name: '真理之光 环保帆布袋',
    description: '简约设计，承重力强，印有提摩太后书3:16。',
    price: 49,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    category: 'merch',
  },
  {
    id: 'p3',
    name: '希伯来书 导读高清版 (电子书)',
    description: '深入浅出的希伯来书重点解析，手机平板均可阅读。',
    price: 29,
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop',
    category: 'digital',
  },
];
