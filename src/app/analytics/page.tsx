"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Activity, TrendingUp, Apple as AppleIcon, Loader2, Plus } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { LogFoodModal } from "@/components/LogFoodModal";
import { format } from "date-fns";
import Link from "next/link";

interface Meal {
  id: string;
  foodName: string;
  calories: number;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  mealType: string;
  createdAt: string;
}

export default function AnalyticsPage() {
  const { data: session, isPending } = useSession();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [goalCalories, setGoalCalories] = useState(2000); // Default, can be fetched from health profile later

  const fetchTodayMeals = async () => {
    if (!session?.user) return;
    
    setIsLoading(true);
    try {
      const today = format(new Date(), "yyyy-MM-dd");
      const response = await fetch(`/api/meals?date=${today}`);
      if (response.ok) {
        const data = await response.json();
        setMeals(data);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending && session?.user) {
      fetchTodayMeals();
    } else if (!isPending && !session?.user) {
      setIsLoading(false);
    }
  }, [session, isPending]);

  const consumedCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
  const remainingCalories = Math.max(0, goalCalories - consumedCalories);
  const progressPercentage = (consumedCalories / goalCalories) * 100;

  const totalProtein = meals.reduce((acc, meal) => acc + (meal.protein || 0), 0);
  const totalCarbs = meals.reduce((acc, meal) => acc + (meal.carbs || 0), 0);
  const totalFat = meals.reduce((acc, meal) => acc + (meal.fat || 0), 0);
  const totalMacros = totalProtein + totalCarbs + totalFat;

  const nutrients = [
    { 
      name: "Protein", 
      percentage: totalMacros > 0 ? Math.round((totalProtein / totalMacros) * 100) : 0, 
      color: "bg-blue-500",
      grams: totalProtein 
    },
    { 
      name: "Carbs", 
      percentage: totalMacros > 0 ? Math.round((totalCarbs / totalMacros) * 100) : 0, 
      color: "bg-green-500",
      grams: totalCarbs 
    },
    { 
      name: "Fat", 
      percentage: totalMacros > 0 ? Math.round((totalFat / totalMacros) * 100) : 0, 
      color: "bg-orange-500",
      grams: totalFat 
    },
  ];

  if (isPending || (isLoading && session?.user)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Please log in to view your dashboard</h1>
          <p className="text-muted-foreground mb-8 text-lg">You need an account to track your meals and nutrition.</p>
          <div className="flex gap-4">
            <Link href="/login" className="btn-cta">Login</Link>
            <Link href="/register" className="btn-cta bg-secondary text-secondary-foreground hover:bg-secondary/80">Sign Up</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background">
      <Navigation />
      
      <main className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {session.user.name}!</p>
            </div>
            <LogFoodModal onFoodLogged={fetchTodayMeals} />
          </div>

          {/* Today's Calories Card */}
          <div className="glass-card p-8 mb-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Today's Calories</h2>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold">{consumedCalories.toLocaleString()}</span>
                <span className="text-2xl text-muted-foreground">/ {goalCalories.toLocaleString()}</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary-foreground/50 transition-all duration-500"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Remaining</p>
                <p className="text-3xl font-bold">{remainingCalories}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Consumed</p>
                <p className="text-3xl font-bold">{consumedCalories.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Nutrient Breakdown Card */}
            <div className="glass-card p-8 rounded-3xl h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold">Nutrient Breakdown</h2>
              </div>

              <div className="space-y-6">
                {nutrients.map((nutrient) => (
                  <div key={nutrient.name}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold">{nutrient.name}</span>
                        <span className="text-sm text-muted-foreground">{nutrient.grams}g</span>
                      </div>
                      <span className="text-2xl font-bold">{nutrient.percentage}%</span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${nutrient.color} transition-all duration-500`}
                        style={{ width: `${nutrient.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Diary Card */}
            <div className="glass-card p-8 rounded-3xl h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold">Food Diary</h2>
                </div>
                <LogFoodModal 
                  onFoodLogged={fetchTodayMeals} 
                  trigger={
                    <button className="text-primary hover:underline font-semibold text-sm">
                      + Add Food
                    </button>
                  }
                />
              </div>

              <div className="overflow-x-auto">
                {meals.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">No meals logged for today yet.</p>
                    <LogFoodModal onFoodLogged={fetchTodayMeals} />
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Food</th>
                        <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Calories</th>
                        <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {meals.map((meal) => (
                        <tr key={meal.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-4 font-medium">{meal.foodName}</td>
                          <td className="py-4 px-4">{meal.calories}</td>
                          <td className="py-4 px-4 text-muted-foreground text-sm">
                            {format(new Date(meal.createdAt), "h:mm a")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
