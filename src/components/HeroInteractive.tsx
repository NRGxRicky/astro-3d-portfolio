import React, { useState, useEffect } from 'react';
import AntigravityAgent from './AntigravityAgent';

interface TabData {
  id: string;
  label: string;
  titlePrefix: string;
  titleHighlight: string;
  tagline: string;
  color: string; // Color principal (ej. #00d4aa)
  colorClass: string; // Clase de texto Tailwind para el color (ej. text-accent)
  bgGlowClass: string; // Color del resplandor de fondo
  btnClass: string; // Clase de botón degradado
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
    color: '#00d4aa',
    colorClass: 'text-[#00d4aa]',
    bgGlowClass: 'bg-[#00d4aa]/10',
    btnClass: 'from-[#00d4aa] to-[#00b4e0] hover:shadow-[0_0_20px_rgba(0,212,170,0.35)]',
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
    bgGlowClass: 'bg-[#bf5af2]/10',
    btnClass: 'from-[#bf5af2] to-[#da5aff] hover:shadow-[0_0_20px_rgba(191,90,242,0.35)]',
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
    color: '#0a84ff',
    colorClass: 'text-[#0a84ff]',
    bgGlowClass: 'bg-[#0a84ff]/10',
    btnClass: 'from-[#0a84ff] to-[#00c6ff] hover:shadow-[0_0_20px_rgba(10,132,255,0.35)]',
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

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    setAnimate(false);
    setTimeout(() => {
      setActiveTab(index);
      setAnimate(true);
    }, 200);
  };

  const role = tabRoles[activeTab];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-start overflow-hidden pt-28 pb-16 bg-[#0a0a0f] select-none">
      
      {/* Background Rejilla de Ingeniería */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(circle_at_center,black_30%,transparent_80%)] pointer-events-none z-0"></div>
      
      {/* Resplandor dinámico de fondo - Cambia de color dinámicamente con transiciones suaves */}
      <div 
        className={`absolute right-10 top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full blur-[140px] pointer-events-none z-0 transition-all duration-1000 ease-in-out ${
          activeTab === 0 ? 'bg-[#00d4aa]/10' : activeTab === 1 ? 'bg-[#bf5af2]/10' : 'bg-[#0a84ff]/10'
        }`}
      ></div>

      {/* Agente Antigravity en 3D (R3F) - Se re-renderiza y cambia de color al instante */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <AntigravityAgent accentColor={role.color} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-20 pointer-events-none">
        <div className="max-w-3xl text-left flex flex-col gap-6">
          
          {/* Fila superior: Selector de Roles Estilo Zypher Tabs */}
          <div className="reveal flex flex-wrap gap-2.5 sm:gap-3 p-1.5 bg-[#12121a]/80 backdrop-blur-md border border-border-custom rounded-2xl max-w-fit pointer-events-auto shadow-lg mb-4">
            {tabRoles.map((tab, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(idx)}
                  className={`px-4 py-2 text-[10px] sm:text-xs font-mono font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? `bg-bg-card border border-border-custom shadow-md ${tab.colorClass}`
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
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-bg-card/90 border border-border-custom rounded-full font-mono text-[10px] sm:text-xs text-text-secondary mb-5 pointer-events-auto">
              <span 
                className="w-2 h-2 rounded-full animate-pulse transition-all duration-700" 
                style={{ 
                  backgroundColor: role.color,
                  boxShadow: `0 0 10px ${role.color}` 
                }}
              ></span>
              Disponible para nuevos proyectos
            </div>

            {/* Título principal */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 pointer-events-auto">
              {role.titlePrefix}
              <span 
                className="transition-all duration-700 bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${role.color}, #ffffff)`
                }}
              >
                {role.titleHighlight}
              </span>
            </h1>

            {/* Descripción corta */}
            <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed mb-8 max-w-xl pointer-events-auto">
              {role.tagline}
            </p>
          </div>

          {/* Botones de Acción */}
          <div className="reveal flex flex-wrap gap-4 mb-12 pointer-events-auto">
            <a 
              href={role.actionLink} 
              className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${role.btnClass} text-[#0a0a0f] font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-[2px] shadow-lg`}
            >
              {role.actionText}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a 
              href="/assets/CV_Ricardo_Delfin.pdf" 
              download 
              className="inline-flex items-center gap-2 px-6 py-3 border border-border-custom hover:border-accent hover:text-accent font-semibold rounded-xl bg-accent-dim/5 transition-all duration-300 transform hover:-translate-y-[2px]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" className="animate-bounce"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Descargar CV
            </a>
            <a href="#contacto" className="inline-flex items-center gap-2 px-6 py-3 border border-border-custom hover:border-accent hover:text-accent font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-[2px]">
              Contactar
            </a>
          </div>

          {/* Sección de Estadísticas de Impacto de Rol */}
          <div className={`border-t border-border-custom pt-8 flex flex-wrap gap-6 md:gap-10 pointer-events-auto transition-all duration-300 transform ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            {role.stats.map((stat, sIdx) => (
              <div key={sIdx} className="stat-item flex flex-col gap-0.5">
                <div className="flex items-baseline gap-0.5">
                  <span 
                    className="font-mono text-2xl md:text-3xl font-extrabold transition-colors duration-700"
                    style={{ color: role.color }}
                  >
                    {stat.num.replace(/[^0-9]/g, '')}
                  </span>
                  <span 
                    className="font-mono text-lg font-bold transition-colors duration-700"
                    style={{ color: role.color }}
                  >
                    {stat.num.replace(/[0-9]/g, '')}
                  </span>
                </div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider mt-0.5 max-w-[120px] leading-snug">
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
