
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface SessionStatsProps {
  completedSessions: number;
}

const SessionStats: React.FC<SessionStatsProps> = ({ completedSessions }) => {
  return (
    <Card className="bg-white/80 dark:bg-black backdrop-blur-sm shadow-lg border-0 dark:shadow-2xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Completed Sessions
            </span>
          </div>
          <div className="text-3xl font-bold text-green-500">
            {completedSessions}
          </div>
        </div>
        {completedSessions > 0 && (
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Great job! You've completed {completedSessions} pomodoro{completedSessions !== 1 ? 's' : ''} today.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionStats;
