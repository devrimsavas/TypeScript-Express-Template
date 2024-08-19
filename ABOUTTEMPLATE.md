# TypeScript Express Template

This repository provides a robust template for building Express applications using TypeScript. It is configured with essential tools and workflows to streamline development, making it an ideal starting point for new projects.

## Features

1. **TypeScript Integration**

   - Fully configured for TypeScript, including type definitions for common packages like `express`, `morgan`, and more.

2. **ES Modules Compatibility**

   - Set up to use ES modules with appropriate configuration for `__dirname` and `__filename`.

3. **Automated Build Process**

   - Includes scripts in `package.json` that automate TypeScript compilation, copying static assets (like `views`), and starting the server.

4. **Development Workflow**

   - Integrated with `nodemon` for automatic rebuilding and restarting of the server upon file changes, improving development efficiency.

5. **Standardized Structure**
   - Organized directory structure separating source files (`src/`) from build outputs (`build/`), with a clear path for assets like `views`.

## How We Prepared This Template

This section explains the step-by-step process we followed to set up this TypeScript-based Express template.

### 1. Initialize the Project

Start by creating a new directory for your project and initializing a Node.js project:

\`\`\`bash
mkdir my-express-app
cd my-express-app
npm init -y
\`\`\`

### 2. Install TypeScript and Initialize TypeScript Configuration

Install TypeScript as a development dependency and create a `tsconfig.json` file:

\`\`\`bash
npm install typescript --save-dev
npx tsc --init
\`\`\`

Configure the `tsconfig.json` as follows:

\`\`\`json
{
"compilerOptions": {
"target": "ES6",
"module": "ESNext",
"rootDir": "./src",
"outDir": "./build",
"esModuleInterop": true,
"forceConsistentCasingInFileNames": true,
"strict": true,
"skipLibCheck": true
},
"include": ["src/**/*"],
"exclude": ["node_modules"]
}
\`\`\`

### 3. Create the `src` Directory

Set up your project structure by creating a `src` directory where your TypeScript source files will reside:

\`\`\`bash
mkdir src
\`\`\`

Inside `src`, create the initial TypeScript files:

- `app.ts`: Main application file.
- `routes/index.ts`: A simple route handler.
- `routes/users.ts`: Another example route handler.
- `views/`: Directory for EJS templates.

Example `app.ts`:

\`\`\`typescript
import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const **filename = fileURLToPath(import.meta.url);
const **dirname = dirname(\_\_filename);

const app: express.Application = express();

// view engine setup
app.set('views', path.join(\_\_dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(\_\_dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};
res.status(err.status || 500);
res.render('error');
});

export default app;
\`\`\`

### 4. Install Necessary Dependencies

Install Express and other required packages, along with their TypeScript type definitions:

\`\`\`bash
npm install express cookie-parser morgan ejs
npm install --save-dev @types/express @types/cookie-parser @types/morgan @types/node
\`\`\`

### 5. Configure the Build Process

In your `package.json`, set up scripts for building and running the project:

\`\`\`json
"scripts": {
"build": "tsc && npm run copy-views",
"copy-views": "copyfiles -u 1 src/views/\*_/_ build/",
"start": "npm run build && node build/bin/www.js",
"dev": "nodemon --watch src --exec \"npm run build && node build/bin/www.js\""
}
\`\`\`

- **\`build\`**: Compiles TypeScript files and copies the `views` directory.
- **\`copy-views\`**: Copies the `views` directory to the `build` directory.
- **\`start\`**: Runs the build and starts the server.
- **\`dev\`**: Uses `nodemon` to watch for file changes, rebuilds, and restarts the server automatically.

### 6. Install Development Tools

To automate tasks during development, install `nodemon` and `copyfiles`:

\`\`\`bash
npm install copyfiles --save-dev
npm install nodemon --save-dev
\`\`\`

### 7. Set Up `.gitignore`

Create a `.gitignore` file to exclude unnecessary files from version control:

\`\`\`plaintext

# Node modules

node_modules/

# Logs

logs/
\*.log

# Compiled output

build/

# dotenv environment variables file

.env

# MacOS specific files

.DS_Store

# TypeScript specific

\*.tsbuildinfo
\`\`\`

### 8. Run and Develop

Now you can start your development server:

\`\`\`bash
npm run dev
\`\`\`

This command will automatically compile your TypeScript files, copy the views, and restart the server whenever you make changes.

## Conclusion

You've now set up a reusable TypeScript-based Express template that automates the build and development process. This template can serve as a starting point for any new project, allowing you to focus on building features rather than configuring the development environment.
