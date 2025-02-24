"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export default function CalendarTracker() {
  const [viewMode, setViewMode] = useState("year");

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      <Card className="w-full max-w-md mb-4">
        <CardContent className="p-4 text-center">
          <h2 className="text-lg font-semibold">Görünüm Modu</h2>
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger>
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Son 1 Ay</SelectItem>
              <SelectItem value="year">Son 1 Yıl</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      {viewMode === "month" ? <MonthlyTracker /> : <YearlyTracker />}
    </div>
  );
}

function MonthlyTracker() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString("tr-TR", {
    month: "long",
    year: "numeric",
  });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const emptyDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const weekDays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="w-[400px] bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold capitalize text-center mb-6">
        {monthName}
      </h2>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-sm text-gray-500 font-medium text-center"
          >
            {day}
          </div>
        ))}
        {Array(emptyDays)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} className="h-8"></div>
          ))}
        {days.map((day) => (
          <div
            key={day}
            onClick={() => toggleStep(`${year}-${month}-${day}`)}
            className={`h-8 flex items-center justify-center rounded cursor-pointer bg-gray-100 text-gray-700
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

function YearlyTracker() {
  const currentYear = new Date().getFullYear();
  const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
  const months = {
    JAN: getDaysInMonth(1, currentYear),
    FEB: getDaysInMonth(2, currentYear),
    MAR: getDaysInMonth(3, currentYear),
    APR: getDaysInMonth(4, currentYear),
    MAY: getDaysInMonth(5, currentYear),
    JUN: getDaysInMonth(6, currentYear),
    JUL: getDaysInMonth(7, currentYear),
    AUG: getDaysInMonth(8, currentYear),
    SEP: getDaysInMonth(9, currentYear),
    OCT: getDaysInMonth(10, currentYear),
    NOV: getDaysInMonth(11, currentYear),
    DEC: getDaysInMonth(12, currentYear),
  };

  const splitDaysIntoGroups = (totalDays) => {
    const groups = [];
    let remaining = totalDays;
    while (remaining > 0) {
      groups.push(Math.min(remaining, 15));
      remaining -= 15;
    }
    return groups;
  };

  return (
    <div className="w-[400px] p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-4">
        {Object.entries(months).map(([month, days]) => (
          <div
            key={month}
            className="flex items-center space-x-3 justify-between"
          >
            <span className="text-sm font-medium text-gray-500">{month}</span>
            <div className="grid gap-1 grid-cols-[repeat(1,_minmax(0,_1fr))]">
              {splitDaysIntoGroups(days).map((groupSize, index) => (
                <div key={index} className="flex gap-1">
                  {Array(groupSize)
                    .fill()
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 min-w-[16px] min-h-[16px] rounded bg-blue-500"
                      ></div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
