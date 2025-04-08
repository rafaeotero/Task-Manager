// e2e/fixtures.ts
import { test as base } from '@playwright/test';

// Extendendo o objeto de teste com uma fixture para login
export const test = base.extend<{
  // Exemplo: função para limpar o estado da aplicação
  resetState: () => Promise<void>;
}>({
  // Fixture para resetar o estado: limpa localStorage e reinicia o app
  resetState: async ({ page }, use) => {
    // Garante que o localStorage esteja limpo antes de carregar a página
    await page.addInitScript(() => localStorage.clear());
    await page.goto('http://localhost:3000');
    // Se necessário, você pode chamar uma rota de reset do backend aqui
    await use(async () => {
      // Função que pode ser chamada em cada teste para resetar o estado
      await page.evaluate(() => localStorage.clear());
    });
  },
});

