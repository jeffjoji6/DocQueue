import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
  Svg,
  Path,
  Circle,
  Line,
  G,
} from "@react-pdf/renderer";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Register fonts
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Roboto",
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: "#2563EB",
    paddingBottom: 15,
  },
  hospitalName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 12,
    color: "#4B5563",
    marginBottom: 4,
  },
  reportMeta: {
    fontSize: 10,
    color: "#6B7280",
  },
  section: {
    marginBottom: 25,
    backgroundColor: "#F8FAFC",
    padding: 15,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1E40AF",
    borderBottom: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 6,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  statBox: {
    width: "30%",
    marginRight: "3%",
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  statLabel: {
    fontSize: 10,
    color: "#4B5563",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  statSubValue: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 2,
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    minHeight: 30,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#F1F5F9",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    color: "#374151",
  },
  tableHeaderCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  emergencySection: {
    backgroundColor: "#FEF2F2",
    padding: 15,
    borderRadius: 4,
    marginBottom: 25,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DC2626",
    marginBottom: 12,
    borderBottom: 1,
    borderBottomColor: "#FECACA",
    paddingBottom: 6,
  },
  chartContainer: {
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 4,
  },
  chartTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1E40AF",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#6B7280",
    textAlign: "center",
    borderTop: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 10,
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 40,
    fontSize: 8,
    color: "#6B7280",
  },
  pageBreak: {
    pageBreakBefore: "always",
  },
});

// Helper function to generate colors for charts
const getChartColors = (count) => {
  const colors = [
    "#3B82F6", // blue
    "#10B981", // green
    "#F59E0B", // yellow
    "#EF4444", // red
    "#8B5CF6", // purple
    "#EC4899", // pink
    "#06B6D4", // cyan
    "#F97316", // orange
  ];

  return Array(count)
    .fill()
    .map((_, i) => colors[i % colors.length]);
};

