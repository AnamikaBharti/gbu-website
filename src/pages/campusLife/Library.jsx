import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Wifi,
  Globe,
  BookOpen,
  Armchair,
  Sparkles,
  ArrowRight,
  X,
  Users, Cpu
} from 'lucide-react';

import StatsCard from '../../components/StatsCard';

const iconColorMap = {
  book: "#6b21a8", // purple
  armchair: "#2563eb", // blue
  "folder-clock": "#059669", // green
  cpu: "#eab308", // yellow
};

const iconMap = {
  book: BookOpen,
  armchair: Armchair,
  "folder-clock": Clock,
  cpu: Cpu,
};

// UI Components
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onOpenChange}>
      <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

const DialogContent = ({ children }) => (
  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
    {children}
  </div>
);

const DialogTitle = ({ children, onClose }) => (
  <div className="flex items-center justify-between p-6 border-b">
    <h2 className="text-2xl font-bold text-gray-800">{children}</h2>
    <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
      <X size={20} />
    </button>
  </div>
);

const Card = ({ children, onClick, className = '' }) => (
  <div
    onClick={onClick}
    className={`rounded-xl bg-white shadow hover:shadow-md transition transform hover:-translate-y-1 border border-gray-100 cursor-pointer ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
        animate={{ x: [0, 100, 0], y: [0, -100, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i * 1.5 }}
        style={{ top: `${i * 15 + 10}%`, left: `${i * 20}%` }}
      />
    ))}
  </div>
);

const Library = () => {
  const [libraryInfo, setLibraryInfo] = useState({ title: '', description: '' });
  const [features, setFeatures] = useState([]);
  const [stats, setStats] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_HOST;

  useEffect(() => {
    const fetchData = async () => {
      if (!BASE_URL) return;
      try {
        setIsLoading(true);
        const [infoRes, facilitiesRes, statsRes] = await Promise.all([
          fetch(`${BASE_URL}/campuslife/library-info/`).then(res => res.json()),
          fetch(`${BASE_URL}/campuslife/library-facilities/`).then(res => res.json()),
          fetch(`${BASE_URL}/campuslife/library-stats/`).then(res => res.json())
        ]);

        if (infoRes?.[0]) setLibraryInfo(infoRes[0]);
        if (facilitiesRes?.length) setFeatures(facilitiesRes);
        if (statsRes?.length) {
          const mapped = statsRes.map(item => ({
            title: item.value,
            // number: parseInt(item.label.replace(/\D/g, '')) || 0,
            numberText: item.label,
            icon: iconMap[item.icon] || BookOpen,
            iconColor: iconColorMap[item.icon] || "#6b21a8"
          }));
          setStats(mapped);
          setFacilities(facilitiesRes);
        }

      } catch (e) {
        console.error('Library fetch error', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [BASE_URL]);



  if (isLoading) return <div className="min-h-screen flex justify-center items-center"><div className="loader" /></div>;

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
      <FloatingParticles />
      <div className='flex justify-around align-middle mb-20'>
        <div className="text-center w-2/5">

          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            {libraryInfo.title}
          </h1>
          <p className="text-gray-600 text-lg">
            {libraryInfo.description}
          </p>
        </div>
        <img src="https://library.gbu.ac.in/img/Artboard%201library1.jpg" alt="Library" className="w-170 h-100 mt-8 transition-transform duration-300 hover:scale-105 object-cover rounded-2xl" />
      </div>

      <div className="mx-30 px-6">


        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((f, i) => (
            <Card key={i}>
              <CardContent>
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                    <Clock size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">{f.name}</h3>
                <p className="text-gray-500 text-center text-sm">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Facilities */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Library Facilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, idx) => (
              <Card key={idx} onClick={() => setSelectedSpace(facility)}>
                <img src={facility.image} alt={facility.name} className="w-full h-52 object-cover rounded-t-xl" />
                <CardContent>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">{facility.name}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <StatsCard stats={stats} />
      </div>

      {/* Dialog */}
      {selectedSpace && (
        <Dialog open={!!selectedSpace} onOpenChange={() => setSelectedSpace(null)}>
          <DialogContent>
            <DialogTitle onClose={() => setSelectedSpace(null)}>{selectedSpace.name}</DialogTitle>
            <div className="p-6">
              <img src={selectedSpace.image} alt={selectedSpace.name} className="rounded-lg mb-4 w-full h-60 object-cover" />
              <p className="text-gray-700 mb-4">{selectedSpace.description}</p>
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <Users className="text-blue-600" size={20} />
                  <span className="text-sm text-gray-800 font-medium">{selectedSpace.capacity}</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Amenities</h4>
                <ul className="list-disc ml-6 text-sm text-gray-600 space-y-1">
                  {selectedSpace.amenities?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default Library;
