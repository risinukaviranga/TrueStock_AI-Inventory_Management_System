
flowchart TB
    USER["Business Owner / Manager / Staff"]
    AUTH["Authentication & Tenant Module"]

    USER --> AUTH

    AUTH --> PROD["Product Management"]
    AUTH --> INV["Inventory Management"]
    AUTH --> SUP["Supplier & Purchasing"]
    AUTH --> SALES["Sales Management"]

    SUP --> INV
    PROD --> INV
    SALES --> INV

    INV --> BI["Business Intelligence"]
    SALES --> BI
    INV --> ALERT["Alerts & Notifications"]

    SALES --> AI["AI Forecasting"]
    INV --> AI
    AI --> ALERT
    AI --> BI

    DB[("PostgreSQL")]
    PROD --> DB
    INV --> DB
    SUP --> DB
    SALES --> DB
    BI --> DB
    AUTH --> DB
    AI --> DB
  
