import React, { useState, useEffect } from 'react';
import { XCircle, AlertTriangle, Activity, CheckCircle, Clock, Zap, Wifi, Shield, Thermometer, Key } from 'lucide-react';

interface TestProgressModalProps {
  stationId: string;
  onClose: () => void;
  onComplete: (results: any) => void;
}

interface TestStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  result?: string;
  icon: React.ReactNode;
}

export const TestProgressModal: React.FC<TestProgressModalProps> = ({
  stationId,
  onClose,
  onComplete
}) => {
  const [steps, setSteps] = useState<TestStep[]>([
    {
      id: 'power',
      name: 'Power System Test',
      description: 'Checking power output and stability',
      status: 'pending',
      progress: 0,
      icon: <Zap className="text-blue-500" size={20} />
    },
    {
      id: 'network',
      name: 'Network Connectivity',
      description: 'Verifying network connection and signal strength',
      status: 'pending',
      progress: 0,
      icon: <Wifi className="text-blue-500" size={20} />
    },
    {
      id: 'safety',
      name: 'Safety Systems',
      description: 'Testing ground fault and safety circuits',
      status: 'pending',
      progress: 0,
      icon: <Shield className="text-blue-500" size={20} />
    },
    {
      id: 'temperature',
      name: 'Temperature Sensors',
      description: 'Validating temperature monitoring systems',
      status: 'pending',
      progress: 0,
      icon: <Thermometer className="text-blue-500" size={20} />
    },
    {
      id: 'auth',
      name: 'Authorization System',
      description: 'Testing RFID and payment systems',
      status: 'pending',
      progress: 0,
      icon: <Key className="text-blue-500" size={20} />
    }
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentStep < steps.length) {
      // Start the current step
      setSteps(prev => prev.map((step, idx) => 
        idx === currentStep ? { ...step, status: 'running' } : step
      ));

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setSteps(prev => prev.map((step, idx) => {
          if (idx === currentStep && step.progress < 100) {
            return { ...step, progress: step.progress + 10 };
          }
          return step;
        }));
      }, 200);

      // Complete the step after progress reaches 100%
      const stepTimeout = setTimeout(() => {
        clearInterval(progressInterval);
        
        const success = Math.random() > 0.2; // 80% success rate
        setSteps(prev => prev.map((step, idx) => {
          if (idx === currentStep) {
            return {
              ...step,
              status: success ? 'completed' : 'failed',
              result: success ? 'Passed' : 'Failed',
              progress: 100
            };
          }
          return step;
        }));

        if (currentStep < steps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsComplete(true);
          onComplete({
            stationId,
            timestamp: new Date(),
            results: steps.map(step => ({
              test: step.name,
              status: step.status,
              result: step.result
            }))
          });
        }
      }, 2000);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(stepTimeout);
      };
    }
  }, [currentStep, stationId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-gray-400" />;
      case 'running':
        return <Activity size={16} className="text-blue-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'failed':
        return <AlertTriangle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Running Diagnostics</h2>
            <p className="text-gray-600">Station {stationId}</p>
          </div>
          {isComplete && (
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XCircle size={24} />
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Test Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-4 rounded-lg ${
                  step.status === 'failed' ? 'bg-red-50' :
                  step.status === 'completed' ? 'bg-green-50' :
                  step.status === 'running' ? 'bg-blue-50' :
                  'bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{step.name}</h3>
                        <p className="text-sm text-gray-500">{step.description}</p>
                      </div>
                      {getStatusIcon(step.status)}
                    </div>
                    
                    {(step.status === 'running' || step.progress > 0) && (
                      <div className="mt-2">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-200 ${
                              step.status === 'failed' ? 'bg-red-500' :
                              step.status === 'completed' ? 'bg-green-500' :
                              'bg-blue-500'
                            }`}
                            style={{ width: `${step.progress}%` }}
                          />
                        </div>
                        {step.status === 'running' && (
                          <p className="mt-1 text-xs text-gray-500 text-right">{step.progress}%</p>
                        )}
                      </div>
                    )}

                    {step.result && (
                      <p className={`mt-2 text-sm ${
                        step.status === 'failed' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        Result: {step.result}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          {isComplete && (
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {steps.filter(s => s.status === 'completed').length} of {steps.length} tests completed successfully
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};