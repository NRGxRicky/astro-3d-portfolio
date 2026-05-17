import React, { useState, useEffect } from 'react';

interface SkillAxis {
  label: string;
  value: number;
  description: string;
  details: string[];
}

const skillsData: SkillAxis[] = [
  {
    label: 'Liderazgo & Agile',
    value: 98,
    description: 'Gestión de equipos (Scrum, Kanban) y ClickUp/Jira.',
    details: ['Coordinación de hasta 20 personas', 'ClickUp / Jira / Asana / MS Project', 'Mitigación de riesgos en 30%', 'Scrum Master (CSM) certificado']
  },
  {
    label: 'Estrategia & Stakeholders',
    value: 95,
    description: 'Comunicación ejecutiva, KPIs y alineación de negocio.',
    details: ['Presentaciones ejecutivas directivas', 'Seguimiento de KPIs clave', 'Alineamiento técnico y comercial', 'Gestión de expectativas']
  },
  {
    label: 'Arquitectura Backend',
    value: 92,
    description: 'Diseño de APIs robustas (REST/GraphQL) y backend.',
    details: ['Java / Java EE y Node.js / Express', 'PHP y Laravel / Symfony', 'Desarrollo de APIs RESTful y GraphQL', 'Microservicios escalables']
  },
  {
    label: 'Bases de Datos & SQL',
    value: 90,
    description: 'Administración, optimización y diseño de consultas.',
    details: ['MySQL y SQL Server administrados', 'PostgreSQL y MongoDB', 'Optimización de consultas complejas', 'Integridad y diseño relacional']
  },
  {
    label: 'Calidad & QA (Testing)',
    value: 86,
    description: 'Control de calidad, pruebas unitarias y flujos CI/CD.',
    details: ['Pruebas automatizadas con PHPUnit', 'Pruebas frontend con Jest', 'Integración y despliegue continuo (CI/CD)', 'Incremento del 25% en calidad de código']
  }
];

