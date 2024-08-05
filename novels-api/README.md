## Các bước khởi chạy dự án

# Bắt buộc phải dùng pnpm bởi vì nó sẽ tự động cài các package phụ thuộc

Cài các package dự án

```sh
pnpm install
```

Tạo file .env và thêm các biến môi trường từ env.example

Generate prisma schema

```sh
pnpm run prisma:generate
```

chạy dự án

```sh
pnpm dev
```

## Test api với postman

[Link](https://www.postman.com/shotari/workspace/huyenthulauapi)
