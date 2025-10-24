# Volunteer Rundown 技術簡介

本專案採用以下前端技術：

- **Next.js 16**：React 應用框架，支援 SSR/SSG。
- **React 19**：現代化 UI 開發主力。
- **TypeScript 5**：型別安全的 JavaScript 超集。
- **Tailwind CSS 4**：原子化 CSS 樣式框架。
- **shadcn/ui** + **Radix UI**：可組合式、無障礙的 React UI 元件。
- **lucide-react**：SVG icon 套件。
- **Zod 4**：型別驗證（已升級至 v4，完全相容）。
- 其他輔助套件：
  - `react-hook-form`、`date-fns`、`recharts`、`embla-carousel-react`、`cmdk`、`sonner`、`vaul` 等

## 開發與建置

```bash
npm install
npm run dev      # 啟動開發伺服器
npm run build    # 生產環境建置
npx tsc --noEmit # 型別檢查
```

## 程式碼品質：ESLint

- 執行檢查：`npm run lint`
- 自動修復：`npm run lint:fix`

說明：

- 已使用 ESLint v9（Flat Config）整合 Next.js Core Web Vitals、TypeScript、import 排序與未使用匯入檢查。
- 若看到 import 排序或未使用變數的警告，可先執行 `npm run lint:fix` 自動修復。
- 規則位置：`eslint.config.mjs`。

## 端對端測試：Playwright

- 安裝瀏覽器（若第一次使用）：`npx playwright install`
- 執行測試（會自動 build 並以 3001 埠啟動）：`npm run test:e2e`
- 互動模式（UI）：`npm run test:e2e:ui`
- 檢視報告：`npm run test:e2e:report`

預設會：

- 以 `playwright.config.ts` 的設定，測試目錄為 `e2e/`，瀏覽器預設只跑 Chromium。
- 啟動命令為 `npm run build && npm run start -- -p 3001`，避免開發模式的鎖檔衝突。

疑難排解：

- 埠被占用：請關閉占用 3000/3001 的程序，或修改 `playwright.config.ts` 中的 `url` 與啟動參數 `-p`。
- 若測試找不到元素，請開啟報告 `npm run test:e2e:report` 檢視截圖/錄影。
- 如遇 ESLint 警告太多，可先以 `npm run lint:fix` 自動整理，再逐步調整規則。

## 專案結構

- `app/`：Next.js 頁面與全域樣式
- `components/`：自訂元件與 shadcn/ui 元件
- `hooks/`、`lib/`：自訂 hooks 與工具
- `public/`：靜態資源
- `styles/`：全域 CSS

## 相依維護

- 檢查更新：`npm outdated`
- 升級套件：`npm install <package>@latest`
- 主版號升級（如 recharts、sonner）請參考官方 changelog 並測試

---

本專案為 UI 殼，方便日後擴充資料來源與功能。
