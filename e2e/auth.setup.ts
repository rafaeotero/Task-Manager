import { test as setup, expect } from "@playwright/test";
import path from "path";

const STORAGE_STATE = path.resolve(__dirname, "auth.json");

setup("Realiza login com usuário de teste", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // 1. Clica no botão "Sign in" na landing page
  await page.getByRole("button", { name: "Sign in" }).click();

  // 2. Aguarda e preenche o campo de e-mail no login do Clerk
  await page.getByPlaceholder("Enter your email address").fill("rafaelolitransato@gmail.com");
  await page.getByRole("button", { name: "Continue", exact: true }).click();


  // 3. Preenche a senha
  await page.getByPlaceholder("Enter your password").fill("testetestando123#");
  await page.getByRole("button", { name: "Continue", exact: true }).click();


  // 4. Aguarda redirecionamento para tela logada
  await expect(page.getByRole("button", { name: "Create New Task" })).toBeVisible();

  // 5. Salva o estado de autenticação
  await page.context().storageState({ path: STORAGE_STATE });
});
