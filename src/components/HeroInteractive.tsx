import React, { useState, useEffect } from 'react';
import AntigravityAgent from './AntigravityAgent';

interface TabData {
  id: string;
  label: string;
  titlePrefix: string;
  titleHighlight: string;
  tagline: string;
  color: string; // Color para los contadores y el agente 3D (ej. #0088ff)
  colorClass: string; // Clase de texto Tailwind para el color (ej. text-accent-secondary)
  stats: {
    num: string;
    label: string;
  }[];
  actionLink: string;
  actionText: string;
}

const tabRoles: TabData[] = [
  {
    id: 'pm',
    label: 'TECHNICAL PM',
    titlePrefix: 'Hola, soy Ricardo Delfín — ',
    titleHighlight: 'Technical PM',
    tagline: 'Líder técnico y gestor ágil especializado en coordinar equipos multidisciplinarios de desarrollo, mitigar riesgos críticos y aumentar la visibilidad del progreso utilizando ClickUp y Jira.',
    color: '#0088ff',
    colorClass: 'text-[#0088ff]',
    stats: [
      { num: '7+', label: 'Años liderando equipos' },
      { num: '15+', label: 'Proyectos tecnológicos' },
      { num: '100%', label: 'Entregas en plazo' },
      { num: '+40%', label: 'Visibilidad de tareas' }
    ],
    actionLink: '#experiencia',
    actionText: 'Ver Experiencia'
  },
  {
    id: 'dev',
    label: 'SOFTWARE ENGINEER',
    titlePrefix: 'Hola, soy Ricardo Delfín — ',
    titleHighlight: 'Software Engineer',
    tagline: 'Desarrollador Full Stack con amplia trayectoria diseñando lógica de servidor altamente eficiente con Java EE, PHP, Laravel, Node.js y optimizando bases de datos en MySQL y SQL Server.',
    color: '#bf5af2',
    colorClass: 'text-[#bf5af2]',
    stats: [
      { num: '5+', label: 'Stacks de desarrollo' },
      { num: '+25%', label: 'Calidad de código (QA)' },
      { num: '3.2K', label: 'Commits en GitHub' },
      { num: '100%', label: 'Unit Testing automatizado' }
    ],
    actionLink: '#habilidades',
    actionText: 'Ver Habilidades'
  },
  {
    id: 'arch',
    label: 'SOLUTION ARCHITECT',
    titlePrefix: 'Hola, soy Ricardo Delfín — ',
    titleHighlight: 'Solution Architect',
    tagline: 'Especialista en integración de sistemas, diseño de arquitecturas de APIs RESTful / GraphQL de alto rendimiento y mitigación proactiva de dependencias críticas en entornos híbridos.',
    color: '#00d4aa',
    colorClass: 'text-[#00d4aa]',
    stats: [
      { num: '8+', label: 'Certificaciones oficiales' },
      { num: '-30%', label: 'Riesgos de dependencia' },
      { num: '100%', label: 'APIs REST / GraphQL' },
      { num: '3', label: 'Entornos cloud / locales' }
    ],
    actionLink: '#formacion',
    actionText: 'Ver Certificaciones'
  }
];

