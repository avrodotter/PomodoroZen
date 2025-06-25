
import PomodoroTimer from '@/components/PomodoroTimer';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1598149255714-de0a630b96ea?w=1920&h=1080&fit=crop')`
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
      
      <ThemeToggle />
      
      <div className="relative z-10 w-full max-w-md flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Pomodoro Timer</h1>
          <p className="text-white/90 drop-shadow-md">Stay focused, be productive</p>
        </div>
        <PomodoroTimer />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 right-4 z-10">
        <p className="text-white/70 text-sm drop-shadow-md">
          Made by{' '}
          <a 
            href="https://github.com/avrodotter" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-white/90 underline transition-colors duration-200"
          >
            @avrodotter
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Index;
