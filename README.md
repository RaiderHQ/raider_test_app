# Raider Test App

A React Native demo app designed for mobile test automation practice. Built as a companion to [ruby_raider](https://github.com/RubyRaider/ruby_raider) and [raider_desktop](https://github.com/RubyRaider/raider_desktop).



## Features

- **Product Catalog** — Browse products with sorting (name/price)
- **Product Detail** — View details, select color/quantity, add to cart
- **Shopping Cart** — Manage items, update quantities, remove items
- **Login** — Authentication with test credentials and validation
- **Checkout Flow** — Shipping info → Payment → Order review → Confirmation
- **Drawing Pad** — Touch-based drawing canvas with color picker
- **WebView** — URL input with history
- **About** — App information and links

## Test Automation

All interactive elements have `testID` props that map to:
- **Android**: `content-desc` (accessibility ID)
- **iOS**: `accessibilityIdentifier`

### Key Test IDs

| Screen | Element | testID |
|--------|---------|--------|
| Catalog | Product item | `product-item-{id}` |
| Catalog | Sort button | `sort-button` |
| Catalog | Cart badge | `cart-badge` |
| Detail | Add to cart | `add-to-cart-button` |
| Detail | Quantity +/- | `plus-button`, `minus-button` |
| Cart | Checkout | `proceed-to-checkout` |
| Login | Username | `username-input` |
| Login | Password | `password-input` |
| Login | Submit | `login-button` |
| Checkout | Ship form | `full-name-input`, `address1-input`, etc. |
| Payment | Card fields | `card-number-input`, `cvv-input`, etc. |
| Review | Place order | `place-order-button` |
| Complete | Continue | `continue-shopping-button` |
| Tabs | Navigation | `tab-shop`, `tab-cart`, `tab-drawing`, etc. |

### Test Credentials

| Email | Password | Type |
|-------|----------|------|
| bob@example.com | password123 | Standard user |
| alice@example.com | password123 | Locked out user |
| visual@example.com | password123 | Visual testing user |

## Getting Started

```bash
# Install dependencies
npm install

# iOS (requires macOS with Xcode)
cd ios && bundle install && bundle exec pod install && cd ..
npx react-native run-ios

# Android (requires Android SDK)
npx react-native run-android
```

## Download Pre-built Apps

Pre-built APK (Android) and .app (iOS Simulator) are available from [GitHub Releases](https://github.com/RubyRaider/raider_test_app/releases).

To trigger a release, push a tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## Tech Stack

- React Native 0.84
- React Navigation (native stack + bottom tabs)
- TypeScript
- No external UI library — pure React Native components

## License

MIT
