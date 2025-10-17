import gql from "graphql-tag";

export default gql`
	# Core Types
	type Game {
		id: ID!
		title: String!
		platform: [String!]!
		reviews: [Review!]
	}

	type Review {
		id: ID!
		rating: Int!
		content: String!
		game: Game!
		author: Author!
	}

	type Author {
		id: ID!
		name: String!
		verified: Boolean!
		reviews: [Review!]
	}

	# Query Operations
	type Query {
		# Game queries
		games: [Game!]!
		game(id: ID!): Game

		# Review queries
		reviews: [Review!]!
		review(id: ID!): Review

		# Author queries
		authors: [Author!]!
		author(id: ID!): Author
	}

	# Mutation Operations
	type Mutation {
		# Game mutations
		createGame(input: CreateGameInput!): Game!
		updateGame(id: ID!, input: UpdateGameInput!): Game!
		deleteGame(id: ID!): Game!

		# Review mutations
		createReview(input: CreateReviewInput!): Review!
		updateReview(id: ID!, input: UpdateReviewInput!): Review!
		deleteReview(id: ID!): Review!

		# Author mutations
		createAuthor(input: CreateAuthorInput!): Author!
		updateAuthor(id: ID!, input: UpdateAuthorInput!): Author!
		deleteAuthor(id: ID!): Author!
	}

	# Game Input Types
	input CreateGameInput {
		title: String!
		platform: [String!]!
	}

	input UpdateGameInput {
		title: String
		platform: [String!]
	}

	# Review Input Types
	input CreateReviewInput {
		rating: Int!
		content: String!
		gameId: ID!
		authorId: ID!
	}

	input UpdateReviewInput {
		rating: Int
		content: String
	}

	# Author Input Types
	input CreateAuthorInput {
		name: String!
		verified: Boolean = false
	}

	input UpdateAuthorInput {
		name: String
		verified: Boolean
	}
`;