export default function HeroInteractive() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(true);
  const [webglLoaded, setWebglLoaded] = useState<boolean>(false);

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    setAnimate(false);
    // Reset loader feedback state smoothly on role shift
    setWebglLoaded(false);
    setTimeout(() => {
      setActiveTab(index);
      setAnimate(true);
    }, 200);
  };

  const role = tabRoles[activeTab];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-14 bg-bg-primary select-none">
      
      {/* Background Rejilla de Ingeniería */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(12,12,15,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(12,12,15,0.015)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(circle_at_center,black_30%,transparent_80%)] pointer-events-none z-0"></div>

      {/* Gran Tarjeta Bento del Hero (Estilo Zypher) */}
      <div className="w-[92%] max-w-7xl mx-auto bg-bg-card border border-border-custom rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-sm min-h-[75vh] flex flex-col justify-center relative overflow-hidden z-20">
        
        {/* Resplandor dinámico de fondo interno de la tarjeta */}
        <div 
          className="absolute right-[-10%] top-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] pointer-events-none z-0 transition-all duration-1000 ease-in-out opacity-25"
          style={{
            backgroundColor: role.color
          }}
        ></div>

        {/* Agente Antigravity en 3D (R3F) - Posicionado en el lado derecho de la tarjeta */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none flex justify-end items-center">
          <div className="w-full md:w-1/2 h-2/3 md:h-full relative opacity-85 md:opacity-100 flex items-center justify-center">
            {/* Loader orbital dinámico premium */}
            {!webglLoaded && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 animate-pulse transition-opacity duration-500">
                <div className="relative w-32 h-32 flex items-center justify-center animate-pulse">
                  <div className="absolute inset-0 rounded-full border border-dashed border-text-muted/30 animate-spin" style={{ animationDuration: '6s' }}></div>
                  <div className="absolute w-24 h-24 rounded-full border border-dashed border-text-muted/15 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
                  <div className="w-6 h-6 rounded-full blur-[4px] transition-colors duration-500" style={{ backgroundColor: role.color, opacity: 0.6 }}></div>
                </div>
              </div>
            )}
            <AntigravityAgent accentColor={role.color} onLoaded={() => setWebglLoaded(true)} />
          </div>
        </div>

        {/* Contenido Textual - Posicionado de forma segura en el lado izquierdo */}
        <div className="w-full md:w-[65%] text-left flex flex-col gap-5 relative z-20 pointer-events-none">
          
          {/* Selector de Roles Estilo Zypher Tabs */}
          <div className="reveal flex flex-wrap gap-2 p-1.5 bg-bg-secondary border border-border-custom rounded-2xl max-w-fit pointer-events-auto shadow-sm mb-2">
            {tabRoles.map((tab, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(idx)}
                  className={`px-4 py-2 text-[10px] sm:text-xs font-mono font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? 'bg-accent text-white shadow-sm border border-accent'
                      : 'text-text-muted hover:text-text-secondary border border-transparent'
                  }`}
                >
                  {isSelected ? `[ ${tab.label} ]` : tab.label}
                </button>
              );
            })}
          </div>

          {/* Bloque de Textos animado */}
          <div className={`transition-all duration-300 transform ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            
            {/* Badge de disponibilidad */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-secondary border border-border-custom rounded-full font-mono text-[10px] sm:text-xs text-text-secondary mb-3 pointer-events-auto">
              <span 
                className="w-2 h-2 rounded-full animate-pulse transition-all duration-700" 
                style={{ 
                  backgroundColor: role.color,
                  boxShadow: `0 0 8px ${role.color}` 
                }}
              ></span>
              Disponible para nuevos proyectos
            </div>

            {/* Título principal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1] mb-5 pointer-events-auto">
              {role.titlePrefix}
              <br className="hidden sm:inline" />
              <span 
                className="transition-all duration-700 bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${role.color}, #0c0c0f)`
                }}
              >
                {role.titleHighlight}
              </span>
            </h1>

            {/* Descripción corta */}
            <p className="text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed mb-6 max-w-lg pointer-events-auto">
              {role.tagline}
            </p>
          </div>

          {/* Botones de Acción */}
          <div className="reveal flex flex-wrap gap-3 mb-8 pointer-events-auto">
            <a 
              href={role.actionLink} 
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-secondary hover:text-white text-white font-bold rounded-full transition-all duration-300 transform hover:-translate-y-[2px] shadow-sm text-xs sm:text-sm"
            >
              {role.actionText}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a 
              href="/assets/CV_Ricardo_Delfin.pdf" 
              download 
              className="inline-flex items-center gap-2 px-6 py-3 border border-border-custom hover:border-accent hover:text-accent font-semibold rounded-full bg-accent-dim transition-all duration-300 transform hover:-translate-y-[2px] text-xs sm:text-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" className="animate-bounce"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Descargar CV
            </a>
            <a href="#contacto" className="inline-flex items-center gap-2 px-6 py-3 border border-border-custom hover:border-accent hover:text-accent font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-[2px] text-xs sm:text-sm">
              Contactar
            </a>
          </div>

          {/* Sección de Estadísticas de Impacto de Rol */}
          <div className={`border-t border-border-custom pt-6 flex flex-wrap gap-6 md:gap-10 pointer-events-auto transition-all duration-300 transform ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            {role.stats.map((stat, sIdx) => (
              <div key={sIdx} className="stat-item flex flex-col gap-0.5">
                <div className="flex items-baseline gap-0.5">
                  <span 
                    className="font-mono text-xl sm:text-2xl md:text-3xl font-extrabold transition-colors duration-700"
                    style={{ color: role.color }}
                  >
                    {stat.num.replace(/[^0-9]/g, '')}
                  </span>
                  <span 
                    className="font-mono text-base sm:text-lg font-bold transition-colors duration-700"
                    style={{ color: role.color }}
                  >
                    {stat.num.replace(/[0-9]/g, '')}
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-text-muted uppercase tracking-wider mt-0.5 max-w-[110px] leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
