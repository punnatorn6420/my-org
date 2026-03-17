# Page Composer (Nx Monorepo)

## Quick start

```bash
pnpm install
```

## Ports (แนะนำ)

- **api**: `3333`
- **web** (public): `3000`
- **cms** (admin): `3001`

> หมายเหตุ: `web` และ `cms` ต้องชี้ไปที่ API ด้วย `NEXT_PUBLIC_API_URL=http://localhost:3333`

## Run (แยกทีละโปรเจ็กต์)

### 1) API

```bash
pnpm nx serve api
```

เปิดใช้งานที่ `http://localhost:3333`

### 2) Web (public site)

```bash
NEXT_PUBLIC_API_URL=http://localhost:3333 pnpm nx run web:dev -- --port 3000
```

เปิดใช้งานที่ `http://localhost:3000`

### 3) CMS (admin)

```bash
NEXT_PUBLIC_API_URL=http://localhost:3333 pnpm nx run cms:dev -- --port 3001
```

เปิดใช้งานที่ `http://localhost:3001`

## Useful npm scripts

ใช้คำสั่งลัดด้านล่างแทนคำสั่งยาวได้:

```bash
pnpm dev:api
pnpm dev:web
pnpm dev:cms
pnpm build
```

## How the apps connect

1. CMS เรียก API ฝั่ง admin (`/admin/sections`, `/admin/pages/home/layout`, `/admin/pages/home/publish`) เพื่อจัดการ section/layout และ publish
2. Web เรียก API public (`/pages/home`) เพื่อดึง snapshot ที่ publish แล้ว
3. ทั้ง CMS preview และ Web render จริง ใช้ shared renderer + shared sections จาก `libs/renderer` และ `libs/sections`
