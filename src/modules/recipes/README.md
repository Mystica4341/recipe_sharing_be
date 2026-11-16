# Hexagonal Architecture (Ports and Adapters) - Recipes Module

Module này được thiết kế theo kiến trúc **Hexagonal (Ports and Adapters)** nhằm tách biệt hoàn toàn logic nghiệp vụ cốt lõi khỏi các framework và công nghệ ngoại vi (NestJS, HTTP, Database).

---

## 📁 Cấu Trúc Thư Mục

```text
src/modules/recipes/
├── domain/                          # Core Domain (Nghiệp vụ thuần túy, KHÔNG phụ thuộc NestJS hay DB)
│   ├── entities/                    # Thực thể Domain (chứa business logic & validation)
│   │   └── recipe.entity.ts
│   └── exceptions/                  # Domain errors/exceptions
│       └── recipe-not-found.exception.ts
│
├── ports/                           # Hợp đồng giao tiếp (Interfaces / Contracts)
│   ├── in/                          # Inbound Ports (Driving): Các use case được gọi từ bên ngoài
│   │   ├── create-recipe.use-case.ts
│   │   └── get-recipe.use-case.ts
│   └── out/                         # Outbound Ports (Driven): Các cổng ra ngoài (DB, Notification, v.v.)
│       └── recipe-repository.port.ts
│
├── application/                     # Application Layer (Orchestration & Use Case Services)
│   ├── recipe.service.ts            # Triển khai các Inbound Ports, gọi Outbound Ports
│   └── recipe.service.spec.ts       # Unit tests độc lập không cần DB hay Web server
│
├── adapters/                        # Adapters (Cầu nối giữa thế giới bên ngoài và Domain)
│   ├── in/                          # Driving Adapters (Nhận input từ bên ngoài)
│   │   └── web/                     # HTTP REST Controller
│   │       ├── dto/                 # Request & Response DTOs
│   │       │   ├── create-recipe.dto.ts
│   │       │   └── recipe-response.dto.ts
│   │       └── recipe.controller.ts
│   └── out/                         # Driven Adapters (Thực thi Outbound Ports)
│       └── persistence/             # Triển khai lưu trữ dữ liệu
│           └── in-memory-recipe.repository.ts  # (Có thể thay thế bằng Prisma/TypeORM)
│
└── recipe.module.ts                 # NestJS Module: Wiring Dependency Injection (DI)
```

---

## 🔄 Luồng Hoạt Động (Flow of Control)

1. **Request tới Inbound Adapter**: Client gửi HTTP POST `/recipes` ➔ `RecipeController` nhận request và validate qua DTO.
2. **Gọi Inbound Port / Use Case**: `RecipeController` gọi `RecipeService.execute(command)`.
3. **Thực thi Domain Logic**: `RecipeService` khởi tạo `Recipe` entity (tự validate nghiệp vụ bên trong Entity).
4. **Gọi Outbound Port**: `RecipeService` gọi `recipeRepository.save(recipe)` thông qua interface `RecipeRepositoryPort`.
5. **Thực thi Outbound Adapter**: Triển khai thực tế (`InMemoryRecipeRepository` hoặc sau này là `PrismaRecipeRepository`) lưu dữ liệu.
6. **Trả kết quả về Client**: Chuyển Entity sang `RecipeResponseDto` và trả về JSON cho client.

---

## 📖 Swagger API Documentation

Swagger UI đã được tích hợp sẵn. Khi khởi động ứng dụng:
- URL tài liệu Swagger: `http://localhost:3000/api/docs`
- Toàn bộ DTOs và Endpoints trong module Recipes đã được gắn kèm Swagger Annotations (`@ApiTags`, `@ApiOperation`, `@ApiResponse`, `@ApiProperty`).

---

## 🚀 Cách mở rộng / Thay thế Database (ví dụ: Prisma hoặc TypeORM)

Khi bạn muốn tích hợp cơ sở dữ liệu thật:
1. Tạo class mới trong `adapters/out/persistence/prisma-recipe.repository.ts` implement `RecipeRepositoryPort`.
2. Mở file `recipe.module.ts` và đổi cấu hình DI:
   ```typescript
   {
     provide: RECIPE_REPOSITORY_PORT,
     useClass: PrismaRecipeRepository, // Thay thế InMemoryRecipeRepository
   }
   ```
Toàn bộ Domain và Application logic giữ nguyên 100%, không cần sửa đổi!
