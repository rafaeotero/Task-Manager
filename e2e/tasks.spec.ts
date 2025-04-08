// e2e/tasks.spec.ts
import { test, expect } from "@playwright/test";

test("verifica presença da task nas rotas corretas após edição", async ({ page }) => {
  const title = `Test task - ${Date.now()}`;
  const description = `Test description - ${Date.now()}`;

  // Acessa a página principal e limpa o estado
  await page.goto("http://localhost:3000");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // Cria a task
  await page.getByTestId("open-modal-button").click();

  await page.getByTestId("input-title").fill(title);
  await page.getByTestId("input-description").fill(description);
  await page.getByTestId("input-deadline").fill("2025-04-10");
  await page.getByTestId("checkbox-important").check();
  await page.getByTestId("save-task-button").click();

  // Verifica que a task está na home
  await expect(page.getByText(title)).toBeVisible();

  // Verifica que aparece na rota "important"
  await page.goto("http://localhost:3000/important");
  await expect(page.getByText(title)).toBeVisible();

  // Verifica que aparece na rota "incomplete"
  await page.goto("http://localhost:3000/incomplete");
  await expect(page.getByText(title)).toBeVisible();

  // Edita a task: desmarca "important" e marca como "complete"
  await page.goto("http://localhost:3000"); // volta pra home
  const task = page.locator('[data-testid="task-item"]').filter({ hasText: title }).first();
  await task.getByRole("button", { name: "Edit task" }).click();
  await page.getByTestId("checkbox-important").uncheck();
  await page.getByTestId("save-task-button").click();

  // Marca como completa
  await task.getByRole("button", { name: "Incomplete" }).click();

  // Verifica que NÃO aparece mais na "important"
  await page.goto("http://localhost:3000/important");
  await expect(page.getByText(title)).not.toBeVisible();

  // Verifica que aparece em "complete"
  await page.goto("http://localhost:3000/completed");
  await expect(page.getByText(title)).toBeVisible();
});
