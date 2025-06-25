
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CircularProgress from './CircularProgress';
import SessionStats from './SessionStats';
import { useToast } from '@/hooks/use-toast';

type TimerMode = 'work' | 'break';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const workDuration = 25 * 60; // 25 minutes
  const breakDuration = 5 * 60; // 5 minutes

  const totalTime = mode === 'work' ? workDuration : breakDuration;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsActive(false);
      
      if (mode === 'work') {
        setCompletedSessions(prev => prev + 1);
        setMode('break');
        setTimeLeft(breakDuration);
        toast({
          title: "Work session completed! 🎉",
          description: "Time for a 5-minute break.",
        });
      } else {
        setMode('work');
        setTimeLeft(workDuration);
        toast({
          title: "Break time over! 💪",
          description: "Ready for another work session?",
        });
      }
    }
  }, [timeLeft, mode, toast]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? workDuration : breakDuration);
  };

  const switchMode = (newMode: TimerMode) => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(newMode === 'work' ? workDuration : breakDuration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 dark:bg-black backdrop-blur-sm shadow-xl border-0 dark:shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Mode Toggle */}
            <div className="flex justify-center space-x-2">
              <Button
                variant={mode === 'work' ? 'default' : 'outline'}
                onClick={() => switchMode('work')}
                className={`px-6 py-2 transition-all duration-200 ${
                  mode === 'work' 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'hover:bg-green-50 dark:hover:bg-green-900/20 dark:text-gray-300 dark:border-gray-600'
                }`}
              >
                Work
              </Button>
              <Button
                variant={mode === 'break' ? 'default' : 'outline'}
                onClick={() => switchMode('break')}
                className={`px-6 py-2 transition-all duration-200 ${
                  mode === 'break' 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                    : 'hover:bg-orange-50 dark:hover:bg-orange-900/20 dark:text-gray-300 dark:border-gray-600'
                }`}
              >
                Break
              </Button>
            </div>

            {/* Circular Progress and Timer */}
            <div className="relative flex items-center justify-center">
              <CircularProgress progress={progress} mode={mode} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {mode} Session
                  </div>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                onClick={toggleTimer}
                size="lg"
                className={`px-8 py-3 text-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
              >
                {isActive ? (
                  <>
                    <Pause className="mr-2 h-5 w-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Start
                  </>
                )}
              </Button>
              <Button
                onClick={resetTimer}
                variant="outline"
                size="lg"
                className="px-6 py-3 text-lg border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <SessionStats completedSessions={completedSessions} />
    </div>
  );
};

export default PomodoroTimer;
