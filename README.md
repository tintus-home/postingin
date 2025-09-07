# Postingin - Social Media Scheduler & Auto-Reply

A professional social media management dashboard for scheduling posts and automating replies on LinkedIn and Threads.

## 🚀 Features

- **📅 Smart Scheduling**: Schedule posts across LinkedIn and Threads with timezone support
- **🤖 Auto-Reply Rules**: Intelligent keyword-based automatic responses with cooldown management
- **📊 Analytics Dashboard**: Comprehensive performance tracking and engagement metrics
- **🎨 Beautiful UI**: Modern, responsive design with dark/light theme support
- **📱 Multi-Platform**: Unified management for LinkedIn and Threads
- **📄 CSV Import/Export**: Bulk post management and data portability
- **🔒 Secure**: Built-in authentication and rate limiting

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **State Management**: TanStack Query
- **Theme**: Custom design system with HSL color tokens
- **Icons**: Lucide React

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd postingin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Sidebar, Header)
│   ├── providers/       # Context providers (Theme)
│   └── ui/             # Reusable UI components (shadcn/ui)
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Analytics and overview
│   ├── Composer.tsx    # Post creation interface
│   ├── Queue.tsx       # Scheduled posts management
│   ├── AutoReply.tsx   # Auto-reply rules management
│   └── Settings.tsx    # Account and preferences
├── lib/                # Utilities and helpers
├── hooks/              # Custom React hooks
└── index.css          # Global styles and design system
```

## 🎨 Design System

The application uses a comprehensive design system built on HSL color tokens:

- **Primary**: Purple-blue gradient brand colors
- **Semantic Colors**: Success (green), Warning (amber), Error (red)
- **Typography**: Modern sans-serif with clear hierarchy
- **Components**: Consistent spacing, shadows, and animations
- **Responsive**: Mobile-first design with desktop enhancements

### Color Tokens

All colors are defined in `src/index.css` using HSL values:
- `--primary`: Main brand color (purple-blue)
- `--success`: Success states (green)
- `--warning`: Warning states (amber)
- `--muted`: Subtle backgrounds and secondary text

## 🔧 Configuration

### Environment Setup (Production)

For production deployment, you'll need to configure:

1. **Social Media APIs**
   - LinkedIn Developer App credentials
   - Meta/Threads API credentials

2. **Database** (PostgreSQL recommended)
   - User authentication tables
   - Post scheduling tables
   - Auto-reply rules tables

3. **Environment Variables**
   ```env
   DATABASE_URL=your_database_url
   LINKEDIN_CLIENT_ID=your_linkedin_client_id
   LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
   THREADS_APP_ID=your_threads_app_id
   THREADS_APP_SECRET=your_threads_app_secret
   ```

### OAuth Setup

#### LinkedIn API
1. Visit [LinkedIn Developer Portal](https://developer.linkedin.com/)
2. Create a new app
3. Enable "Sign In with LinkedIn" and "Share on LinkedIn"
4. Set redirect URI to your domain + `/auth/linkedin/callback`
5. Copy Client ID and Client Secret

#### Threads API
1. Visit [Meta for Developers](https://developers.facebook.com/)
2. Create a new app with Threads product
3. Configure Threads Basic Display
4. Set redirect URI to your domain + `/auth/threads/callback`
5. Copy App ID and App Secret

## 📄 CSV Import/Export

### Export Format
Posts are exported in CSV format with these columns:
- `platform`: LinkedIn | Threads
- `content_text`: Post content
- `media_type`: text | image | video
- `media_path`: File path or URL
- `scheduled_at`: YYYY-MM-DD HH:MM format
- `timezone`: Timezone identifier
- `status`: draft | queued | posted | failed

### Import Requirements
- CSV file with proper headers
- UTF-8 encoding
- Dates in ISO format
- Valid timezone identifiers

## 🚀 Production Deployment

### Option 1: Docker Deployment

1. **Build Docker image**
   ```bash
   docker build -t postingin .
   ```

2. **Run with environment variables**
   ```bash
   docker run -d \
     -p 3000:3000 \
     -e DATABASE_URL=your_db_url \
     -e LINKEDIN_CLIENT_ID=your_id \
     -e LINKEDIN_CLIENT_SECRET=your_secret \
     postingin
   ```

### Option 2: Traditional Hosting

1. **Build production assets**
   ```bash
   npm run build
   ```

2. **Deploy `dist/` folder** to your web server

3. **Configure environment variables** in your hosting platform

### Option 3: Vercel/Netlify

1. **Connect Git repository**
2. **Set build command**: `npm run build`
3. **Set output directory**: `dist`
4. **Configure environment variables** in dashboard

## 🔒 Security Considerations

- **API Keys**: Never commit API keys to version control
- **Rate Limiting**: Implement proper rate limiting for social media APIs
- **Input Validation**: Sanitize all user inputs
- **HTTPS**: Always use HTTPS in production
- **CORS**: Configure proper CORS policies

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Check Node.js version (18+ required)
   - Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`

2. **Theme Issues**
   - Verify design system tokens in `src/index.css`
   - Check Tailwind configuration in `tailwind.config.ts`

3. **Routing Issues**
   - Ensure proper routing configuration for SPA
   - Configure server to serve `index.html` for all routes

4. **API Connection Issues**
   - Verify OAuth credentials and redirect URIs
   - Check network connectivity and API endpoints
   - Review rate limiting and quota usage

### Development Tools

- **React DevTools**: Browser extension for debugging React
- **TanStack Query DevTools**: Enable in development for query debugging
- **Browser DevTools**: Network tab for API debugging

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [LinkedIn API Documentation](https://docs.microsoft.com/en-us/linkedin/)
- [Threads API Documentation](https://developers.facebook.com/docs/threads)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for social media professionals**