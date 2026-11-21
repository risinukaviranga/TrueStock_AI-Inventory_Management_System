
flowchart TB
    U["Business Owners / Managers / Staff"]
    FE["Next.js Frontend"]
    API["NestJS Backend API - Modular Monolith"]
    AUTH["Authentication & RBAC"]
    INV["Inventory Module"]
    PROD["Product Module"]
    PUR["Purchasing & Supplier Module"]
    SALES["Sales Module"]
    BI["Business Intelligence Module"]
    PG[("PostgreSQL Database")]
    REDIS[("Redis + BullMQ")]
    AI["Python FastAPI Forecasting Service"]
    STORAGE["S3-compatible File Storage"]
    EXT["Email / Payment Providers"]

    U --> FE
    FE --> API
    API --> AUTH
    API --> INV
    API --> PROD
    API --> PUR
    API --> SALES
    API --> BI
    AUTH --> PG
    INV --> PG
    PROD --> PG
    PUR --> PG
    SALES --> PG
    BI --> PG
    API --> REDIS
    REDIS --> AI
    AI --> PG
    API --> STORAGE
    API --> EXT
