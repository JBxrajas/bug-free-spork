# bug-free-spork
This is a test automation framework project for Sandbox and Experimentation 
## Bug-Free-Spork: Playwright Automation Framework

This project is an end-to-end automation framework using [Playwright](https://playwright.dev/) with the Page Object Model (POM) design pattern.

### Project Structure

```
bug-free-spork/
├── pages/         # Page Object classes (one per app view)
├── tests/         # Test specs using Playwright Test
├── utils/         # Utility functions/helpers
├── test-results/  # Playwright output (screenshots, videos, traces)
├── .gitignore
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

### Getting Started

1. **Install dependencies:**
	```
	npm install
	```

2. **Install Playwright browsers:**
	```
	npx playwright install
	```

3. **Run tests (headless):**
	```
	npx playwright test
	```

4. **Run tests with browser UI:**
	- Edit `playwright.config.ts` and set `headless: false` in the `use` section.
	- Then run:
	  ```
	  npx playwright test
	  ```

### Page Object Model (POM)
- All selectors and page actions are defined in `pages/` (e.g., `LoginPage.ts`).
- Test files in `tests/` only use page object methods, not selectors directly.

### Example Usage

**Login Test:**
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('should login successfully', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  // Add assertions for successful login
});
```

### Customization
- Add new page objects in `pages/` for each app view.
- Add new test specs in `tests/`.
- Update selectors in page objects as the app evolves.

### Best Practices
- Do not commit `node_modules/`, `test-results/`, `reports/`, `screenshots/`, or `videos/` (see `.gitignore`).
- Use data-test attributes for selectors when possible.

---
For more, check out this [Playwright docs](https://playwright.dev/).
