// src/components/home/habit-tracker.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Plus, X, Check, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Habit {
    id: string;
    name: string;
    completed: boolean;
    streak: number;
}

export default function HabitTracker() {
    // Default habits for demo
    const defaultHabits: Habit[] = [
        { id: "h1", name: "Drink water", completed: false, streak: 3 },
        { id: "h2", name: "Meditate", completed: false, streak: 1 },
        { id: "h3", name: "Exercise", completed: false, streak: 5 },
    ];

    const [habits, setHabits] = useState<Habit[]>(defaultHabits);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newHabitName, setNewHabitName] = useState("");

    // Toggle habit completion
    const toggleHabit = (id: string) => {
        const updatedHabits = habits.map((habit) => {
            if (habit.id === id) {
                const completed = !habit.completed;
                return {
                    ...habit,
                    completed,
                    streak: completed
                        ? habit.streak + 1
                        : Math.max(0, habit.streak - 1),
                };
            }
            return habit;
        });
        setHabits(updatedHabits);
    };

    // Add new habit
    const addHabit = () => {
        if (!newHabitName.trim()) return;

        const newHabit: Habit = {
            id: `h-${Date.now()}`,
            name: newHabitName.trim(),
            completed: false,
            streak: 0,
        };

        const updatedHabits = [...habits, newHabit];
        setHabits(updatedHabits);

        // Reset form
        setNewHabitName("");
        setShowAddForm(false);
    };

    // Delete habit
    const deleteHabit = (id: string) => {
        const updatedHabits = habits.filter((habit) => habit.id !== id);
        setHabits(updatedHabits);
    };

    return (
        <Card className="h-full">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-700 flex items-center">
                        <Calendar className="mr-2 text-teal-500" size={20} />
                        Daily Habits
                    </h3>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-teal-500"
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        {showAddForm ? <X size={16} /> : <Plus size={16} />}
                    </Button>
                </div>

                <AnimatePresence>
                    {showAddForm && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mb-4"
                        >
                            <div className="flex space-x-2 mb-2">
                                <Input
                                    value={newHabitName}
                                    onChange={(e) =>
                                        setNewHabitName(e.target.value)
                                    }
                                    placeholder="New habit name..."
                                    className="h-8 text-sm"
                                />
                                <Button
                                    size="sm"
                                    className="h-8 bg-teal-500 hover:bg-teal-600"
                                    onClick={addHabit}
                                >
                                    Add
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {habits.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-4">
                            No habits added yet. Click + to add one!
                        </p>
                    ) : (
                        habits.map((habit) => (
                            <motion.div
                                key={habit.id}
                                layoutId={habit.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`
                  flex items-center justify-between p-2 rounded-lg border
                  ${
                      habit.completed
                          ? "bg-teal-50 border-teal-200"
                          : "bg-gray-50 border-gray-200"
                  }
                `}
                            >
                                <button
                                    className="flex items-center flex-1"
                                    onClick={() => toggleHabit(habit.id)}
                                >
                                    <div
                                        className={`
                    w-6 h-6 rounded-full border flex items-center justify-center mr-2
                    ${
                        habit.completed
                            ? "border-teal-500 bg-teal-500 text-white"
                            : "border-gray-300 bg-white"
                    }
                  `}
                                    >
                                        {habit.completed && <Check size={14} />}
                                    </div>
                                    <span
                                        className={`text-sm ${
                                            habit.completed
                                                ? "text-teal-600 font-medium"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        {habit.name}
                                    </span>
                                </button>

                                <div className="flex items-center">
                                    <span className="text-xs font-medium text-gray-500 flex items-center mr-3">
                                        <CheckCircle
                                            size={10}
                                            className="mr-1 text-teal-400"
                                        />
                                        {habit.streak}
                                    </span>

                                    <button
                                        onClick={() => deleteHabit(habit.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                <div className="text-xs text-gray-400 mt-4 text-right italic">
                    Track your daily habits to build consistency
                </div>
            </CardContent>
        </Card>
    );
}
