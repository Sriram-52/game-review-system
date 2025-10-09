# Game Review System

A GraphQL-based game review system built with Apollo Server, Prisma, and PostgreSQL. This system allows users to manage games, authors, and reviews with full CRUD operations.

## Features

- **Games Management**: Add, update, delete, and query games with platform information
- **Review System**: Create and manage game reviews with ratings and content
- **Author Management**: Track verified and unverified reviewers
- **GraphQL API**: Full GraphQL schema with queries and mutations
- **Database**: PostgreSQL with Prisma ORM for type-safe database operations

## Tech Stack

- **Runtime**: [Bun](https://bun.com) - Fast all-in-one JavaScript runtime
- **API**: Apollo Server with GraphQL
- **Database**: PostgreSQL with PostGIS
- **ORM**: Prisma with PostgreSQL adapter
- **Language**: TypeScript

## Database Schema

The system includes three main entities:

- **Game**: Games with title and platform information
- **Author**: Review authors with verification status
- **Review**: Reviews linking games and authors with ratings and content

## Getting Started

### Prerequisites

- [Bun](https://bun.com) installed on your system
- Docker and Docker Compose for the database

### Installation

1. Clone the repository and install dependencies:

```bash
bun install
```

2. Start the PostgreSQL database:

```bash
cd db
docker-compose up -d
```

3. Set up the database schema:

```bash
bun run db:push
```

4. Generate Prisma client:

```bash
bun run db:generate
```

5. Seed the database with sample data:

```bash
bun run db:seed
```

### Running the Application

Start the development server:

```bash
bun run dev
```

The GraphQL server will be available at `http://localhost:4000`

## API Usage

### Sample Queries

**Get all games:**

```graphql
query {
	games {
		id
		title
		platform
		reviews {
			id
			rating
			content
			author {
				name
				verified
			}
		}
	}
}
```

**Get a specific game:**

```graphql
query {
	game(id: "1") {
		title
		platform
		reviews {
			rating
			content
			author {
				name
			}
		}
	}
}
```

**Get all reviews:**

```graphql
query {
	reviews {
		id
		rating
		content
		game {
			title
			platform
		}
		author {
			name
			verified
		}
	}
}
```

### Sample Mutations

**Add a new game:**

```graphql
mutation {
	addGame(game: { title: "Cyberpunk 2077", platform: ["PC", "PS5", "Xbox"] }) {
		id
		title
		platform
	}
}
```

**Update a game:**

```graphql
mutation {
	updateGame(
		id: "1"
		game: {
			title: "The Legend of Zelda: Tears of the Kingdom"
			platform: ["Switch"]
		}
	) {
		id
		title
		platform
	}
}
```

**Delete a game:**

```graphql
mutation {
	deleteGame(id: "1") {
		id
		title
	}
}
```

## Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build the TypeScript project
- `bun run db:generate` - Generate Prisma client
- `bun run db:push` - Push schema changes to database
- `bun run db:seed` - Seed database with sample data

## Database Configuration

The application uses PostgreSQL with the following default configuration:

- **Database**: `game_reviews`
- **User**: `postgres`
- **Password**: `password`
- **Port**: `5432`

Make sure to set the `DATABASE_URL` environment variable:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/game_reviews"
```

## Project Structure

```
src/
├── index.ts          # Apollo Server setup and configuration
├── schema.ts         # GraphQL schema definitions
├── resolvers.ts      # GraphQL resolvers implementation
└── prisma.ts         # Prisma client configuration

prisma/
├── schema.prisma     # Database schema definition
└── seed.ts          # Database seeding script

db/
└── docker-compose.yml # PostgreSQL database setup
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.
