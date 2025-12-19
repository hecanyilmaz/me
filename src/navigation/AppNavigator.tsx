import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Articles, ArticleDetail, Projects, Scenes, Experience, NotFound } from '../pages';

export const AppNavigator: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:slug" element={<ArticleDetail />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/scenes" element={<Scenes />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
