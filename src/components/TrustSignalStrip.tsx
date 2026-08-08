import React from 'react';

const TrustSignalStrip = () => {
  const signals = [
    { icon: '🔐', text: 'Privacy-First Design' },
    { icon: '🍎', text: 'Apple Health Integration' },
    { icon: '🧠', text: 'AI Wellness Intelligence' },
    { icon: '🥗', text: 'Allergen Awareness' },
    { icon: '💡', text: 'Food & Mood Awareness' },
  ];

  return (
    <div className="w-full py-6 border-y border-border/50 bg-background/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12">
          {signals.map((signal, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground whitespace-nowrap hover:text-foreground transition-colors cursor-default">
                <span className="text-lg">{signal.icon}</span>
                <span>{signal.text}</span>
              </div>
              {index < signals.length - 1 && (
                <div className="hidden md:block w-1 h-1 rounded-full bg-border/50" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSignalStrip;
