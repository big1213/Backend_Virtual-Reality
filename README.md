# Crypto Exchange API (C2C Style)

ระบบ Backend สำหรับแลกเปลี่ยน Cryptocurrency แบบ Peer-to-Peer (C2C)
พัฒนาด้วย Node.js, Express, Sequelize ORM และ SQLite

## ER Diagram (ความสัมพันธ์)

```
users ─┬── hasMany ──> crypto_wallets ──> belongsTo ──> coins
       ├── hasMany ──> fiat_wallets ──> belongsTo ──> fiat_currencies
       ├── hasMany ──> trade_orders ──> belongsTo ──> coins, fiat_currencies
       ├── hasMany ──> trades (buyer / seller)
       └── hasMany ──> transfers (sender / receiver)
```

## โครงสร้างโปรเจค

```
src/
├── app.js                  # Entry point
├── config/
│   └── database.js         # Sequelize + SQLite config
├── models/                 # Sequelize Models + Relationships
│   ├── index.js
│   ├── User.js
│   ├── Coin.js
│   ├── FiatCurrency.js
│   ├── CryptoWallet.js
│   ├── FiatWallet.js
│   ├── TradeOrder.js
│   ├── Trade.js
│   └── Transfer.js
├── controllers/            # Business logic
│   ├── userController.js
│   ├── coinController.js
│   ├── tradeOrderController.js
│   ├── tradeController.js
│   └── transferController.js
├── routes/                 # API Routes
│   ├── index.js
│   ├── userRoutes.js
│   ├── coinRoutes.js
│   ├── tradeOrderRoutes.js
│   ├── tradeRoutes.js
│   └── transferRoutes.js
└── seeders/
    └── seed.js             # Seed data
```

## ขั้นตอนการ Run Project

### 1. Clone โปรเจค

```bash
git clone https://github.com/big1213/Backend_Virtual-Reality.git
cd Backend_Virtual-Reality
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. Seed ข้อมูลตัวอย่าง

```bash
npm run seed
```

### 4. รัน Server

```bash
npm start
```

Server จะรันที่ `http://localhost:3000`

## API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | ดูผู้ใช้ทั้งหมด |
| GET | `/api/users/:id` | ดูผู้ใช้ตาม ID (รวม wallets) |
| POST | `/api/users` | สร้างผู้ใช้ใหม่ |
| PUT | `/api/users/:id` | แก้ไขข้อมูลผู้ใช้ |
| DELETE | `/api/users/:id` | ลบผู้ใช้ |

### Coins
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/coins` | ดูเหรียญทั้งหมด |
| GET | `/api/coins/:id` | ดูเหรียญตาม ID |
| POST | `/api/coins` | เพิ่มเหรียญใหม่ |

### Trade Orders (คำสั่งซื้อ-ขาย C2C)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trade-orders` | ดูคำสั่งทั้งหมด (filter: `?status=OPEN&order_type=SELL`) |
| GET | `/api/trade-orders/:id` | ดูคำสั่งตาม ID |
| POST | `/api/trade-orders` | สร้างคำสั่งซื้อ-ขาย |
| PUT | `/api/trade-orders/:id/cancel` | ยกเลิกคำสั่ง |

### Trades (การซื้อขายที่สำเร็จ)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trades` | ดูประวัติการซื้อขายทั้งหมด |
| GET | `/api/trades/:id` | ดูรายละเอียดการซื้อขาย |

### Transfers (การโอนเหรียญ)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transfers` | ดูประวัติการโอนทั้งหมด |
| GET | `/api/transfers/:id` | ดูรายละเอียดการโอน |
| POST | `/api/transfers` | สร้างรายการโอน |

## ตัวอย่างการใช้งาน

### สร้างคำสั่งขาย BTC
```bash
curl -X POST http://localhost:3000/api/trade-orders \
  -H "Content-Type: application/json" \
  -d '{"user_id":1,"coin_id":1,"fiat_id":1,"order_type":"SELL","price_per_coin":1050000,"amount":0.5}'
```

### ดูคำสั่งซื้อ-ขายที่เปิดอยู่
```bash
curl http://localhost:3000/api/trade-orders?status=OPEN
```

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Sequelize
- **Database:** SQLite
