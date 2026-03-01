# FROM cypress/included:15.11.0
FROM cypress/included:12.4.1

WORKDIR /e2e

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

CMD ["npx", "cypress", "run", "--browser", "firefox", "--spec", "cypress/e2e/cypress_registration_test.cy.js"]