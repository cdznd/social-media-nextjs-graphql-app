# Social Media Next.js GraphQL Application

A modern social media application built with Next.js, GraphQL, and Material-UI. This application provides a robust platform for social networking with real-time updates, user authentication, and a beautiful, responsive interface.

## 🚀 Features

- **Modern Tech Stack**
  - Next.js 15 with App Router
  - GraphQL API with Apollo Server
  - Material-UI v6 for beautiful UI components
  - TypeScript for type safety
  - Prisma as the ORM
  - AWS S3 for file storage

- **Authentication & Authorization**
  - Secure user authentication
  - Role-based access control
  - JWT token management

- **Social Features**
  - User profiles
  - Posts and comments
  - Real-time updates
  - File uploads

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose (for local development)
- AWS S3 bucket (for file storage)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/social-media-nextjs-graphql-app.git
   cd social-media-nextjs-graphql-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="your_database_url"
   AWS_ACCESS_KEY_ID="your_aws_access_key"
   AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
   AWS_REGION="your_aws_region"
   AWS_BUCKET_NAME="your_bucket_name"
   JWT_SECRET="your_jwt_secret"
   ```

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🏗️ Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable React components
├── fragments/        # GraphQL fragments
├── lib/             # Core functionality and configurations
├── services/        # Business logic and API services
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## 🚀 Deployment

The application is configured for deployment on Vercel. The build process includes:
1. Prisma schema generation
2. Database migrations
3. Next.js build

```bash
npm run vercel-build
# or
yarn vercel-build
```

## 📝 API Documentation

The GraphQL API documentation is available at `/api/graphql` when running the development server.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Apollo team for GraphQL tools
- Material-UI team for the component library
- Prisma team for the ORM