// Bar Chart Component
const BarChart = ({ data, title }) => {
  const maxValue = Math.max(...data.values);
  const barWidth = 30;
  const spacing = 20;
  const chartHeight = 120;
  const chartWidth = data.labels.length * (barWidth + spacing) + spacing;

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <Svg width={chartWidth} height={chartHeight}>
        {/* Y-axis */}
        <Line
          x1={0}
          y1={chartHeight}
          x2={0}
          y2={0}
          stroke="#E5E7EB"
          strokeWidth={1}
        />

        {/* X-axis */}
        <Line
          x1={0}
          y1={chartHeight}
          x2={chartWidth}
          y2={chartHeight}
          stroke="#E5E7EB"
          strokeWidth={1}
        />

        {/* Bars */}
        {data.labels.map((label, index) => {
          const value = data.values[index];
          const barHeight = (value / maxValue) * chartHeight;
          const x = spacing + index * (barWidth + spacing);
          const y = chartHeight - barHeight;

          return (
            <View key={index}>
              <Path
                d={`M ${x} ${chartHeight} L ${x} ${y} L ${
                  x + barWidth
                } ${y} L ${x + barWidth} ${chartHeight} Z`}
                fill={getChartColors(data.labels.length)[index]}
              />
              <Text
                x={x + barWidth / 2}
                y={chartHeight + 15}
                fontSize={8}
                textAnchor="middle"
                fill="#4B5563"
              >
                {label}
              </Text>
            </View>
          );
        })}
      </Svg>

      {/* Legend */}
      <View style={styles.chartLegend}>
        {data.labels.map((label, index) => (
          <View key={index} style={styles.chartLegendItem}>
            <View
              style={[
                styles.chartLegendColor,
                { backgroundColor: getChartColors(data.labels.length)[index] },
              ]}
            />
            <Text style={styles.chartLegendText}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Pie Chart Component
const PieChart = ({ data, title }) => {
  const total = data.values.reduce((sum, value) => sum + value, 0);
  const radius = 50;
  const centerX = 100;
  const centerY = 75;

  let startAngle = 0;
  const colors = getChartColors(data.labels.length);

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <Svg width={200} height={150}>
        {/* Pie slices */}
        {data.labels.map((label, index) => {
          const value = data.values[index];
          const percentage = value / total;
          const endAngle = startAngle + percentage * 2 * Math.PI;

          // Calculate path for pie slice
          const x1 = centerX + radius * Math.cos(startAngle);
          const y1 = centerY + radius * Math.sin(startAngle);
          const x2 = centerX + radius * Math.cos(endAngle);
          const y2 = centerY + radius * Math.sin(endAngle);

          const largeArcFlag = percentage > 0.5 ? 1 : 0;

          const path = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `Z`,
          ].join(" ");

          startAngle = endAngle;

          return <Path key={index} d={path} fill={colors[index]} />;
        })}

        {/* Center circle for donut effect */}
        <Circle cx={centerX} cy={centerY} r={30} fill="white" />
      </Svg>

      {/* Legend */}
      <View style={styles.chartLegend}>
        {data.labels.map((label, index) => (
          <View key={index} style={styles.chartLegendItem}>
            <View
              style={[
                styles.chartLegendColor,
                { backgroundColor: colors[index] },
              ]}
            />
            <Text style={styles.chartLegendText}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Line Chart Component
const LineChart = ({ data, title }) => {
  const maxValue = Math.max(...Object.values(data));
  const chartHeight = 120;
  const chartWidth = 400;
  const pointRadius = 3;
  const dates = Object.keys(data);
  const spacing = chartWidth / (dates.length - 1);

  // Generate points for the line
  const points = dates.map((date, index) => {
    const x = index * spacing;
    const y = chartHeight - (data[date] / maxValue) * chartHeight;
    return { x, y, value: data[date] };
  });

  // Create path for the line
  const pathData = points
    .map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
    )
    .join(" ");

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <Svg width={chartWidth} height={chartHeight + 20}>
        {/* Grid lines */}
        {Array.from({ length: 5 }).map((_, i) => {
          const y = (i * chartHeight) / 4;
          return (
            <Line
              key={i}
              x1={0}
              y1={y}
              x2={chartWidth}
              y2={y}
              stroke="#E5E7EB"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Line */}
        <Path d={pathData} stroke="#3B82F6" strokeWidth={2} fill="none" />

        {/* Points and values */}
        {points.map((point, index) => (
          <G key={index}>
            <Circle cx={point.x} cy={point.y} r={pointRadius} fill="#3B82F6" />
            <Text
              x={point.x}
              y={point.y - 10}
              fontSize={8}
              textAnchor="middle"
              fill="#4B5563"
            >
              {point.value}
            </Text>
          </G>
        ))}

        {/* X-axis labels */}
        {dates.map((date, index) => (
          <Text
            key={index}
            x={index * spacing}
            y={chartHeight + 15}
            fontSize={8}
            textAnchor="middle"
            fill="#4B5563"
          >
            {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
          </Text>
        ))}
      </Svg>
    </View>
  );
};

const ReportGenerator = ({ isOpen, onClose, data }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extract data from props
  const {
    appointments = [],
    doctors = [],
    rooms = [],
    equipment = [],
    statistics = {},
    statusDistribution = {},
    diseaseDistribution = {},
    appointmentTrends,
  } = data || {};

  // Calculate statistics if not provided
  const calculatedStats = {
    totalAppointments: appointments.length,
    todayAppointments: appointments.filter(
      (apt) => new Date(apt.date).toDateString() === new Date().toDateString()
    ).length,
    emergencyCases: appointments.filter(
      (apt) => apt.disease.toLowerCase() === "emergency"
    ).length,
    highPriorityCases: appointments.filter((apt) => apt.priorityRating > 10)
      .length,
    uniquePatients: new Set(appointments.map((apt) => apt.patientId)).size,
    ...statistics,
  };

  // Prepare chart data
  const statusChartData = {
    labels: Object.keys(statusDistribution).map(
      (status) => status.charAt(0).toUpperCase() + status.slice(1)
    ),
    values: Object.values(statusDistribution),
  };

  const diseaseChartData = {
    labels: Object.keys(diseaseDistribution),
    values: Object.values(diseaseDistribution),
  };

  // Prepare appointment trend data (last 7 days)
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString("en-US", { weekday: "short" }));
    }
    return days;
  };

  const getAppointmentsByDay = () => {
    const days = getLast7Days();
    const counts = days.map((day) => {
      const dayDate = new Date();
      dayDate.setDate(dayDate.getDate() - (6 - days.indexOf(day)));
      const dayString = dayDate.toDateString();

      return appointments.filter(
        (apt) => new Date(apt.date).toDateString() === dayString
      ).length;
    });

    return {
      labels: days,
      values: counts,
    };
  };

  const appointmentTrendData = getAppointmentsByDay();

  // Calculate emergency cases by priority
  const emergencyCasesByPriority = appointments
    .filter((apt) => apt.disease.toLowerCase() === "emergency")
    .reduce((acc, apt) => {
      const priority =
        apt.priorityRating > 15
          ? "Critical"
          : apt.priorityRating > 10
          ? "High"
          : "Medium";
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {});

  // Calculate detailed disease statistics
  const diseaseStats = Object.entries(diseaseDistribution).map(
    ([disease, count]) => ({
      disease,
      count,
      percentage: ((count / appointments.length) * 100).toFixed(1),
      emergencyCases: appointments.filter(
        (apt) => apt.disease === disease && apt.priorityRating > 10
      ).length,
    })
  );

  // Create PDF Document
  const ReportDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.hospitalName}>DocQueue Hospital</Text>
          <Text style={styles.title}>Medical Statistics Report</Text>
          <Text style={styles.subtitle}>
            Generated on{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Text style={styles.reportMeta}>Report ID: {Date.now()}</Text>
        </View>

        {/* Key Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total Patients</Text>
              <Text style={styles.statValue}>{statistics.uniquePatients}</Text>
              <Text style={styles.statSubValue}>Active Cases</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Today's Appointments</Text>
              <Text style={styles.statValue}>
                {statistics.todayAppointments}
              </Text>
              <Text style={styles.statSubValue}>Scheduled</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Emergency Cases</Text>
              <Text style={styles.statValue}>{statistics.emergencyCases}</Text>
              <Text style={styles.statSubValue}>Under Treatment</Text>
            </View>
          </View>
        </View>

        {/* Emergency Cases Section */}
        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>Emergency Case Analysis</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableHeaderCell}>Priority Level</Text>
              <Text style={styles.tableHeaderCell}>Number of Cases</Text>
              <Text style={styles.tableHeaderCell}>% of Total</Text>
            </View>
            {Object.entries(emergencyCasesByPriority).map(
              ([priority, count], index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{priority}</Text>
                  <Text style={styles.tableCell}>{count}</Text>
                  <Text style={styles.tableCell}>
                    {((count / statistics.emergencyCases) * 100).toFixed(1)}%
                  </Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* Disease Distribution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disease Distribution Analysis</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableHeaderCell}>Condition</Text>
              <Text style={styles.tableHeaderCell}>Total Cases</Text>
              <Text style={styles.tableHeaderCell}>Emergency Cases</Text>
              <Text style={styles.tableHeaderCell}>Distribution %</Text>
            </View>
            {diseaseStats
              .sort((a, b) => b.count - a.count)
              .map((stat, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{stat.disease}</Text>
                  <Text style={styles.tableCell}>{stat.count}</Text>
                  <Text style={styles.tableCell}>{stat.emergencyCases}</Text>
                  <Text style={styles.tableCell}>{stat.percentage}%</Text>
                </View>
              ))}
          </View>
        </View>

        {/* Trend Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Trend Analysis</Text>
          <LineChart data={appointmentTrends} title="Daily Patient Volume" />
        </View>

        <Text style={styles.pageNumber}>Page 1</Text>
        <Text style={styles.footer}>
          CONFIDENTIAL - For Internal Use Only | DocQueue Hospital Management
          System
        </Text>
      </Page>

      {/* Resources Page */}
      <Page size="A4" style={[styles.page, styles.pageBreak]}>
        <View style={styles.header}>
          <Text style={styles.hospitalName}>DocQueue Hospital</Text>
          <Text style={styles.title}>Resource Allocation Report</Text>
          <Text style={styles.subtitle}>
            Current Status as of {new Date().toLocaleDateString()}
          </Text>
        </View>

        {/* Doctors Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Staff Distribution</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableHeaderCell}>Name</Text>
              <Text style={styles.tableHeaderCell}>Specialty</Text>
              <Text style={styles.tableHeaderCell}>Current Load</Text>
              <Text style={styles.tableHeaderCell}>Status</Text>
            </View>
            {doctors.map((doctor) => (
              <View key={doctor.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{doctor.name}</Text>
                <Text style={styles.tableCell}>{doctor.specialty}</Text>
                <Text style={styles.tableCell}>
                  {doctor.currentPatients}/{doctor.maxPatients}
                </Text>
                <Text style={styles.tableCell}>{doctor.status}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Facility Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facility Status</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableHeaderCell}>Room</Text>
              <Text style={styles.tableHeaderCell}>Type</Text>
              <Text style={styles.tableHeaderCell}>Occupancy</Text>
              <Text style={styles.tableHeaderCell}>Status</Text>
            </View>
            {rooms.map((room) => (
              <View key={room.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{room.id}</Text>
                <Text style={styles.tableCell}>{room.type}</Text>
                <Text style={styles.tableCell}>
                  {room.occupied}/{room.capacity}
                </Text>
                <Text style={styles.tableCell}>{room.status}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.pageNumber}>Page 2</Text>
        <Text style={styles.footer}>
          CONFIDENTIAL - For Internal Use Only | DocQueue Hospital Management
          System
        </Text>
      </Page>
    </Document>
  );

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-gray-900 mb-6"
                    >
                      Hospital Management System Report
                    </Dialog.Title>

                    <div className="h-[600px] w-full">
                      <PDFViewer width="100%" height="100%">
                        <ReportDocument />
                      </PDFViewer>
                    </div>

                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        onClick={onClose}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ReportGenerator;
