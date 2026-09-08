const express = require('express');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// Main route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CloudLabX - DevOps Demo</title>
      <style>
        /* ===== RESET & BASE ===== */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        /* ===== MAIN CARD ===== */
        .container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 50px 40px;
          max-width: 800px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* ===== HEADER ===== */
        .header {
          text-align: center;
          margin-bottom: 35px;
        }
        
        .logo {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          margin-bottom: 20px;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }
        
        h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 8px;
        }
        
        .subtitle {
          color: #666;
          font-size: 1.1rem;
          font-weight: 400;
        }
        
        .badge {
          display: inline-block;
          background: #10b981;
          color: white;
          padding: 4px 16px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-top: 10px;
          letter-spacing: 0.5px;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        /* ===== STATUS GRID ===== */
        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 15px;
          margin: 30px 0;
        }
        
        .status-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 16px;
          text-align: center;
          transition: transform 0.2s;
        }
        
        .status-card:hover {
          transform: translateY(-4px);
        }
        
        .status-card .icon {
          font-size: 28px;
          margin-bottom: 8px;
        }
        
        .status-card .label {
          font-size: 0.8rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        
        .status-card .value {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-top: 4px;
        }
        
        .status-card .value.green {
          color: #10b981;
        }
        
        .status-card .value.blue {
          color: #3b82f6;
        }
        
        .status-card .value.purple {
          color: #8b5cf6;
        }
        
        /* ===== DEPLOYMENT INFO ===== */
        .deployment-info {
          background: #f8f9fa;
          border-radius: 16px;
          padding: 24px;
          margin: 25px 0;
        }
        
        .deployment-info h3 {
          color: #1a1a2e;
          font-size: 1rem;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e5e7eb;
          font-size: 0.95rem;
        }
        
        .info-row:last-child {
          border-bottom: none;
        }
        
        .info-row .key {
          color: #6b7280;
          font-weight: 500;
        }
        
        .info-row .value {
          color: #1a1a2e;
          font-weight: 600;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
        }
        
        /* ===== TECH STACK ===== */
        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin: 25px 0 20px;
        }
        
        .tech-tag {
          background: #e5e7eb;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #374151;
          transition: all 0.2s;
        }
        
        .tech-tag:hover {
          background: #667eea;
          color: white;
          transform: scale(1.05);
        }
        
        /* ===== LINKS ===== */
        .links {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-top: 25px;
          flex-wrap: wrap;
        }
        
        .btn {
          padding: 12px 28px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
        }
        
        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
        }
        
        .btn-secondary:hover {
          background: #e5e7eb;
          transform: translateY(-2px);
        }
        
        /* ===== FOOTER ===== */
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #9ca3af;
          font-size: 0.85rem;
        }
        
        .footer a {
          color: #667eea;
          text-decoration: none;
        }
        
        .footer a:hover {
          text-decoration: underline;
        }
        
        /* ===== RESPONSIVE ===== */
        @media (max-width: 600px) {
          .container {
            padding: 30px 20px;
          }
          
          h1 {
            font-size: 2rem;
          }
          
          .status-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .info-row {
            flex-direction: column;
            gap: 4px;
          }
          
          .links {
            flex-direction: column;
          }
          
          .btn {
            justify-content: center;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- HEADER -->
        <div class="header">
          <div class="logo">🚀</div>
          <h1>CloudLabX</h1>
          <p class="subtitle">DevOps Deployment Demo</p>
          <span class="badge">✅ LIVE</span>
        </div>
        
        <!-- STATUS GRID -->
        <div class="status-grid">
          <div class="status-card">
            <div class="icon">🟢</div>
            <div class="label">Status</div>
            <div class="value green">Operational</div>
          </div>
          <div class="status-card">
            <div class="icon">🖥️</div>
            <div class="label">Server</div>
            <div class="value blue">Amazon Linux 2</div>
          </div>
          <div class="status-card">
            <div class="icon">🐳</div>
            <div class="label">Container</div>
            <div class="value purple">Docker</div>
          </div>
          <div class="status-card">
            <div class="icon">🌐</div>
            <div class="label">Proxy</div>
            <div class="value blue">Nginx</div>
          </div>
        </div>
        
        <!-- DEPLOYMENT INFO -->
        <div class="deployment-info">
          <h3>📋 Deployment Details</h3>
          <div class="info-row">
            <span class="key">Domain</span>
            <span class="value">cloudlabx.me</span>
          </div>
          <div class="info-row">
            <span class="key">Host</span>
            <span class="value">AWS EC2 (t2.micro)</span>
          </div>
          <div class="info-row">
            <span class="key">Container</span>
            <span class="value">myapp (Node.js 18)</span>
          </div>
          <div class="info-row">
            <span class="key">Deployed</span>
            <span class="value">${new Date().toLocaleString()}</span>
          </div>
          <div class="info-row">
            <span class="key">Uptime</span>
            <span class="value">${Math.floor(process.uptime())} seconds</span>
          </div>
        </div>
        
        <!-- TECH STACK -->
        <div class="tech-stack">
          <span class="tech-tag">⚡ Node.js</span>
          <span class="tech-tag">🐳 Docker</span>
          <span class="tech-tag">🔒 Nginx</span>
          <span class="tech-tag">☁️ AWS EC2</span>
          <span class="tech-tag">🔐 SSL/TLS</span>
          <span class="tech-tag">📦 Express</span>
        </div>
        
        <!-- LINKS -->
        <div class="links">
          <a href="#" class="btn btn-primary" onclick="refreshPage()">
            🔄 Refresh Status
          </a>
          <a href="https://github.com" target="_blank" class="btn btn-secondary">
            📂 GitHub
          </a>
          <a href="#" class="btn btn-secondary" onclick="showUptime()">
            ⏱️ Uptime
          </a>
        </div>
        
        <!-- FOOTER -->
        <div class="footer">
          Built with ❤️ as a DevOps project &bull; 
          <a href="#">cloudlabx.me</a> &bull; 
          <span id="year">2026</span>
        </div>
      </div>
      
      <script>
        // Auto-update the year
        document.getElementById('year').textContent = new Date().getFullYear();
        
        // Refresh page function
        function refreshPage() {
          location.reload();
        }
        
        // Show uptime alert
        function showUptime() {
          const uptime = ${Math.floor(process.uptime())};
          const hours = Math.floor(uptime / 3600);
          const minutes = Math.floor((uptime % 3600) / 60);
          const seconds = uptime % 60;
          alert(\`⏱️ Server Uptime:\\n\\n\${hours}h \${minutes}m \${seconds}s\`);
        }
        
        // Console greeting
        console.log('%c🚀 CloudLabX is Running!', 'font-size: 20px; font-weight: bold; color: #667eea;');
        console.log('%cDevOps Demo - EC2 + Docker + Nginx', 'font-size: 14px; color: #764ba2;');
      </script>
    </body>
    </html>
  `);
});

// API endpoint for health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    container: 'myapp',
    version: '1.0.0'
  });
});

// API endpoint for system info
app.get('/api/info', (req, res) => {
  res.json({
    hostname: process.env.HOSTNAME || 'unknown',
    platform: process.platform,
    nodeVersion: process.version,
    memory: {
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB',
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB'
    },
    uptime: Math.floor(process.uptime()) + ' seconds'
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 CloudLabX app running on port ${port}`);
    console.log(`📊 Health check: http://localhost:${port}/api/health`);
    console.log(`ℹ️  System info: http://localhost:${port}/api/info`);
});