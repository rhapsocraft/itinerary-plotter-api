# Itinerary Plotter API

## Tech Stack

- express.js
- prisma + kysely
- express-sessions + passport
- typescript

## Commands

### Start server

```bash
pnpm start
```

### Start in dev mode

```bash
pnpm dev
```

### Generate Prisma Schema

```bash
pnpm prisma:generate
```

### Migrate Schema Changes

```bash
pnpm prisma:migrate:dev
```

### Format repository

```bash
pnpm prettier
```

## Charts

### ERD

```mermaid
---
config:
  layout: elk
  look: neo
  theme: redux-color
title: Itinerary Plotter - V1.0
---
erDiagram
	direction LR
	USER {
	}
	TRIP {
		string name  ""
		string description  ""
	}
	DOCUMENT {
	}
	FILE {
	}
	TRIP_VISIBILITY {
	}
	ACTIVITY {
		int seq  ""
	}

	USER||--o{TRIP:"owns"
	TRIP||--o{TRIP_VISIBILITY:"shares"
	TRIP_VISIBILITY}o--o{USER:"visible to"
	TRIP||--o{DOCUMENT:"stores"
	TRIP||--o{ACTIVITY:"has"
	ACTIVITY||--o{DOCUMENT:"stores"
	DOCUMENT}o--o{FILE:"has"

```
