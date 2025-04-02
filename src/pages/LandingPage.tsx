import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LogIn, 
  ExternalLink, 
  ChevronRight, 
  BarChart3, 
  Users, 
  Zap, 
  LineChart, 
  Lightbulb, 
  TrendingUp, 
  Globe, 
  Award, 
  Clock, 
  ScrollIcon
} from "lucide-react";
import { Helmet } from "react-helmet";

const LandingPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState({
    clientSection: false,
    featuresSection: false,
    testimonialsSection: false
  });
  
  // Handle scroll position
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Check visibility of sections based on scroll position
      setIsVisible({
        clientSection: position > 500,
        featuresSection: position > 1100,
        testimonialsSection: position > 1800
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create neuron class
    class Neuron {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      connections: Neuron[];
      pulsePhase: number;
      pulseSpeed: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.connections = [];
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.01 + 0.005;
        
        // Artefact brand colors with varying opacity
        const colors = [
          'rgba(155, 135, 245, 0.8)', // Primary purple
          'rgba(99, 102, 241, 0.8)',  // Indigo
          'rgba(139, 92, 246, 0.8)',  // Violet
          'rgba(167, 139, 250, 0.8)', // Light purple
          'rgba(129, 140, 248, 0.8)'  // Blue
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulsePhase += this.pulseSpeed;
        
        // Wrap around screen edges
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        if (!ctx) return;
        
        // Draw connections first
        this.connections.forEach(neuron => {
          const dx = this.x - neuron.x;
          const dy = this.y - neuron.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.15; // More subtle connections
            ctx.beginPath();
            ctx.strokeStyle = `rgba(155, 135, 245, ${opacity})`; // Artefact purple
            ctx.lineWidth = 0.5;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(neuron.x, neuron.y);
            ctx.stroke();
          }
        });
        
        // Draw neuron with Artefact colors
        const pulseScale = Math.sin(this.pulsePhase) * 0.2 + 1;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size * pulseScale, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw glow effect with matching color
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 1.5
        );
        gradient.addColorStop(0, this.color.replace('0.8', '0.4'));
        gradient.addColorStop(1, this.color.replace('0.8', '0'));
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create neuron array with more neurons
    const neuronCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000));
    const neurons: Neuron[] = [];
    
    for (let i = 0; i < neuronCount; i++) {
      neurons.push(new Neuron());
    }
    
    // Animation function
    const animate = () => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(16, 16, 39, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw neurons
      neurons.forEach(neuron => {
        neuron.update();
        neuron.draw();
      });
      
      // Connect neurons with lines if they are close enough
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(155, 135, 245, ${0.1 * (1 - distance / 100)})`; // Purple with distance-based opacity
            ctx.lineWidth = 0.5;
            ctx.moveTo(neurons[i].x, neurons[i].y);
            ctx.lineTo(neurons[j].x, neurons[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Dynamic Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      
      {/* Header */}
      <header className="bg-transparent text-white py-6 px-6 md:px-10 relative z-10">
        <div className="container mx-auto">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/Artefact-AI-is-about-People-White-300x106.png"
              alt="Artefact Logo"
              className="h-8 md:h-10"
            />
          </div>
        </div>
      </header>
      
      <main className="flex-grow text-white relative z-10">
        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans mb-6 leading-tight">
              ARTEFACT<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 font-bold animate-gradient bg-[length:200%_200%] animate-gradient-x">
              MROI Lighthouse
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
              Transform your business with powerful insights and AI-driven analytics
              to make better decisions and achieve exceptional results.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button 
              asChild
              variant="default" 
              className="bg-pink-500 hover:bg-pink-600 rounded-full px-8 py-6 text-white w-full md:w-auto"
            >
              <Link to="/login">
                Login <LogIn className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="bg-transparent hover:bg-white/10 rounded-full px-8 py-6 text-white border-white w-full md:w-auto"
            >
              <a href="https://artefact.com" target="_blank" rel="noopener noreferrer">
                Visit Artefact.com <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center">
              <p className="mb-2 text-sm opacity-80">Scroll to discover</p>
              <ScrollIcon className="h-6 w-6" />
            </div>
          </div>

          {/* 3D Visual Elements */}
          <div className="mt-20 relative max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Marketing Mix Modelling */}
              <div className="feature-card backdrop-blur-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/80 to-purple-400/80 opacity-50 blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400/80 to-purple-400/80 opacity-40 blur-lg"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Marketing Mix Modelling</h3>
                  <p className="text-white/80">Optimize your marketing budget allocation with advanced statistical analysis</p>
                </div>
              </div>

              {/* Multi-Touch Attribution */}
              <div className="feature-card backdrop-blur-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-purple-400/80 to-pink-400/80 opacity-50 blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-purple-400/80 to-pink-400/80 opacity-40 blur-lg"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Multi-Touch Attribution</h3>
                  <p className="text-white/80">Understand the customer journey by analyzing each touchpoint's contribution</p>
                </div>
              </div>

              {/* Incrementality Testing */}
              <div className="feature-card backdrop-blur-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-pink-400/80 to-orange-400/80 opacity-50 blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-pink-400/80 to-orange-400/80 opacity-40 blur-lg"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Incrementality Testing</h3>
                  <p className="text-white/80">Measure the true impact of your marketing efforts through controlled experiments</p>
                </div>
              </div>
            </div>

            {/* Background blur effects */}
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-float"></div>
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: "1.5s"}}></div>
            <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: "3s"}}></div>
          </div>
        </div>

        {/* Marketing Analytics Solutions Section */}
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Advanced Marketing Analytics Solutions</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Leverage our cutting-edge analytics methodologies to optimize your marketing strategy and maximize ROI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Marketing Mix Modelling */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-400/30 rounded-2xl blur-xl transform group-hover:scale-105 transition-all duration-300 -z-10"></div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/10 h-full flex flex-col transform group-hover:translate-y-[-5px] transition-all duration-300">
                <div className="p-3 rounded-full bg-blue-500/20 w-fit mb-6">
                  <BarChart3 className="h-7 w-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Marketing Mix Modelling</h3>
                <p className="mb-6 text-white/80 flex-grow">
                  Optimize your marketing budget allocation with advanced statistical analysis to determine the impact of different marketing channels on your business outcomes.
                </p>
              </div>
            </div>

            {/* Multi-Touch Attribution */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-400/30 rounded-2xl blur-xl transform group-hover:scale-105 transition-all duration-300 -z-10"></div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/10 h-full flex flex-col transform group-hover:translate-y-[-5px] transition-all duration-300">
                <div className="p-3 rounded-full bg-purple-500/20 w-fit mb-6">
                  <Users className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Multi-Touch Attribution</h3>
                <p className="mb-6 text-white/80 flex-grow">
                  Understand the customer journey with precision by analyzing each touchpoint's contribution to conversion, helping you allocate budget to the most effective channels.
                </p>
              </div>
            </div>

            {/* Incrementality Testing */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-pink-400/30 rounded-2xl blur-xl transform group-hover:scale-105 transition-all duration-300 -z-10"></div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/10 h-full flex flex-col transform group-hover:translate-y-[-5px] transition-all duration-300">
                <div className="p-3 rounded-full bg-pink-500/20 w-fit mb-6">
                  <Zap className="h-7 w-7 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Incrementality Testing</h3>
                <p className="mb-6 text-white/80 flex-grow">
                  Measure the true impact of your marketing efforts by conducting controlled experiments to determine how much value each channel adds compared to no marketing activity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Client Logos Section - Updated with real brands */}
        <div className={`container mx-auto px-6 py-16 md:py-24 transition-all duration-1000 ${isVisible.clientSection ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Leading Brands</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Join hundreds of forward-thinking companies leveraging our platform for data-driven marketing decisions
            </p>
          </div>

          {/* Client logo grid with real brand logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* L'Oreal */}
            <div className="flex items-center justify-center p-6 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/25 transition-all duration-300 group">
              <div className="h-20 w-56 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/1361925.png"
                  alt="L'Oréal Logo"
                  className="h-16 w-auto object-contain brightness-100"
                />
              </div>
            </div>
            
            {/* Hunkemoller */}
            <div className="flex items-center justify-center p-6 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/25 transition-all duration-300 group">
              <div className="h-16 w-48 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/Hunkemoeller_Logo.png"
                  alt="Hunkemöller Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
            
            {/* Torrid */}
            <div className="flex items-center justify-center p-6 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/25 transition-all duration-300 group">
              <div className="h-16 w-48 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/vvsfwpbxyg2q4ti9pcup.webp"
                  alt="Torrid Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
            
            {/* BNP Paribas */}
            <div className="flex items-center justify-center p-6 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/25 transition-all duration-300 group">
              <div className="h-20 w-56 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/BNP-Paribas-Logo.png"
                  alt="BNP Paribas Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>
            
            {/* Meta */}
            <div className="flex items-center justify-center p-6 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/25 transition-all duration-300 group">
              <div className="h-16 w-48 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/Meta_Platforms_Inc._logo.svg.png"
                  alt="Meta Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
            
            {/* Samsung */}
            <div className="flex items-center justify-center p-6 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/25 transition-all duration-300 group">
              <div className="h-16 w-48 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/Samsung_wordmark.svg"
                  alt="Samsung Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Statistics Counter - Animated on scroll */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-300 mb-2">500+</div>
              <p className="text-white/80">Active Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300 mb-2">$1.2B+</div>
              <p className="text-white/80">Media Spend Optimized</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-300 mb-2">15+</div>
              <p className="text-white/80">Countries Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-300 mb-2">24%</div>
              <p className="text-white/80">Avg. ROI Improvement</p>
            </div>
          </div>
        </div>

        {/* Features Section with dashboard preview image */}
        <div className={`container mx-auto px-6 py-16 md:py-24 transition-all duration-1000 ${isVisible.featuresSection ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Platform Features</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Our comprehensive suite of tools provides everything you need to transform your marketing strategy
            </p>
          </div>

          {/* Feature blocks with dashboard preview image */}
          <div className="space-y-24">
            {/* Feature 1 with dashboard preview */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2 order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4">Real-time Analytics Dashboard</h3>
                <p className="text-lg text-white/80 mb-6">
                  Monitor your marketing performance with customizable dashboards that provide real-time insights into your campaigns, channels, and audience behavior.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-green-500/30 mr-3">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-white/90">Live performance tracking across channels</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-green-500/30 mr-3">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-white/90">Customizable KPI visualization</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-green-500/30 mr-3">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-white/90">Automated performance alerts</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 order-1 md:order-2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="aspect-video bg-gradient-to-br from-indigo-900/70 to-purple-900/70 backdrop-blur-lg p-4 flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/8609997c-65e0-4080-9970-d5f85c5b9186.png"
                      alt="Channel Performance Matrix" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-500/30 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="aspect-video bg-gradient-to-br from-blue-900/70 to-indigo-900/70 backdrop-blur-lg p-8 flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/601cbd8c-24db-4884-a53e-1be9a498f2db.png"
                      alt="Global Marketing Intelligence Dashboard" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl"></div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Global Marketing Intelligence</h3>
                <p className="text-lg text-white/80 mb-6">
                  Gain insights from markets around the world with our comprehensive global data integration and analysis tools.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-blue-500/30 mr-3">
                      <Award className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-white/90">Multi-market performance comparison</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-blue-500/30 mr-3">
                      <Award className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-white/90">Regional trend analysis</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-blue-500/30 mr-3">
                      <Award className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-white/90">Cross-market opportunities</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2 order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4">AI-Powered Recommendations</h3>
                <p className="text-lg text-white/80 mb-6">
                  Let our artificial intelligence analyze your data and provide actionable recommendations to optimize your marketing strategy.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-purple-500/30 mr-3">
                      <Lightbulb className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="text-white/90">Channel optimization suggestions</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-purple-500/30 mr-3">
                      <Lightbulb className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="text-white/90">Budget allocation recommendations</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-purple-500/30 mr-3">
                      <Lightbulb className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="text-white/90">Performance improvement insights</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 order-1 md:order-2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="aspect-video bg-gradient-to-br from-purple-900/70 to-pink-900/70 backdrop-blur-lg p-4 flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/9de72820-6736-421e-9a98-b7e526ebe48f.png"
                      alt="AI-Powered Marketing Recommendations" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className={`container mx-auto px-6 py-16 md:py-24 transition-all duration-1000 ${isVisible.testimonialsSection ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Discover how our platform has transformed marketing strategies for businesses around the world
            </p>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "Artefact's MMM solution is like having a Formula 1 car for your marketing analytics. Just as an F1 car's performance is optimized through countless data points and real-time adjustments, Artefact's platform provides that same level of precision and optimization for your marketing spend. The way it breaks down each component's contribution to overall performance is truly remarkable.",
                author: "Sid Mohan",
                title: "Marketing Analytics Expert",
                color: "blue"
              },
              {
                quote: "The depth of insights we get from Artefact's MMM solution is incredible. It's not just about numbers; it's about understanding the true impact of each marketing channel and making data-driven decisions that drive real business growth.",
                author: "Calogero Zarbo",
                title: "Data Science Director",
                color: "purple"
              },
              {
                quote: "Artefact has transformed how we approach marketing mix modeling. Their solution provides clarity in complexity, helping us optimize our marketing spend with unprecedented precision and confidence.",
                author: "Ilona van Berlo",
                title: "Marketing Strategy Lead",
                color: "pink"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg relative overflow-hidden">
                <div className={`absolute -top-12 -right-12 w-32 h-32 bg-${testimonial.color}-500/20 rounded-full blur-3xl`}></div>
                <div className={`absolute -bottom-12 -left-12 w-32 h-32 bg-${testimonial.color}-500/10 rounded-full blur-3xl`}></div>
                <div className="relative z-10">
                  <div className="text-3xl text-white/20 mb-4">"</div>
                  <p className="text-white/90 mb-8 italic">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full bg-${testimonial.color}-500/30 flex items-center justify-center mr-3`}>
                      <Users className="h-5 w-5 text-white/70" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{testimonial.author}</p>
                      <p className="text-white/70 text-sm">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-6 py-16 md:py-32">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-3xl p-8 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Marketing Strategy?</h2>
              <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
                Join hundreds of forward-thinking businesses using data-driven insights to maximize their marketing ROI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 rounded-full"
                  onClick={() => window.open('https://www.artefact.com/contact-us/', '_blank')}
                >
                  Schedule a Demo
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-transparent hover:bg-white/10 text-white border-white px-8 py-6 rounded-full"
                  onClick={() => window.open('https://www.artefact.com/offers/marketing-data-driven/measurements-mroi-insights/', '_blank')}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-lg text-white py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition">Features</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition">Solutions</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition">Contact</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition">Guides</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition">API Reference</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition">Terms</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 mb-4 md:mb-0">&copy; 2023 Artefact. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