export default function SkillsRadarChart() {
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0, 0]);
  const [activeAxis, setActiveAxis] = useState<number | null>(null);

  useEffect(() => {
    // Animación de entrada de los valores desde 0 al cargar el componente
    const timer = setTimeout(() => {
      setAnimatedValues(skillsData.map(d => d.value));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const size = 300;
  const center = size / 2;
  const maxRadius = 90;

  // Ángulo de los vértices (Pentágono = 5 vértices, 72 grados por eje)
  const angles = [
    -Math.PI / 2,                  // Eje 0 (Arriba)
    -Math.PI / 2 + (2 * Math.PI) / 5,  // Eje 1 (Derecha superior)
    -Math.PI / 2 + (4 * Math.PI) / 5,  // Eje 2 (Derecha inferior)
    -Math.PI / 2 + (6 * Math.PI) / 5,  // Eje 3 (Izquierda inferior)
    -Math.PI / 2 + (8 * Math.PI) / 5   // Eje 4 (Izquierda superior)
  ];

  // Generar coordenadas para un radio específico
  const getCoordinates = (radius: number) => {
    return angles.map((angle) => {
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y };
    });
  };

  // Coordenadas de los anillos de la red de fondo (20%, 40%, 60%, 80%, 100%)
  const rings = [20, 40, 60, 80, 100].map(pct => getCoordinates(maxRadius * (pct / 100)));

  // Coordenadas de los valores reales actuales (con animación)
  const skillPoints = animatedValues.map((val, idx) => {
    const radius = maxRadius * (val / 100);
    const x = center + radius * Math.cos(angles[idx]);
    const y = center + radius * Math.sin(angles[idx]);
    return { x, y };
  });

  const skillPath = skillPoints.map(p => `${p.x},${p.y}`).join(' ');

  // Ubicación de las etiquetas de texto alrededor del pentágono
  const labelOffsets = [
    { x: 0, y: -16 },
    { x: 64, y: -6 },
    { x: 42, y: 16 },
    { x: -42, y: 16 },
    { x: -64, y: -6 }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full select-none">
      
      {/* Lado izquierdo: El SVG del Radar Chart */}
      <div className="relative shrink-0 flex justify-center w-full lg:w-auto">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
          <defs>
            {/* Degradado premium para el área rellena */}
            <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0088ff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#00c6ff" stopOpacity="0.15" />
            </linearGradient>
            
            {/* Brillo para los nodos activos */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Anillos de fondo del pentágono */}
          {rings.map((ringPoints, rIdx) => {
            const ringPath = ringPoints.map(p => `${p.x},${p.y}`).join(' ');
            return (
              <polygon
                key={rIdx}
                points={ringPath}
                fill="none"
                stroke="rgba(12, 12, 15, 0.08)"
                strokeWidth="1"
              />
            );
          })}

          {/* Líneas divisorias de los ejes desde el centro */}
          {rings[4].map((point, idx) => (
            <line
              key={idx}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="rgba(12, 12, 15, 0.06)"
              strokeWidth="1"
            />
          ))}

          {/* Área de Habilidades Rellena (El Radar) */}
          <polygon
            points={skillPath}
            fill="url(#radarGrad)"
            stroke="#0088ff"
            strokeWidth="2"
            className="transition-all duration-700 ease-out"
          />

          {/* Ejes y Nodos Interactivos */}
          {skillPoints.map((point, idx) => {
            const isActive = activeAxis === idx;
            return (
              <g key={idx} className="cursor-pointer" onMouseEnter={() => setActiveAxis(idx)} onMouseLeave={() => setActiveAxis(null)}>
                {/* Círculo invisible más grande para facilitar el hover */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="12"
                  fill="transparent"
                />
                
                {/* Círculo decorativo exterior (Glow) */}
                {isActive && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill="rgba(0, 136, 255, 0.3)"
                    filter="url(#glow)"
                  />
                )}

                {/* Nodo principal */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isActive ? "4.5" : "3.5"}
                  fill={isActive ? "#0088ff" : "#0088ff"}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                />
              </g>
            );
          })}

          {/* Etiquetas del Pentagono */}
          {rings[4].map((point, idx) => {
            const offset = labelOffsets[idx];
            const isActive = activeAxis === idx;
            const skill = skillsData[idx];
            return (
              <text
                key={idx}
                x={point.x + offset.x}
                y={point.y + offset.y}
                textAnchor="middle"
                className={`font-sans font-extrabold text-[9px] sm:text-[10px] transition-colors duration-300 cursor-pointer ${
                  isActive ? 'fill-[#0088ff]' : 'fill-[#55556a]'
                }`}
                onClick={() => setActiveAxis(idx)}
                onMouseEnter={() => setActiveAxis(idx)}
                onMouseLeave={() => setActiveAxis(null)}
              >
                {skill.label}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Lado derecho: Tarjeta de detalle dinámica e interactiva */}
      <div className="flex-1 w-full lg:min-w-[280px] flex flex-col justify-center min-h-[220px]">
        {activeAxis === null ? (
          // Vista por defecto (Instrucción)
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <div className="text-2xl">🧭</div>
            <h4 className="text-base font-bold text-text-primary">Radar de Habilidades</h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Pasa el ratón por encima de los nodos o las etiquetas del radar para explorar los detalles cuantitativos y cualitativos de mi perfil profesional híbrido.
            </p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mt-2">
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 border border-border-custom rounded-md text-text-muted bg-bg-secondary">Interactivo</span>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 border border-border-custom rounded-md text-text-muted bg-bg-secondary">Métricas Reales</span>
            </div>
          </div>
        ) : (
          // Vista de Eje Activo
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4 border-b border-border-custom pb-2.5">
              <div>
                <span className="font-mono text-[9px] font-bold text-accent-secondary uppercase tracking-wider">Competencia clave</span>
                <h4 className="text-base font-extrabold text-text-primary mt-0.5">{skillsData[activeAxis].label}</h4>
              </div>
              <div className="text-right shrink-0">
                <span className="font-mono text-2xl font-extrabold text-accent-secondary">{skillsData[activeAxis].value}%</span>
              </div>
            </div>
            
            <p className="text-xs text-text-secondary leading-relaxed italic">
              "{skillsData[activeAxis].description}"
            </p>

            <div className="flex flex-col gap-1.5 mt-1.5">
              <span className="text-[8px] font-mono font-bold text-text-muted uppercase tracking-wider">Logros & Capacidades</span>
              <ul className="list-none flex flex-col gap-1.5">
                {skillsData[activeAxis].details.map((detail, dIdx) => (
                  <li key={dIdx} className="text-xs text-text-secondary flex items-start gap-2 leading-relaxed">
                    <span className="text-accent-secondary text-[8px] mt-1">▹</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
