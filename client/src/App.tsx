import { Routes, Route } from 'react-router-dom';

import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import PublishIdeaPage from './pages/PublishIdeaPage';
import GeneratorPage from './pages/GeneratorPage';
import NavOutlet from './components/NavOutlet';

import './App.css';

const App = () => {
  return (
    <div className="app">
      Hello Famigo
      <Routes>
        <Route element={<NavOutlet />}>
          <Route path="/" element={<FeedPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/publish-idea" element={<PublishIdeaPage />} />
          <Route path="/generator" element={<GeneratorPage />} />
        </Route>
        <Route path="/*" element={<p>page not found</p>} />
      </Routes>
    </div>
  );
};

export default App;
