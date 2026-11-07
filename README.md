# React PRO — финальный проект

Доработка приложения интернет-магазина: архитектура, оптимизация рендеров, Portal, `useRef`,
альтернативная сборка, React 19 hooks.

Стек: React + TypeScript, Redux Toolkit + RTK Query, React Router v6, React Hook Form + yup, MUI, Webpack.

## Что уже сделано по заданию

Выполнен п. 1 — «Архитектура и структура».

Слои FSD: `app/` → `pages/` → `widgets/` → `features/` → `entities/` → `shared/`.

В `shared/ui` только презентационные компоненты, без стора и API: `Button`, `Input`, `Counter`,
`Select`, `Search`, `LikeButton`, `Card`, `LoadMore`, `Spinner`, `Rating`, `Logo`, `ButtonBack`.
`Button` заменил самописные кнопки и MUI `Button`/`LoadingButton`, `Input` — `label` + `<input>`
и поля форм, `Counter` — `useCount`, `Select`/`Search` — компоненты со стором внутри.

Бизнес-логика вынесена в фичи: `features/auth` (формы входа и регистрации), `features/cart`
(корзина, счётчики, итог), `features/products` (каталог, поиск, сортировка, лайк, отзывы,
инфинит-скролл). `Card` и `LikeButton` больше не ходят в стор, `Search` не читает query-параметры,
`LoadMore` получает данные пропсами.

Селекторы сущностей — в `entities/{product, cart, user}`. Проп-пробросы сведены: `WithQuery`
рендерит загрузку и ошибку на месте, `CardList` получает только `title` и `products`.

Исправлен баг `useAddToCart`: `(product, count = 1)` — количество больше не теряется.

Проверки: `tsc --noEmit`, `eslint src` и `npm run build` проходят.

## Структура проекта

```text
src/
├── app/            # композиция приложения, глобальные стили
├── pages/          # страницы — только композиция виджетов и фич
├── widgets/        # Header, Footer, CardList, ProductCartCounter
├── features/
│   ├── auth/       # формы входа и регистрации (RHF + yup)
│   ├── cart/       # добавление в корзину, список, счётчики, итог
│   └── products/   # каталог, поиск, сортировка, лайк, отзывы, инфинит-скролл
├── entities/       # селекторы и хелперы сущностей product, cart, user
├── shared/
│   ├── ui/         # презентационные компоненты без стора и API
│   ├── hooks/      # useAddToCart, useDebounce, usePagination
│   ├── store/      # Redux Toolkit, RTK Query, слайсы, HOC WithProtection/WithQuery
│   ├── providers/  # роутер
│   ├── api/        # ApiServise
│   ├── assets/
│   ├── types/
│   └── utils/
└── index.tsx
```

`shared/ui`: `Button`, `Input`, `Counter`, `Select`, `Search`, `LikeButton`, `Card` (с `Price`),
`LoadMore`, `Spinner`, `Rating`, `Logo`, `ButtonBack`.

## Запуск

```bash
npm install
npm start      # dev-сервер
npm run build  # production-сборка
```
