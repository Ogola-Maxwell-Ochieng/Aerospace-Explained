import React from 'react';
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';

const Hero: React.FC = () => {

  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                NextGen
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 block">
                  Aerospace Explained
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Explore simplified insights, innovations, and essential knowledge in aerospace and aviation. 
                From flight principles to future technologies-learn aerospace the easy way.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center group"
                onClick={() => {
                  document.getElementById('latest-articles')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Articles
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                className="border-2 border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-blue-900 px-8 py-4 rounded-lg font-semibold transition-all duration-200"
                onClick={() => {
                  document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Subscribe Newsletter
              </button>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">50+ Articles</h3>
                    <p className="text-blue-200">In-depth research content</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Expert Authors</h3>
                    <p className="text-blue-200">Industry professionals</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 p-3 rounded-lg">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Cutting-edge Research</h3>
                    <p className="text-blue-200">Latest innovations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;