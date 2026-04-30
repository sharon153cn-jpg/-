/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'student' | 'teacher';

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'link';
  url: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  price: number;
  category: string;
  lessons: Lesson[];
  resources: Resource[];
  assignments: Assignment[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'books' | 'merch' | 'digital';
}
