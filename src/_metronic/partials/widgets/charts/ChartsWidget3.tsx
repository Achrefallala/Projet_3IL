import React, { useEffect, useState, useRef } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';
import axios from 'axios';
import { useThemeMode } from '../../layout/theme-mode/ThemeModeProvider';
import { getCSSVariableValue } from '../../../assets/ts/_utils';

type Props = {
  className: string;
};

const ChartsWidget3: React.FC<Props> = ({ className }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const [chart, setChart] = useState<ApexCharts | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tournament/tournamentsAdmin`);
        if (chartRef.current) {
          const chartOptions = getChartOptions(chartRef.current.offsetHeight, response.data);
          if (chart) {
            chart.updateOptions(chartOptions);
          } else {
            const newChart = new ApexCharts(chartRef.current, chartOptions);
            newChart.render();
            setChart(newChart);
          }
        }
      } catch (error) {
        console.error('Failed to fetch tournaments:', error);
      }
    };

    fetchTournaments();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [mode]);

  // Utilisez getCSSVariableValue pour récupérer les variables CSS si nécessaire
  const getChartOptions = (height: number, tournaments: any[]): ApexOptions => {
    const categories = tournaments.map((t: any) => t.tournamentName);
    const divisionsData = tournaments.map(t => {
      if (Array.isArray(t.divisions)) {
        return t.divisions.reduce((total, divisionString) => {
          const divisionCount = (divisionString.match(/,/g) || []).length + 1;
          return total + divisionCount;
        }, 0);
      } else {
        return 0;
      }
    });

    // Adaptez les couleurs en fonction de celles utilisées dans ChartsWidget3
    const baseColor = getCSSVariableValue('--bs-info'); // Ou toute autre couleur de votre choix
    const borderColor = getCSSVariableValue('--bs-gray-200');
    const labelColor = getCSSVariableValue('--bs-gray-500');

    return {
      series: [{
        name: 'Divisions',
        data: divisionsData,
      }],
      chart: {
        type: 'line',
        height: height,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [baseColor],
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: labelColor,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: labelColor,
          },
        },
      },
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
      },
      colors: [baseColor], // Appliquez la couleur de base aux lignes
      markers: {
        strokeColors: baseColor,
        strokeWidth: 3,
      },
      // Ajoutez ici d'autres configurations de style si nécessaire
    };
  };

  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 pt-5'>
        {/* Entête du composant */}
      </div>
      <div className='card-body'>
        <div ref={chartRef} id='line_chart_widget' style={{ height: '350px' }}></div>
      </div>
    </div>
  );
};

export { ChartsWidget3 };
