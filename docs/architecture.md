# EventsCompanion — System Architecture

```mermaid
graph LR
    User -->|UI / API| EventsCompanion[EventsCompanion]
    EventsCompanion -->|REST| ERP
    EventsCompanion -->|REST| Clock
```
